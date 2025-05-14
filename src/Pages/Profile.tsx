import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { updateProfile, deleteUser } from 'firebase/auth'
import styles from '../styles/authStyles'
const Profile = () => {
  const { user } = useAuth();
  const [displayName, setDisplayName] = useState(user?.displayName || '');
  const [email, setEmail] = useState(user?.email || '');
  const [error, setError] = useState('');
  const [ success, setSuccess] = useState('');

  const handleupdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (!user) {
      setError('User not found'); 
      return;
    }
    try {
      await updateProfile(user, {
        displayName
      });
      setSuccess('Profile updated successfully');
    } catch (error) {
      setError('Failed to update profile');
    }
  } // Closing the handleupdateProfile function

  const handleDeleteAccount = async () => {
    if (!user) {
      setError('User not found');
      return;
    }
    try {
      await deleteUser(user);
      setSuccess('Account deleted successfully');
    } catch (error: any) {
      setError('Failed to delete account');
    }
  } // Closing the handleDeleteAccount function
  return (
    <div>
      <div>Profile</div>
      <form onSubmit={handleupdateProfile}>
        {error && <p className={styles.error}>{error}</p>}
        {success && <p className={styles.success}>{success}</p>}
        <fieldset className={styles.fieldset}>
          <legend className={styles.legend}>Profile</legend>
          <input
            className={styles.input}
            type="text"
            placeholder="Display Name"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
          />
          <input
            className={styles.input}
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button className={styles.button} type="submit">Update</button>
          {success && <p className={styles.success}>{success}</p>}
          {error && <p className={styles.error}>{error}</p>}
          <div className={styles.delete}>
            <button className={styles.button} type="button" onClick={handleDeleteAccount}>Delete Account</button>
          </div>
        </fieldset>
      </form>
    </div>
  );
  
};

export default Profile
