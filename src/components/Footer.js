export default function Footer({ variant = 'full' }) {
  const year = new Date().getFullYear()

  if (variant === 'simple') {
    return (
      <footer className="footer py-10">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-sm">&copy; {year} Cain Menard &middot; <a href="/" className="footer-link">Back to Main Site</a></p>
        </div>
      </footer>
    )
  }

  return (
    <footer className="footer pb-24 md:pb-8">
      <div className="max-w-[1240px] mx-auto px-6 md:px-10">
        <div className="footer-wordmark" aria-hidden="true">Cain Menard</div>
        <div className="footer-bar flex flex-col md:flex-row items-center justify-between gap-4 mt-8 pt-6">
          <p className="text-sm">&copy; {year} Cain Menard. All rights reserved.</p>
          <div className="flex flex-wrap justify-center gap-6 md:pr-14">
            <a href="https://linkedin.com/in/cainmenard" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn profile (opens in new tab)" className="footer-link text-sm">LinkedIn</a>
            <a href="https://github.com/cainmenard" target="_blank" rel="noopener noreferrer" aria-label="GitHub profile (opens in new tab)" className="footer-link text-sm">GitHub</a>
            <a href="mailto:info@cainmenard.com" aria-label="Send email to Cain Menard" className="footer-link text-sm">Email</a>
            <a href="/lagniappe" className="footer-link text-sm">Lagniappe</a>
            <a href="/personality" className="footer-link text-sm">Personality</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
