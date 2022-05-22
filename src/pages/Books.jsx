// https://www.youtube.com/watch?v=9keBDA_FLzs
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import React, { useState } from "react";
import { db } from "../firebase-config";
function Books() {
  const [books, setBooks] = useState({
    author: "",
    title: "",
  });
  const onChange = (e) => {
    setBooks((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };
  const saveBooks = async (e) => {
    try {
      e.preventDefault();
      const bookData = { ...books };
      bookData.timestamp = serverTimestamp;
      await addDoc(collection(db, "books"), books);
      toast.success("Successfully Save book");
      console.log(bookData);
    } catch (error) {
      toast.error("Could not save book");
    }
    // e.preventDefault();
    // const bookData = { ...books };
    // bookData.timestamp = serverTimestamp;
    // await addDoc(collection(db, "books"), books);
    // console.log(bookData);
  };
  return (
    <div>
      <h1>Books</h1>
      <form onSubmit={saveBooks}>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          placeholder="Title"
          name="title"
          id="title"
          onChange={onChange}
        />
        <label htmlFor="author">Author:</label>
        <input
          type="text"
          placeholder="Author's name"
          name="author"
          id="author"
          onChange={onChange}
        />
        <button>Submit</button>
      </form>
    </div>
  );
}

export default Books;
