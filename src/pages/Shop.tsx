import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ShoppingBag, Filter, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image_url: string;
  sizes: string[];
  stock: number;
  featured: boolean;
}

const Shop = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const { toast } = useToast();

  const { data: products, isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const { data, error } = await (supabase as any)
        .from('products')
        .select('*')
        .order('featured', { ascending: false })
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data as Product[];
    },
  });

  const addToCart = async (product: Product, size?: string) => {
    try {
      let sessionId = localStorage.getItem('cart_session_id');
      if (!sessionId) {
        sessionId = `guest_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        localStorage.setItem('cart_session_id', sessionId);
      }
      const { error } = await (supabase as any)
        .from('cart_items')
        .insert({ session_id: sessionId, product_id: product.id, quantity: 1, size: size || null });
      if (error) throw error;
      toast({ title: 'Ajouté au panier', description: `${product.name} a été ajouté.` });
      setSelectedProduct(null);
      setSelectedSize('');
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast({ title: 'Erreur', description: "Impossible d'ajouter au panier", variant: 'destructive' });
    }
  };

  const filteredProducts = products?.filter(
    (p) => selectedCategory === 'all' || p.category === selectedCategory
  ) || [];

  const categories = [...new Set(products?.map((p) => p.category) || [])];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero banner */}
      <section className="pt-20">
        <div className="bg-primary py-20 lg:py-28">
          <div className="container mx-auto px-6 lg:px-12 text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <p className="font-body text-xs tracking-[0.35em] uppercase text-gold mb-4">Boutique</p>
              <h1 className="font-display text-4xl lg:text-6xl font-bold text-primary-foreground">
                Notre Collection
              </h1>
            </motion.div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-6 lg:px-12 py-12 lg:py-16">
        {/* Filters */}
        <div className="flex items-center gap-4 mb-12">
          <Filter className="w-4 h-4 text-muted-foreground" />
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-48 rounded-none border-border font-body text-sm">
              <SelectValue placeholder="Toutes catégories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Toutes catégories</SelectItem>
              {categories.map((cat) => (
                <SelectItem key={cat} value={cat} className="capitalize">{cat}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-32">
            <div className="w-12 h-12 border-2 border-gold border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
            {filteredProducts.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                className="group"
              >
                <div className="aspect-[3/4] overflow-hidden mb-5 relative bg-cream">
                  <img
                    src={product.image_url}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  {product.featured && (
                    <Badge className="absolute top-4 left-4 bg-gold text-primary rounded-none font-body text-[10px] tracking-[0.15em] uppercase">
                      Coup de cœur
                    </Badge>
                  )}
                  {product.stock === 0 && (
                    <div className="absolute inset-0 bg-primary/60 flex items-center justify-center">
                      <span className="font-body text-xs tracking-[0.2em] uppercase text-primary-foreground">Épuisé</span>
                    </div>
                  )}
                  {product.stock > 0 && (
                    <div className="absolute inset-0 flex items-end justify-center pb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <Button
                        onClick={() => setSelectedProduct(product)}
                        className="bg-primary/90 hover:bg-primary text-primary-foreground font-body text-xs tracking-[0.12em] uppercase px-8 py-3 rounded-none backdrop-blur-sm"
                      >
                        <ShoppingBag className="w-4 h-4 mr-2" />
                        Choisir
                      </Button>
                    </div>
                  )}
                </div>
                <div className="space-y-1">
                  <p className="font-body text-xs tracking-[0.15em] uppercase text-muted-foreground">
                    {product.category}
                  </p>
                  <h3 className="font-display text-lg font-semibold text-foreground">{product.name}</h3>
                  <p className="font-display text-base text-gold font-medium">
                    {product.price.toLocaleString()} CFA
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {!isLoading && filteredProducts.length === 0 && (
          <div className="text-center py-20">
            <p className="font-body text-muted-foreground">Aucun produit trouvé dans cette catégorie.</p>
          </div>
        )}
      </div>

      {/* Product Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-primary/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => { setSelectedProduct(null); setSelectedSize(''); }}
          >
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-background max-w-lg w-full p-8 relative"
            >
              <button
                onClick={() => { setSelectedProduct(null); setSelectedSize(''); }}
                className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"
              >
                <X className="w-5 h-5" />
              </button>

              <p className="font-body text-xs tracking-[0.2em] uppercase text-gold mb-2">
                {selectedProduct.category}
              </p>
              <h3 className="font-display text-2xl font-bold text-foreground mb-2">{selectedProduct.name}</h3>
              <p className="font-body text-sm text-muted-foreground mb-4">{selectedProduct.description}</p>
              <p className="font-display text-2xl text-gold font-bold mb-6">
                {selectedProduct.price.toLocaleString()} CFA
              </p>

              {selectedProduct.sizes?.length > 0 && (
                <div className="mb-6">
                  <label className="font-body text-xs tracking-[0.15em] uppercase text-muted-foreground mb-3 block">
                    Taille
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {selectedProduct.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`font-body text-sm px-4 py-2 border transition-colors ${
                          selectedSize === size
                            ? 'bg-primary text-primary-foreground border-primary'
                            : 'border-border text-foreground hover:border-gold'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => { setSelectedProduct(null); setSelectedSize(''); }}
                  className="flex-1 rounded-none font-body text-sm tracking-[0.1em] uppercase"
                >
                  Annuler
                </Button>
                <Button
                  onClick={() => addToCart(selectedProduct, selectedSize)}
                  disabled={selectedProduct.sizes?.length > 0 && !selectedSize}
                  className="flex-1 bg-gold hover:bg-gold-dark text-primary rounded-none font-body text-sm tracking-[0.1em] uppercase"
                >
                  Ajouter au panier
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
};

export default Shop;
