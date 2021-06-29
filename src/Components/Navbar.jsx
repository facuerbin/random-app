import React from "react";
import { Link, BrowserRouter as Router } from "react-router-dom";

export default function Navbar() {
  return (
    <div>
      <nav className="navbar" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <Router>
            <div className="navbar-item" to="/">
              <img
                src="/logo512.png"
                width="28"
                height="28"
                alt="hash icon"
              />
              <h1>Random App</h1>
            </div>

            <Link
              role="button"
              className="navbar-burger"
              aria-label="menu"
              aria-expanded="false"
              data-target="navbarBasicExample"
            >
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
            </Link>
          </Router>
        </div>

        <div id="navbarBasicExample" className="navbar-menu">
          <div className="navbar-start">
            <a href="/chi" className="navbar-item">
              Chi Cuadrada
            </a>

            <a href="/kolmogorov" className="navbar-item">
              Kolmogorov-Smirnov
            </a>

            <a href="/serial" className="navbar-item">
              Serial
            </a>

            <div className="navbar-item has-dropdown is-hoverable">
              <div className="navbar-link">
                Generadores
              </div>

              <div className="navbar-dropdown">
                <a href="/generator/middle-square" className="navbar-item">
                  Cuadrado Medio
                </a>
                <a href="/generator/congruential" className="navbar-item">
                  Congruencial
                </a>
              </div>
            </div>

            <a href="https://github.com/facuerbin/random-app" className="navbar-item">
              Acerca de
            </a>

          </div>
        </div>
      </nav>
    </div>
  );
}
