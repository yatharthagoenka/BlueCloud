import React, { useEffect, useState } from 'react';
import appService from 'src/services/app.service';
import Header from './components/header';
import useLandingScriptsLoader from './components/scriptLoader';
import { Helmet } from 'react-helmet';

import 'src/assets/landing/vendor/aos/aos.css';
import 'src/assets/landing/vendor/bootstrap/css/bootstrap.min.css';
import 'src/assets/landing/vendor/bootstrap-icons/bootstrap-icons.css';
import 'src/assets/landing/vendor/glightbox/css/glightbox.min.css';
import 'src/assets/landing/vendor/remixicon/remixicon.css';
import 'src/assets/landing/vendor/swiper/swiper-bundle.min.css';
import 'src/assets/landing/styles.css';

import { Footer } from './components/footer';
import { Hero } from './components/hero';
import { About } from './components/about';
import { Values } from './components/values';
import { Metrics } from './components/metrics';
import { Features } from './components/features';
import { TechStack } from './components/techStack';
import { Contact } from './components/contact';

const Home = () => {
  useLandingScriptsLoader();
  return (
    <div>
      <Header />
      
      <Hero />  

      <main id="main">

        <About />

        <Values />
        
        <Metrics />

        <Features />
        
        <TechStack />
        
        <Contact />
    
      </main>

      <Footer/>
    
      <a href="#" className="back-to-top d-flex align-items-center justify-content-center"><i className="bi bi-arrow-up-short"></i></a>
    </div>
  )
};

export default Home;
