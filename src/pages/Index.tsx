import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Instagram, MapPin, Phone, Mail, ShoppingCart } from "lucide-react";

const Index = () => {
  return <div className="min-h-screen bg-gradient-to-br from-slate-50 to-stone-100">
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-sm border-b border-stone-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-serif font-bold text-slate-800">SUIT SENEGAL</h1>
            <nav className="hidden md:flex space-x-8">
              <a href="#home" className="text-slate-700 hover:text-amber-600 transition-colors font-medium">Accueil</a>
              <a href="#collection" className="text-slate-700 hover:text-amber-600 transition-colors font-medium">Collection</a>
              <a href="#galerie" className="text-slate-700 hover:text-amber-600 transition-colors font-medium">Galerie</a>
              <a href="#about" className="text-slate-700 hover:text-amber-600 transition-colors font-medium">À Propos</a>
              <a href="/shop" className="text-slate-700 hover:text-amber-600 transition-colors font-medium">Boutique</a>
              <a href="/cart" className="text-slate-700 hover:text-amber-600 transition-colors font-medium flex items-center gap-2">
                <ShoppingCart className="w-5 h-5" />
                Panier
              </a>
              <a href="#contact" className="text-slate-700 hover:text-amber-600 transition-colors font-medium">Contact</a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className="relative py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-200">Confection sur mesure</Badge>
                <h2 className="text-4xl lg:text-6xl font-serif font-bold text-slate-800 leading-tight">
                  L'Élégance
                  <span className="block text-amber-600">Sénégalaise</span>
                </h2>
                <p className="text-xl text-slate-600 leading-relaxed">
                  Découvrez l'art de la confection sur mesure où l'artisanat traditionnel rencontre le design contemporain. Chaque costume raconte une histoire d'élégance et d'individualité.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" asChild className="bg-slate-800 hover:bg-slate-700 text-white px-8 py-3 rounded-md transition-all duration-300 hover:scale-105">
                  <a href="/shop">Découvrir la Boutique</a>
                </Button>
                <Button size="lg" variant="outline" className="border-amber-600 text-amber-700 hover:bg-amber-50 px-8 py-3 rounded-md transition-all duration-300">
                  Service Personnalisé
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[4/5] rounded-lg shadow-2xl relative overflow-hidden">
                <img 
                  src="/lovable-uploads/0342e967-a795-48ef-9918-5eb3f90d9417.png" 
                  alt="Costume gris élégant double boutonnage SUIT SENEGAL"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                <div className="absolute bottom-6 left-6 text-white">
                  <p className="text-sm font-medium">Collection Prestige</p>
                  <p className="text-lg font-serif">Costume Double Boutonnage</p>
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-amber-400/20 rounded-full blur-xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Collections Preview */}
      <section id="collection" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h3 className="text-3xl lg:text-4xl font-serif font-bold text-slate-800 mb-4">
              Nos Collections
            </h3>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Des créations uniques alliant tradition sénégalaise et modernité, conçues pour sublimer votre silhouette.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Men's Collection - Gray Suit */}
            <Card className="group hover:shadow-xl transition-all duration-300 overflow-hidden">
              <div className="aspect-[3/4] relative overflow-hidden">
                <img 
                  src="/lovable-uploads/0342e967-a795-48ef-9918-5eb3f90d9417.png" 
                  alt="Costume double boutonnage gris homme"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h4 className="text-lg font-serif font-semibold">Collection Homme</h4>
                  <p className="text-sm opacity-90">Double Boutonnage</p>
                </div>
              </div>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div>
                    <h5 className="font-semibold text-slate-800">Costume Prestige Gris</h5>
                    <p className="text-slate-600 text-sm">Élégance intemporelle</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-amber-600">450.000 CFA</span>
                    <Button size="sm" variant="outline" asChild className="hover:bg-slate-50">
                      <a href="/shop">Voir plus</a>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Men's Collection - Beige Suit */}
            <Card className="group hover:shadow-xl transition-all duration-300 overflow-hidden">
              <div className="aspect-[3/4] relative overflow-hidden">
                <img 
                  src="/lovable-uploads/6deb5998-ba20-4c03-8446-ffee8818d7b9.png" 
                  alt="Costume trois pièces beige homme"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h4 className="text-lg font-serif font-semibold">Collection Été</h4>
                  <p className="text-sm opacity-90">Trois pièces</p>
                </div>
              </div>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div>
                    <h5 className="font-semibold text-slate-800">Costume Trois Pièces Beige</h5>
                    <p className="text-slate-600 text-sm">Sophistication moderne</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-amber-600">590.000 CFA</span>
                    <Button size="sm" variant="outline" asChild className="hover:bg-slate-50">
                      <a href="/shop">Voir plus</a>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Women's Collection - Blue Suit */}
            <Card className="group hover:shadow-xl transition-all duration-300 overflow-hidden">
              <div className="aspect-[3/4] relative overflow-hidden">
                <img 
                  src="/lovable-uploads/b481637d-ae7c-42c8-bbc7-517053557d23.png" 
                  alt="Tailleur bleu femme double boutonnage"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h4 className="text-lg font-serif font-semibold">Collection Femme</h4>
                  <p className="text-sm opacity-90">Puissance & Élégance</p>
                </div>
              </div>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div>
                    <h5 className="font-semibold text-slate-800">Tailleur Bleu Royal</h5>
                    <p className="text-slate-600 text-sm">Confiance et charisme</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-amber-600">680.000 CFA</span>
                    <Button size="sm" variant="outline" asChild className="hover:bg-slate-50">
                      <a href="/shop">Commander</a>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-12">
            <Button size="lg" asChild className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-3 rounded-md transition-all duration-300 hover:scale-105">
              <a href="/shop">Voir toute la Collection</a>
            </Button>
          </div>
        </div>
      </section>

      {/* Galerie Section */}
      <section id="galerie" className="py-20 bg-gradient-to-br from-slate-50 to-stone-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h3 className="text-3xl lg:text-4xl font-serif font-bold text-slate-800 mb-4">
              Galerie de nos Créations
            </h3>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Parcourez notre portfolio de créations sur mesure et laissez-vous inspirer par l'artisanat sénégalais.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="space-y-6">
              <div className="aspect-[3/4] rounded-lg shadow-lg overflow-hidden group">
                <img 
                  src="/lovable-uploads/0342e967-a795-48ef-9918-5eb3f90d9417.png" 
                  alt="Costume gris élégant"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="aspect-[3/4] rounded-lg shadow-lg overflow-hidden group">
                <img 
                  src="/lovable-uploads/b481637d-ae7c-42c8-bbc7-517053557d23.png" 
                  alt="Tailleur bleu femme"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            </div>

            <div className="space-y-6 lg:mt-8">
              <div className="aspect-[3/4] rounded-lg shadow-lg overflow-hidden group">
                <img 
                  src="/lovable-uploads/6deb5998-ba20-4c03-8446-ffee8818d7b9.png" 
                  alt="Costume beige trois pièces"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="aspect-[3/4] rounded-lg shadow-lg overflow-hidden group">
                <img 
                  src="/lovable-uploads/ff49a873-9c1d-4ef0-ad93-416ef8156f1b.png" 
                  alt="Manteau carreaux femme"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            </div>

            <div className="space-y-6">
              <div className="aspect-[3/4] rounded-lg shadow-lg overflow-hidden group">
                <img 
                  src="/lovable-uploads/ff49a873-9c1d-4ef0-ad93-416ef8156f1b.png" 
                  alt="Style décontracté chic"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="aspect-[3/4] rounded-lg shadow-lg overflow-hidden group">
                <img 
                  src="/lovable-uploads/0342e967-a795-48ef-9918-5eb3f90d9417.png" 
                  alt="Collection masculine"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            </div>

            <div className="space-y-6 lg:mt-8">
              <div className="aspect-[3/4] rounded-lg shadow-lg overflow-hidden group">
                <img 
                  src="/lovable-uploads/b481637d-ae7c-42c8-bbc7-517053557d23.png" 
                  alt="Élégance professionnelle"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="aspect-[3/4] rounded-lg shadow-lg overflow-hidden group">
                <img 
                  src="/lovable-uploads/6deb5998-ba20-4c03-8446-ffee8818d7b9.png" 
                  alt="Style tropical chic"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <Button size="lg" className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-3 rounded-md transition-all duration-300 hover:scale-105">
              Voir toute la Galerie
            </Button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h3 className="text-3xl lg:text-4xl font-serif font-bold text-slate-800">
                Notre Philosophie
              </h3>
              <div className="space-y-4 text-slate-600 leading-relaxed">
                <p>
                  SUIT SENEGAL incarne l'excellence de l'artisanat sénégalais dans l'art de la confection sur mesure. 
                  Chaque pièce est méticuleusement créée pour sublimer la silhouette unique de celui qui la porte.
                </p>
                <p>
                  Notre engagement envers la qualité et l'individualité se reflète dans chaque détail, 
                  de la sélection des tissus les plus fins à la finition artisanale de nos créations.
                </p>
                <p>
                  Nous fusionnons les techniques traditionnelles avec les tendances contemporaines pour 
                  offrir des vêtements qui racontent une histoire d'élégance intemporelle.
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                  <span className="text-amber-600 font-bold text-xl">+</span>
                </div>
                <div>
                  <p className="font-semibold text-slate-800">Artisanat traditionnel</p>
                  <p className="text-slate-600 text-sm">Savoir-faire authentique</p>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-2xl shadow-xl overflow-hidden">
                <img 
                  src="/lovable-uploads/6deb5998-ba20-4c03-8446-ffee8818d7b9.png" 
                  alt="Artisanat SUIT SENEGAL"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-slate-800 rounded-full opacity-20"></div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-amber-300/30 rounded-full blur-xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-slate-800 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h3 className="text-3xl lg:text-4xl font-serif font-bold mb-4">
              Contactez-nous
            </h3>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              Prenez rendez-vous pour une consultation personnalisée et découvrez l'art de la confection sur mesure.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-amber-600 rounded-full flex items-center justify-center mx-auto">
                <MapPin className="w-8 h-8 text-white" />
              </div>
              <div>
                <h4 className="text-xl font-semibold mb-2">Localisation</h4>
                <p className="text-slate-300">Dakar, Sénégal</p>
              </div>
            </div>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-amber-600 rounded-full flex items-center justify-center mx-auto">
                <Phone className="w-8 h-8 text-white" />
              </div>
              <div>
                <h4 className="text-xl font-semibold mb-2">Téléphone</h4>
                <p className="text-slate-300">+221 78 730 37 37</p>
              </div>
            </div>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-amber-600 rounded-full flex items-center justify-center mx-auto">
                <Instagram className="w-8 h-8 text-white" />
              </div>
              <div>
                <h4 className="text-xl font-semibold mb-2">Instagram</h4>
                <a href="#" className="text-amber-400 hover:text-amber-300 transition-colors">@suitsenegal</a>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <Button size="lg" className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-3 rounded-md transition-all duration-300 hover:scale-105">
              Prendre Rendez-vous
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="space-y-4">
              <h4 className="text-2xl font-serif font-bold">SUIT SENEGAL</h4>
              <p className="text-slate-400">
                L'excellence de l'artisanat sénégalais au service de votre élégance.
              </p>
            </div>
            
            <div className="space-y-4">
              <h5 className="text-lg font-semibold">Collections</h5>
              <ul className="space-y-2 text-slate-400">
                <li><a href="/shop" className="hover:text-amber-400 transition-colors">Homme</a></li>
                <li><a href="/shop" className="hover:text-amber-400 transition-colors">Femme</a></li>
                <li><a href="/shop" className="hover:text-amber-400 transition-colors">Sur mesure</a></li>
              </ul>
            </div>

            <div className="space-y-4">
              <h5 className="text-lg font-semibold">Services</h5>
              <ul className="space-y-2 text-slate-400">
                <li><a href="#" className="hover:text-amber-400 transition-colors">Consultation</a></li>
                <li><a href="#" className="hover:text-amber-400 transition-colors">Prise de mesures</a></li>
                <li><a href="#" className="hover:text-amber-400 transition-colors">Retouches</a></li>
              </ul>
            </div>

            <div className="space-y-4">
              <h5 className="text-lg font-semibold">Contact</h5>
              <div className="space-y-2 text-slate-400">
                <p>Dakar, Sénégal</p>
                <p>+221 78 730 37 37</p>
                <a href="#" className="hover:text-amber-400 transition-colors">contact@suitsenegal.com</a>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-700 mt-12 pt-8 text-center text-slate-400">
            <p>&copy; 2024 SUIT SENEGAL. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>;
};

export default Index;
