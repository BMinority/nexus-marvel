import { useState } from 'react';
import { Link } from 'react-router-dom';
import LogoNexus from '../assets/marvel-nexus.svg';
import { FiMenu, FiX } from 'react-icons/fi';

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen((open) => !open);
  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="bc-header">
      <div className="bc-container">
        <Link to="/" className="bc-logo" onClick={closeMenu}>
          <img src={LogoNexus} alt="Marvel NEXUS" />
          <h1>NEXUS</h1>
        </Link>

        <nav className={`bc-nav ${menuOpen ? 'bc-nav-open' : ''}`}>
          <Link to="/" onClick={closeMenu}>
            Personagens
          </Link>
          <Link to="/wiki" onClick={closeMenu}>
            Enciclopédia
          </Link>
          <Link to="/releases" onClick={closeMenu}>
            Lançamentos
          </Link>
          <Link to="/reader" onClick={closeMenu}>
            Leitor
          </Link>
        </nav>

        <button className="bc-menu-btn" onClick={toggleMenu} aria-label="Toggle menu">
          {menuOpen ? <FiX size={28} /> : <FiMenu size={28} />}
        </button>
      </div>
    </header>
  );
}

export default Header
