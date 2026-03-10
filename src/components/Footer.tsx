export default function Footer() {
  return (
    <footer id="contact" className="border-t border-charcoal-lighter py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <p className="font-serif text-2xl text-offwhite mb-4">
              Apartman <span className="text-gold">Boško</span>
            </p>
            <p className="text-offwhite-dim text-sm leading-relaxed">
              Luksuzni apartman u srcu Srbije. Savršen spoj modernog komfora i
              tradicionalnog gostoprimstva.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <p className="text-gold uppercase tracking-[0.2em] text-xs mb-4">
              Linkovi
            </p>
            <ul className="space-y-3">
              {[
                { href: "#about", label: "O apartmanu" },
                { href: "#gallery", label: "Galerija" },
                { href: "#amenities", label: "Pogodnosti" },
                { href: "#calendar", label: "Dostupnost" },
              ].map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-offwhite-dim text-sm hover:text-gold transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="text-gold uppercase tracking-[0.2em] text-xs mb-4">
              Kontakt
            </p>
            <ul className="space-y-3 text-offwhite-dim text-sm">
              <li>Srbija</li>
              <li>info@apartmanbosko.rs</li>
              <li>+381 XX XXX XXXX</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-charcoal-lighter pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-offwhite-dim/60 text-xs">
            &copy; {new Date().getFullYear()} Apartman Boško. Sva prava zadržana.
          </p>
          <p className="text-offwhite-dim/40 text-xs">
            Dizajnirano sa ljubavlju
          </p>
        </div>
      </div>
    </footer>
  );
}
