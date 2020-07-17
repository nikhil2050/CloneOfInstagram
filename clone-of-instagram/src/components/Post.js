import React, { useState, useEffect } from 'react'
import './Post.css'
import Avatar from "@material-ui/core/Avatar"
import {db, auth} from "../firebase"
import firebase from "firebase"

function Post({authUser, postId, username, caption, imageUrl}) {

    /* 
     * Fetch comments from Firebase 
     */
    const [comments, setComments] = useState([]);

    useEffect(() => {
        let unsubscribe;
        if (postId) {
            unsubscribe = db.collection('posts')
                            .doc(postId)
                            .collection('comments')
                            .orderBy('timestamp','desc')
                            .onSnapshot((snapshot) => {
                                setComments(snapshot.docs.map((doc) => doc.data()))
                            })
        }
        return() => {
            unsubscribe();
        }
    }, [postId])

    /* 
     * For CommentBox 
     */
    const[comment, setComment] = useState('')

    const postComment = (event) => {
        event.preventDefault();
        db.collection('posts').doc(postId).collection('comments').add({
            username: authUser.displayName,
            posttext: comment,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });
        setComment('')          // clear CommentBox
    }

    return (
        <div className="post">
            {/* header -> Avatar + username */}
            <div className="post__header">
                <Avatar className="post__avatar" alt={username}
                        src="/static/images/avatar/1.jpg" />
                <h3>{username}</h3>
            </div>

            {/* image */}
            <img className="post__image" src={imageUrl} />

            {/* username + caption */}
            <h4 className="post__text"><strong>{username}</strong> {caption} </h4>
            
            {/* comment */}
            {/* comment */}
            {/* comment */}
            <div className="post_comments">
            {
                comments.map((comment) => (
                    <p>
                        <strong>{comment.username}</strong> {comment.posttext}
                    </p>
            ))}
            </div>

            {
                authUser && (

                    /* Add comment form */
                    <form className="post__commentBox">
                        <input type="text" className="post__input" 
                            placeholder="Add comment..." value={comment} 
                            onChange={e => setComment(e.target.value)} />
                        
                        <button type="submit" className="post__button"
                            disabled={!comment}
                            onClick={postComment} >Comment</button>
                        
                    </form>
                )
            }
        </div>
    )
}

export default Post