import { useState } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import {
  getAuth,
  updateProfile,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { setDoc, doc, serverTimestamp } from "firebase/firestore";
import { db } from "../Firebase.config";
import { ReactComponent as ArrowRightIcons } from "../assets/svg/keyboardArrowRightIcon.svg";
import visibilityIcons from "../assets/svg/visibilityIcon.svg";
import OAuth from "../Components/OAuth";

function SignUP() {
  const [showPassword, setshowPassword] = useState(false);
  const [formData, setformData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { email, password, name } = formData;
  const navigate = useNavigate();

  const emailcollector = (e) => {
    setformData((prestate) => ({
      ...prestate,
      [e.target.id]: e.target.value,
    }));
  };

  const createUser = async (e) => {
    e.preventDefault();

    try {
      const auth = getAuth();

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;

      updateProfile(auth.currentUser, {
        displayName: name,
      });

      const formDataCopy = { ...formData };
      delete formDataCopy.password;
      formDataCopy.timeStamp = serverTimestamp();

      await setDoc(doc(db, "users", user.uid), formDataCopy);

      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong with Registration");
    }
  };

  return (
    <>
      <div className="pageContainer">
        <header>
          <div className="pageHeader mb-3">Welcome Back</div>
        </header>
        <main>
          <form action="" onSubmit={createUser}>
            <input
              type="text"
              className="nameInput"
              placeholder="Name"
              id="name"
              value={name}
              onChange={emailcollector}
            />
            <input
              type="email"
              className="emailInput"
              placeholder="Email"
              id="email"
              value={email}
              onChange={emailcollector}
            />
            <div className="passwordInputDiv">
              <input
                type={showPassword ? "text" : "password"}
                className="passwordInput"
                placeholder="Password"
                id="password"
                value={password}
                onChange={emailcollector}
              />

              <img
                className="showPassword"
                src={visibilityIcons}
                alt="Show Password"
                onClick={() => setshowPassword((prestate) => !prestate)}
              />
            </div>
            <Link to="/forget-password" className="forgotPasswordLink">
              Forget Password
            </Link>

            <div className="signUpBar">
              <p className="signUpText">Sign Up</p>
              <button className="signUpButton">
                <ArrowRightIcons fill="#ffffff" width="34px" heigth="34px" />
              </button>
            </div>
          </form>

          <OAuth />

          <Link to="/sign-in" className="registerLink">
            Sign In Instead
          </Link>
        </main>
      </div>
    </>
  );
}

export default SignUP;
