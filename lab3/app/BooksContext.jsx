
import { createContext, useContext, useState } from "react";

const BooksContext = createContext();

export function BooksProvider({ children }) {
    const [books, setBooks] = useState([
        { id: 1, title: "Wiedzmin", author: "Andrzej Sapkowski" },
        { id: 2, title: "Hobbit", author: "J.R.R. Tolkien" },
        { id: 3, title: "Maly Ksiaze", author: "Antoine de Saint-Exupery" },
        { id: 4, title: "Krzyzacy", author: "Henryk Sienkiewicz" },
    ]);

    const addBook = (title, author) => {
        setBooks([...books, { id: Date.now(), title, author }]);
    };

    const editBook = (id, updatedBook) => {
        setBooks(books.map((book) => (book.id === id ? { ...book, ...updatedBook } : book)));
    };

    const deleteBook = (id) => {
        setBooks(books.filter((book) => book.id !== id));
    };

    return (
        <BooksContext.Provider value={{ books, addBook, editBook, deleteBook }}>
            {children}
        </BooksContext.Provider>
    );
}

export const useBooks = () => useContext(BooksContext);
