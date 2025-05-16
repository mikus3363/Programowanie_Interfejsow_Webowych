
import { useState } from "react";
import { useBooks } from "../BooksContext";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";

export default function NewPage() {
    const { addBook } = useBooks();
    const { user } = useAuth();
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const navigate = useNavigate();

    if (!user) {
        return <p style={{ color: "gray" }}>Musisz być zalogowany, aby dodać książkę.</p>;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        await addBook(title, author);
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
