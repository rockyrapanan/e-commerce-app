import { useState, useEffect } from 'react'; // Import necessary hooks from React
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/firebase'; // Import Firebase authentication methods
import { useNavigate } from 'react-router-dom'; // Import React Router hooks
import { useAuth } from '../context/AuthContext'; // Import custom authentication context
import '../styles/authStyles.css'; // Plain CSS (not CSS Modules)

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/profile');
    }
  }, [user, navigate]);
  // Handle form submission for login
  // This function is called when the user submits the login form.
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try { // Prevent default form submission behavior
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/profile');
    } catch (error: unknown) {
      if (error instanceof Error) { // Check if error is an instance of Error
        setError(error.message);
      } else {
        setError('An unknown error occurred.'); // Handle the case where error is not an instance of Error
      }
    }
  };

  return (
    <div className="form">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        {error && <p className="error">{error}</p>}
        <fieldset className="fieldset">
          <legend className="legend">Login</legend>
          <input
            className="input"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="input"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="button" type="submit">Login</button>
        </fieldset>
      </form>
    </div>
  );
};

export default Login; // Login component
