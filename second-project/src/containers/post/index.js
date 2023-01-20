import React, { useContext } from "react";
import "./style.css";
import { Comment } from "../../components";
import { db, storage } from "../../firebase";
import CommentInput from "../../components/comment-input"
import { UserContext } from "../../contexts/user";
export default function Post({ profileUrl, username, id, photoURl, caption, comments }) {

const [user , setUser]=useContext(UserContext).user;

    const deletePost = () => {
        // Delete the image from DB
        var imageRef = storage.refFromURL(photoURl);

        imageRef.delete().then(function () {
            console.log("deleted successfully");

        }).catch(function (error) {
            console.log(`Error ${error}`);
        });
        //Delete the post information from DB.
        db.collection("posts").doc(id).delete().then(function () {
            console.log(`post info deleted successfully`)
        })

    }



    return (
        <div className="post">
            <div className="post_header">
                <div className="post_headerleft">
                    <img className="post_profilePic" src={profileUrl} />
                    <p style={{ marginLeft: "6px" }}>{username}</p>
                </div>
                <button onClick={deletePost} className="post_delete">Delete</button>
            </div>
            <div className="post_center">
                <img className="post_photoUrl" src={photoURl} />
            </div>
            <div>
                <p>
                    <span style={{ fontWeight: "500", marginRight: "8px" }}>{username}</span>{caption}
                </p>
            </div>
            {comments ? comments.map((comment) =>
                <Comment username={comment.username} caption={comment.comment} />
            ) : <></>}
{user ?<CommentInput comments={comments} id={id} />: <></>}

        </div>


    );


}