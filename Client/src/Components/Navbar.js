import { useSelector, useDispatch } from "react-redux";
import { setLogin, setLogout } from "../ReduxState/index";
import { Link } from "react-router-dom";
import "../Stylesheet/Navbar.css";
import bootstrap from "bootstrap";
import { BiSolidMessage, BiSolidHelpCircle } from "react-icons/bi";
import { MdNotificationsActive } from "react-icons/md";
import { FaUserAlt } from "react-icons/fa";

function Navbar() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const fullName = user === null ? "" : `${user.firstName} ${user.lastName}`
  return (
    // <nav className="navbarContainer navbar">
    //   <div className="navbar navSec">
    //      <h2 onClick={()=> navigate("/home")}>Snapgram</h2>
    //   </div>
    // </nav>
    <nav
      className="navbar navbar-expand-lg bg-body-tertiary py-2 px-3 bg-dark border-bottom border-body"
      data-bs-theme="dark"
    >
      <div className="container-fluid">
        <Link className="navbar-brand" to="/home">
          <h2 style={{ color: "skyblue" }}>SnapBook</h2>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarTogglerDemo02"
          aria-controls="navbarTogglerDemo02"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse " id="navbarTogglerDemo02">
          <div className="d-flex ms-auto navLinkPosition">
            <ul className="navbar-nav mb-2 mb-lg-0" style={{ display: "flex", justifyContent: "center", alignItems: "center", gap:"20px" }}>
              <li>
                <img src={user?.picturePath} width={30} height={30} style={{ objectFit: "cover", borderRadius: "50%", alignItems: "center", marginLeft: "-10px" }} />
              </li>
              <li className="nav-item">
                <span className="nav-link dropdown dropstart">
                  <FaUserAlt
                    style={{ fontSize: "25px", color: "skyblue" }}
                    className="dropdown-toggle"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  ></FaUserAlt>
                  <ul className="dropdown-menu">
                    <li className="dropdown-item">Welcome {fullName}</li>
                    <li
                      className="dropdown-item"
                      onClick={() => {
                        dispatch(setLogout())
                        alert("Logout successful")
                      }}
                    >
                      Logout
                    </li>
                  </ul>
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
