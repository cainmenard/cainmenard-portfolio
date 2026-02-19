'use client'

export default function MobileNav({ navItems, mobileNav, onClose, secondaryLink = null, ctaHref = null }) {
  return (
    <div className={`fixed inset-0 z-40 bg-white dark:bg-slate-900 flex flex-col items-center justify-center gap-6 md:hidden mobile-nav-overlay ${mobileNav ? 'mobile-nav-open' : 'mobile-nav-closed'}`}>
      {navItems.map(item => (
        <a key={item.id} href={`#${item.id}`}
          className="text-xl font-semibold text-slate-800 dark:text-slate-200 hover:text-amber-600 transition"
          onClick={onClose}>
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
