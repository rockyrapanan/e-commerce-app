import { useState } from 'react'; // Import React hooks
import { useAuth } from '../context/AuthContext'; // Import the custom Auth context
import { updateProfile, deleteUser } from 'firebase/auth'; // Import Firebase auth functions
import '../styles/authStyles.css'; // Plain CSS import
// Import the CSS styles for the profile page
const Profile = () => {
  const { user } = useAuth(); // Get the current user from the Auth context
  const [displayName, setDisplayName] = useState(user?.displayName || ''); // Initialize displayName state with user's display name or empty string
  const [email] = useState(user?.email || ''); // Read-only, unless you add updateEmail()
  const [error, setError] = useState(''); // State for error messages
  const [success, setSuccess] = useState(''); // State for success messages
  // Function to handle profile update.
  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission behavior
    setError(''); // Reset error state
    setSuccess(''); // Reset success state
    // Check if user is authenticated
    if (!user) {
      setError('User not found');
      return;
    }
    // Attempt to update the user's profile with the new display name
    try {
      await updateProfile(user, { displayName });
      setSuccess('Profile updated successfully');
    } catch (error) {
      console.error('Error updating profile:', error);
      setError('Failed to update profile');
    }
  };
   // Function to handle account deletion.
  const handleDeleteAccount = async () => {
    // Reset error and success states
    if (!user) {
      setError('User not found');
      return;
    }
    // Attempt to delete the user account
    try {
      await deleteUser(user);
      setSuccess('Account deleted successfully');
    } catch (error) {
      console.error('Error deleting account:', error); // Log the error to the console
      setError('Failed to delete account');
    }
  };
  // Render the profile form with fields for display name and email, and buttons for updating and deleting the account
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
 // Export the Profile component as default
export default Profile;
