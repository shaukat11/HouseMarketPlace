import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ReactComponent as OfferIcon } from "../assets/svg/localOfferIcon.svg";
import { ReactComponent as ExploreIcon } from "../assets/svg/exploreIcon.svg";
import { ReactComponent as PersonOutline } from "../assets/svg/personOutlineIcon.svg";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const changeNavbar = (route) => {
    if (route === location.pathname) {
      return true;
    }
  };

  return (
    <footer className="navbar">
      <nav className="navbarNav">
        <ul className="navbarListItems">
          <li className="navbarListItem">
            <ExploreIcon
              fill={changeNavbar("/") ? "#2c2c2c" : "#8f8f8f"}
              width="36px"
              height="36px"
              onClick={() => {
                navigate("/");
              }}
            />
            <p
              className={
                changeNavbar("/")
                  ? "navbarListItemNameActive"
                  : "navbarListItemName"
              }
            >
              Explore
            </p>
          </li>
          <li className="navbarListItem">
            <OfferIcon
              fill={changeNavbar("/offer") ? "#2c2c2c" : "#8f8f8f"}
              width="36px"
              height="36px"
              onClick={() => {
                navigate("/offer");
              }}
            />
            <p
              className={
                changeNavbar("/offer")
                  ? "navbarListItemNameActive"
                  : "navbarListItemName"
              }
            >
              Offers
            </p>
          </li>
          <li className="navbarListItem">
            <PersonOutline
              fill={changeNavbar("/profile") ? "#2c2c2c" : "#8f8f8f"}
              width="36px"
              height="36px"
              onClick={() => {
                navigate("/profile");
              }}
            />
            <p
              className={
                changeNavbar("/profile")
                  ? "navbarListItemNameActive"
                  : "navbarListItemName"
              }
            >
              Profile
            </p>
          </li>
        </ul>
      </nav>
    </footer>
  );
}

export default Navbar;
