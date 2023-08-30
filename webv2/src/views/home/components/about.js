import about from 'src/assets/landing/img/about.png';

export function About() {
  return (
    <section id="about" className="about">
  
        <div className="container" data-aos="fade-up">
          <div className="row gx-0">
  
            <div className="col-lg-6 d-flex flex-column justify-content-center" data-aos="fade-up" data-aos-delay="200">
              <div className="content">
                <h3>Who We Are</h3>
                <h2>BlueCloud is your trusted gateway to seamless and secure global data management through cryptography-based cloud storage</h2>
                <p>
                  We utilize hybrid-cryptography techniques to provide a cloud storage platform that allows you to upload, download, and manage your files securely from any anywhere internet access, without having to worry about the safety or availability of your data.
                </p>
                <div className="text-center text-lg-start">
                  <a href="#" className="btn-read-more d-inline-flex align-items-center justify-content-center align-self-center">
                    <span>Explore</span>
                    <i className="bi bi-arrow-right"></i>
                  </a>
                </div>
              </div>
            </div>
  
            <div className="col-lg-6 d-flex align-items-center" data-aos="zoom-out" data-aos-delay="200">
              <img src={about} className="img-fluid" alt="" />
            </div>
  
          </div>
        </div>
  
      </section>
  );
}
