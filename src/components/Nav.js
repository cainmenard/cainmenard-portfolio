'use client'
import ThemeToggle from './ThemeToggle'

export default function Nav({ navItems, activeSection, scrolled, mobileNav, onToggleMobile, logoHref = '/', ctaHref = null, secondaryLink = null }) {
  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'nav-glass shadow-sm' : 'bg-transparent'}`}>
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-16">
        <a href={logoHref} className="text-lg font-bold tracking-tight" style={{ color: 'var(--navy)', fontFamily: 'var(--font-display)' }}>CM</a>
        <div className="hidden md:flex items-center gap-8">
          {navItems.map(item => (
            <a key={item.id} href={`#${item.id}`}
              className={`nav-link ${activeSection === item.id ? 'active' : ''}`}>
              {item.label}
            </a>
          ))}
          {secondaryLink && (
            <>
              <span className="w-px h-4 bg-slate-200 dark:bg-slate-600"></span>
              <a href={secondaryLink.href} className="nav-link text-slate-400 hover:text-amber-600" style={{ borderBottom: 'none' }}>{secondaryLink.label}</a>
            </>
          )}
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          {ctaHref && <a href={ctaHref} className="btn-primary text-xs py-2 px-5 hidden md:inline-flex">Get in Touch</a>}
          <button onClick={onToggleMobile} className="md:hidden p-2 -mr-2" aria-label="Menu">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              {mobileNav ? <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></> : <><line x1="3" y1="7" x2="21" y2="7"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="17" x2="21" y2="17"/></>}
            </svg>
          </button>
        </div>
      </div>
    </nav>
  )
}
