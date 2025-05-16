
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase";
import { useEffect, useState } from "react";
import { signOut } from "firebase/auth";

export default function LoginPage() {
    const [user, setUser] = useState(null);

    const handleLogin = () => {
        provider.setCustomParameters({ prompt: "select_account" });
        signInWithPopup(auth, provider)
            .then((result) => {
                setUser(result.user);
                console.log("Zalogowano jako:", result.user.email);
            })
            .catch((error) => {
                console.error("Blad logowania:", error);
            });
    };

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setUser(user);
        });
        return () => unsubscribe();
    }, []);

    return (
        <div>
            <h1>Strona logowania</h1>
            {user ? (
                <>
                    <p>Zalogowano jako: {user.displayName}</p>
                    <button onClick={() => signOut(auth)}>Wyloguj się</button>
                </>
            ) : (
                <button onClick={handleLogin}>Zaloguj się przez Google</button>
            )}
        </div>
    );
}
