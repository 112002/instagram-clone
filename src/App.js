import React, { useState, useEffect } from 'react';
import './App.css';
import Post from './Post';
import { db, auth } from './firebase';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { Button, Input } from '@material-ui/core';
import ImageUpload from './ImageUpload';

function getModalStyle() {
    const top = 50;
    const left = 50;

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -$(left)%)`,
    };
}

const useStyles = makeStyles((theme) => ({
    paper: {
        position: `absolute`,
        width: 400,
        background: theme.palette.background.paper,
        border: `2px solid #000`,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));


function App() {
    const classes = useStyles();
    const [modalStyle] = useState(getModalStyle);
    const [posts, setPosts] = useState([]);
    const [open, setOpen] = useState(false);
    const [openSignIn, setOpenSignIn] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((authUser) => {
            if(authUser) {
                //user has logged in
                console.log(authUser);
                setUser(authUser);
            } else {
                //user has logged out
                setUser(null);
            }
        })

        
        return() => {
            //perform some cleanup actions
            unsubscribe();
        }
    }, [user, username]);

    //useEffect runs a piece of code on a specific condition

    useEffect(() => {
        //this is where the cde runs
        db.collection('posts').onSnapshot(snapshot => {
        //every time a new post is added, this code first takes the snapshot
        setPosts(snapshot.docs.map(doc => ({
            id: doc.id,
            post: doc.data()
        })));
    })
    }, []);

    const signUp = (event) => {
        event.preventDefault();

        auth
        .createUserWithEmailAndPassword(email, password)
        .then((authUser) => {
            return authUser.user.updateProfile({
                displayName: username
            })
        })
        .catch((error) => alert(error.message));
        
        setOpen(false);
    }

    const signIn = (event) => {
        event.preventDefault();
        
        auth
            .signInWithEmailAndPassword(email, password)
            .catch((error) => alert(error.message))

        setOpenSignIn(false);
    }
    
    return (
        <div className="app">
            
            {user?.displayName ? (
                <ImageUpload username={user.displayName} />
            ): (
                <h3>Sorry you need to login to upload.</h3>
            )}

            <Modal
            open={open}
            onClose={() => setOpen(false)}
        >
            <div style={modalStyle} className={classes.paper}>
            <form className="app__signup">
            <center>
                <img
                className="app__headerImage"
                src="https://www.instagram.com/static/images/web/mobile_nav_type_logo-2x.png/1b47f9d0e595.png"
                alt=""
                />
                </center>
                <Input
                placeholder="username"
                typr="text"
                value={username}
                onchange={(e) => setUsername(e.target.value)}
                />
                <Input
                placeholder="email"
                typr="text"
                value={email}
                onchange={(e) => setEmail(e.target.value)}
                />
                <Input
                placeholder="password"
                typr="password"
                value={password}
                onchange={(e) => setPassword(e.target.value)}
                />
                <Button type="submit" onclick={signUp}>Sign Up</Button>
            </form>
                </div>
            </Modal>

            <Modal
            open={openSignIn}
            onClose={() => setOpenSignIn(false)}
            >
            <div style={modalStyle} className={classes.paper}>
            <form className="app__signup">
            <center>
                <img
                className="app__headerImage"
                src="https://www.instagram.com/static/images/web/mobile_nav_type_logo-2x.png/1b47f9d0e595.png"
                alt=""
                />
                </center>
                <Input
                placeholder="email"
                typr="text"
                value={email}
                onchange={(e) => setEmail(e.target.value)}
                />
                <Input
                placeholder="password"
                typr="password"
                value={password}
                onchange={(e) => setPassword(e.target.value)}
                />
                <Button type="submit" onclick={signIn}>Sign In</Button>
            </form>

                </div>
            </Modal>

            
            
            {/*Header */}
            <h1>Hello Nupoor Raj!</h1>
            <div className="app__header">
                <img
                className="app__headerImage"
                src="https://www.instagram.com/static/images/web/mobile_nav_type_logo-2x.png/1b47f9d0e595.png"
                alt=""
                />
            </div>
            {user ? (
                <Button onClick={() => auth.signOut()}>Logout</Button>
            ): (
                <div className="app__loginContainer">
                    <Button onClick={() => setOpen(true)}>Sign In</Button>
                    <Button onClick={() => setOpen(true)}>Sign Up</Button> 
                </div>    
            )}

            {
                posts.map(({id, post}) => (
                    <Post key={id} username={post.username} caption={post.caption} imageUrl={post.imageUrl} />
                 ) )
            }

            
            {/* Posts */}
            {/* Posts */}
        </div>
    );
}

export default App;