import { Outlet, Link } from "react-router-dom";
import { AuthProvider, useAuth } from "./AuthContext";
import { BooksProvider } from "./BooksContext";

function NavBar() {
    const { user } = useAuth(); // <-- dopiero tutaj wywołujemy

    return (
        <header style={{ padding: "10px", borderBottom: "1px solid #ccc" }}>
            <nav style={{ display: "flex", gap: "10px" }}>
                <Link to="/">Home</Link>
                <Link to="/new">Add New Book</Link>
                {!user && <Link to="/login">Login</Link>}
                {user && <Link to="/login">Profil</Link>}
                {!user && <Link to="/register">Rejestracja</Link>}
            </nav>
        </header>
    );
}

export default function Root() {
    return (
        <AuthProvider>
            <BooksProvider>
                <NavBar />
                <main style={{ padding: "20px" }}>
                    <Outlet />
                </main>
            </BooksProvider>
        </AuthProvider>
    );
}
