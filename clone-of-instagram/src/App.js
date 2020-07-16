import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import Post from './components/Post';
import {db} from './firebase'


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
    db.collection('posts').onSnapshot(snapshot => {
      setPosts(snapshot.docs.map(doc => ({
          id: doc.id,
          post:doc.data()
      })));
    }); 
  }, []) 

  return (
    <div className="app">

      {/* Header - Logo Search  Home,Msg,Navigate,Notifications,Profile*/}
      <div className="app__header">
        <img 
            className="app_headerImage" 
            src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
            alt=""></img>
      </div>
      
      {/* Posts */}
      {/* Posts */}
      {/* Posts */}
      {
        posts.map(({id, post}) => (
          <Post key={id} username={post.username} caption={post.caption} imageUrl={post.imageUrl}/>
        ))
      }

      {/* Footer */}
    </div>
  );
}

export default App;
