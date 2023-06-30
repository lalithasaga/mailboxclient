/*import React, { useState, useEffect } from "react";
import "./EmailCompose.css";
import { Button } from "@material-ui/core";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { closeSendMessage } from "./Redux/MailSlice";
import { db } from "../index";
import firebase from "firebase/compat/app";
import { EditorState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const EmailComposer = ({ onClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();
  const dispatch = useDispatch();
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  useEffect(() => {
    if (isEmailSent) {
      const timer = setTimeout(() => {
        handleClose();
      }, 2000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [isEmailSent]);

  const onSubmit = (formData) => {
    console.log(formData);
    const contentState = editorState.getCurrentContent();
    const message = JSON.stringify(convertToRaw(contentState));

    db.collection("emails").add({
      from: formData.from,
      to: formData.to,
      subject: formData.subject,
      message,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });

    setIsEmailSent(true);
    dispatch(closeSendMessage());
  };

  const handleClose = () => {
    setIsEmailSent(false);
    onClose();
  };

  const handleEditorStateChange = (state) => {
    setEditorState(state);
    setValue(
      "message",
      JSON.stringify(convertToRaw(state.getCurrentContent()))
    );
  };

  return (
    <div className="sendMail">
      {isEmailSent ? (
        <div className="email-sent-message">
          <h2>Email sent successfully!</h2>
        </div>
      ) : (
        <div className="sendMail-container">
          <div className="sendMail-header">
            <h3>New Message</h3>
            <Button onClick={handleClose} color="secondary">
              Close
            </Button>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <input
                name="from"
                placeholder="From"
                type="email"
                {...register("from", { required: true })}
              />
              {errors.from && <p className="sendMail-error">From is Required!</p>}
            </div>
            <div>
              <input
                name="to"
                placeholder="To"
                type="email"
                {...register("to", { required: true })}
              />
              {errors.to && <p className="sendMail-error">To is Required!</p>}
            </div>
            <div>
              <input
                name="subject"
                placeholder="Subject"
                type="text"
                {...register("subject", { required: true })}
              />
              {errors.subject && (
                <p className="sendMail-error">Subject is Required!</p>
              )}
            </div>
            <div>
              <Editor
                editorState={editorState}
                onEditorStateChange={handleEditorStateChange}
                toolbar={{
                  options: ["inline", "list", "textAlign", "link"],
                  inline: {
                    options: ["bold", "italic", "underline"],
                  },
                }}
              />
              {errors.message && (
                <p className="sendMail-error">Message is Required!</p>
              )}
            </div>
            <div className="sendMail-options">
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className="sendMail-send"
              >
                Send
              </Button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default EmailComposer; */

import React, { useState, useEffect } from "react";
import "./EmailCompose.css";
import { Button } from "@material-ui/core";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { closeSendMessage } from "./Redux/MailSlice";
import { db } from "../index";
import firebase from "firebase/compat/app";
import { EditorState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const EmailComposer = ({ onClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();
  const dispatch = useDispatch();
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const user = useSelector((state) => state.auth); // Access user information from the Redux store

  useEffect(() => {
    if (isEmailSent) {
      const timer = setTimeout(() => {
        handleClose();
      }, 2000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [isEmailSent]);

  useEffect(() => {
    setValue("from", user?.email || ""); // Set the value of the "from" input field to the user's email
  }, [user]);

  const onSubmit = (formData) => {
    console.log(formData);
    const contentState = editorState.getCurrentContent();
    const message = JSON.stringify(convertToRaw(contentState));

    db.collection("emails").add({
      from: formData.from,
      to: formData.to,
      subject: formData.subject,
      message,
      userEmail: user.email, // Use the user's email from the Redux store
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });

    setIsEmailSent(true);
    dispatch(closeSendMessage());
  };

  const handleClose = () => {
    setIsEmailSent(false);
    onClose();
  };

  const handleEditorStateChange = (state) => {
    setEditorState(state);
    setValue("message", JSON.stringify(convertToRaw(state.getCurrentContent())));
  };

  return (
    <div className="sendMail">
      {isEmailSent ? (
        <div className="email-sent-message">
          <h2>Email sent successfully!</h2>
        </div>
      ) : (
        <div className="sendMail-container">
          <div className="sendMail-header">
            <h3>New Message</h3>
            <Button onClick={handleClose} color="secondary">
              Close
            </Button>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <input
                name="from"
                placeholder="From"
                type="email"
                {...register("from", { required: false })}
                value={user?.email || ""} // Set the "From" input value to the user's email
              />
              {errors.from && <p className="sendMail-error">From is Required!</p>}
            </div>
            <div>
              <input
                name="to"
                placeholder="To"
                type="email"
                {...register("to", { required: true })}
              />
              {errors.to && <p className="sendMail-error">To is Required!</p>}
            </div>
            <div>
              <input
                name="subject"
                placeholder="Subject"
                type="text"
                {...register("subject", { required: true })}
              />
              {errors.subject && (
                <p className="sendMail-error">Subject is Required!</p>
              )}
            </div>
            <div>
              <Editor
                editorState={editorState}
                onEditorStateChange={handleEditorStateChange}
                toolbar={{
                  options: ["inline", "list", "textAlign", "link"],
                  inline: {
                    options: ["bold", "italic", "underline"],
                  },
                }}
              />
              {errors.message && (
                <p className="sendMail-error">Message is Required!</p>
              )}
            </div>
            <div className="sendMail-options">
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className="sendMail-send"
              >
                Send
              </Button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default EmailComposer;
