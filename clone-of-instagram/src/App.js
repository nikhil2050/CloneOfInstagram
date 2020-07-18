import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import Post from './components/Post';
import {db, auth} from './firebase'
import {makeStyles} from '@material-ui/core/styles'
import Modal from '@material-ui/core/Modal'
import { Button, Input } from '@material-ui/core';
import ImageUpload from './components/ImageUpload';
import InstagramEmbed from 'react-instagram-embed';

// Reference: https://material-ui.com/components/modal/#modal
function getModalStyle() {
  const top = 50 ;
  const left = 50 ;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}
// Reference: https://material-ui.com/components/modal/#modal
const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function App() {

  const [posts, setPosts] = useState([
    // {   
    //     username:"cleverQazi",
    //     caption:"Wow it works 😊",
    //     imageUrl:"https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/320px-React-icon.svg.png"
    // },{
    //     username:"ssangha",
    //     caption:"Vue.jsss 😁",
    //     imageUrl:"https://i0.wp.com/www.factweavers.com/blog/wp-content/uploads/2018/02/01_blog_02_2018.png?resize=800%2C450&ssl=1"
    // },{
    //     username:"nik_kshirsagar",
    //     caption:"Angular.jsss 🤦‍♂️",
    //     imageUrl:"https://i.pinimg.com/originals/c6/ff/1a/c6ff1a90b45aa902b89cb983fdf8682e.png"
    // }
  ]);

  // UseEffect: Runs a piece of code based on a specific condition
  // Update 'posts' in state from FirebaseDB
  // Note: If array is blank [] then run it once when page refereshes
  useEffect(() => {
    // This is where the code runs
    db.collection('posts').orderBy("timestamp",'desc').onSnapshot(snapshot => {
      setPosts(snapshot.docs.map(doc => ({
          id: doc.id,
          post:doc.data()
      })));
    }); 
  }, []) 

  const [modalOpen, setModalOpen] = useState(false);

  {/* Reference: https://material-ui.com/components/modal/#modal  */}
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')

  {/* 
    * Signup - Handler 
    */}
  const signUp = (event) => {
    event.preventDefault();

    // Create User
    auth.createUserWithEmailAndPassword(email, password)
        .then((authUser) => {
          // Populate 'displayname'
          return authUser.user.updateProfile({
            displayName: username
          })
        })
        .then(() => setModalOpen(false))
        .catch((error) => alert(error.message))
  }


  {/* 
    * Authentication - Get current User 
    */}
  const [user, setUser] = useState(null)

  // Check everytime if user is logged in..
  useEffect(()=>{
    auth.onAuthStateChanged((authUser) =>{
      if(authUser) {    
        // User has logged in..
        console.log(authUser)
        setUser(authUser)   // Cookie tracking. Keeps you logged in 

        if(authUser.displayName) {
          //don't update
        } else {
          // if we just created someone 
          return authUser.updateProfile({
            displayName:username
          })
        }

      } else {          
        // User has logged out..
        setUser(null)
      }
    })
  }, [user, username])  // If we are using a variable in useEffect, mention here

  const [openLogInModal, setOpenLogInModal] = useState(false);

  const logIn = (event) => {
    event.preventDefault();
    auth.signInWithEmailAndPassword(email, password)
        .catch(error => alert(error.message))
    setOpenLogInModal(false)
  }
  return (
    <div className="app">

      {/* Header - Logo Search  Home,Msg,Navigate,Notifications,Profile*/}
      <div className="app__header">
        <img className="app_headerImage" alt=""
            src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"/>

        {
          user ? (<p>Hello <strong>{user.displayName}</strong>!</p>)
              : ("")
        }
        {/* SIGNUP - MODAL WINDOW */}
        {/* Reference: https://material-ui.com/components/modal/#modal  */}
        <Modal open={modalOpen} onClose={() => setModalOpen(false)} >
          <div style={modalStyle} className={classes.paper}>
            <form className="app__signup">
              <center>
                <img className="app_headerImage" alt=""
                    src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"/>
              </center>

              <Input type="text" placeholder="username" value={username}
                  onChange={(e) => setUsername(e.target.value)} />
              <Input type="text" placeholder="email" value={email}
                  onChange={(e) => setEmail(e.target.value)} />
              <Input type="password" placeholder="password" value={password}
                  onChange={(e) => setPassword(e.target.value)} />
              <Button type="submit" onClick={signUp} > Sign Up </Button>
            </form>
          </div>
        </Modal>

        {/* LOGIN - MODAL WINDOW */}
        {/* Reference: https://material-ui.com/components/modal/#modal  */}
        <Modal open={openLogInModal} onClose={() => setOpenLogInModal(false)} >
          <div style={modalStyle} className={classes.paper}>
            <form className="app__signup">
              <center>
                <img className="app_headerImage" alt=""
                    src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"/>
              </center>

              <Input type="text" placeholder="email" value={email}
                  onChange={(e) => setEmail(e.target.value)} />
              <Input type="password" placeholder="password" value={password}
                  onChange={(e) => setPassword(e.target.value)} />
              <Button type="submit" onClick={logIn} > Log In </Button>
            </form>
          </div>
        </Modal>

        {user
            ? (<Button onClick={() => auth.signOut()}>Log Out</Button>) 
            : (<div className="app__loginContainer" >
                <Button onClick={() => setModalOpen(true)}>Sign Up</Button>
                <Button onClick={() => setOpenLogInModal(true)}>Log In</Button>
              </div>)
        }
        
      </div>
      
      {
        user?.displayName
          ? (<ImageUpload username={user.displayName} />)
          : (<h3 className="app__loginToUploadText">Please login to upload an image</h3>)
      }
      
      
      <div className="app_posts">
        {/* Posts */}
        {/* Posts */}
        {/* Posts */}
        <div class="app_postsLeft">
        {
          posts.map(({id, post}) => (
            <Post key={id} authUser={user} 
                postId={id} username={post.username} caption={post.caption} imageUrl={post.imageUrl}/>
          ))
        }
        </div>

        <div class="app_postsRight">
          <InstagramEmbed
              url='https://www.instagram.com/p/B_mxYU4JZig/'
              maxWidth={400}
              hideCaption={true}
              containerTagName='div'
              protocol=''
              injectScript
              onLoading={() => {}}
              onSuccess={() => {}}
              onAfterRender={() => {}}
              onFailure={() => {}}
              />
          <InstagramEmbed
              url='https://www.instagram.com/p/B7qyCGZpLht/'
              maxWidth={400}
              hideCaption={true}
              containerTagName='div'
              protocol=''
              injectScript
              onLoading={() => {}}
              onSuccess={() => {}}
              onAfterRender={() => {}}
              onFailure={() => {}}
              />
        </div>
      </div>
    </div>
  );
}

export default App;
