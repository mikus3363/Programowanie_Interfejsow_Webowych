import { db, auth, provider } from "../firebase";
import { useEffect, useState } from "react";
import { signInWithPopup, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { collection, getDocs } from "firebase/firestore";
import { Link } from "react-router-dom";

export default function LoginPage() {
    const [user, setUser] = useState(null);
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLoginWithPassword = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const snapshot = await getDocs(collection(db, "users"));
            const matched = snapshot.docs.find((doc) => doc.data().login === login);

            if (!matched) {
                setError("Nie znaleziono użytkownika o takim loginie.");
                return;
            }

            const email = matched.data().email;

            await signInWithEmailAndPassword(auth, email, password);
        } catch (err) {
            setError("Błąd logowania: " + err.message);
        }
    };

    const handleGoogleLogin = () => {
        provider.setCustomParameters({ prompt: "select_account" });
        signInWithPopup(auth, provider).catch((error) => {
            console.error("Błąd logowania przez Google:", error);
        });
    };

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setUser(user);
        });
        return () => unsubscribe();
    }, []);

    const handleLogout = () => {
        signOut(auth);
    };

    return (
        <div>
            <h1>Strona logowania</h1>

            {user ? (
                <>
                    <p>Zalogowano jako: {user.email}</p>
                    <button onClick={handleLogout}>Wyloguj się</button>
                </>
            ) : (
                <>
                    <form onSubmit={handleLoginWithPassword}>
                        <input
                            type="text"
                            placeholder="Login lub email"
                            value={login}
                            onChange={(e) => setLogin(e.target.value)}
                            required
                        />
                        <input
                            type="password"
                            placeholder="Haslo"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <button type="submit">Zaloguj się</button>
                    </form>

                    <hr />

                    <button onClick={handleGoogleLogin}>Zaloguj się przez Google</button>

                    <p>
                        Nie masz konta? <Link to="/register">Zarejestruj się</Link>
                    </p>

                    {error && <p style={{ color: "red" }}>{error}</p>}
                </>
            )}
        </div>
    );
}
