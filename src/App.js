import logo from './assets/images/logo.png';
import github from "./assets/images/github-square-brands.svg";
import instagramLogo from "./assets/images/instagramLogo.png";
import './App.css';
import './assets/style/header.css';
import './assets/style/userinfo.css';
import './assets/style/card.css';

function Card() {
  return (
    <div className="card">
      <h2>12323</h2>
      <h3>Kills</h3>
    </div>
  )
}

function App() {
  return (
    <main className="App">
      <header>
        <nav>
          <img src={logo} alt="logo" id="logo" />
          <div>
            <a href="https://www.instagram.com/alaahijazi.7/" target="_blank" rel="noreferrer"><img src={instagramLogo} alt="instagram logo" id="instagram-logo" /></a>
            <a href="https://github.com/Alaa-Hijazi7" target="_blank" rel="noreferrer"><img src={github} alt="github logo" id="github-logo" /></a>
          </div>
        </nav>
        <input type="text" placeholder="search with username" />
      </header>
      <section id="user-info">
        <img src="https://i.pinimg.com/564x/98/a8/a3/98a8a3155d35787032a5105084e95832.jpg" alt="user avatar" />
        <div>
          <h3 id="username">Alaa</h3>
          <h4 id="platform">platform: <span>PC</span></h4>
        </div>
      </section>
      <section id="cards">
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </section>
    </main>
  );
}

export default App;
