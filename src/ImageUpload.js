import { Button } from "@mui/material";
import { useState } from "react";
import React from "react";
import firebase from "firebase/compat/app";
import { db, storage } from "./firebase";

// import "firebase/compat/auth";
// import "firebase/compat/firestore";
// import "firebase/compat/storage";

function ImageUpload({ username }) {
  const [caption, setCaption] = useState(" ");
  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState(0);
  const handleChange = (e) => {
    if (e.target.files[0]) {
      //we are making files[0] like this because if we choose multiple files then whatever the first file we have choosed that will be uploaded
      setImage(e.target.files[0]);
    }
  };
  const handleUpload = () => {
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    //here what will happen is we are calling storage.ref which is firebase methods and there we are making a folder with name images and inside that images folder we are putting the image's name which we have selected through file picker and then we are going to put that image inside storage
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        //progress function...
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (error) => {
        //Error function
        console.log(error);
        alert(error.message);
      },
      () => {
        //Complete function
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            //post images inside database
            db.collection("posts").add({
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              caption: caption,
              imageUrl: url,
              username: username,
            });
            setProgress(0);
            setCaption("");
            setImage(null);
          });
      }
    );
  };
  return (
    <div>
      <progress value={progress} max="100" />
      <input
        type="text"
        placeholder="Enter a caption"
        onChange={(event) => {
          setCaption(event.target.value);
        }}
        value={caption}
      />
      <input type="file" onChange={handleChange} />
      <Button onClick={handleUpload}>Upload</Button>
    </div>
  );
}

export default ImageUpload;
