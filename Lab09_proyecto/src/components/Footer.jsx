const contactDetails = [
  { id: 'address', label: 'Address', value: 'Av. Javier Prado Este 4200, Lima' },
  { id: 'phone', label: 'Phone', value: '+51 1 555 0199', href: 'tel:+5115550199' },
  {
    id: 'email',
    label: 'Email',
    value: 'contact@cinestar.pe',
    href: 'mailto:contact@cinestar.pe',
  },
]

const quickLinks = [
  { id: 'billboard', label: 'Billboard', href: '#billboard' },
  { id: 'premieres', label: 'Premieres', href: '#premieres' },
  { id: 'promotions', label: 'Promotions', href: '#promotions' },
  { id: 'contact', label: 'Contact', href: '#contact' },
]

const legalLinks = [
  { id: 'privacy', label: 'Privacy Policy', href: '#privacy' },
  { id: 'terms', label: 'Terms and Conditions', href: '#terms' },
  { id: 'cookies', label: 'Cookie Policy', href: '#cookies' },
]

const currentYear = new Date().getFullYear()

function Footer() {
  return (
    <footer className="site-footer" id="contact">
      <div className="container">
        <div className="footer__content">
          <div className="footer__brand-column">
            <a className="brand" href="#top" aria-label="CineStar home">
              <span className="brand__mark" aria-hidden="true">
                ★
              </span>
              <span className="brand__name">
                Cine<span className="brand__name-accent">Star</span>
              </span>
            </a>
            <p className="footer__description">
              Your favorite cinema experience, with the best releases,
              comfortable rooms and schedules designed for every audience.
            </p>
          </div>

          <section className="footer__column" aria-labelledby="footer-contact">
            <h2 className="footer__title" id="footer-contact">
              Contact
            </h2>
            <ul className="footer__list">
              {contactDetails.map((detail) => (
                <li key={detail.id}>
                  <span className="footer__label">{detail.label}: </span>
                  {detail.href ? (
                    <a className="footer__link" href={detail.href}>
                      {detail.value}
                    </a>
                  ) : (
                    <span>{detail.value}</span>
                  )}
                </li>
              ))}
            </ul>
          </section>

          <section className="footer__column" aria-labelledby="footer-links">
            <h2 className="footer__title" id="footer-links">
              Quick Links
            </h2>
            <ul className="footer__list">
              {quickLinks.map((link) => (
                <li key={link.id}>
                  <a className="footer__link" href={link.href}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </section>

          <section className="footer__column" aria-labelledby="footer-hours">
            <h2 className="footer__title" id="footer-hours">
              Opening Hours
            </h2>
            <ul className="footer__list">
              <li>Monday to Thursday: 12:00 - 23:00</li>
              <li>Friday to Sunday: 10:00 - 01:00</li>
              <li>Holidays: 10:00 - 23:00</li>
            </ul>
          </section>
        </div>

        <div className="footer__bottom">
          <p className="footer__copyright">
            © {currentYear} CineStar. All rights reserved.
          </p>
          <ul className="footer__legal-list">
            {legalLinks.map((link) => (
              <li key={link.id}>
                <a className="footer__link" href={link.href}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  )
}

export default Footer
