export default function Footer({ variant = 'full' }) {
  if (variant === 'simple') {
    return (
      <footer className="footer py-10">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-sm" style={{ color: 'var(--text-on-dark-tertiary)' }}>&copy; {new Date().getFullYear()} Cain Menard &middot; <a href="/" className="transition-colors hover:text-white">Back to Main Site</a></p>
        </div>
      </footer>
    )
  }

  return (
    <footer className="footer py-10">
      <div className="max-w-[72rem] mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm" style={{ color: 'var(--text-on-dark-tertiary)' }}>&copy; {new Date().getFullYear()} Cain Menard. All rights reserved.</p>
        <div className="flex gap-6">
          <a href="https://linkedin.com/in/cainmenard" target="_blank" rel="noopener noreferrer" className="text-sm transition-colors hover:text-white" style={{ color: 'var(--text-on-dark-tertiary)' }}>LinkedIn</a>
          <a href="https://github.com/cainmenard" target="_blank" rel="noopener noreferrer" className="text-sm transition-colors hover:text-white" style={{ color: 'var(--text-on-dark-tertiary)' }}>GitHub</a>
          <a href="mailto:cainmenard@gmail.com" className="text-sm transition-colors hover:text-white" style={{ color: 'var(--text-on-dark-tertiary)' }}>Email</a>
        </div>
      </div>
    </footer>
  )
}
