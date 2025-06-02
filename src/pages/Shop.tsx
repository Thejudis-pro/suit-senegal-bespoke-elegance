import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ShoppingCart, Filter } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

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
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('featured', { ascending: false })
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as Product[];
    }
  });

  const addToCart = async (product: Product, size?: string) => {
    try {
      // Generate a session ID for guest users
      let sessionId = localStorage.getItem('cart_session_id');
      if (!sessionId) {
        sessionId = `guest_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        localStorage.setItem('cart_session_id', sessionId);
      }

      const { error } = await supabase
        .from('cart_items')
        .insert({
          session_id: sessionId,
          product_id: product.id,
          quantity: 1,
          size: size || null
        });

      if (error) throw error;

      toast({
        title: "Produit ajouté",
        description: `${product.name} a été ajouté à votre panier`,
      });

      setSelectedProduct(null);
      setSelectedSize('');
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast({
        title: "Erreur",
        description: "Impossible d'ajouter le produit au panier",
        variant: "destructive"
      });
    }
  };

  const filteredProducts = products?.filter(product => 
    selectedCategory === 'all' || product.category === selectedCategory
  ) || [];

  const categories = [...new Set(products?.map(p => p.category) || [])];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-stone-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-amber-600 mx-auto"></div>
          <p className="mt-4 text-slate-600">Chargement des produits...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-stone-100">
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-sm border-b border-stone-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-serif font-bold text-slate-800">SUIT SENEGAL</h1>
            <nav className="hidden md:flex space-x-8">
              <a href="/" className="text-slate-700 hover:text-amber-600 transition-colors font-medium">Accueil</a>
              <a href="/shop" className="text-amber-600 font-medium">Boutique</a>
              <a href="/#contact" className="text-slate-700 hover:text-amber-600 transition-colors font-medium">Contact</a>
              <a href="/cart" className="text-slate-700 hover:text-amber-600 transition-colors font-medium flex items-center gap-2">
                <ShoppingCart className="w-5 h-5" />
                Panier
              </a>
            </nav>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Page Title */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-serif font-bold text-slate-800 mb-4">Notre Boutique</h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Découvrez notre collection exclusive de costumes sur mesure, alliant tradition sénégalaise et élégance moderne.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-slate-600" />
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Toutes catégories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes catégories</SelectItem>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="group hover:shadow-xl transition-all duration-300 overflow-hidden">
              <div className="aspect-[3/4] relative overflow-hidden">
                <img 
                  src={product.image_url} 
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {product.featured && (
                  <Badge className="absolute top-4 left-4 bg-amber-600 text-white">
                    Coup de cœur
                  </Badge>
                )}
                {product.stock === 0 && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <Badge variant="destructive">Rupture de stock</Badge>
                  </div>
                )}
              </div>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-slate-800 text-lg">{product.name}</h3>
                    <p className="text-slate-600 text-sm line-clamp-2">{product.description}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-amber-600">
                      {product.price.toLocaleString()} CFA
                    </span>
                    {product.stock > 0 && (
                      <Button 
                        onClick={() => setSelectedProduct(product)}
                        className="bg-slate-800 hover:bg-slate-700"
                      >
                        Choisir
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-slate-600 text-lg">Aucun produit trouvé dans cette catégorie.</p>
          </div>
        )}
      </div>

      {/* Product Selection Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-xl font-serif font-bold mb-4">{selectedProduct.name}</h3>
            <p className="text-slate-600 mb-4">{selectedProduct.description}</p>
            <p className="text-2xl font-bold text-amber-600 mb-6">
              {selectedProduct.price.toLocaleString()} CFA
            </p>
            
            {selectedProduct.sizes && selectedProduct.sizes.length > 0 && (
              <div className="mb-6">
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Taille
                </label>
                <Select value={selectedSize} onValueChange={setSelectedSize}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner une taille" />
                  </SelectTrigger>
                  <SelectContent>
                    {selectedProduct.sizes.map(size => (
                      <SelectItem key={size} value={size}>{size}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            <div className="flex gap-3">
              <Button 
                variant="outline" 
                onClick={() => {
                  setSelectedProduct(null);
                  setSelectedSize('');
                }}
                className="flex-1"
              >
                Annuler
              </Button>
              <Button 
                onClick={() => addToCart(selectedProduct, selectedSize)}
                disabled={selectedProduct.sizes?.length > 0 && !selectedSize}
                className="flex-1 bg-slate-800 hover:bg-slate-700"
              >
                Ajouter au panier
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Shop;
