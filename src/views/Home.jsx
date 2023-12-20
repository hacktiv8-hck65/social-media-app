import { Link } from "react-router-dom";
import Comment from "./Comment";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import { auth, db } from "../firebase.js";
import { setPost } from "../features/post/postSlice.js";

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
        posts.push({ ...doc.data(), id: doc.id });
      });

      dispatch(setPost(posts));
    });

    return () => unsuscribe();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (postStatus === "") return;
    await addDoc(postsRef, {
      text: postStatus,
      createdAt: serverTimestamp(),
      displayName: auth.currentUser.displayName,
      photoURL: auth.currentUser.photoURL,
      comments: [],
    });

    setPostStatus("");
  };

  console.log(posts);
  return (
    <div>
      <div className="flex flex-col items-center">
        <form
          className="max-w-lg mx-auto p-6 bg-white border rounded-lg shadow-lg w-full"
          onSubmit={handleSubmit}
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
            />
          </div>
          <button
            className="bg-blue-500 hover:bg-blue-700 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Submit
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
                <a rel="noopener noreferrer" href="#" className="font-semibold">
                  {post.displayName}
                </a>
                <span className="text-xs dark:text-gray-400">4 hours ago</span>
              </div>
            </div>
            <div>
              <p className="text-sm dark:text-gray-400">{post.text}</p>
            </div>
            <div className="flex flex-wrap justify-between w-full">
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
