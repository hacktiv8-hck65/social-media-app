import {collection, doc, getDoc, onSnapshot, orderBy, query, updateDoc} from "firebase/firestore";
import {auth, db} from "../firebase.js";
import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {setPost} from "../features/post/postSlice.js";

function Comment({id, comments}) {
    const [comment, setComment] = useState("");


    const handleSubmitComment = async (event) => {
        event.preventDefault();

        let postDB = doc(db, "posts", id)
        let dataDB = (await getDoc(postDB)).data()

        let dataComments = dataDB.comments
        dataComments.push({
            "photoURL": auth.currentUser.photoURL,
            "displayName": auth.currentUser.displayName,
            "text": comment,
        })

        await updateDoc(doc(db, "posts", id), {"comments": dataComments});
    };

    return (
        <>
            <section className="bg-white dark:bg-gray-900 py-3 lg:py-5 antialiased w-full">
                <div className="max-w-2xl mx-auto px-4">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">
                            Comment
                        </h2>
                    </div>
                    <form className="mb-6" onSubmit={handleSubmitComment}>
                        <div
                            className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                            <label htmlFor="comment" className="sr-only">
                                Your comment
                            </label>
                            <textarea
                                id="comment"
                                rows={6}
                                name={comment}
                                value={comment}
                                onChange={(event) => setComment(event.target.value)}
                                className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
                                placeholder="Write a comment..."
                                required=""
                                defaultValue={""}
                            />
                        </div>
                        <button
                            type="submit"
                            className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center bg-blue-500 rounded-lg focus:ring-4dark:focus:ring-blue-900 hover:bg-blue-600"
                        >
                            Post comment
                        </button>
                    </form>

                    <article className="p-6 text-base bg-white rounded-lg dark:bg-gray-900">
                        <footer className="flex justify-between items-center mb-2">
                            <div className="flex items-center">
                                <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold">
                                    <img
                                        className="mr-2 w-6 h-6 rounded-full"
                                        src="https://flowbite.com/docs/images/people/profile-picture-2.jpg"
                                        alt="Michael Gough"
                                    />
                                    Michael Gough
                                </p>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    <time
                                        pubdate=""
                                        dateTime="2022-02-08"
                                        title="February 8th, 2022"
                                    >
                                        Feb. 8, 2022
                                    </time>
                                </p>

                            </div>
                        </footer>
                        <p className="text-gray-500 dark:text-gray-400">
                            Very straight-to-point article. Really worth time reading.
                            Thank you! But tools are just the instruments for the UX
                            designers. The knowledge of the design tools are as
                            important as the creation of the design strategy.
                        </p>
                    </article>



                </div>
            </section>
        </>

    );
}

export default Comment;
