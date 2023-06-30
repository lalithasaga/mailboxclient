/*import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthForm from './components/AuthForm';
import Header from './components/Header';
import { AuthContextProvider } from './components/AuthContext';
import Home from './components/Home';
import EmailComposer from './components/EmailComposer';
import Inbox from './components/Inbox';
import Mail from "./components/Mail";
import { db } from './index';
import Sidebar from './components/Sidebar'; // Add the correct import path for Sidebar

const App = () => {
  const [emails, setEmails] = useState([]);

  useEffect(() => {
    db.collection("emails")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) =>
        setEmails(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        )
      );
  }, []);

  return (
    <AuthContextProvider>
      <Router>
        <Header />
        <div className="app-body">
          <Sidebar emails={emails} /> 
          <Routes>
          <Route path="/" element={<AuthForm />} />
            <Route path="/Home" element={<Home />} />
            <Route path="/signup" element={<AuthForm />} />
            <Route path="/login" element={<AuthForm />} />
            <Route path="/mail" element={<Mail />} />
            <Route path="/email-composer" element={<EmailComposer />} />
            <Route path="/inbox" element={<Inbox emails={emails} />} />
          </Routes>
        </div>
      </Router>
    </AuthContextProvider>
  );
};

export default App; */


import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthForm from './components/AuthForm';
import Header from './components/Header';
import { AuthContextProvider } from './components/AuthContext';
import Home from './components/Home';
import EmailComposer from './components/EmailComposer';
import Inbox from './components/Inbox';
import Mail from "./components/Mail";
import { db } from './index';
import Sidebar from './components/Sidebar';

const App = () => {
  const [emails, setEmails] = useState([]);

  useEffect(() => {
    db.collection("emails")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) =>
        setEmails(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        )
      );
  }, []);

  return (
    <AuthContextProvider>
      <Router>

            <Header />
            <div className="app-container">
          <Sidebar emails={emails} />
          <div className="app-content">
            <Routes>
              <Route path="/" element={<AuthForm />} />
              <Route path="/Home" element={<Home />} />
              <Route path="/signup" element={<AuthForm />} />
              <Route path="/login" element={<AuthForm />} />
              <Route path="/mail" element={<Mail />} />
              <Route path="/email-composer" element={<EmailComposer />} />
              <Route path="/inbox" element={<Inbox emails={emails} />} />
            </Routes>
          </div>
        </div>
      </Router>
    </AuthContextProvider>
  );
};

export default App;

