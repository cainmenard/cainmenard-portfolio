'use client'

export default function MobileNav({ navItems, activeSection, mobileNav, onClose, secondaryLink = null, ctaHref = null }) {
  const handleNavClick = (e, id) => {
    e.preventDefault()
    onClose()
    // Small delay to let the overlay start closing before scrolling
    setTimeout(() => {
      const target = document.getElementById(id)
      if (!target) return
      // Compact nav height (56px) + buffer
      const top = target.getBoundingClientRect().top + window.scrollY - 68
      window.scrollTo({ top, behavior: 'smooth' })
    }, 100)
  }

  return (
    <div className={`fixed inset-0 z-40 bg-white dark:bg-slate-900 flex flex-col items-center justify-center gap-6 md:hidden mobile-nav-overlay ${mobileNav ? 'mobile-nav-open' : 'mobile-nav-closed'}`}>
      {navItems.map(item => (
        <a
          key={item.id}
          href={`#${item.id}`}
          className={`text-xl font-semibold transition ${activeSection === item.id ? 'text-amber-600 dark:text-amber-500' : 'text-slate-800 dark:text-slate-200 hover:text-amber-600'}`}
          onClick={(e) => handleNavClick(e, item.id)}
        >
          {item.label}
        </a>
      ))}
      {secondaryLink && (
        <>
          <span className="w-12 h-px bg-slate-200 dark:bg-slate-700"></span>
          <a href={secondaryLink.href} className="text-lg font-medium text-slate-400 hover:text-amber-600 transition" onClick={onClose}>{secondaryLink.label}</a>
        </>
      )}
      {ctaHref && <a href={ctaHref} className="btn-primary mt-4" onClick={onClose}>Get in Touch</a>}
    </div>
  )
}
