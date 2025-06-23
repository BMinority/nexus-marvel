import LogoNexus from '../assets/marvel-nexus.svg';

function Loading() {
  return (
    <div className="bc-loading">
      <img src={LogoNexus} alt="Carregando..." className="bc-loading-logo" />
      <p>Carregando...</p>
    </div>
  );
}

export default Loading
