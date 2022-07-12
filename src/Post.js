import React from "react";
import "./Post.css";
import Avatar from "@mui/material/Avatar";
function Post({ imageUrl, username, caption }) {
  return (
    <div className="post">
      {/* inside post we want three sections 1)for username header which will contain avatart and their name  2) for images 3) to see the usename and their captions*/}

      <div className="post__header">
        <Avatar
          className="post__avatar"
          alt="shubham"
          src="https://www.linkpicture.com/q/shubham_1.jpg"
        />
        <h3>{username}</h3>
      </div>

      {/* header -> avatar + username */}
      <img className="post__image" src={imageUrl} alt="" />
      {/* image*/}
      <h4 className="post__text">
        <strong>{username}</strong> {caption}
      </h4>
      {/* usrename+caption*/}
    </div>
  );
}

export default Post;
