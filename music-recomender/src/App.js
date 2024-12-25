import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Recommender from "./components/Recommender";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <Recommender />
      </main>
      <Footer />
    </div>
  );
}

export default App;
