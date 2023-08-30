import React, {useState, useEffect} from 'react';
import appService from 'src/services/app.service';


export function Metrics() {
  const [metrics, setMetrics] = useState({
    userCount: 0,
    fileCount: 0, 
    activeHours: 0, 
    storageUsed: 0
  });

  useEffect(() => {
    appService.getPlatformMetrics().then(
        response => {
          setMetrics(response.data);
          console.log(response.data)
      }
    );
  }, []);

  return(
    <section id="counts" className="counts">
      <div className="container" data-aos="fade-up">

        <div className="row gy-4">

          <div className="col-lg-3 col-md-6">
            <div className="count-box">
              <i className="bi bi-emoji-smile"></i>
              <div>
                <span data-purecounter-start="0" data-purecounter-end={metrics.userCount} data-purecounter-duration="1" className="purecounter py-2"></span>
                <p>Happy Clients</p>
              </div>
            </div>
          </div>

          <div className="col-lg-3 col-md-6">
            <div className="count-box">
              <i className="bi bi-journal-richtext" style={{color: '#ee6c20'}}></i>
              <div>
                <span data-purecounter-start="0" data-purecounter-end={metrics.fileCount} data-purecounter-duration="1" className="purecounter py-2"></span>
                <p>Files Secured</p>
              </div>
            </div>
          </div>

          <div className="col-lg-3 col-md-6">
            <div className="count-box">
              <i className="bi bi-headset" style={{color: '#15be56'}}></i>
              <div>
                <span data-purecounter-start="0" data-purecounter-end={metrics.activeHours} data-purecounter-duration="1" className="purecounter py-2"></span>
                <p>Hours Of Service</p>
              </div>
            </div>
          </div>

          <div className="col-lg-3 col-md-6">
            <div className="count-box">
              <i className="bi bi-people" style={{color: '#bb0852'}}></i>
              <div>
                <span data-purecounter-start="0" data-purecounter-end={metrics.storageUsed} data-purecounter-duration="1" className="purecounter py-2"></span>
                <p>MB Data stored</p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}