
import { Outlet, Link } from "react-router-dom";
import { AuthProvider } from "./AuthContext";
import { BooksProvider } from "./BooksContext";

export default function Root() {
    return (
        <AuthProvider>
            <BooksProvider>
                <header style={{ padding: "10px", borderBottom: "1px solid #ccc" }}>
                    <nav style={{ display: "flex", gap: "10px" }}>
                        <Link to="/">Home</Link>
                        <Link to="/new">Add New Book</Link>
                        <Link to="/login">Login</Link> {/* Na razie tylko link */}
                    </nav>
                </header>

                <main style={{ padding: "20px" }}>
                    <Outlet />
                </main>
            </BooksProvider>
        </AuthProvider>
    );
}
