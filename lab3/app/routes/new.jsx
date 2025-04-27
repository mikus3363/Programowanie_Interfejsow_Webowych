
import { useState } from "react";
import { useBooks } from "../BooksContext";
import { useNavigate } from "react-router-dom";

export default function NewPage() {
    const { addBook } = useBooks();
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        addBook(title, author);
        navigate("/");
    };

    return (
        <div>
            <h1>Add New Book</h1>
            <form onSubmit={handleSubmit}>
                <input
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
                <input
                    placeholder="Author"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    required
                />
                <button type="submit">Add</button>
            </form>
        </div>
    );
}
