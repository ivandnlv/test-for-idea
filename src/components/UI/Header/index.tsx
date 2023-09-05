import logoPath from './logo.svg';

function Header() {
  return (
    <header className="header">
      <div className="header__logo">
        <a
          href="#
		
		">
          <img src={logoPath} alt="logo" />
        </a>
      </div>
    </header>
  );
}

export default Header;
