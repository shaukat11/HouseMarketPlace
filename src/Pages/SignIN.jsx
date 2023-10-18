import { useState } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { ReactComponent as ArrowRightIcons } from "../assets/svg/keyboardArrowRightIcon.svg";
import visibilityIcons from "../assets/svg/visibilityIcon.svg";
import OAuth from "../Components/OAuth";

function SignIN() {
  const [showPassword, setshowPassword] = useState(false);
  const [formData, setformData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;
  const navigate = useNavigate();

  const emailcollector = (e) => {
    setformData((prestate) => ({
      ...prestate,
      [e.target.id]: e.target.value,
    }));
  };

  const SigningUsers = async (e) => {
    e.preventDefault();

    try {
      const Auth = getAuth();

      const userCredential = await signInWithEmailAndPassword(
        Auth,
        email,
        password
      );

      if (userCredential.user) {
        navigate("/");
      }
    } catch (error) {
      toast.error("Please Enter Valid User Details");
    }
  };

  return (
    <>
      <div className="pageContainer">
        <header>
          <div className="pageHeader mb-4">Welcome Back</div>
        </header>
        <main>
          <form action="" onSubmit={SigningUsers}>
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

            <div className="signInBar">
              <p className="signInText">Sign In</p>
              <button className="signInButton">
                <ArrowRightIcons fill="#ffffff" width="34px" heigth="34px" />
              </button>
            </div>
          </form>

          <OAuth />

          <Link to="/sign-up" className="registerLink">
            Sign Up
          </Link>
        </main>
      </div>
    </>
  );
}

export default SignIN;
