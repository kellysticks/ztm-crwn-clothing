import { Outlet, Link } from "react-router-dom";
import { Fragment, useContext } from "react";
import { UserContext } from "../../contexts/user.contexts";
import { ReactComponent as CrownLogo } from "../../assets/crown.svg";
import { signOutUser } from "../../utils/firebase/firebase.utils";

import "../navigation/navigation.styles.scss";

const Navigation = () => {
  const { currentUser} = useContext(UserContext);

  return (
    <Fragment>
      <nav className="navigation">
        <Link className="logo-container" to="/">
          <CrownLogo className="logo"></CrownLogo>
        </Link>
        <div className="nav-links-container">
          <Link className="nav-link" to="/shop">
            SHOP
          </Link>
          <Link className="nav-link" to="/contact">
            CONTACT
          </Link>
          {currentUser ? (
            <span className="nav-link" onClick={signOutUser}>SIGN OUT</span>
          ) : (
            <Link className="nav-link" to="/auth">
              SIGN IN
            </Link>
          )}
        </div>
      </nav>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
