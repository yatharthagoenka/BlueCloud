import features from 'src/assets/landing/img/features-2.png';

export function Features() {
  return (
    <section id="features" className="features">

      <div className="container" data-aos="fade-up">
        <header className="section-header">
          <h2>A deeper dive</h2>
        </header>
        <div className="row feture-tabs" style={{marginTop: 1}} data-aos="fade-up">
          <div className="col-lg-6">
            <h3>Dive into the concept of hybrid-cryptography to understand how your data is secured</h3>

            <ul className="nav nav-pills mb-3">
              <li>
                <a className="nav-link active" data-bs-toggle="pill" href="#tab1">Encryption</a>
              </li>
              <li>
                <a className="nav-link" data-bs-toggle="pill" href="#tab2">Storage</a>
              </li>
              <li>
                <a className="nav-link" data-bs-toggle="pill" href="#tab3">Control</a>
              </li>
            </ul>

            <div className="tab-content">

              <div className="tab-pane fade show active" id="tab1">
                <p>Hybrid cryptography combines the strengths of symmetric and asymmetric encryption for robust data security.</p>
                <div className="d-flex align-items-center mb-2">
                  <i className="bi bi-check2"></i>
                  <h4>Divides your file into smaller chunks/gems</h4>
                </div>
                <p>Each uploaded file is stored in an external storage system, being divided into smaller chunks of fixed size for further processing.</p>
                <div className="d-flex align-items-center mb-2">
                  <i className="bi bi-check2"></i>
                  <h4>Symmetric Encryption of each gem</h4>
                </div>
                <p>Each gem is then encrypted using symmetric cryptographic algorithms like AES, ChaCha, AESGCM, AESCCM individually before saving in memory.</p>
                <div className="d-flex align-items-center mb-2">
                  <i className="bi bi-check2"></i>
                  <h4>Asymmetric Encryption of key bundle</h4>
                </div>
                <p>The key bundle used to encrypt each gem is then in turn encrypted using RSA for further security. The private key for RSA is then given back to the user or stored in DB, discarding the public key on spot.</p>
              </div>

              <div className="tab-pane fade show" id="tab2">
                <p>Following successful encryption, your valuable data finds a secure haven in external storage locations, meticulously safeguarded and prepared to guard against any potential threats.</p>
                <div className="d-flex align-items-center mb-2">
                  <i className="bi bi-check2"></i>
                  <h4>Assigning UUIDs to each file</h4>
                </div>
                <p>A Universally Unique Identifier is given to each file, ensuring precise tracking, organization, and retrieval of files within the system.</p>
                <div className="d-flex align-items-center mb-2">
                  <i className="bi bi-check2"></i>
                  <h4>Global access to files</h4>
                </div>
                <p>Effortlessly store and retrieve information at your convenience, regardless of your location or the time, ensuring uninterrupted access to your data.</p>
              </div>

              <div className="tab-pane fade show" id="tab3">
                <p>You are given absolute control over the authorization of the private key assigned to each of your individual files, providing you the ultimate governance and security of your assets.</p>
                <div className="d-flex align-items-center mb-2">
                  <i className="bi bi-check2"></i>
                  <h4>Store the keys in our decentralized DB for convenience.</h4>
                </div>
                <p>Experience convenience by entrusting your keys to our decentralized database, eliminating the need for manual key management and enabling seamless access to your files without the hassle of constant provisioning.</p>
                <div className="d-flex align-items-center mb-2">
                  <i className="bi bi-check2"></i>
                  <h4>Satisfy your paranoia by keeping sole access to the private key</h4>
                </div>
                <p>Ensure utmost security by retaining exclusive control over your private key. Once you take possession of the key, we ensure its deletion, requiring you to provide it each time you wish to access the corresponding file.</p>
              </div>

            </div>

          </div>

          <div className="col-lg-6">
            <img src={features} className="img-fluid" alt="" />
          </div>

        </div>

      </div>

    </section>
  )
}
