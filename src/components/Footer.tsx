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
          <a href="https://github.com/seuusuario/marvel-nexus" target="_blank" rel="noreferrer">
            Repositório
          </a>
          <a href="mailto:contato@marvelnexus.com">
            Contato
          </a>
        </nav>

        <p className="bc-footer-copy">© {new Date().getFullYear()} Marvel NEXUS. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
}
