export default function HomePage(){
    return (
        <>
        <section id="hero" className="hero section position-relative overflow-hidden">
          <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c" alt="Social Media Hero" 
               className="hero-image w-100 vh-100 object-fit-cover" 
               style={{minHeight: '600px'}} 
               data-aos="fade-in" />

          <div className="container text-center position-absolute top-50 start-50 translate-middle" data-aos="fade-up" data-aos-delay="100">
            <div className="row justify-content-center">
              <div className="col-lg-8 bg-dark bg-opacity-75 p-4 rounded">
                <h2 className="display-3 text-white">Welcome to SocialSphere</h2>
                <p className="lead text-white">Connect, share, and engage with your world like never before</p>
                <a href="#about" className="btn btn-primary btn-lg">Get Started</a>
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="about section py-5 bg-light">
          <div className="container section-title text-center py-5" data-aos="fade-up">
            <h2 className="display-4 mb-3">About SocialSphere</h2>
            <p className="lead">Revolutionizing the way you connect with friends and family</p>
          </div>

          <div className="container" data-aos="fade-up" data-aos-delay="100">
            <div className="row gy-4 align-items-center">
              <div className="col-lg-6">
                <img src="https://images.unsplash.com/photo-1529338296731-c4280a44fc48" 
                     className="img-fluid rounded-4 shadow-lg hover-zoom" 
                     alt="About SocialSphere"
                     style={{minHeight: '400px', objectFit: 'cover'}} />
              </div>
              <div className="col-lg-6 content p-4">
                <h3 className="display-5 mb-4">Your Social World, Reimagined</h3>
                <p className="fst-italic lead">
                  SocialSphere brings people together in meaningful ways, fostering connections that matter.
                </p>
                <ul className="list-unstyled mb-4">
                  <li className="mb-3"><i className="bi bi-check2-all me-2 fs-4 text-primary"></i> 
                    <span className="fs-5">Share moments with friends and family</span></li>
                  <li className="mb-3"><i className="bi bi-check2-all me-2 fs-4 text-primary"></i> 
                    <span className="fs-5">Discover new communities and interests</span></li>
                  <li className="mb-3"><i className="bi bi-check2-all me-2 fs-4 text-primary"></i> 
                    <span className="fs-5">Stay connected wherever you go</span></li>
                </ul>
                <p className="lead">
                  Our platform is designed to bring people closer together, making it easy to share your life's moments and stay connected with what matters most.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="features section py-5">
          <div className="container section-title text-center py-5" data-aos="fade-up">
            <h2 className="display-4 mb-3">Key Features</h2>
            <p className="lead">Everything you need to stay connected and engaged</p>
          </div>

          <div className="container">
            <div className="row gy-4" data-aos="fade-up" data-aos-delay="100">
              <div className="col-md-4">
                <div className="card h-100 shadow border-0 hover-shadow-lg transition-all">
                  <div className="img position-relative overflow-hidden">
                    <img src="https://images.unsplash.com/photo-1527689368864-3a821dbccc34" 
                         alt="Real-time Chat" 
                         className="img-fluid" 
                         style={{height: '250px', objectFit: 'cover'}} />
                    <div className="icon position-absolute top-50 start-50 translate-middle">
                      <i className="bi bi-chat-dots display-1 text-white"></i>
                    </div>
                  </div>
                  <div className="card-body p-4">
                    <h2 className="title h4"><a href="#" className="stretched-link text-decoration-none">Real-time Chat</a></h2>
                    <p className="card-text">
                      Stay connected with instant messaging and group chats. Share your thoughts in real-time with friends and family.
                    </p>
                  </div>
                </div>
              </div>

              <div className="col-md-4" data-aos="fade-up" data-aos-delay="200">
                <div className="card h-100 shadow border-0 hover-shadow-lg transition-all">
                  <div className="img position-relative overflow-hidden">
                    <img src="https://images.unsplash.com/photo-1522542550221-31fd19575a2d" 
                         alt="Media Sharing" 
                         className="img-fluid" 
                         style={{height: '250px', objectFit: 'cover'}} />
                    <div className="icon position-absolute top-50 start-50 translate-middle">
                      <i className="bi bi-images display-1 text-white"></i>
                    </div>
                  </div>
                  <div className="card-body p-4">
                    <h2 className="title h4"><a href="#" className="stretched-link text-decoration-none">Media Sharing</a></h2>
                    <p className="card-text">
                      Share photos, videos, and stories with your network. Create albums and relive your favorite moments.
                    </p>
                  </div>
                </div>
              </div>

              <div className="col-md-4" data-aos="fade-up" data-aos-delay="300">
                <div className="card h-100 shadow border-0 hover-shadow-lg transition-all">
                  <div className="img position-relative overflow-hidden">
                    <img src="https://images.unsplash.com/photo-1521791136064-7986c2920216" 
                         alt="Community Building" 
                         className="img-fluid" 
                         style={{height: '250px', objectFit: 'cover'}} />
                    <div className="icon position-absolute top-50 start-50 translate-middle">
                      <i className="bi bi-people display-1 text-white"></i>
                    </div>
                  </div>
                  <div className="card-body p-4">
                    <h2 className="title h4"><a href="#" className="stretched-link text-decoration-none">Community Building</a></h2>
                    <p className="card-text">
                      Join groups, participate in discussions, and connect with like-minded individuals. Build your social circle.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        </>
    )
}