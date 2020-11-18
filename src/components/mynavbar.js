import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
  Button
} from 'reactstrap';
import { LogIn } from "./login";
import "./mynavbar.css"

const MyNavBar = (props) => {

  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar color="light" light expand="md">
      <div className="image">
      <a href="/">
        <img src="https://firebasestorage.googleapis.com/v0/b/covid19cloud-da799.appspot.com/o/icons8-coronavirus-64.png?alt=media" alt=""/>
      </a>
      </div>
        <NavbarBrand href="/">Covid19 Cloud Project</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink href="https://github.com/cartesis07/CovidCloud19Project" target="_blank">GitHub Repository</NavLink>
            </NavItem>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Libraries
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem href="https://reactstrap.github.io/" target="_blank">
                  reactstrap
                </DropdownItem>
                <DropdownItem href="https://www.chartjs.org/" target="_blank">
                  chart.js
                </DropdownItem>
                <DropdownItem href="https://react-firebase-js.com/" target="_blank">
                  firebase
                </DropdownItem>
                <DropdownItem href="https://reactrouter.com/" target="_blank">
                  react-router
                </DropdownItem>
                <DropdownItem href="https://www.npmjs.com/package/react-country-flag" target="_blank">
                  country-flag
                </DropdownItem>
                <DropdownItem href="https://material-ui.com/" target="_blank">
                  material-UI
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
            <NavItem>
              <NavLink href={process.env.PUBLIC_URL + "/add-news"}>Add News</NavLink>
            </NavItem>
          </Nav>
          <LogIn/>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default MyNavBar;