import { useState, useEffect  } from "react";
import GameBoard from "./components/GameBoard";
import Card from "./components/Card";
import Points from "./components/Points";
import "./App.css";

function App() {
 
  
return (
<div><GameBoard cardInfo={3} /><Points  /></div>
)
}

export default App;