import { createContext, useState, useEffect, useContext } from "react";
import { onAuthStateChanged, User} from "firebase/auth";

import { auth } from "../firebase/firebase";
interface AuthContextType {
    user: null | User,
    setUser:(user: User) => void
}
const AuthContext = createContext<AuthContextType>({
    user: null,
    setUser: () => {}
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
            } else {
                setUser(null);
            }
        });
        return () => unsubscribe();
    }, []);

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
export default AuthContext;