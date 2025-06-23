import React, { useState } from 'react';
import "../StyleSheets/ProfilePage.css";
import { NavLink, Outlet, useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../../redux/Slices/authSlice';
import { useSelector } from 'react-redux';
import ProfileImage from "../assets/profileImage.png";
import EditIcon from "../assets/Edit Square.png";
import CalandarIcon from "../assets/CalanderIcon.png";
import WorkIcon from "../assets/WorkIcon.png";
import HelpIcon from "../assets/HelpIcon.png";
import LogoutIcon from "../assets/logoutIcon.png";
import SecurityIcon from "../assets/SecurityIcon.png";
import { fetchProfile } from '../../../services/LoginApi/profileApi/endpointApi.js';
import { useQuery } from '@tanstack/react-query';


function ProfilePage() {

  const id = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
 

  const { data, isLoading: isFetching } = useQuery({
      queryKey: ['profile'],
      queryFn: fetchProfile,
    });
  
    const profile = data?.result[0];
    console.log(" my Profile data:", profile);

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to log out?");
    if (confirmLogout) {
      dispatch(logout());
      navigate('/');
    }
  };


  const options = [
    { label: 'My Bookings', icon: CalandarIcon, route: 'bookings' },
    { label: 'Favorites', icon: WorkIcon, route: 'favorites' },
    { label: 'Played Games', icon: WorkIcon, route: 'played-games' }
  ];

  const options2 = [
    { label: 'Login and Security', icon: SecurityIcon },
    { label: 'Help and Support', icon: HelpIcon },
    { label: 'Log out', icon: LogoutIcon, action: handleLogout }
  ];

   if (isFetching) return <p>Loading profile...</p>;
  if (!profile) return <p>Error loading profile data.</p>;

  return (
    <>
      <div className='Profile-heading'><h1>Profile </h1></div>
      <div className="profile-container">
        <aside className="sidebar">
          <div className="user-card">
            <div className="user-card-left">
              <img src={ProfileImage} alt="User" className="user-avatar" />
              <div className="user-info">
                <div className="user-name">{profile?.full_name || "Noel Jacob"}</div>
                <div className="user-email">{profile?.email || "noeljacob@gmail.com"}</div>
                <div className="user-phone">{profile?.mobile_number || "+919898989898"}</div>
              </div>
            </div>
            <div className="user-card-right">
              <img
                src={EditIcon}
                alt="edit profile"
                className="edit-icon"
                onClick={() => navigate(`/profile/${id}/edit-profile`)}
                style={{ cursor: "pointer" }}
              />
            </div>
          </div>

          <div className="account-card">
            {options.map((option, index) => (

              <NavLink
                to={`/profile/:id/${option.route || 'bookings'}`}
                key={index}
                className={({ isActive }) =>
                  isActive ? "account-option active-tab" : "account-option"
                }>

                <div className="account-left">
                  <img src={option.icon} className="account-icon" />
                  <span className="account-label">{option.label}</span>
                </div>
                <div className="account-arrow">›</div>
              </NavLink>
            ))}
          </div>

          <div className="account-card">
            {options2.map((option, index) => (
              <div
                key={index}
                className="account-option"
                onClick={option.action || null}
                style={{ cursor: option.action ? 'pointer' : 'default' }}
              >
                <div className="account-left">
                  <img src={option.icon} className="account-icon" />
                  <span className="account-label">{option.label}</span>
                </div>
                <div className="account-arrow">›</div>
              </div>
            ))}
          </div>


        </aside>
        <main className="main-content">

          <Outlet context={{ id }} />
        </main>
      </div>
    </>
  );
};

export default ProfilePage;


