import React, {useState} from "react"
import { Button, Input } from "@material-ui/core"
import firebase from "firebase"
import {db, storage} from "../firebase"
import "./ImageUpload.css"

// function ImageUpload() = () => {}

const ImageUpload = ({username}) => {
    const [progress , setProgress] = useState(0);
    const [caption, setCaption] = useState('');
    const [image, setImage] = useState(null);

    const handleCaptionInput = (event) => {
        setCaption(event.target.value)
    }

    const handleFileInput = (event) => {
        if(event.target.files[0]) {
            setImage(event.target.files[0])
        }
    }

    {/* 
      * Store in FIREBASE 
      */}
    const handlePostSubmit = (event) => {
        const uploadTask = storage.ref(`images/${image.name}`).put(image)

        uploadTask.on(
            "state_changed", 
            
            // progress logic here...
            (snapshot) => {
                const progressPercent = Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 100
                setProgress(progressPercent)
            },
            
            // error logic here...
            (error) => {
                console.log(error);
                alert(error.message)
            },

            // On complete function here...
            () => {
                storage
                    .ref("images")
                    .child(image.name)  // save in storage by this name
                    .getDownloadURL()   // fetch download link
                    .then(url => {
                        // Post image in DB..
                        db.collection("posts").add({
                            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                            caption: caption, 
                            imageUrl: url,
                            username:username
                        })   
                    })
                setProgress(0)
                setCaption("")
                setImage(null)
            } 
        )
    }

    return (
        <div className="imageUpload"> 
            {/* File progress */}
            <progress value={progress} max="100" />

            {/* Caption input */}
            <Input type="text" placeholder="Caption.." onChange={handleCaptionInput}  />

            <Input type="file" onChange={handleFileInput} />

            {/* Submit button */}
            <Button onClick={handlePostSubmit}>Post</Button>
            </div>
    )
}

export default ImageUpload
