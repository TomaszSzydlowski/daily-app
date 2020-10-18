import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

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

const Header = ({ user }) => {
  const [ isOpen, setIsOpen ] = useState(false);

  function isUserLogin(user) {
    for (let i in user) return true;
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
          {!isUserLogin(user) && (
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
          {isUserLogin(user) && (
            <Nav navbar>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  {user.unique_name}
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
  user: PropTypes.object
};

export default Header;
