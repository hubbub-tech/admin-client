import backgroundImg from './assets/main-banner.png';

export const MainBanner = () => {
  return (
    <section className="mt-5 mb-3">
      <div className="container">
        <div className="hero-slider py-5">
          <div
            style={{
              backgroundImage: `url(${backgroundImg})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              borderRadius: ".5rem",
              backgroundPosition: "center"
            }}
          >
            <div className="ps-lg-4 py-lg-5 col-lg-5 col-md-7 py-5 px-5 text-xs-center">
              <h2 className="text-light display-5 fw-bold mt-4">Operations for <big>Hubbub</big></h2>
              <p className="lead text-light">Keep Hubbub inventory up to date by tracking orders and managing items.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
