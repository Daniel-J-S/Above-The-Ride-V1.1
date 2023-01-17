import Form from './form';
import CookieBanner from './cookieBanner';


export default IndexPage = () => {
    return (
      <main style={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <section style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}>
          <h1>Above The Ride</h1>
          <p>🚧&nbsp;&nbsp;&nbsp;This Site is Currently Under Construction&nbsp;&nbsp;&nbsp;🚧</p>
          <div className="Contact-us">
            <div className="container">
              <p className="mb-5 mt-5">Have a Question? Please Contact Us</p>
                <Form />
            </div>
          </div>
        </section>
        <CookieBanner />
      </main>
    );
};