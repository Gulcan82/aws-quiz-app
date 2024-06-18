import React, { useState } from 'react';
import { Auth } from 'aws-amplify';
import { useNavigate } from 'react-router-dom';

const ChangePassword = () => {
  const navigate = useNavigate();
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChangePassword = async (e) => {
    e.preventDefault();
    try {
      const user = await Auth.currentAuthenticatedUser();
      await Auth.changePassword(user, oldPassword, newPassword);
      setSuccess('Password changed successfully.');
      setTimeout(() => navigate('/dashboard'), 2000); // Nach erfolgreichem Passwortwechsel zum Dashboard navigieren
    } catch (err) {
      setError('Failed to change password. Please try again.');
    }
  };

  return (
    <div>
      <h2>Change Password</h2>
      <form onSubmit={handleChangePassword}>
        <div>
          <label>Old Password</label>
          <input
            type="password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
          />
        </div>
        <div>
          <label>New Password</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {success && <p style={{ color: 'green' }}>{success}</p>}
        <button type="submit">Change Password</button>
      </form>
    </div>
  );
};

export default ChangePassword;
