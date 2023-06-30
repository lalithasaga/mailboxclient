import React from "react";
import './Inbox.css';
import Emailrow from "./Emailrow";

function Inbox({ emails }) {
  return (
    <div className="emailList">
    

      <div className="emailList-list">
        {emails.map(({ id, data: { to, subject, message, timestamp } }) => (
          <Emailrow
            id={id}
            key={id}
            title={to}
            subject={subject}
            description={message}
            time={new Date(timestamp?.seconds * 1000).toUTCString()}
          />
        ))}
      </div>
    </div>
  );
}

export default Inbox;