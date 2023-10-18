import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./Components/Navbar";
import PrivateRoute from "./Components/PrivateRoute";
import Category from "./Pages/Category";
import Explore from "./Pages/Explore";
import Profile from "./Pages/Profile";
import ForgetPass from "./Pages/ForgetPass";
import SignIN from "./Pages/SignIN";
import SignUP from "./Pages/SignUP";
import Offers from "./Pages/Offers";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Explore />} />
          <Route path="/offer" element={<Offers />} />
          <Route path="/category/:categoryName" element={<Category />} />
          <Route path="/profile" element={<PrivateRoute />}>
            <Route path="/profile" element={<Profile />} />
          </Route>
          <Route path="/sign-in" element={<SignIN />} />
          <Route path="/sign-up" element={<SignUP />} />
          <Route path="/forget-password" element={<ForgetPass />} />
        </Routes>
        <Navbar />
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
