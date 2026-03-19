import { Link } from 'react-router-dom';
import { Instagram, Phone, MapPin, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      {/* Gold accent line */}
      <div className="h-px bg-gradient-to-r from-transparent via-gold to-transparent" />

      <div className="container mx-auto px-6 lg:px-12 py-16 lg:py-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-1 space-y-6">
            <h3 className="font-display text-3xl font-bold tracking-wider">
              SUIT <span className="text-gold">SENEGAL</span>
            </h3>
            <p className="font-body text-sm text-primary-foreground/60 leading-relaxed max-w-xs">
              L'excellence de l'artisanat sénégalais au service de votre élégance. Chaque pièce, une œuvre.
            </p>
          </div>

          {/* Collections */}
          <div className="space-y-6">
            <h4 className="font-body text-xs tracking-[0.2em] uppercase text-gold">Collections</h4>
            <ul className="space-y-3 font-body text-sm text-primary-foreground/60">
              <li><Link to="/shop" className="hover:text-gold transition-colors duration-300">Homme</Link></li>
              <li><Link to="/shop" className="hover:text-gold transition-colors duration-300">Femme</Link></li>
              <li><Link to="/shop" className="hover:text-gold transition-colors duration-300">Sur Mesure</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-6">
            <h4 className="font-body text-xs tracking-[0.2em] uppercase text-gold">Atelier</h4>
            <ul className="space-y-3 font-body text-sm text-primary-foreground/60">
              <li>Consultation Privée</li>
              <li>Prise de Mesures</li>
              <li>Retouches & Ajustements</li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-6">
            <h4 className="font-body text-xs tracking-[0.2em] uppercase text-gold">Contact</h4>
            <ul className="space-y-4 font-body text-sm text-primary-foreground/60">
              <li className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-gold/70 flex-shrink-0" />
                Dakar, Sénégal
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-gold/70 flex-shrink-0" />
                <a href="tel:+221787303737" className="hover:text-gold transition-colors">+221 78 730 37 37</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-gold/70 flex-shrink-0" />
                <a href="mailto:contact@suitsenegal.com" className="hover:text-gold transition-colors">contact@suitsenegal.com</a>
              </li>
              <li className="flex items-center gap-3">
                <Instagram className="w-4 h-4 text-gold/70 flex-shrink-0" />
                <a href="#" className="hover:text-gold transition-colors">@suitsenegal</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-primary-foreground/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-body text-xs text-primary-foreground/40 tracking-wider">
            &copy; {new Date().getFullYear()} SUIT SENEGAL. Tous droits réservés.
          </p>
          <p className="font-body text-xs text-primary-foreground/30 tracking-wider italic">
            L'élégance est une attitude.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
