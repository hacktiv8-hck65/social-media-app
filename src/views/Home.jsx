import {Link} from "react-router-dom";
import Comment from "./Comment";
import AddPost from "./AddPost";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {addDoc, collection, onSnapshot, orderBy, query, serverTimestamp} from "firebase/firestore";
import {auth, db} from "../firebase.js";
import {setPost} from "../features/post/postSlice.js";


function Home() {
  const dispatch = useDispatch()
  const posts = useSelector((state) => state.post.listPost)
  const user = useSelector((state) => state.auth.user)
  const [newMessage, setNewMessage] = useState("");
  const postsRef = collection(db, "posts");

  useEffect(() => {
    const queryMessages = query(
        postsRef,
        orderBy("createdAt", 'desc')
    );
    const unsuscribe = onSnapshot(queryMessages, (snapshot) => {
      let posts = [];
      snapshot.forEach((doc) => {
        posts.push({ ...doc.data(), id: doc.id });
      });

      dispatch(setPost(posts))
    });

    return () => unsuscribe();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (newMessage === "") return;
    await addDoc(postsRef, {
      text: newMessage,
      createdAt: serverTimestamp(),
      displayName: auth.currentUser.displayName,
      photoURL: auth.currentUser.photoURL,
    });

    setNewMessage("");
  };

  console.log(posts)

  return (
    <div>
      <div className="flex flex-col items-center">
        <div className="flex flex-col max-w-lg p-6 space-y-6 overflow-hidden rounded-lg shadow-md dark:bg-gray-900 dark:text-gray-100">
          <div className="flex space-x-4">
            <img
              alt=""
              src="https://source.unsplash.com/100x100/?portrait"
              className="object-cover w-12 h-12 rounded-full shadow dark:bg-gray-500"
            />
            <div className="flex flex-col space-y-1">
              <a rel="noopener noreferrer" href="#" className="font-semibold">
                Leroy Jenkins
              </a>
              <span className="text-xs dark:text-gray-400">4 hours ago</span>
            </div>
          </div>
          <div>
            <h2 className="mb-1 text-xl font-semibold">
              Nam cu platonem posidonium sanctus debitis te
            </h2>
            <p className="text-sm dark:text-gray-400">
              Eu qualisque aliquando mel, id lorem detraxit nec, ad elit minimum
              pri. Illum ipsum detracto ne cum. Mundi nemore te ius, vim ad
              illud atqui apeirian...
            </p>
          </div>
          <div className="flex flex-wrap justify-between">
            <div className="flex space-x-2 text-sm dark:text-gray-400">
              <button
                type="button"
                className="flex items-center p-1 space-x-1.5"
              >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    dataSlot="icon"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z"
                    />
                  </svg>
    const dispatch = useDispatch()
    const posts = useSelector((state) => state.post.listPost)
    const user = useSelector((state) => state.auth.user)
    const [newMessage, setNewMessage] = useState("");
    const postsRef = collection(db, "posts");

    useEffect(() => {
        const queryMessages = query(
            postsRef,
            orderBy("createdAt", 'desc')
        );
        const unsuscribe = onSnapshot(queryMessages, (snapshot) => {
            let posts = [];
            snapshot.forEach((doc) => {
                posts.push({ ...doc.data(), id: doc.id });
            });

            dispatch(setPost(posts))
        });

        return () => unsuscribe();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (newMessage === "") return;
        await addDoc(postsRef, {
            text: newMessage,
            createdAt: serverTimestamp(),
            displayName: auth.currentUser.displayName,
            photoURL: auth.currentUser.photoURL,
        });

        setNewMessage("");
    };

    console.log(posts)
    return (
        <div>
            <div className="flex flex-col items-center">

                {posts.map((post) => (
                    <div
                        className="flex flex-col max-w-lg p-6 space-y-6 overflow-hidden rounded-lg shadow-md dark:bg-gray-900 dark:text-gray-100">
                        <div className="flex space-x-4">
                            <img
                                alt=""
                                src="https://source.unsplash.com/100x100/?portrait"
                                className="object-cover w-12 h-12 rounded-full shadow dark:bg-gray-500"
                            />
                            <div className="flex flex-col space-y-1">
                                <a rel="noopener noreferrer" href="#" className="font-semibold">
                                    Leroy Jenkins
                                </a>
                                <span className="text-xs dark:text-gray-400">4 hours ago</span>
                            </div>
                        </div>
                        <div>
                            <p className="text-sm dark:text-gray-400">
                                {post.text}
                            </p>
                        </div>
                        <div className="flex flex-wrap justify-between">
                            <div className="flex space-x-2 text-sm dark:text-gray-400">
                                <button
                                    type="button"
                                    className="flex items-center p-1 space-x-1.5"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        dataSlot="icon"
                                        className="w-6 h-6"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z"
                                        />
                                    </svg>

                                    <span>0</span>
                                </button>
                                <button
                                    type="button"
                                    className="flex items-center p-1 space-x-1.5"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        dataSlot="icon"
                                        className="w-6 h-6"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                                        />
                                    </svg>

                                    <span>0</span>
                                </button>
                            </div>

                            <Comment/>
                        </div>
                    </div>

                ))}



            </div>
        </div>
    );
}

export default Home;
