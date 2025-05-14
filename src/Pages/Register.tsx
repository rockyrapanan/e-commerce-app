import { useState } from 'react'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import {auth} from '../firebase/firebase'
import styles from '../styles/authStyles'
import {useNavigate} from "react-router-dom"

const Register = () => {
    const[email, setEmail] = useState('');
    const[password, setPassword] = useState('');
    const[displayName, setDisplayName] = useState('');
    const[error, setError] = useState('');
    const navigate = useNavigate();
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        try {
            const userCredential = await createUserWithEmailAndPassword(
                auth, 
                email, 
                password
            );
            await updateProfile(userCredential.user, {
                displayName: displayName,
            });
            navigate('/profile');
        } catch (error: any) {
            setError(error.message);
        }
         
    }

  return (
    <div className={styles.form}>
     <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        {error && <p className={styles.error}>{error}</p>}
        <fieldset className={styles.fieldset}>
           <legend className={styles.legend}>Register</legend>
           <input
            className={styles.input}
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className={styles.input}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            className={styles.input}
            type="text"
            placeholder="Display Name"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
          />
            <button className={styles.button} type="submit">Register</button>
        </fieldset>
        
      </form>
      
    </div>
  )
}

export default Register;
