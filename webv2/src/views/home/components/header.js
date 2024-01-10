import React from 'react';
import logo from 'src/assets/landing/cloud-logo.svg';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <>
    <header id="header" className="header fixed-top">
      <div className="container-fluid container-xl d-flex align-items-center justify-content-between">
  
        <a href="/" className="logo d-flex align-items-center">
          <img src={logo} alt="" />
          <span>BlueCloud</span>
        </a>
  
        <nav id="navbar" className="navbar">
          <ul>
            <li><a className="nav-link scrollto active" href="#hero">Home</a></li>
            <li><a className="nav-link scrollto" href="#about">About</a></li>
            <li><a className="nav-link scrollto" href="#values">Values</a></li>
            <li><a className="nav-link scrollto" href="#features">Concept</a></li>
            <li><a className="nav-link scrollto" href="#tech_stack">Technology</a></li>
            <li><a className="nav-link scrollto" href="#contact">Contact</a></li>
            <li>
            <a href="http://3.104.70.53:8080">
              <p className="getstarted">Get Started</p>
            </a>
            </li>
          </ul>
          <i className="bi bi-list mobile-nav-toggle"></i>
        </nav>
  
      </div>
    </header>
    </>
  )
}

export default Header;

