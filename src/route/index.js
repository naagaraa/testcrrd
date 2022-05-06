import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../views/Home/HomeView";
import About from "../views/About/AboutView";

export default function index() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="about" element={<About />} />
      </Routes>
    </div>
  );
}
