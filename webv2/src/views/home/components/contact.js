export function Contact() {
  return (
    <section id="contact" className="contact">
  
        <div className="container" data-aos="fade-up">
  
          <header className="section-header">
            <h2>Contact</h2>
            <p>Contact Us</p>
          </header>
  
          <div className="row gy-4">
  
            <div className="col-lg-6">
  
              <div className="row gy-4">
                <div className="col-md-6">
                  <a href="https://github.com/yatharthagoenka" target="_blank">
                  <div className="info-box">
                    <i className="bi bi-github"></i>
                    <h3>GitHub</h3>
                    <p>yatharthagoenka</p>
                  </div>
                  </a>
                </div>
                <div className="col-md-6">
                  <a href="https://www.linkedin.com/in/yatharthagoenka" target="_blank">
                  <div className="info-box">
                    <i className="bi bi-linkedin"></i>
                    <h3>LinkedIn</h3>
                    <p>Yathartha Goenka</p>
                  </div>
                  </a>
                </div>
                <div className="col-md-6">
                  <div className="info-box">
                    <i className="bi bi-envelope"></i>
                    <h3>Email Us</h3>
                    <p>goenkayathartha2002@gmail.com<br/>20bcs248@iiitdmj.ac.in</p>
                  </div>
                </div>
                <div className="col-md-6">
                  <a href="https://yatharthagoenka.notion.site/yatharthagoenka/Yathartha-Goenka-2203293698e54e5d81b9215ab62559d0" target="_blank">
                  <div className="info-box">
                    <i className="bi bi-pen"></i>
                    <h3>Portfolio</h3>
                    <p>Know more about my profile/contributions</p>
                  </div>
                  </a>
                </div>
              </div>
  
            </div>
  
            <div className="col-lg-6">
              <form action="forms/contact.php" method="post" className="php-email-form">
                <div className="row gy-4">
  
                  <div className="col-md-6">
                    <input type="text" name="name" className="form-control" placeholder="Your Name" required/>
                  </div>
  
                  <div className="col-md-6 ">
                    <input type="email" className="form-control" name="email" placeholder="Your Email" required/>
                  </div>
  
                  <div className="col-md-12">
                    <input type="text" className="form-control" name="subject" placeholder="Subject" required/>
                  </div>
  
                  <div className="col-md-12">
                    <textarea className="form-control" name="message" rows="6" placeholder="Message" required></textarea>
                  </div>
  
                  <div className="col-md-12 text-center">
                    <div className="loading">Loading</div>
                    <div className="error-message"></div>
                    <div className="sent-message">Your message has been sent. Thank you!</div>
  
                    <button type="submit">Send Message</button>
                  </div>
  
                </div>
              </form>
  
            </div>
  
          </div>
  
        </div>
  
      </section>
  );
}
