import { useState } from "react";
import { getAuth, updateProfile } from "firebase/auth";
import { updateDoc, doc } from "firebase/firestore";
import { db } from "../Firebase.config";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

function Profile() {
  const auth = getAuth();

  const [formData, setformData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  });

  const [changeDetails, setchangeDetails] = useState(false);

  const { name, email } = formData;

  const navigate = useNavigate();

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
      </main>
    </div>
  );
}

export default Profile;
