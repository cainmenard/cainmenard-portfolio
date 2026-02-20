'use client'

export default function MobileNav({ navItems, mobileNav, onClose, secondaryLink = null, ctaHref = null }) {
  return (
    <div className={`fixed inset-0 z-40 flex flex-col items-center justify-center gap-6 md:hidden mobile-nav-overlay ${mobileNav ? 'mobile-nav-open' : 'mobile-nav-closed'}`}
      style={{ background: 'var(--bg-primary)' }}>
      {navItems.map(item => (
        <a key={item.id} href={`#${item.id}`}
          className="text-xl font-semibold transition-colors"
          style={{ color: 'var(--text-primary)' }}
          onClick={onClose}>
          {item.label}
        </a>
      ))}
      {secondaryLink && (
        <>
          <span className="w-12 h-px" style={{ background: 'var(--divider)' }}></span>
          <a href={secondaryLink.href} className="text-lg font-medium transition-colors" style={{ color: 'var(--text-tertiary)' }} onClick={onClose}>{secondaryLink.label}</a>
        </>
      )}
      {ctaHref && <a href={ctaHref} className="btn-primary mt-4" onClick={onClose}>Get in Touch</a>}
    </div>
  )
}
