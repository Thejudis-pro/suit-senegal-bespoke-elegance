import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const links = [
    { href: '/', label: 'Accueil' },
    { href: '/shop', label: 'Collection' },
    { href: '/cart', label: 'Panier', icon: ShoppingBag },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="bg-primary/95 backdrop-blur-md border-b border-gold/10">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3">
              <span className="font-display text-2xl lg:text-3xl font-bold tracking-wider text-primary-foreground">
                SUIT <span className="text-gold">SENEGAL</span>
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-10">
              {links.map(({ href, label, icon: Icon }) => {
                const isActive = location.pathname === href;
                return (
                  <Link
                    key={href}
                    to={href}
                    className={`font-body text-sm tracking-[0.15em] uppercase transition-colors duration-300 flex items-center gap-2 ${
                      isActive
                        ? 'text-gold'
                        : 'text-primary-foreground/70 hover:text-gold'
                    }`}
                  >
                    {Icon && <Icon className="w-4 h-4" />}
                    {label}
                  </Link>
                );
              })}
            </nav>

            {/* Mobile Toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden text-primary-foreground/80 hover:text-gold transition-colors"
              aria-label="Menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-primary/98 backdrop-blur-md border-b border-gold/10 overflow-hidden"
          >
            <nav className="container mx-auto px-6 py-6 flex flex-col gap-4">
              {links.map(({ href, label, icon: Icon }) => (
                <Link
                  key={href}
                  to={href}
                  onClick={() => setIsOpen(false)}
                  className="font-body text-sm tracking-[0.15em] uppercase text-primary-foreground/70 hover:text-gold transition-colors flex items-center gap-2 py-2"
                >
                  {Icon && <Icon className="w-4 h-4" />}
                  {label}
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
