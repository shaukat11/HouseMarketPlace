import { useState, useEffect } from "react";
import { getAuth, updateProfile } from "firebase/auth";
import {
  updateDoc,
  doc,
  collection,
  getDocs,
  query,
  where,
  orderBy,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../Firebase.config";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import arrowRight from "../assets/svg/keyboardArrowRightIcon.svg";
import homeIcon from "../assets/svg/homeIcon.svg";
import ListingItems from "./ListingItems";

function Profile() {
  const auth = getAuth();

  const [formData, setformData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  });

  const [changeDetails, setchangeDetails] = useState(false);
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);

  const { name, email } = formData;

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserListings = async () => {
      try {
        const listingsRef = collection(db, "listings");

        const q = query(
          listingsRef,
          where("userRef", "==", auth.currentUser.uid),
          orderBy("timespan", "desc")
        );
        const querySnap = await getDocs(q);

        let listings = [];

        querySnap.forEach((doc) => {
          return listings.push({
            id: doc.id,
            data: doc.data(),
          });
        });

        setListing(listings);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUserListings();
  }, [auth.currentUser.uid]);

  const onlogout = () => {
    auth.signOut();
    navigate("/");
  };

  const onSubmit = async () => {
    try {
      if (auth.currentUser.displayName !== name) {
        // Update display name
        await updateProfile(auth.currentUser, {
          displayName: name,
        });

        // Update value in firestore
        const userRef = doc(db, "users", auth.currentUser.uid);
        await updateDoc(userRef, {
          name,
        });
      }
    } catch (error) {
      toast.error("Not done man");
    }
  };

  // Nice thing to consider when getting multiple values from a form
  const upadateuserdetails = (e) => {
    setformData((preState) => ({
      ...preState,
      [e.target.id]: e.target.value,
    }));
  };

  const onDelete = async (listingId) => {
    if (window.confirm("Are you Sure")) {
      await deleteDoc(doc(db, "listings", listingId));
      const updatedListing = listing.filter((list) => list.id !== listingId);
      setListing(updatedListing);
      toast.success("Listing Deleted Successfully");
    }
  };

  const onEdit = (listingId) => navigate(`/editlisting/${listingId}`);

  return (
    <div className="profile">
      <header className="profileHeader">
        <p className="pageHeader">My Profile</p>
        <button className="logOut" typeof="button" onClick={onlogout}>
          Logout
        </button>
      </header>

      <main>
        <div className="profileDetailsHeader">
          <p className="profileDetailsText">Personal Details</p>
          {/* Use of nice logic when making two things at a time */}
          <p
            className="changePersonalDetails"
            onClick={() => {
              changeDetails && onSubmit();
              setchangeDetails((preState) => !preState);
            }}
          >
            {changeDetails ? "done" : "change"}
          </p>
        </div>

        <div className="profileCard">
          <input
            type="text"
            id="name"
            className={changeDetails ? "profileNameActive" : "profileName"}
            disabled={!changeDetails}
            value={name}
            onChange={upadateuserdetails}
          />
          <input
            type="email"
            id="email"
            className={"profileName"}
            disabled={!changeDetails}
            value={email}
          />
        </div>

        <Link to="/create-listing" className="createListing">
          <img src={homeIcon} alt="home" />
          <p className="">Sell or Rent Your Home</p>
          <img src={arrowRight} alt="arrow right" />
        </Link>

        {!loading && listing?.length > 0 && (
          <>
            <p className="listingText">Your Listings</p>
            <ul className="listingsList">
              {listing.map((list) => (
                <ListingItems
                  key={list.id}
                  list={list.data}
                  id={list.id}
                  onDelete={() => onDelete(list.id)}
                  onEdit={() => onEdit(list.id)}
                />
              ))}
            </ul>
          </>
        )}
      </main>
    </div>
  );
}

export default Profile;
