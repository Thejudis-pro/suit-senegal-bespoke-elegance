import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Scissors, Ruler, Gem, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative min-h-screen flex items-center overflow-hidden pt-20">
        {/* Background image */}
        <div className="absolute inset-0">
          <img
            src="/products/hero-editorial.jpg"
            alt="Costume sur mesure SUIT SENEGAL"
            className="w-full h-full object-cover"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-primary/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-primary/20" />
        </div>

        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          <div className="max-w-2xl">
            <motion.div
              initial="hidden"
              animate="visible"
              className="space-y-8"
            >
              <motion.p
                custom={0}
                variants={fadeUp}
                className="font-body text-xs tracking-[0.35em] uppercase text-gold"
              >
                Maison de Confection — Dakar
              </motion.p>

              <motion.h1
                custom={1}
                variants={fadeUp}
                className="font-display text-5xl sm:text-6xl lg:text-8xl font-bold text-primary-foreground leading-[0.95] tracking-tight"
              >
                L'Art du
                <br />
                <span className="italic text-gold">Sur Mesure</span>
              </motion.h1>

              <motion.p
                custom={2}
                variants={fadeUp}
                className="font-body text-base lg:text-lg text-primary-foreground/70 leading-relaxed max-w-lg"
              >
                Chaque costume est une déclaration. Chaque couture, un héritage.
                Découvrez l'excellence du savoir-faire sénégalais.
              </motion.p>

              <motion.div custom={3} variants={fadeUp} className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button
                  asChild
                  size="lg"
                  className="bg-gold hover:bg-gold-dark text-primary font-body text-sm tracking-[0.12em] uppercase px-10 py-6 rounded-none transition-all duration-300"
                >
                  <Link to="/shop">
                    Découvrir la Collection
                    <ArrowRight className="ml-3 w-4 h-4" />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 font-body text-sm tracking-[0.12em] uppercase px-10 py-6 rounded-none"
                >
                  <a href="tel:+221787303737">Prendre Rendez-vous</a>
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <div className="w-px h-16 bg-gradient-to-b from-gold/0 via-gold to-gold/0" />
        </motion.div>
      </section>

      {/* Marquee banner */}
      <div className="bg-primary py-4 overflow-hidden border-y border-gold/10">
        <div className="flex animate-[scroll_20s_linear_infinite] whitespace-nowrap">
          {[...Array(6)].map((_, i) => (
            <span key={i} className="font-body text-xs tracking-[0.3em] uppercase text-gold/50 mx-8">
              Sur Mesure ✦ Artisanat ✦ Excellence ✦ Dakar ✦ Élégance ✦
            </span>
          ))}
        </div>
      </div>

      {/* Collections Preview */}
      <section className="py-24 lg:py-32 bg-background">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center mb-20"
          >
            <p className="font-body text-xs tracking-[0.35em] uppercase text-gold mb-4">Collection</p>
            <h2 className="font-display text-4xl lg:text-6xl font-bold text-foreground">
              Pièces d'Exception
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {[
              {
                img: '/products/teal-three-piece.png',
                title: 'Costume Teal Trois Pièces',
                subtitle: 'Collection Prestige',
                price: '245.000',
              },
              {
                img: '/products/cream-double-breasted.png',
                title: 'Costume Croisé Crème',
                subtitle: 'Collection Signature',
                price: '220.000',
              },
              {
                img: '/products/orange-femme.png',
                title: 'Tailleur Orange',
                subtitle: 'Collection Femme',
                price: '185.000',
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.7 }}
              >
                <Link to="/shop" className="group block">
                  <div className="aspect-[3/4] overflow-hidden mb-6 relative">
                    <img
                      src={item.img}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="absolute bottom-6 left-6 right-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                      <span className="inline-flex items-center gap-2 font-body text-xs tracking-[0.15em] uppercase text-primary-foreground bg-gold/90 px-4 py-2">
                        Découvrir <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <p className="font-body text-xs tracking-[0.2em] uppercase text-muted-foreground">
                      {item.subtitle}
                    </p>
                    <h3 className="font-display text-xl font-semibold text-foreground group-hover:text-gold transition-colors">
                      {item.title}
                    </h3>
                    <p className="font-display text-lg text-gold font-medium">{item.price} CFA</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-16"
          >
            <Button
              asChild
              size="lg"
              className="bg-primary hover:bg-charcoal-light text-primary-foreground font-body text-sm tracking-[0.12em] uppercase px-12 py-6 rounded-none"
            >
              <Link to="/shop">
                Voir Toute la Collection
                <ArrowRight className="ml-3 w-4 h-4" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Savoir-faire Section */}
      <section className="py-24 lg:py-32 bg-primary text-primary-foreground">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-10"
            >
              <div>
                <p className="font-body text-xs tracking-[0.35em] uppercase text-gold mb-4">Notre Philosophie</p>
                <h2 className="font-display text-4xl lg:text-5xl font-bold leading-tight">
                  L'Excellence dans
                  <br />
                  <span className="italic text-gold">Chaque Détail</span>
                </h2>
              </div>

              <p className="font-body text-base text-primary-foreground/60 leading-relaxed max-w-lg">
                SUIT SENEGAL incarne l'excellence de l'artisanat sénégalais dans l'art de la confection sur mesure.
                Chaque pièce est méticuleusement créée pour sublimer la silhouette unique de celui qui la porte.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                {[
                  { icon: Scissors, label: 'Coupe Artisanale', desc: 'Finitions main' },
                  { icon: Ruler, label: 'Sur Mesure', desc: 'Ajusté à la perfection' },
                  { icon: Gem, label: 'Tissus Nobles', desc: 'Matières d\'exception' },
                ].map(({ icon: Icon, label, desc }) => (
                  <div key={label} className="text-center sm:text-left">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full border border-gold/30 mb-4">
                      <Icon className="w-5 h-5 text-gold" />
                    </div>
                    <p className="font-body text-sm font-medium text-primary-foreground">{label}</p>
                    <p className="font-body text-xs text-primary-foreground/50 mt-1">{desc}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="aspect-[4/5] overflow-hidden">
                <img
                  src="/products/grey-pinstripe.png"
                  alt="Artisanat SUIT SENEGAL"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              {/* Decorative frame */}
              <div className="absolute -top-4 -right-4 w-full h-full border border-gold/20 -z-10" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Gallery masonry */}
      <section className="py-24 lg:py-32 bg-background">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <p className="font-body text-xs tracking-[0.35em] uppercase text-gold mb-4">Galerie</p>
            <h2 className="font-display text-4xl lg:text-6xl font-bold text-foreground">
              Nos Créations
            </h2>
          </motion.div>

          <div className="columns-2 lg:columns-4 gap-4 space-y-4">
            {[
              { src: '/products/cream-double-breasted.png', alt: 'Costume croisé crème' },
              { src: '/products/teal-three-piece.png', alt: 'Costume teal trois pièces' },
              { src: '/products/grey-pinstripe.png', alt: 'Costume gris rayé' },
              { src: '/products/orange-femme.png', alt: 'Tailleur orange' },
              { src: '/products/navy-ocean.png', alt: 'Costume bleu océan' },
              { src: '/products/green-safari.png', alt: 'Veste safari émeraude' },
              { src: '/products/black-ocean.png', alt: 'Costume noir océan' },
              { src: '/products/mustard-femme.png', alt: 'Tailleur moutarde' },
              { src: '/products/beige-classic.png', alt: 'Costume croisé beige' },
              { src: '/products/grey-mandarin.png', alt: 'Costume col mao gris' },
            ].map((img, i) => (
              <motion.div
                key={img.src}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="break-inside-avoid group overflow-hidden"
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 lg:py-32 bg-cream-dark">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center space-y-8"
          >
            <p className="font-body text-xs tracking-[0.35em] uppercase text-gold">Rendez-vous</p>
            <h2 className="font-display text-4xl lg:text-6xl font-bold text-foreground leading-tight">
              Créons Votre
              <br />
              <span className="italic text-gold">Prochaine Pièce</span>
            </h2>
            <p className="font-body text-base text-muted-foreground leading-relaxed max-w-xl mx-auto">
              Prenez rendez-vous pour une consultation privée dans notre atelier à Dakar. 
              Ensemble, donnons vie à votre vision.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button
                asChild
                size="lg"
                className="bg-gold hover:bg-gold-dark text-primary font-body text-sm tracking-[0.12em] uppercase px-10 py-6 rounded-none"
              >
                <a href="tel:+221787303737">
                  <Phone className="mr-3 w-4 h-4" />
                  +221 78 730 37 37
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-foreground/20 text-foreground hover:bg-foreground/5 font-body text-sm tracking-[0.12em] uppercase px-10 py-6 rounded-none"
              >
                <Link to="/shop">Explorer la Boutique</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
