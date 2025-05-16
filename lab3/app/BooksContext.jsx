import { createContext, useContext, useEffect, useState } from "react";
import { db } from "./firebase";
import {collection, addDoc, onSnapshot, deleteDoc, updateDoc, doc, query, orderBy} from "firebase/firestore";
import { useAuth } from "./AuthContext";

const BooksContext = createContext();

export function BooksProvider({ children }) {
    const [books, setBooks] = useState([]);
    const { user } = useAuth();

    useEffect(() => {
        const q = query(collection(db, "books"), orderBy("title"));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const data = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setBooks(data);
        });
        return () => unsubscribe();
    }, []);

    const addBook = async (title, author) => {
        if (!user) {
            console.warn("Uzytkownik niezalogowany - ksiazka nie zostanie zapisana!");
            return;
        }

        const newBook = {
            title,
            author,
            ownerId: user.uid,
        };

        console.log("Zapisuje ksiazke do Firestore:", newBook);

        await addDoc(collection(db, "books"), newBook);
    };

    const editBook = async (id, updatedBook) => {
        const ref = doc(db, "books", id);
        await updateDoc(ref, updatedBook);
    };

    const deleteBook = async (id) => {
        const ref = doc(db, "books", id);
        await deleteDoc(ref);
    };

    return (
        <BooksContext.Provider value={{ books, addBook, editBook, deleteBook }}>
            {children}
        </BooksContext.Provider>
    );
}

export const useBooks = () => useContext(BooksContext);
