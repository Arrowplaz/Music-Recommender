import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Recommender from "./components/Recommender";
import SpotifyAuth from "./components/SpotifyAuth";
import SpotifyCallback from "./components/SpotifyCallback";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import "./App.css";

function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <Recommender />
        <Router>
      <Routes>
        <Route path="/" element={<SpotifyAuth />} />
        <Route path="/callback" element={<SpotifyCallback />} />
      </Routes>
    </Router>
      </main>
      <Footer />
    </div>
  );
}

export default App;
