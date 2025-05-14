import { useState, useEffect } from 'react'
import { signInWithEmailAndPassword } from 'firebase/auth'
import {auth} from '../firebase/firebase'
import {useNavigate} from "react-router-dom"
import { useAuth } from '../context/AuthContext'
import styles from '../styles/authStyles'


const Login = () => {
    const[email, setEmail] = useState('');
    const[password, setPassword] = useState('');
    const[error, setError] = useState('');
    const {user} = useAuth();

    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            navigate('/profile');
        }
    }, [user, navigate]);
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        try {
            await signInWithEmailAndPassword(
                auth, 
                email, 
                password
            );
            navigate('/profile');
        } catch (error: any) {
            setError(error.message);
        }
         
    };

  return (
    <div className={styles.form}>
     <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        {error && <p className={styles.error}>{error}</p>}
        <fieldset className={styles.fieldset}>
           <legend className={styles.legend}>Login</legend>
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
          
            <button className={styles.button} type="submit">Register</button>
        </fieldset>
        
      </form>
      
    </div>
  )
}

export default Login;
