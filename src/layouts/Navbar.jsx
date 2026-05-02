import React, { useEffect, useRef, useState, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Cookies from "js-cookie";
import "../stylesheets/layouts/Navbar.css";
import { isIOS, isAndroid } from "react-device-detect";
import whiteLogo from "../assets/sportdantaLogo/whiteLogo.svg";
import userLogo from "../assets/svg-icons/user-circle.svg";
import arrowlogo from "../assets/svg-icons/chevron-down-circle.svg";
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
  { label: "Play",   path: "/host"   },
  { label: "Run",    path: "/run"    },
  { label: "Coach",  path: "/coach"  },
  { label: "Events", path: "/events" },
  { label: "Gym",    path: "/gym"    },
];

function Navbar() {
  const { lat, lng }  = useSelector((s) => s.location);
  const dispatch      = useDispatch();
  const location      = useLocation();
  const isHome        = location.pathname === "/";
  const isActive      = (path) => location.pathname === path || location.pathname === path.toLowerCase();
  const userId        = useSelector((s) => s.auth?.id);
  const token         = Cookies.get("token");

  const [showLoginModal, setShowLoginModal] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm]         = useState("");
  const [predictions, setPredictions]       = useState([]);
  const [service, setService]               = useState(null);
  const [scrolled, setScrolled]             = useState(false);
  const inputRef = useRef(null);

  /* ── Profile image ── */
  const { data: profileData } = useQuery({
    queryKey: ["profile"],
    queryFn: fetchProfile,
    enabled: !!token,
    staleTime: 5 * 60 * 1000,
  });
  const profileImage = profileData?.data?.profile_image || null;

  /* ── Scroll shadow ── */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ── App store redirect ── */
  const handleAppClick = () => {
    const url = isAndroid
      ? "market://details?id=com.dantasports.app"
      : isIOS
      ? "https://apps.apple.com/app/idYOUR_APP_ID"
      : "https://play.google.com/store/apps";
    window.location.href = url;
  };

  /* ── Profile click guard ── */
  const handleProfileClick = (e) => {
    if (!userId || !token) {
      e.preventDefault();
      setShowLoginModal(true);
    }
  };

  /* ── Sync city name ── */
  useEffect(() => {
    getCityName(lat, lng).then((city) => setSearchTerm(city || ""));
  }, [lat, lng]);

  /* ── Load Google Places ── */
  useEffect(() => {
    const load = async () => {
      await googleMapsLoader.importLibrary("places");
      if (window.google) setService(new window.google.maps.places.AutocompleteService());
    };
    load();
  }, []);

  /* ── Close mobile menu on route change ── */
  useEffect(() => { setMobileMenuOpen(false); }, [location.pathname]);

  /* ── Location input handler ── */
  const handleInput = useCallback((e) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (value && service && lat && lng) {
      service.getPlacePredictions(
        { input: value, componentRestrictions: { country: "in" },
          location: new window.google.maps.LatLng(lat, lng),
          radius: 50000, types: ["(cities)"] },
        (preds) => setPredictions(preds || [])
      );
    } else {
      setPredictions([]);
    }
  }, [service, lat, lng]);

  /* ── Location select handler ── */
  const handleSelect = useCallback((prediction) => {
    setPredictions([]);
    const svc = new window.google.maps.places.PlacesService(document.createElement("div"));
    svc.getDetails(
      { placeId: prediction.place_id, fields: ["geometry", "address_components", "formatted_address"] },
      (place) => {
        if (!place?.geometry) return;
        const newLat = place.geometry.location.lat();
        const newLng = place.geometry.location.lng();
        const locality = place.address_components?.find((c) => c.types.includes("locality"));
        const city =
          locality?.long_name ||
          place.address_components?.find((c) => c.types.includes("administrative_area_level_2"))?.long_name ||
          place.formatted_address;
        setSearchTerm(city || "");
        dispatch(setLocation({ lat: newLat, lng: newLng, autoDetect: false }));
      }
    );
  }, [dispatch]);

  return (
    <>
      <nav className={`navbar${scrolled ? " navbar--scrolled" : ""}`}>
        <div className="navbar-container">

          {/* ── Logo ── */}
          <Link to="/" className="navbar-brand" onClick={() => setMobileMenuOpen(false)}>
            <img src={whiteLogo} alt="Danta Sports" className="navbar-logo" />
          </Link>

          {/* ── Hamburger ── */}
          <button
            className="hamburger"
            onClick={() => setMobileMenuOpen((o) => !o)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>

          {/* ── Actions ── */}
          <div className={`navbar-actions${mobileMenuOpen ? " active" : ""}`}>

            {/* Location search — inner pages only */}
            {!isHome && (
              <div className="location-search-container" style={{ marginRight: 12 }}>
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Search location"
                  className="location_Search_Input"
                  value={searchTerm}
                  onChange={handleInput}
                  autoComplete="off"
                />
                <img src={locationlogo} alt="location" />
                {predictions.length > 0 && (
                  <ul className="location-dropdown">
                    {predictions.map((p) => (
                      <li
                        key={p.place_id}
                        onClick={() => handleSelect(p)}
                        className="location-dropdown-item"
                      >
                        <span className="location-dropdown-icon">📍</span>
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
                  className={`nav-Filter-link${isActive(path) ? " active-link" : ""}`}
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
              aria-label="Profile"
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
