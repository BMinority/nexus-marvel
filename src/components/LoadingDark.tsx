import LogoNexus from '../assets/marvel-nexus.svg';

function LoadingDark() {
  return (
    <div className="bc-loading-dark">
      <img src={LogoNexus} alt="Carregando..." className="bc-loading-dark-logo" />
      <p>Carregando...</p>
    </div>
  );
}

export default LoadingDark;
