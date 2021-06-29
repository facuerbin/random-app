import "./App.css";
import Navbar from "./Components/Navbar.jsx";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Chi from "./Components/Chi.jsx";
import Kolmogorov from "./Components/Kolmogorov.jsx";
import Serial from "./Components/Serial";
import MiddleSquare from "./Components/MiddleSquare";
import Congruential from "./Components/Congruential";

function App() {
  return (
    <div className="App">
      <Navbar />  
      <Router>
        <Switch>
          <Route exact path="/kolmogorov">
            <Kolmogorov />
          </Route>
          <Route exact path="/serial">
            <Serial />
          </Route>
          <Route exact path="/generator/middle-square">
            <MiddleSquare />
          </Route>
          <Route exact path="/generator/congruential">
            <Congruential/>
          </Route>
          <Route path="/">
            <Chi/>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
