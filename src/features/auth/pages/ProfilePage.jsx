import React, { useState } from 'react';
import "../StyleSheets/ProfilePage.css";
import { NavLink, Outlet, useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../../redux/Slices/authSlice';
import ProfileImage from "../../../assets/svg-icons/user-circle.svg";
import EditIcon from "../../../assets/svg-icons/edit-square.svg";
import CalandarIcon from "../../../assets/svg-icons/calendar.svg";
import WorkIcon from "../../../assets/svg-icons/work-bag.svg";
import LogoutIcon from "../../../assets/svg-icons/logout.svg";
import { fetchProfile } from '../../../services/LoginApi/profileApi/endpointApi.js';
import { useQuery } from '@tanstack/react-query';
import { Col, Container, Row } from 'react-bootstrap';
// import TawkLoader from '../components/TawkLoade.jsx';


function ProfilePage() {

  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
const [showLogoutModal, setShowLogoutModal] = useState(false);

  const { data, isLoading: isFetching } = useQuery({
    queryKey: ['profile'],
    queryFn: fetchProfile,
  });

  const profile = data?.data;

  // const toggleChat = useCallback(() => {
  //   const api = window.Tawk_API;
  //   const token = Cookies.get("token"); // or however you retrieve your auth token


  //   if (!api) {
  //     console.warn("Tawk_API not ready");
  //     return;
  //   }

  //   // If no token, ensure chat is closed
  //   if (!token) {
  //     if (api.minimize) api.minimize();
  //     if (api.shutdown) api.shutdown();
  //     setIsChatOpen(false);
  //     return;
  //   }

  //   // If token exists, toggle normally
  //   if (isChatOpen) {
  //     api.minimize();
  //     api.shutdown();
  //     setIsChatOpen(false);
  //   } else if (typeof api.start === "function") {
  //     api.start({ showWidget: true });
  //     setIsChatOpen(true);
  //   }
  // }, [isChatOpen]);

  // useEffect(() => {
  //   const api = window.Tawk_API;
  //   const token = Cookies.get("token");

  //   if (!api) return;

  //   if (!token) {
  //     if (api.minimize) api.minimize();
  //     if (api.shutdown) api.shutdown();
  //     setIsChatOpen(false);
  //   }
  // }, [Cookies.get("token")]); // run whenever token changes


  // useEffect(() => {
  //   if (!window.Tawk_API) return;

  //   window.Tawk_API.onChatMinimized = () => setIsChatOpen(false);
  //   window.Tawk_API.onChatEnded = () => setIsChatOpen(false);
  //   window.Tawk_API.onChatMaximized = () => setIsChatOpen(true);
  // }, []);




 const handleLogout = () => {
  setShowLogoutModal(true);
};

const confirmLogout = () => {
  dispatch(logout());
  setShowLogoutModal(false);
  navigate('/');
};



  const options = [
    { label: 'My Bookings', icon: CalandarIcon, route: 'bookings' },
    { label: 'Favorites', icon: WorkIcon, route: 'favorites' },

  ];

  const options2 = [
    // { label: 'Help and Support', icon: HelpIcon },
    { label: 'Log out', icon: LogoutIcon, action: handleLogout }
  ];

  // if (isFetching) return <p>Loading profile...</p>;
  // if (!profile) return <p>Error loading profile data.</p>;

  return (
    <>
      {/* <TawkLoader /> */}
      <section className='pt-3 pb-3 pt-lg-5 pb-lg-5 profile_section' style={{ background: "#F1F3F2" }}>
        {showLogoutModal && (
  <div className="logout-modal-overlay">
    <div className="logout-modal">
      <h4>Confirm Logout</h4>
      <p>Are you sure you want to logout from your account?</p>

      <div className="logout-modal-buttons">
        <button
          className="cancel-btn"
          onClick={() => setShowLogoutModal(false)}
        >
          Cancel
        </button>
        <button
          className="confirm-btn"
          onClick={confirmLogout}
        >
          Yes, Logout
        </button>
      </div>
    </div>
  </div>
)}

        <Container>
          <Row>
            <Col className='col-12 tite'>
              <h2 className='mb-lg-5 mb-3'>Profile</h2>
            </Col>
          </Row>
          <Row className='g-3'>

            <Col xl={5} lg={4} md={6}>
              <aside className="sidebar">
                <div className="user-card">
                <div className="user-card-left">
  {isFetching ? (
    <>
      <div className="skeleton skeleton-avatar"></div>
      <div className="user-info ms-3">
        <div className="skeleton skeleton-text" style={{ width: "140px" }}></div>
        <div className="skeleton skeleton-text" style={{ width: "180px" }}></div>
        <div className="skeleton skeleton-text" style={{ width: "120px" }}></div>
      </div>
    </>
  ) : (
    <>
      <img
        src={profile?.profile_image || ProfileImage}
        alt="User"
        className="user-avatar"
      />
      <div className="user-info">
        <div className="user-name">{profile?.full_name}</div>
        <div className="user-email">{profile?.email}</div>
        <div className="user-phone">{profile?.mobile_number}</div>
      </div>
    </>
  )}
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
                <div className="booking_links">
                  <div className="inner">
                    <div className="account-card">
                      {options.map((option, index) => (

                        <NavLink
                          to={`/profile/:id/${option.route || 'bookings'}`}
                          key={index}
                          className={({ isActive }) =>
                            isActive ? "account-option active-tab" : "account-option"
                          }>

                          <div className="account-left">
                            <img src={option.icon} className="account-icon" alt="" />
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
                            <img src={option.icon} className="account-icon" alt="" />
                            <span className="account-label">{option.label}</span>
                          </div>
                          <div className="account-arrow">›</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

              </aside>
            </Col>
            <Col xl={7} lg={8} md={6}>
              <main className="main-content">

                <Outlet context={{ id }} />
              </main>
            </Col>
          </Row>
        </Container>
      </section>

    </>
  );
};

export default ProfilePage;


