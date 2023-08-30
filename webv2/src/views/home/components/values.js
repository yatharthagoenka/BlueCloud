import value1 from 'src/assets/landing/img/values-1.png';
import value2 from 'src/assets/landing/img/values-2.png';
import value3 from 'src/assets/landing/img/values-3.png';

export function Values() {
  return (
    <section id="values" className="values">

      <div className="container" data-aos="fade-up">

        <header className="section-header">
          <h2>Our Values</h2>
          <p>What we promise, we deliver</p>
        </header>

        <div className="row">

          <div className="col-lg-4" data-aos="fade-up" data-aos-delay="200">
            <div className="box">
              <img src={value1} className="img-fluid" alt="" />
              <h3>Affordable pricing</h3>
              <p>Experience the free tier, granting each user the ability to securely store up to 2GBs of data, reflecting our commitment to both security and accessibility.</p>
            </div>
          </div>

          <div className="col-lg-4 mt-4 mt-lg-0" data-aos="fade-up" data-aos-delay="400">
            <div className="box">
              <img src={value2} className="img-fluid" alt="" />
              <h3>100% Transparency</h3>
              <p>At BlueCloud, transparency is at the heart of our commitment, ensuring you have a clear view of your data's journey and security every step of the way.</p>
            </div>
          </div>

          <div className="col-lg-4 mt-4 mt-lg-0" data-aos="fade-up" data-aos-delay="600">
            <div className="box">
              <img src={value3} className="img-fluid" alt="" />
              <h3>Round the clock availability</h3>
              <p>We utilize third-party cloud services to provide the assurance of 24/7 availability, empowering you to manage and retrieve your files whenever you need them.</p>
            </div>
          </div>

        </div>

      </div>

    </section>
  );
}