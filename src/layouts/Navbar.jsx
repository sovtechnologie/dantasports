import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Cookies from 'js-cookie';
import "../stylesheets/layouts/Navbar.css";
import { isIOS, isAndroid } from 'react-device-detect';
import whiteLogo from "../assets/sportdantaLogo/whiteLogo.png";
import blueLogo from "../assets/sportdantaLogo/blueLogo.png";
import userLogo from "../assets/UserLogo.png";
import arrowlogo from "../assets/arrowlogo.png";
import LoginModal from "../features/auth/components/loginModal";
import locationlogo from "../features/withoutauth/assets/locationlogo.png";
import { getCityName } from '../utils/getCityName';
import { FaBars, FaTimes } from 'react-icons/fa';
import { setLocation } from '../redux/Slices/locationSlice';
import { googleMapsLoader } from "../utils/locationSearch.js";



function Navbar() {
  const { lat, lng,} = useSelector((state) => state.location);
  const dispatch = useDispatch();
  const location = useLocation();
  const isHome = location.pathname === '/';
  const isActive = (path) => location.pathname === path;
  const userId = useSelector((state) => state.auth?.id);
  const token = Cookies.get('token');
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [predictions, setPredictions] = useState([]);
  const [service, setService] = useState(null);
  const inputRef = useRef(null);


  const handleClick = () => {
    const url = isAndroid
      ? `market://details?id=com.example.myapp`
      : isIOS
        ? `https://apps.apple.com/app/idYOUR_APP_ID`
        : "https://play.google.com/store/apps";

    window.location.href = url;
  };

  const handleProfileClick = (e) => {
    if (!userId || !token) {
      e.preventDefault();
      setShowLoginModal(true);
    }
  };
  useEffect(() => {
    getCityName(lat, lng).then(city => setSearchTerm(city));
  }, [lat, lng])

  useEffect(() => {
    const loadPlaces = async () => {
      await googleMapsLoader.importLibrary("places");
      if (window.google) {
        setService(new window.google.maps.places.AutocompleteService());
      }
    };
    loadPlaces();
  }, []);

  const handleInput = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    // Only trigger predictions with active service and Redux location
    if (value && service && lat && lng) {
      service.getPlacePredictions(
        {
          input: value,
          componentRestrictions: { country: "in" },
          location: new window.google.maps.LatLng(lat, lng),
          radius: 50000,
          types: ["(cities)"],
        },
        (preds) => {
          setPredictions(preds || []);
        }
      );
    } else {
      setPredictions([]);
    }
  };

  const handleSelect = (prediction) => {
    setSearchTerm(prediction.description);
    setPredictions([]);

    const placesService = new window.google.maps.places.PlacesService(
      document.createElement("div")
    );
    placesService.getDetails(
      { placeId: prediction.place_id, fields: ["geometry", "formatted_address"] },
      (place) => {
        if (place && place.geometry) {
          const newLat = place.geometry.location.lat();
          const newLng = place.geometry.location.lng();

          // Get the city name from address_components
          let cityName = "";
          if (place.address_components) {
            const localityComp = place.address_components.find(comp =>
              comp.types.includes("locality")
            );
            cityName = localityComp
              ? localityComp.long_name
              : (
                // fallback: use administrative_area_level_2 or formatted_address
                place.address_components.find(comp =>
                  comp.types.includes("administrative_area_level_2")
                )?.long_name || place.formatted_address
              );
          }
          setSearchTerm(cityName); // Set only the city name in input box
          setPredictions([]);
          // Dispatch to Redux & set autoDetect false
          dispatch(setLocation({ lat: newLat, lng: newLng, autoDetect: false }));
        }
      }
    );
  };





  return (
    <nav className={`navbar ${isHome ? 'home' : ''}`}>
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          <img
            src={isHome ? whiteLogo : blueLogo}
            alt="Danta Sport Logo"
            className="navbar-logo"
          />
        </Link>
        <div className="hamburger" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <FaTimes /> : <FaBars />}
        </div>


        {/* WRAP the nav and user icon in a collapsible container */}
        <div className={`navbar-actions ${mobileMenuOpen ? 'active' : ''}`}>
          {isHome ? (
            <>
              <div className='nav-Filter-wrapper'>
                <Link to="/venue" className={`nav-Filter-links ${isActive('/venue') ? 'active-link' : ''}`}>Book</Link>
                <Link to="/Host" className={`nav-Filter-links ${isActive('/CommingSoon') ? 'active-link' : ''}`}>Host/Play</Link>
                <Link to="/Run" className={`nav-Filter-links ${isActive('/Run') ? 'active-link' : ''}`}>Run</Link>
                <Link to="/Coach" className={`nav-Filter-links ${isActive('/Coach') ? 'active-link' : ''}`}>Coach</Link>
                <Link to="/Events" className={`nav-Filter-links ${isActive('/Events') ? 'active-link' : ''}`}>Events</Link>
                <Link to="/Gym" className={`nav-Filter-links ${isActive('/Gym') ? 'active-link' : ''}`}>Gym</Link>
              </div>
              <button className="app-btn" onClick={handleClick}>Get the App<img src={arrowlogo} width={25} style={{ verticalAlign: 'middle' }} alt="Arrow" /></button>
            </>
          ) : (
            <>
              <div className='nav-Filter-wrapper'>
                <div className="location-search-container">
                  <input type="text"
                    placeholder="Search by location"
                    className="location_Search_Input"
                    value={searchTerm}
                    onChange={handleInput}
                    ref={inputRef}
                  />
                  <img src={locationlogo} alt="locationlogo" />
                  {predictions.length > 0 && (
                    <ul
                      style={{
                        position: "absolute",
                        top: "100%",
                        left: 0,
                        right: 0,
                        background: "#fff",
                        border: "1px solid #ccc",
                        borderTop: "none",
                        listStyle: "none",
                        margin: 0,
                        padding: 0,
                        maxHeight: "200px",
                        overflowY: "auto",
                        zIndex: 999,
                      }}>
                      {predictions.map((p) => (
                        <li
                          key={p.place_id}
                          onClick={() => handleSelect(p)}
                          style={{
                            padding: "8px",
                            cursor: "pointer",
                            borderBottom: "1px solid #eee",
                            color: "#333"
                          }}
                          onMouseEnter={(e) => (e.target.style.background = "#f0f0f0")}
                          onMouseLeave={(e) => (e.target.style.background = "transparent")}
                        >
                          {p.description}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                <Link to="/venue" className={`nav-Filter-link ${isActive('/venue') ? 'active-link' : ''}`}>Book</Link>
                <Link to="/Host" className={`nav-Filter-link ${isActive('/CommingSoon') ? 'active-link' : ''}`}>Host/Play</Link>
                <Link to="/Run" className={`nav-Filter-link ${isActive('/Run') ? 'active-link' : ''}`}>Run</Link>
                <Link to="/Coach" className={`nav-Filter-link ${isActive('/Coach') ? 'active-link' : ''}`}>Coach</Link>
                <Link to="/Events" className={`nav-Filter-link ${isActive('/Events') ? 'active-link' : ''}`}>Events</Link>
                <Link to="/Gym" className={`nav-Filter-link ${isActive('/Gym') ? 'active-link' : ''}`}>Gym</Link>
              </div>
            </>
          )}


          <Link to={userId && token ? `/profile/${userId}` : '#'} className="user-icon" onClick={handleProfileClick}>
            <img src={userLogo} alt="User Profile" />
          </Link>
        </div>
      </div>
      {showLoginModal && <LoginModal onClose={() => setShowLoginModal(false)} />}
    </nav>
  );
}

export default Navbar;
