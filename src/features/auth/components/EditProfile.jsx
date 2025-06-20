import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import './StyleSheets/EditProfile.css'; // Create or reuse styles as needed

const EditProfile = () => {
  const { user } = useSelector((state) => state.auth);

  const [form, setForm] = useState({
    fullName: user?.full_name || '',
    email: user?.email || '',
    phone: user?.mobile_number || '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // 🔄 You can dispatch update profile action here
    alert("Profile updated!");
  };

  return (
    <div className="edit-profile-form">
      <h2>Edit Profile</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Full Name:
          <input
            name="fullName"
            value={form.fullName}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Email:
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
          />
        </label>

        <label>
          Phone Number:
          <input
            type="tel"
            name="phone"
            value={form.phone}
            disabled
          />
        </label>

        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default EditProfile;
