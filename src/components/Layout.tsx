import { Outlet, Link, NavLink } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export default function Layout() {
  const { session, loading, signOut } = useAuth()

  return (
    <>
      <header className="site-header">
        <div className="header-inner">
          <Link to="/" className="logo-link" aria-label="VEXDYN Home">
            <img src="/vexdyn-logo-wordmark-alpha.png" alt="VEXDYN" className="logo-img" width={140} height={32} />
          </Link>
          <nav className="nav-desktop" aria-label="Main">
            <NavLink to="/" end>Home</NavLink>
            <NavLink to="/websites">Websites</NavLink>
            <NavLink to="/build">Build</NavLink>
            <NavLink to="/plus">VEXDYN+</NavLink>
            <NavLink to="/about">About</NavLink>
            <NavLink to="/contact">Contact</NavLink>
          </nav>
          <div className="auth-nav" id="authNav" aria-live="polite">
            {loading ? (
              <span className="auth-nav-skeleton" />
            ) : session ? (
              <>
                <Link to="/account" className="auth-link">Account</Link>
                <button type="button" className="btn btn-secondary btn-sm" onClick={() => signOut()}>Logout</button>
              </>
            ) : (
              <>
                <Link to="/login" className="auth-link">Sign In</Link>
                <Link to="/signup" className="btn btn-primary btn-sm">Create Account</Link>
              </>
            )}
          </div>
        </div>
      </header>
      <main>
        <Outlet />
      </main>
      <footer className="site-footer">
        <div className="footer-inner">
          <p className="footer-copy">© VEXDYN. Create Beyond Limits.</p>
          <div className="footer-links">
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
            <Link to="/build">Build</Link>
            <a href="https://vexdynlab.pages.dev/" target="_blank" rel="noopener noreferrer">Lab</a>
            <a href="https://vexdyn-forge.pages.dev/" target="_blank" rel="noopener noreferrer">Forge</a>
          </div>
        </div>
      </footer>
    </>
  )
}
