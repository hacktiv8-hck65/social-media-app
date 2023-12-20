import {useEffect, useState} from "react";
import {db, auth} from '../firebase';
import {
    collection,
    addDoc,
    where,
    serverTimestamp,
    onSnapshot,
    query,
    orderBy,
} from "firebase/firestore";
import {useDispatch, useSelector} from "react-redux";
import {setPost} from "../features/post/postSlice.js";

function Home() {
    const dispatch = useDispatch()
    const posts = useSelector((state) => state.post.listPost)
    const [newMessage, setNewMessage] = useState("");
    const messagesRef = collection(db, "messages");

    useEffect(() => {
        const queryMessages = query(
            messagesRef,
            orderBy("createdAt")
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
        await addDoc(messagesRef, {
            text: newMessage,
            createdAt: serverTimestamp(),
            user: auth.currentUser.displayName,
        });

        setNewMessage("");
    };

    return (
        <div className="chat-app">
            <div className="header">
            </div>
            <div className="messages">
                {posts.map((post) => (
                    <div key={post.id} className="message">
                        <span className="user">{post.user}:</span> {post.text}
                    </div>
                ))}
            </div>
            <form onSubmit={handleSubmit} className="new-message-form">
                <input
                    type="text"
                    value={newMessage}
                    onChange={(event) => setNewMessage(event.target.value)}
                    className="new-message-input"
                    placeholder="Type your message here..."
                />
                <button type="submit" className="send-button">
                    Send
                </button>
            </form>
        </div>
    );
}

export default Home;
