import { useState } from "react";
import { Link } from "react-router-dom";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { toast } from "react-toastify";
import { ReactComponent as ArrowRightIcon } from "../assets/svg/keyboardArrowRightIcon.svg";

function ForgetPass() {
  const [email, setemail] = useState("");

  const onchangeevent = (e) => setemail(e.target.value);

  const onsubmitevent = async (e) => {
    e.preventDefault();
    try {
      const auth = getAuth();
      await sendPasswordResetEmail(auth, email);
      toast.success("Email Was send Successfully");
    } catch (error) {
      toast.error("Could not send Reset Email");
    }
  };

  return (
    <div className="pageContainer">
      <header>
        <p className="pageHeader">Forget Password</p>
      </header>
      <main>
        <form onSubmit={onsubmitevent}>
          <input
            type="email"
            className="emailInput"
            placeholder="Email"
            id="email"
            value={email}
            onChange={onchangeevent}
          />
          <Link className="forgotPasswordLink" to="/sign-in">
            Sign IN
          </Link>

          <div className="signInBar">
            <div className="signInText">Send Reset Link</div>
            <button className="signInButton">
              <ArrowRightIcon fill="#ffffff" width="34px" height="34px" />
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}

export default ForgetPass;
