
import { useState, useEffect } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Trash2, Plus, Minus, ShoppingBag } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface CartItem {
  id: string;
  product_id: string;
  quantity: number;
  size: string | null;
  products: {
    name: string;
    price: number;
    image_url: string;
    stock: number;
  };
}

const Cart = () => {
  const [customerInfo, setCustomerInfo] = useState({
    email: '',
    phone: '',
    address: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: cartItems, isLoading } = useQuery({
    queryKey: ['cart'],
    queryFn: async () => {
      const sessionId = localStorage.getItem('cart_session_id');
      if (!sessionId) return [];

      const { data, error } = await supabase
        .from('cart_items')
        .select(`
          id,
          product_id,
          quantity,
          size,
          products (
            name,
            price,
            image_url,
            stock
          )
        `)
        .eq('session_id', sessionId);
      
      if (error) throw error;
      return data as CartItem[];
    }
  });

  const updateQuantity = async (itemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      await removeItem(itemId);
      return;
    }

    try {
      const { error } = await supabase
        .from('cart_items')
        .update({ quantity: newQuantity })
        .eq('id', itemId);

      if (error) throw error;
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    } catch (error) {
      console.error('Error updating quantity:', error);
      toast({
        title: "Erreur",
        description: "Impossible de mettre à jour la quantité",
        variant: "destructive"
      });
    }
  };

  const removeItem = async (itemId: string) => {
    try {
      const { error } = await supabase
        .from('cart_items')
        .delete()
        .eq('id', itemId);

      if (error) throw error;
      queryClient.invalidateQueries({ queryKey: ['cart'] });
      toast({
        title: "Produit retiré",
        description: "Le produit a été retiré de votre panier"
      });
    } catch (error) {
      console.error('Error removing item:', error);
      toast({
        title: "Erreur",
        description: "Impossible de retirer le produit",
        variant: "destructive"
      });
    }
  };

  const totalAmount = cartItems?.reduce((total, item) => 
    total + (item.products.price * item.quantity), 0
  ) || 0;

  const handleCheckout = async () => {
    if (!cartItems?.length) return;
    if (!customerInfo.email || !customerInfo.phone) {
      toast({
        title: "Informations manquantes",
        description: "Veuillez remplir votre email et téléphone",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    try {
      // Create order
      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert({
          email: customerInfo.email,
          phone: customerInfo.phone,
          shipping_address: { address: customerInfo.address },
          total_amount: totalAmount,
          status: 'pending'
        })
        .select()
        .single();

      if (orderError) throw orderError;

      // Create order items
      const orderItems = cartItems.map(item => ({
        order_id: order.id,
        product_id: item.product_id,
        product_name: item.products.name,
        product_price: item.products.price,
        quantity: item.quantity,
        size: item.size
      }));

      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItems);

      if (itemsError) throw itemsError;

      // Clear cart
      const sessionId = localStorage.getItem('cart_session_id');
      if (sessionId) {
        await supabase
          .from('cart_items')
          .delete()
          .eq('session_id', sessionId);
      }

      queryClient.invalidateQueries({ queryKey: ['cart'] });
      toast({
        title: "Commande créée",
        description: "Votre commande a été enregistrée. Nous vous contacterons bientôt.",
      });

      // Reset form
      setCustomerInfo({ email: '', phone: '', address: '' });

    } catch (error) {
      console.error('Error creating order:', error);
      toast({
        title: "Erreur",
        description: "Impossible de créer la commande",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-stone-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-amber-600 mx-auto"></div>
          <p className="mt-4 text-slate-600">Chargement du panier...</p>
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
              <a href="/shop" className="text-slate-700 hover:text-amber-600 transition-colors font-medium">Boutique</a>
              <a href="/cart" className="text-amber-600 font-medium">Panier</a>
            </nav>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-serif font-bold text-slate-800 mb-2">Votre Panier</h2>
        </div>

        {!cartItems?.length ? (
          <div className="text-center py-12">
            <ShoppingBag className="w-24 h-24 text-slate-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-slate-600 mb-2">Votre panier est vide</h3>
            <p className="text-slate-500 mb-6">Découvrez notre collection de costumes d'exception</p>
            <Button asChild className="bg-slate-800 hover:bg-slate-700">
              <a href="/shop">Voir la boutique</a>
            </Button>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <Card key={item.id}>
                  <CardContent className="p-6">
                    <div className="flex gap-4">
                      <img 
                        src={item.products.image_url} 
                        alt={item.products.name}
                        className="w-24 h-32 object-cover rounded"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-slate-800">{item.products.name}</h3>
                        {item.size && (
                          <p className="text-sm text-slate-600">Taille: {item.size}</p>
                        )}
                        <p className="text-lg font-bold text-amber-600 mt-2">
                          {item.products.price.toLocaleString()} CFA
                        </p>
                        
                        <div className="flex items-center gap-3 mt-4">
                          <div className="flex items-center gap-2">
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            >
                              <Minus className="w-4 h-4" />
                            </Button>
                            <span className="w-12 text-center">{item.quantity}</span>
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            >
                              <Plus className="w-4 h-4" />
                            </Button>
                          </div>
                          <Button 
                            size="sm" 
                            variant="destructive"
                            onClick={() => removeItem(item.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Order Summary */}
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Récapitulatif</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between text-lg font-semibold">
                    <span>Total:</span>
                    <span className="text-amber-600">{totalAmount.toLocaleString()} CFA</span>
                  </div>
                  
                  <div className="space-y-4 pt-4 border-t">
                    <h4 className="font-semibold">Vos informations</h4>
                    <Input
                      placeholder="Email *"
                      value={customerInfo.email}
                      onChange={(e) => setCustomerInfo(prev => ({ ...prev, email: e.target.value }))}
                    />
                    <Input
                      placeholder="Téléphone *"
                      value={customerInfo.phone}
                      onChange={(e) => setCustomerInfo(prev => ({ ...prev, phone: e.target.value }))}
                    />
                    <Textarea
                      placeholder="Adresse de livraison"
                      value={customerInfo.address}
                      onChange={(e) => setCustomerInfo(prev => ({ ...prev, address: e.target.value }))}
                    />
                  </div>

                  <Button 
                    className="w-full bg-slate-800 hover:bg-slate-700"
                    onClick={handleCheckout}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Création...' : 'Passer commande'}
                  </Button>
                  
                  <p className="text-xs text-slate-500 text-center">
                    Nous vous contacterons pour confirmer votre commande et organiser le paiement.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
