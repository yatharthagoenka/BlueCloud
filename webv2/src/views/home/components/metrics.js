export function Metrics() {
  return(
    <section id="counts" className="counts">
      <div className="container" data-aos="fade-up">

        <div className="row gy-4">

          <div className="col-lg-3 col-md-6">
            <div className="count-box">
              <i className="bi bi-emoji-smile"></i>
              <div>
                <span data-purecounter-start="0" data-purecounter-end="32" data-purecounter-duration="1" className="purecounter"></span>
                <p>Happy Clients</p>
              </div>
            </div>
          </div>

          <div className="col-lg-3 col-md-6">
            <div className="count-box">
              <i className="bi bi-journal-richtext" style={{color: '#ee6c20'}}></i>
              <div>
                <span data-purecounter-start="0" data-purecounter-end="173" data-purecounter-duration="1" className="purecounter"></span>
                <p>Files Secured</p>
              </div>
            </div>
          </div>

          <div className="col-lg-3 col-md-6">
            <div className="count-box">
              <i className="bi bi-headset" style={{color: '#15be56'}}></i>
              <div>
                <span data-purecounter-start="0" data-purecounter-end="3912" data-purecounter-duration="1" className="purecounter"></span>
                <p>Hours Of Service</p>
              </div>
            </div>
          </div>

          <div className="col-lg-3 col-md-6">
            <div className="count-box">
              <i className="bi bi-people" style={{color: '#bb0852'}}></i>
              <div>
                <span data-purecounter-start="0" data-purecounter-end="17" data-purecounter-duration="1" className="purecounter"></span>
                <p>GB Data stored</p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}