import React from 'react'
import './Post.css'
import Avatar from "@material-ui/core/Avatar"

function Post() {
    return (
        <div className="post">
            {/* header -> Avatar + username */}
            <div className="post__header">
                <Avatar className="post__avatar" alt='asdfg'
                        src="/static/images/avatar/1.jpg" />
                <h3>Username</h3>
            </div>

            {/* image */}
            <img className="post__image" src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/320px-React-icon.svg.png" />

            {/* username + caption */}
            <h4 className="post__text"><strong>nik_kshirsagar</strong> Some caption here😊</h4>
            
        </div>
    )
}

export default Post