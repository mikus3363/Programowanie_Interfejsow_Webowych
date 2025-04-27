
import { useState } from "react";
import { useBooks } from "../BooksContext";

export default function HomePage() {
    const { books, editBook, deleteBook } = useBooks();
    const [search, setSearch] = useState("");
    const [editingId, setEditingId] = useState(null);
    const [editedTitle, setEditedTitle] = useState("");
    const [editedAuthor, setEditedAuthor] = useState("");

    const filteredBooks = books.filter((book) =>
        book.title.toLowerCase().includes(search.toLowerCase())
    );

    const handleEdit = (book) => {
        setEditingId(book.id);
        setEditedTitle(book.title);
        setEditedAuthor(book.author);
    };

    const handleSave = (id) => {
        editBook(id, { title: editedTitle, author: editedAuthor });
        setEditingId(null);
    };

    return (
        <div>
            <h1>Books List</h1>

            <input
                type="text"
                placeholder="Search by title..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

            <ul>
                {filteredBooks.map((book) => (
                    <li key={book.id}>
                        {editingId === book.id ? (
                            <>
                                <input
                                    value={editedTitle}
                                    onChange={(e) => setEditedTitle(e.target.value)}
                                />
                                <input
                                    value={editedAuthor}
                                    onChange={(e) => setEditedAuthor(e.target.value)}
                                />
                                <button onClick={() => handleSave(book.id)}>Save</button>
                            </>
                        ) : (
                            <>
                                {book.title} - {book.author}
                                <button onClick={() => handleEdit(book)}>Edit</button>
                                <button onClick={() => deleteBook(book.id)}>Delete</button>
                            </>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}
