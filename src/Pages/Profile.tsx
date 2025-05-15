import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { updateProfile, deleteUser } from 'firebase/auth';
import '../styles/authStyles.css'; // Plain CSS import

const Profile = () => {
  const { user } = useAuth();
  const [displayName, setDisplayName] = useState(user?.displayName || '');
  const [email] = useState(user?.email || ''); // Read-only, unless you add updateEmail()
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (!user) {
      setError('User not found');
      return;
    }
    try {
      await updateProfile(user, { displayName });
      setSuccess('Profile updated successfully');
    } catch (error) {
      setError('Failed to update profile');
    }
  };

  const handleDeleteAccount = async () => {
    if (!user) {
      setError('User not found');
      return;
    }
    try {
      await deleteUser(user);
      setSuccess('Account deleted successfully');
    } catch (error) {
      setError('Failed to delete account');
    }
  };

  return (
    <div className="form">
      <h1>Profile</h1>
      <form onSubmit={handleUpdateProfile}>
        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}

        <fieldset className="fieldset">
          <legend className="legend">Edit Profile</legend>

          <input
            className="input"
            type="text"
            placeholder="Display Name"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
          />

          <input
            className="input"
            type="email"
            placeholder="Email"
            value={email}
            readOnly
          />

          <button className="button" type="submit">Update</button>

          <div className="linkContainer">
            <button className="button" type="button" onClick={handleDeleteAccount}>
              Delete Account
            </button>
          </div>
        </fieldset>
      </form>
    </div>
  );
};

export default Profile;
