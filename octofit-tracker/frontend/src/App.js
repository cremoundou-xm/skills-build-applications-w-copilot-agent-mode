import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';
import './App.css';
import Users from './components/Users';
import Teams from './components/Teams';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Workouts from './components/Workouts';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar bg="dark" expand="lg" sticky="top">
          <Container>
            <Navbar.Brand as={Link} to="/" className="fw-bold">
              <img 
                src="/octofitapp-small.png" 
                alt="OctoFit Logo" 
                className="me-2"
              />
              OctoFit Tracker
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ms-auto">
                <Nav.Link as={Link} to="/users" className="nav-link">Users</Nav.Link>
                <Nav.Link as={Link} to="/teams" className="nav-link">Teams</Nav.Link>
                <Nav.Link as={Link} to="/activities" className="nav-link">Activities</Nav.Link>
                <Nav.Link as={Link} to="/leaderboard" className="nav-link">Leaderboard</Nav.Link>
                <Nav.Link as={Link} to="/workouts" className="nav-link">Workouts</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        <Container className="container-main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/users" element={<Users />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/activities" element={<Activities />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/workouts" element={<Workouts />} />
          </Routes>
        </Container>
      </div>
    </Router>
  );
}

function Home() {
  return (
    <div className="home-container">
      <h1>Welcome to OctoFit Tracker 🏋️</h1>
      <p className="lead">Track your fitness activities, join teams, and compete on the leaderboard!</p>
      <p className="lead">Use the navigation menu above to explore different sections.</p>
    </div>
  );
}

export default App;
