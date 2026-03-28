export default function Navbar() {
  return (
    <nav className="navbar">
      <a href="/" className="navbar-brand">
        <div className="navbar-logo">⚡</div>
        <div>
          <div className="navbar-title">
            <span className="brand-team">Team</span>
            <span className="brand-pulse">Pulse</span>
          </div>
          <div className="navbar-subtitle">Employee Dashboard</div>
        </div>
      </a>
      <div className="navbar-links">
        <a href="/docs" className="nav-link" target="_blank" rel="noopener noreferrer" id="link-swagger">
          📖 API Docs
        </a>
        <a href="/redoc" className="nav-link" target="_blank" rel="noopener noreferrer" id="link-redoc">
          📘 ReDoc
        </a>
      </div>
    </nav>
  );
}
