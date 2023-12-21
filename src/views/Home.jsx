import {Link} from "react-router-dom";
import Comment from "./Comment";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {
    addDoc,
    collection, doc, getDoc,
    onSnapshot,
    orderBy,
    query,
    serverTimestamp, updateDoc,
} from "firebase/firestore";
import {auth, db} from "../firebase.js";
import {setPost} from "../features/post/postSlice.js";
import {toast} from "react-toastify";

function Home() {
    const dispatch = useDispatch();
    const posts = useSelector((state) => state.post.listPost);
    const user = useSelector((state) => state.auth.user);
    const [postStatus, setPostStatus] = useState("");
    const postsRef = collection(db, "posts");

    useEffect(() => {
        const queryMessages = query(postsRef, orderBy("createdAt", "desc"));
        const unsuscribe = onSnapshot(queryMessages, (snapshot) => {
            let posts = [];
            snapshot.forEach((doc) => {
                posts.push({...doc.data(), id: doc.id});
            });

            dispatch(setPost(posts));
        });

        return () => unsuscribe();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (postStatus === "") {
            const notify = () => toast("isi statusmu terlebih dahulu");
            notify()
        } else {
            await addDoc(postsRef, {
                text: postStatus,
                createdAt: serverTimestamp(),
                displayName: auth.currentUser.displayName,
                photoURL: auth.currentUser.photoURL,
                comments: [],
                likes: [],
            });

            setPostStatus("");
        }

    };


    const handleLike = async (id, likes) => {
        event.preventDefault();

        let postDB = doc(db, "posts", id)
        let dataDB = (await getDoc(postDB)).data()
        let dataLikes = dataDB.likes

        let isLike = (likes.includes(auth.currentUser.uid)) ? false : true
        if (isLike) {
            dataLikes.push(auth.currentUser.uid)
        } else {
            dataLikes = dataLikes.filter(item => auth.currentUser.uid !== item)
        }

        await updateDoc(doc(db, "posts", id), {"likes": dataLikes});
    };
    return (
        <div>
            <div className="flex flex-col items-center">
                <form
                    className="max-w-lg mx-auto p-6 bg-white border rounded-lg shadow w-full mb-5"
                >
                    <div className="mb-4">
            <textarea
                name={postStatus}
                value={postStatus}
                onChange={(event) => setPostStatus(event.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="description"
                rows={5}
                placeholder="Apa yang anda pikirkan?"
                defaultValue={""}
                required
            />
                    </div>
                    <button
                        className="bg-blue-600 text-white hover:bg-blue-700 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        onClick={handleSubmit}
                    >
                        Posting
                    </button>
                </form>

                {posts.map((post, index) => (
                    <div
                        key={index}
                        className="flex flex-col max-w-lg p-6 space-y-6 overflow-hidden rounded-lg shadow-md dark:bg-gray-900 dark:text-gray-100 w-full"
                    >
                        <div className="flex space-x-4">
                            <img
                                alt=""
                                src={post.photoURL}
                                className="object-cover w-12 h-12 rounded-full shadow dark:bg-gray-500"
                            />
                            <div className="flex flex-col space-y-1">
                                <span rel="noopener noreferrer" className="font-semibold">
                                    {post.displayName}
                                </span>
                                <span
                                    className="text-xs dark:text-gray-400">{(post.createdAt) && post.createdAt.toDate().toDateString()}</span>
                            </div>
                        </div>
                        <div>
                            <p className="text-sm dark:text-gray-400">{post.text}</p>
                        </div>
                        <div className="flex flex-wrap justify-between w-full">
                            <div className="flex space-x-2 text-sm dark:text-gray-400">
                                <button
                                    onClick={() => handleLike(post.id, post.likes)}
                                    type="button"
                                    className="flex items-center p-1 space-x-1.5"
                                >

                                    {
                                        (post.likes.includes(auth.currentUser.uid)) ? (
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                                                     fill="currentColor" data-slot="icon" className="w-6 h-6">
                                                    <path
                                                        d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z"/>
                                                </svg>
                                            ) :
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth={1.5}
                                                stroke="currentColor"
                                                className="w-6 h-6"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                                                />
                                            </svg>
                                    }


                                    <span>{post.likes.length}</span>
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
                                        className="w-6 h-6"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z"
                                        />
                                    </svg>

                                    <span>{post.comments.length}</span>
                                </button>

                            </div>

                            <Comment id={post.id} comments={post.comments}/>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Home;
