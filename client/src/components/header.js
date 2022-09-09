import React, { useContext } from "react";
import { PlayerContext } from "../App";
import logo from "../images/logo.png";
import { Nav, NavDropdown } from "react-bootstrap";

function Header() {
  const { playerInfo, currentGroupInfo } = useContext(PlayerContext);
  return (
    <>
      <div className="section-nav">
        <div className="container">
          <div className="nav-container">
            <img src={logo} alt="logo" style={{ maxHeight: 25 }} />
            <div className="nav-links">
              <Nav>
                <NavDropdown title={playerInfo.playerName} id="nav-dropdown">
                  <NavDropdown.Item eventKey="4.1">Profile</NavDropdown.Item>
                  <NavDropdown.Item eventKey="4.1">
                    Switch Group
                  </NavDropdown.Item>
                  <NavDropdown.Divider />

                  <NavDropdown.Item eventKey="4.2" href="/auth/logout">
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
