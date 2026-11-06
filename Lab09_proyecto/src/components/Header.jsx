const navigationLinks = [
  { id: 'billboard', label: 'Billboard', href: '#billboard' },
  { id: 'premieres', label: 'Premieres', href: '#premieres' },
  { id: 'promotions', label: 'Promotions', href: '#promotions' },
  { id: 'contact', label: 'Contact', href: '#contact' },
]

function Header() {
  return (
    <header className="site-header">
      <div className="container header__inner">
        <a className="brand" href="#top" aria-label="CineStar home">
          <span className="brand__mark" aria-hidden="true">
            ★
          </span>
          <span className="brand__name">
            Cine<span className="brand__name-accent">Star</span>
          </span>
        </a>

        <nav className="navigation" aria-label="Main navigation">
          <ul className="navigation__list">
            {navigationLinks.map((link) => (
              <li key={link.id}>
                <a className="navigation__link" href={link.href}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header
