import { useEffect } from "react"
import { signOut } from "firebase/auth"
import { auth } from "../firebase/firebase"

const Logout = () => { // This component handles user logout
  // useEffect hook to sign out the user when the component mounts
    useEffect(() => {
        signOut(auth); // Sign out the user using Firebase authentication
    }, []);
  return (
    <div>
      
    </div>
  )
}

export default Logout // This component does not render anything, it just performs the logout action
