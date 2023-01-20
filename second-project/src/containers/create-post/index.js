
// For creating a post we are using create-post
import React, { useContext, useState } from 'react'
import "./style.css";
import SignInBtn from '../../components/signin-btn'
import { UserContext } from '../../contexts/user';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import { db, storage } from '../../firebase';
import makeid from '../../components/helper/functions';
import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';

export default function CreatePost() {
    // For user authentication purpose
    const [user, setUser] = useContext(UserContext).user
    //For caption purpose
    const [caption, setCaption] = useState("");
    // For image purpose
    const [image, setImage] = useState(null);

    // To Show the progress of uploading image
    const [progress, setProgress] = useState(0);


    const handleChange = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0]);

            var selectedImageSrc = URL.createObjectURL(e.target.files[0]);
            var imagePreview = document.getElementById("image-preview");
            imagePreview.src = selectedImageSrc;
            imagePreview.style.display = "block";
        }
    };
    const handleUpload = () => {
        if (image) {
            var imageName = makeid(10);
            const uploadTask = storage.ref(` ${image.name}.jpg`).put(image);

            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    // progress function .....
                    const progress = Math.round(
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                    );
                    setProgress(progress);
                },
                (error) => {
                    // Error function...
                    console.log(error);
                    alert(error.message);
                },
                () => {
                    // upload complete function
                    storage
                        .ref("images")
                        .child(`${imageName}.jpg`)
                        .getDownloadURL()
                        .then((imageUrl) => {
                            db.collection("posts").add({
                                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                                caption: caption,
                                photoUrl: imageUrl,
                                username: user.email.replace("@gmail.com", ""),
                                profileUrl: user.photoURL
                            });
                        });
//To clear all data in Create post after uploading is completed we using followin 4 lines.
                    setCaption("");
                    setProgress(0);
                    setImage(null);
                    document.getElementById("image-preview").style.display="none";
                }

            )
        }
    };

    return (
        <div className="createPost">
            {user ? (
                <div className="createPost_loggedIn">
                    <p>Create Post</p>
                    <div className="createPost_loggedInCenter">
                        <textarea className="createpost_textarea"
                            rows="3"
                            placeholder='Write caption here...' value={caption}
                            onChange={(e) => setCaption(e.target.value)}></textarea>
                        <div className="createPost_imagePreview">
                            <img id="image-preview" alt=""
                            />
                        </div>
                    </div>
                    <div className="createPost_loggedInBottom">
                        <div className="createPost_imageUpload">
                            <label htmlFor='fileInput'>
                                <AddAPhotoIcon style={{ cursor: "pointer", fontSize: "20px" }} />
                            </label>
                            <input id="fileInput" type="file" accept='image/*' onChange={handleChange} />
                        </div>
                        <button className="createPost_uploadBtn"
                            onClick={handleUpload}
                            style={{ color: caption ? "#000" : "lightgray" }}
                        >
                            {`Upload ${progress !== 0 ? progress : ""}`}
                        </button>
                    </div>
                </div>


            ) : (
                <div>
                    <SignInBtn />
                    <p style={{ marginLeft: "12px" }}>to Post & Comment</p>
                </div>
            )}
        </div>


    )



}