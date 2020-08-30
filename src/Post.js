import React from 'react';
import './Post.css';
import Avatar from "@material-ui/core/Avatar";

function Post({ username, caption, imageUrl }) {
    return (
        <div className="post">
            <div className="post__header">
            <Avatar
            className="post__avatar"
            alt='Nupoorraj'
            src="/static/images/avatar/1.jpg"
            />
            <h3>{username}</h3>
            {/*header -> avatar +username */}
            </div>

            <img className="post__image" src={imageUrl} alt=""/>
            {/*image */}

            <h4 className="post__text"><strong>{username}</strong> {caption}!</h4>
            {/* username + caption */}
        </div>
    )
}

export default Post