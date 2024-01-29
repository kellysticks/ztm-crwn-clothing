import { Outlet, Link } from "react-router-dom";
import { Fragment } from "react";

import '../navigation/navigation.styles.scss'
import {ReactComponent as CrownLogo} from '../../assets/crown.svg'

const Navigation = () => {
  return (
    <Fragment>
      <nav className="navigation">
        <Link className="logo-container" to="/">
          <CrownLogo className='logo'></CrownLogo>
        </Link>

        <div className="nav-links-container">
          <Link className="nav-link" to="/shop">
            SHOP
          </Link>
          <Link className="nav-link" to="/contact">
            CONTACT
          </Link>
          <Link className="nav-link" to="/sign-in">
            SIGN IN
          </Link>
        </div>
      </nav>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
