import { useEffect } from "react"
import { signOut } from "firebase/auth"
import { auth } from "../firebase/firebase"

const Logout = () => {
    useEffect(() => {
        signOut(auth);
    }, []);
  return (
    <div>
      
    </div>
  )
}

export default Logout
