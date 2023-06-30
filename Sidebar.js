/*import { Button, IconButton } from "@material-ui/core";
import React from "react";
import "./Sidebar.css";
import AddIcon from "@material-ui/icons/Add";
import InboxIcon from "@material-ui/icons/Inbox";
import NearMeIcon from "@material-ui/icons/NearMe";
import SidebarOption from "./SidebarOption";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { openSendMessage } from "./Redux/MailSlice";

function Sidebar({ emails }) {
  const dispatch = useDispatch();

  return (
    <div className="sidebar">
      <Button
        className="sidebar-compose"
        onClick={() => dispatch(openSendMessage())}
        startIcon={<AddIcon fontSize="large" />}
      >
        Compose
      </Button>
      <Link to="/Inbox" className="sidebar-link">
        <SidebarOption
          Icon={InboxIcon}
          title="Inbox"
          number={emails.length}
          selected={true}
        />
      </Link>

      
      <SidebarOption Icon={NearMeIcon} title="Sent" />

    </div>
  );
}

export default Sidebar;
*/


import { Button } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import "./Sidebar.css";
import AddIcon from "@material-ui/icons/Add";
import InboxIcon from "@material-ui/icons/Inbox";
import NearMeIcon from "@material-ui/icons/NearMe";
import SidebarOption from "./SidebarOption";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { openSendMessage } from "./Redux/MailSlice";
import EmailComposer from "./EmailComposer";
import { Authactions } from './Redux/Auth';

function Sidebar({ emails }) {
  const isLogin = useSelector((state) => state.Auth.isLogin);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showComposeEmail, setShowComposeEmail] = useState(false);

  const handleComposeEmail = () => {
    setShowComposeEmail(true);
    dispatch(openSendMessage());
  };

  const closeComposeEmail = () => {
    setShowComposeEmail(false);
  };

  useEffect(() => {
    // Close the compose email form when the user is logged out
    if (!isLogin) {
      setShowComposeEmail(false);
    }
  }, [isLogin]);

  const handleLogout = () => {
    dispatch(Authactions.logout());
    navigate("/");
  };

  // Render the Sidebar only if the user is logged in
  if (!isLogin) {
    return null;
  }

  return (
    <div className="sidebar">
      {showComposeEmail ? (
        <EmailComposer onClose={closeComposeEmail} />
      ) : (
        <>
          <Button
            className="sidebar-compose"
            onClick={handleComposeEmail}
            startIcon={<AddIcon fontSize="large" />}
          >
            Compose
          </Button>
          <Link to="/Inbox" className="sidebar-link">
            <SidebarOption
              Icon={InboxIcon}
              title="Inbox"
              number={emails.length}
              selected={true}
            />
          </Link>
          <SidebarOption Icon={NearMeIcon} title="Sent" />
        </>
      )}
    </div>
  );
}

export default Sidebar;
