import "./App.css";
import Post from "./Post";
import { useEffect, useState } from "react";
import { auth, db } from "./firebase";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { Input } from "@mui/material";
import ImageUpload from "./ImageUpload";
function App() {
  const [posts, setPosts] = useState([
    // {
    //   username: "Shubham_1611",
    //   caption: "let's make something special",
    //   imageUrl: "https://www.linkpicture.com/q/shubham_1.jpg",
    // },
    // {
    //   username: "Born Fire",
    //   caption: "enjoying the time",
    //   imageUrl: "https://i.postimg.cc/DwrW0GQ5/group.jpg",
    // },
    // {
    //   username: "Tomb Rider",
    //   caption: "It's just a movie name",
    //   imageUrl: "https://i.postimg.cc/HntyK7S6/school.jpg",
    // },
  ]);
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [openSignIn, setOpenSignIn] = useState(false);
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        //user logged in
        console.log(authUser);
        setUser(authUser);
      } else {
        //user logged out
        setUser(null);
      }
    });
    return () => {
      unsubscribe();
    };
  }, [user, username]);
  useEffect(() => {
    db.collection("posts").onSnapshot((snapshot) => {
      setPosts(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          post: doc.data(),
        }))
      );
    });
  }, []);
  // REMOVED THE POST FROM HERE
  //in array we specify when to run the useEffect like here whw=enever posts will change our useeffect will change otherwise it will not going to change, if we don't specify array then our useEffect will run every time

  //posts=[{id:doc.id, post:doc.data()},{id:doc.id, post:doc.data()},{id:doc.id, post:doc.data()}...] this is how data is storing in our posts where in id we will get the id returned by the firebase and in post we have further another object which holds, username, caption and imageUrl which we can acces using dot method
  const signUp = (event) => {
    event.preventDefault();
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        return authUser.user.updateProfile({
          displayName: username,
        });
      })
      .catch((error) => alert(error.message));
    setOpen(false);
  };
  const signIn = (event) => {
    event.preventDefault();
    auth
      .signInWithEmailAndPassword(email, password)
      .catch((error) => alert(error.message));
    setOpenSignIn(false);
  };

  return (
    <div className="app">
      {/* Now I want to do the following */}
      {/* Caption  */}
      {/* file picker */}
      {/* post button */}
      {user?.displayName ? (
        <ImageUpload username={user.displayName} />
      ) : (
        <h3>Sorry You have to login to upload</h3>
      )}

      <Modal open={open} onClose={() => setOpen(false)}>
        <div className="modal">
          <form className="app__singUp">
            <center>
              <img
                className="app_headerImage"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/1200px-Instagram_logo.svg.png?20160616034027"
                alt="instragram logo"
              />
            </center>
            <Input
              placeholder="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Input
              placeholder="email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              placeholder="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button type="submit" onClick={signUp}>
              Sign Up
            </Button>
          </form>
        </div>
      </Modal>

      <Modal open={openSignIn} onClose={() => setOpenSignIn(false)}>
        <div className="modal">
          <form className="app__singUp">
            <center>
              <img
                className="app_headerImage"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/1200px-Instagram_logo.svg.png?20160616034027"
                alt="instragram logo"
              />
            </center>

            <Input
              placeholder="email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              placeholder="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button type="submit" onClick={signIn}>
              Sign In
            </Button>
          </form>
        </div>
      </Modal>

      <div className="app__header">
        <img
          className="app_headerImage"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/1200px-Instagram_logo.svg.png?20160616034027"
          alt="instragram logo"
          // style={{ width: "110px" }}
        />
      </div>
      {user ? (
        <Button onClick={() => auth.signOut()}>Logout</Button>
      ) : (
        <div className="app__loginContainer">
          <Button onClick={() => setOpenSignIn(true)}>Sign In</Button>
          <Button onClick={() => setOpen(true)}>Sign Up</Button>
        </div>
      )}
      {/* <Button onClick={() => setOpen(true)}>Sign Up</Button> */}

      {posts.map(({ id, post }) => (
        <Post
          key={id}
          username={post.username}
          caption={post.caption}
          imageUrl={post.imageUrl}
        />
      ))}
      {/* here since I am going to use map functuon which is a javascript method and I am using JSX so I have to use the curly bractes and then put the method inside it  */}
      {/* ONE IMPORTANT THING I MUST KEEP IN MIND THAT WHENEVER THERE IS SOME RETURN I AM GOING TO USE THE ROUND BRACKETS, because If I write curly brackets again inside the curly bractes then the compiler will get confused so we are using the round brackets*/}
      {/* post  */}
    </div>
  );
}

export default App;
