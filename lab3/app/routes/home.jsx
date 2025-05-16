import { useState } from "react";
import { useBooks } from "../BooksContext";
import { useAuth } from "../AuthContext";

export default function HomePage() {
    const { books, editBook, deleteBook } = useBooks();
    const { user } = useAuth();
    const [search, setSearch] = useState("");
    const [editingId, setEditingId] = useState(null);
    const [editedTitle, setEditedTitle] = useState("");
    const [editedAuthor, setEditedAuthor] = useState("");
    const [showOnlyMine, setShowOnlyMine] = useState(false); // toggle

    const filteredBooks = books.filter((book) => {
        const matchesSearch = book.title.toLowerCase().includes(search.toLowerCase());
        const isMine = !showOnlyMine || (user && book.ownerId === user.uid);
        return matchesSearch && isMine;
    });

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

            {user && (
                <button onClick={() => setShowOnlyMine((prev) => !prev)}>
                    {showOnlyMine ? "Pokaz wszystkie" : "Pokaz MOJE"}
                </button>
            )}

            {!user && (
                <p style={{ color: "gray" }}>
                    Musisz się zalogować, aby zobaczyć i dodać książki.
                </p>
            )}

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
                                <button onClick={() => handleSave(book.id)}>Zapisz</button>
                            </>
                        ) : (
                            <>
                                {book.title} - {book.author}
                                {user && user.uid === book.ownerId && (
                                    <>
                                        <button onClick={() => handleEdit(book)}>Edytuj</button>
                                        <button onClick={() => deleteBook(book.id)}>Usuń</button>
                                    </>
                                )}
                            </>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}
