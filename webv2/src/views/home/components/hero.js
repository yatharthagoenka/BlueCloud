import heroimg from 'src/assets/landing/img/hero-img.png';
import { Link } from 'react-router-dom';

export function Hero() {
  return (
    <section id="hero" className="hero d-flex align-items-center">
      <div className="container">
        <div className="row">
          <div className="col-lg-6 d-flex flex-column justify-content-center">
            <h1 data-aos="fade-up">A one-stop solution to secure file storage</h1>
            <h2 data-aos="fade-up" data-aos-delay="400">Provides data security with all-new Hybrid Cryptography excellence.</h2>
            <div data-aos="fade-up" data-aos-delay="600">
              <div className="text-center text-lg-start">
                <Link to="/auth/login">
                <p className="btn-get-started d-inline-flex align-items-center justify-content-center align-self-center">
                  <span>Get Started</span>
                  <i className="bi bi-arrow-right"></i>
                </p>
                </Link>
              </div>
            </div>
          </div>
          <div className="col-lg-6 hero-img" data-aos="zoom-out" data-aos-delay="200">
            <img src={heroimg} className="img-fluid" alt="" />
          </div>
        </div>
      </div>
  
    </section>
  );
}
