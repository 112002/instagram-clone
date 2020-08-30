/**import React, { useState }from 'react'
import { Button } from "@material-ui/core";
import { storage, db } from "./firebase";

function ImageUpload({username}) {
    const [image, setImage] = useState(null);
    const [progress, setProgress] = useState(0);
    const [caption, setCaption] = useState('');

    const handleChange = (e) => {
        if (e.target.file[0]) {
            setImage(e.target.file[0]);
        }
    };

    const handleUpload = () => {
        const uploadTask = storage.ref(`images/${image.name}`).put(image);
        uploadTask.on(
            "state-changed",
            (snapshot) => {
                //progress function....
                const progress = Math.round(
                    (snapshot.bytestTransferred / snapshot.totalBytes) * 100
                );
                setProgress(progress);
            },
            (error) => {
                //error function..
                console.log(error);
                alert(error.message);
            },
            () => {
                //complete function...
                storage
                .ref("images")
                .child(image.name)
                .getDownloadURL()
                .then(url => {
                    //post image inside database(db)
                    db.collection("posts").add({
                        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                        caption: caption,
                        imageUrl: url,
                        username: username
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
            <input type="text" placeholder='Enter a caption..' onChange={event => setCaption(event.target.value)} value={caption}/>
            <input type="file" onChange={handleChange} />
            <Button onClick={handleUpload}> 
            Upload 
            </Button>
        </div>
    )
}

export default ImageUpload**/