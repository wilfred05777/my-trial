import React from "react";
import { db } from "../firebase-config";
import {
  addDoc,
  collection,
  getDocs,
  query,
  where,
  onSnapshot,
  setDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

function Homepage() {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
  });
  const [books, setBooks] = useState([]);

  const { title, author } = formData;
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  useEffect(() => {
    const q = query(collection(db, "books"));
    // let books = [];
    onSnapshot(q, (querySnapshot) => {
      setBooks(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    // https://firebase.google.com/docs/firestore/manage-data/add-data
    // addDoc

    // const docRef = await addDoc(collection(db, "books"), {
    //   name: "Tokyo",
    //   country: "Japan",
    // });
    // console.log("Document written with ID: ", docRef.id);

    try {
      const formDataCopy = { ...formData };
      formDataCopy.timestamp = serverTimestamp();

      await addDoc(collection(db, "books"), formData);
      console.log("save books");
      // toast.success("Successfully save book");
    } catch (error) {
      // toast.error("unenable to save the books");
      console.log("could not be save");
    }

    // const formDataCopy = { ...formData };
    // formDataCopy.timestamp = serverTimestamp();
    // await setDoc(doc(db, "books"), formDataCopy);
    // try {
    //   await addDoc(collection(db, "books"), {
    //     title: title,
    //     author: author,
    //   });
    //   // onclose();
    // } catch (error) {
    //   toast.error("Unable to save books");
    //   console.log(error);
    // }
  };
  return (
    <div>
      <h2>Homepage Firebase 9</h2>
      <form className="add" onSubmit={onSubmit}>
        <label htmlFor="title">Title:</label>
        <input type="text" id="title" name="title" onChange={onChange} />
        <br />
        <label htmlFor="author">Author:</label>
        <input type="text" id="author" name="author" onChange={onChange} />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Homepage;
