import React, { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getLoginUserFromToken } from '../../redux/actions/authActions';

import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';

const Header = ({ loginUser, getLoginUserFromToken }) => {
  const [ isOpen, setIsOpen ] = useState(false);

  useEffect(() => {
    if (!isUserLogin()) {
      getLoginUserFromToken();
    }
  }, []);

  function isUserLogin() {
    for (let i in loginUser) return true;
    return false;
  }

  return (
    <React.Fragment>
      <Navbar color="light" light expand="md">
        <Link className="navbar-brand" to="/">
          DailyApp
        </Link>
        <NavbarToggler onClick={() => setIsOpen(!isOpen)} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink className="nav-item nav-link" to="/notes">
                Notes
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink className="nav-item nav-link" to="/about">
                About
              </NavLink>
            </NavItem>
          </Nav>
          {!isUserLogin() && (
            <Nav navbar>
              <NavItem>
                <NavLink className="nav-item nav-link" to="/login">
                  Login
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink className="nav-item nav-link" to="/register">
                  Register
                </NavLink>
              </NavItem>
            </Nav>
          )}
          {isUserLogin() && (
            <Nav navbar>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  {loginUser.unique_name}
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>
                    <NavItem>
                      <NavLink className="nav-item nav-link" to="/profile">
                        Settings
                      </NavLink>
                    </NavItem>
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>
                    <NavItem>
                      <NavLink className="nav-item nav-link" to="/logout">
                        Logout
                      </NavLink>
                    </NavItem>
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          )}
        </Collapse>
      </Navbar>
    </React.Fragment>
  );
};

Header.propTypes = {
  loginUser: PropTypes.object.isRequired,
  getLoginUserFromToken: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    loginUser: state.loginUser
  };
}

const mapDispatchToProps = {
  getLoginUserFromToken
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
