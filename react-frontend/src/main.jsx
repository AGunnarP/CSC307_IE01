// src/main.jsx
import React, { useState } from "react";
import ReactDOMClient from "react-dom/client";
import MyApp from "./MyApp";
import "./main.css";
import Table from "./Table";

console.log("Hi")

const container = document.getElementById("root");

// Create a root
const root = ReactDOMClient.createRoot(container);

// Initial render:
root.render(<MyApp />);