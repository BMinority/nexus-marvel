import LogoNexus from '../assets/marvel-nexus.svg';

export default function Footer() {
  return (
    <footer className="bc-footer">
      <div className="bc-container">
        <div className="bc-footer-logo">
          <img src={LogoNexus} alt="Marvel NEXUS" />
          <span>Marvel NEXUS</span>
        </div>

        <nav className="bc-footer-nav">
          <a href="https://developer.marvel.com" target="_blank" rel="noreferrer">
            Marvel API
          </a>
          <a href="https://github.com/BMinority/nexus-marvel" target="_blank" rel="noreferrer">
            Repositório
          </a>
          <a href="https://brunocoelhodd.vercel.app" target="_blank" rel="noreferrer">
            Contato
          </a>
        </nav>

        <p className="bc-footer-copy">© {new Date().getFullYear()} Bruno Coelho. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
}
