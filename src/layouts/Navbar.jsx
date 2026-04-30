import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Cookies from "js-cookie";
import "../stylesheets/layouts/Navbar.css";
import { isIOS, isAndroid } from "react-device-detect";
import whiteLogo from "../assets/sportdantaLogo/dantasports-white.png";
import userLogo from "../assets/UserLogo.png";
import arrowlogo from "../assets/arrowlogo.png";
import LoginModal from "../features/auth/components/loginModal";
import locationlogo from "../features/withoutauth/assets/location.svg";
import { getCityName } from "../utils/getCityName";
import { FaBars, FaTimes } from "react-icons/fa";
import { setLocation } from "../redux/Slices/locationSlice";
import { googleMapsLoader } from "../utils/locationSearch.js";
import { useQuery } from "@tanstack/react-query";
import { fetchProfile } from "../services/LoginApi/profileApi/endpointApi.js";

const NAV_LINKS = [
  { label: "Turf",   path: "/venue"  },
  { label: "Play",   path: "/Host"   },
  { label: "Run",    path: "/Run"    },
  { label: "Coach",  path: "/Coach"  },
  { label: "Events", path: "/Events" },
  { label: "Gym",    path: "/Gym"    },
];

function Navbar() {
  const { lat, lng } = useSelector((state) => state.location);
  const dispatch    = useDispatch();
  const location    = useLocation();
  const isHome      = location.pathname === "/";
  const isActive    = (path) => location.pathname === path;
  const userId      = useSelector((state) => state.auth?.id);
  const token       = Cookies.get("token");

  const [showLoginModal, setShowLoginModal] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [predictions, setPredictions] = useState([]);
  const [service, setService] = useState(null);
  const inputRef = useRef(null);

  // Profile image
  const { data: profileData } = useQuery({
    queryKey: ["profile"],
    queryFn: fetchProfile,
    enabled: !!token,
    staleTime: 5 * 60 * 1000,
  });
  const profileImage = profileData?.data?.profile_image || null;

  // App store redirect
  const handleAppClick = () => {
    const url = isAndroid
      ? "market://details?id=com.dantasports.app"
      : isIOS
      ? "https://apps.apple.com/app/idYOUR_APP_ID"
      : "https://play.google.com/store/apps";
    window.location.href = url;
  };

  const handleProfileClick = (e) => {
    if (!userId || !token) {
      e.preventDefault();
      setShowLoginModal(true);
    }
  };

  // Sync city name
  useEffect(() => {
    getCityName(lat, lng).then((city) => setSearchTerm(city || ""));
  }, [lat, lng]);

  // Load Google Places
  useEffect(() => {
    const loadPlaces = async () => {
      await googleMapsLoader.importLibrary("places");
      if (window.google) {
        setService(new window.google.maps.places.AutocompleteService());
      }
    };
    loadPlaces();
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const handleInput = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (value && service && lat && lng) {
      service.getPlacePredictions(
        {
          input: value,
          componentRestrictions: { country: "in" },
          location: new window.google.maps.LatLng(lat, lng),
          radius: 50000,
          types: ["(cities)"],
        },
        (preds) => setPredictions(preds || [])
      );
    } else {
      setPredictions([]);
    }
  };

  const handleSelect = (prediction) => {
    setPredictions([]);
    const placesService = new window.google.maps.places.PlacesService(
      document.createElement("div")
    );
    placesService.getDetails(
      { placeId: prediction.place_id, fields: ["geometry", "address_components", "formatted_address"] },
      (place) => {
        if (place?.geometry) {
          const newLat = place.geometry.location.lat();
          const newLng = place.geometry.location.lng();
          const localityComp = place.address_components?.find((c) =>
            c.types.includes("locality")
          );
          const cityName =
            localityComp?.long_name ||
            place.address_components?.find((c) =>
              c.types.includes("administrative_area_level_2")
            )?.long_name ||
            place.formatted_address;
          setSearchTerm(cityName || "");
          dispatch(setLocation({ lat: newLat, lng: newLng, autoDetect: false }));
        }
      }
    );
  };

  return (
    <>
      <nav className="navbar" style={{ position: "fixed" }}>
        <div className="navbar-container">
          {/* Logo */}
          <Link to="/" className="navbar-brand" onClick={() => setMobileMenuOpen(false)}>
            <img src={whiteLogo} alt="Danta Sports" className="navbar-logo" />
          </Link>

          {/* Hamburger */}
          <div
            className="hamburger"
            onClick={() => setMobileMenuOpen((o) => !o)}
            aria-label="Toggle menu"
            role="button"
          >
            {mobileMenuOpen ? <FaTimes /> : <FaBars />}
          </div>

          {/* Actions */}
          <div className={`navbar-actions${mobileMenuOpen ? " active" : ""}`}>
            {/* Location search — only on inner pages */}
            {!isHome && (
              <div className="location-search-container" style={{ marginRight: 12 }}>
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Search location"
                  className="location_Search_Input"
                  value={searchTerm}
                  onChange={handleInput}
                />
                <img src={locationlogo} alt="location" />
                {predictions.length > 0 && (
                  <ul
                    style={{
                      position: "absolute",
                      top: "100%",
                      left: 0,
                      right: 0,
                      background: "#fff",
                      border: "1px solid #ddd",
                      borderTop: "none",
                      listStyle: "none",
                      margin: 0,
                      padding: 0,
                      maxHeight: 200,
                      overflowY: "auto",
                      zIndex: 9999,
                      borderRadius: "0 0 10px 10px",
                      boxShadow: "0 8px 24px rgba(0,0,0,.12)",
                    }}
                  >
                    {predictions.map((p) => (
                      <li
                        key={p.place_id}
                        onClick={() => handleSelect(p)}
                        style={{
                          padding: "10px 14px",
                          cursor: "pointer",
                          borderBottom: "1px solid #f0f0f0",
                          color: "#333",
                          fontSize: 14,
                          fontFamily: "DM Sans, sans-serif",
                          transition: "background .15s",
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.background = "#f5f8ff")}
                        onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                      >
                        {p.description}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}

            {/* Nav links */}
            <div className="nav-Filter-wrapper">
              {NAV_LINKS.map(({ label, path }) => (
                <Link
                  key={path}
                  to={path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`${isHome ? "nav-Filter-links" : "nav-Filter-link"}${isActive(path) ? " active-link" : ""}`}
                >
                  {label}
                </Link>
              ))}
            </div>

            {/* Get the App — home only */}
            {isHome && (
              <button className="app-btn" onClick={handleAppClick}>
                Get the App
                <img src={arrowlogo} alt="" aria-hidden="true" />
              </button>
            )}

            {/* Profile / Login */}
            <Link
              to={userId && token ? `/profile/${userId}` : "#"}
              className="user-icon"
              onClick={handleProfileClick}
            >
              <img
                src={profileImage || userLogo}
                alt="Profile"
                className="navbar-profile-img"
                onError={(e) => { e.target.onerror = null; e.target.src = userLogo; }}
              />
            </Link>
          </div>
        </div>
      </nav>

      {showLoginModal && <LoginModal onClose={() => setShowLoginModal(false)} />}
    </>
  );
}

export default Navbar;
