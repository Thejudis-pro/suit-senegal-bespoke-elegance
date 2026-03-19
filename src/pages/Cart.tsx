import { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

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
  const [customerInfo, setCustomerInfo] = useState({ email: '', phone: '', address: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: cartItems, isLoading } = useQuery({
    queryKey: ['cart'],
    queryFn: async () => {
      const sessionId = localStorage.getItem('cart_session_id');
      if (!sessionId) return [];
      const { data, error } = await (supabase as any)
        .from('cart_items')
        .select('id, product_id, quantity, size, products (name, price, image_url, stock)')
        .eq('session_id', sessionId);
      if (error) throw error;
      return data as CartItem[];
    },
  });

  const updateQuantity = async (itemId: string, newQuantity: number) => {
    if (newQuantity <= 0) { await removeItem(itemId); return; }
    try {
      const { error } = await (supabase as any).from('cart_items').update({ quantity: newQuantity }).eq('id', itemId);
      if (error) throw error;
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    } catch { toast({ title: 'Erreur', description: 'Impossible de modifier la quantité', variant: 'destructive' }); }
  };

  const removeItem = async (itemId: string) => {
    try {
      const { error } = await (supabase as any).from('cart_items').delete().eq('id', itemId);
      if (error) throw error;
      queryClient.invalidateQueries({ queryKey: ['cart'] });
      toast({ title: 'Retiré', description: 'Produit retiré du panier' });
    } catch { toast({ title: 'Erreur', description: 'Impossible de retirer', variant: 'destructive' }); }
  };

  const totalAmount = cartItems?.reduce((t, item) => t + item.products.price * item.quantity, 0) || 0;

  const handleCheckout = async () => {
    if (!cartItems?.length) return;
    if (!customerInfo.email || !customerInfo.phone) {
      toast({ title: 'Informations manquantes', description: 'Email et téléphone requis', variant: 'destructive' });
      return;
    }
    setIsSubmitting(true);
    try {
      const { data: order, error: orderError } = await (supabase as any)
        .from('orders')
        .insert({ email: customerInfo.email, phone: customerInfo.phone, shipping_address: { address: customerInfo.address }, total_amount: totalAmount, status: 'pending' })
        .select()
        .single();
      if (orderError) throw orderError;

      const orderItems = cartItems!.map((item) => ({
        order_id: order.id,
        product_id: item.product_id,
        product_name: item.products.name,
        product_price: item.products.price,
        quantity: item.quantity,
        size: item.size,
      }));
      const { error: itemsError } = await (supabase as any).from('order_items').insert(orderItems);
      if (itemsError) throw itemsError;

      const sessionId = localStorage.getItem('cart_session_id');
      if (sessionId) await (supabase as any).from('cart_items').delete().eq('session_id', sessionId);

      queryClient.invalidateQueries({ queryKey: ['cart'] });
      toast({ title: 'Commande créée ✦', description: 'Nous vous contacterons très bientôt.' });
      setCustomerInfo({ email: '', phone: '', address: '' });
    } catch {
      toast({ title: 'Erreur', description: 'Impossible de passer la commande', variant: 'destructive' });
    } finally { setIsSubmitting(false); }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-20">
        <div className="bg-primary py-16 lg:py-20">
          <div className="container mx-auto px-6 lg:px-12 text-center">
            <p className="font-body text-xs tracking-[0.35em] uppercase text-gold mb-4">Panier</p>
            <h1 className="font-display text-4xl lg:text-5xl font-bold text-primary-foreground">Votre Sélection</h1>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-6 lg:px-12 py-12 lg:py-16">
        {isLoading ? (
          <div className="flex justify-center py-32">
            <div className="w-12 h-12 border-2 border-gold border-t-transparent rounded-full animate-spin" />
          </div>
        ) : !cartItems?.length ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20 space-y-6">
            <ShoppingBag className="w-16 h-16 text-muted-foreground/30 mx-auto" />
            <h3 className="font-display text-2xl font-semibold text-foreground">Votre panier est vide</h3>
            <p className="font-body text-muted-foreground">Découvrez notre collection d'exception</p>
            <Button asChild className="bg-gold hover:bg-gold-dark text-primary rounded-none font-body text-sm tracking-[0.12em] uppercase px-10 py-5">
              <Link to="/shop">Voir la Collection <ArrowRight className="ml-2 w-4 h-4" /></Link>
            </Button>
          </motion.div>
        ) : (
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Items */}
            <div className="lg:col-span-3 space-y-6">
              {cartItems.map((item, i) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex gap-6 pb-6 border-b border-border"
                >
                  <img src={item.products.image_url} alt={item.products.name} className="w-24 h-32 object-cover bg-cream" loading="lazy" />
                  <div className="flex-1 space-y-2">
                    <h3 className="font-display text-lg font-semibold text-foreground">{item.products.name}</h3>
                    {item.size && <p className="font-body text-xs text-muted-foreground tracking-wider uppercase">Taille: {item.size}</p>}
                    <p className="font-display text-lg text-gold font-medium">{item.products.price.toLocaleString()} CFA</p>
                    <div className="flex items-center gap-4 pt-2">
                      <div className="flex items-center border border-border">
                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="px-3 py-2 hover:bg-muted transition-colors">
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-4 py-2 font-body text-sm border-x border-border">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="px-3 py-2 hover:bg-muted transition-colors">
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <button onClick={() => removeItem(item.id)} className="text-muted-foreground hover:text-destructive transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Summary */}
            <div className="lg:col-span-2">
              <div className="bg-cream p-8 space-y-6 sticky top-28">
                <h3 className="font-display text-xl font-bold text-foreground">Récapitulatif</h3>
                <div className="flex justify-between items-center py-4 border-y border-border">
                  <span className="font-body text-sm text-muted-foreground uppercase tracking-wider">Total</span>
                  <span className="font-display text-2xl font-bold text-gold">{totalAmount.toLocaleString()} CFA</span>
                </div>

                <div className="space-y-4">
                  <p className="font-body text-xs tracking-[0.15em] uppercase text-muted-foreground">Vos informations</p>
                  <Input placeholder="Email *" value={customerInfo.email} onChange={(e) => setCustomerInfo((p) => ({ ...p, email: e.target.value }))} className="rounded-none font-body text-sm border-border" />
                  <Input placeholder="Téléphone *" value={customerInfo.phone} onChange={(e) => setCustomerInfo((p) => ({ ...p, phone: e.target.value }))} className="rounded-none font-body text-sm border-border" />
                  <Textarea placeholder="Adresse de livraison" value={customerInfo.address} onChange={(e) => setCustomerInfo((p) => ({ ...p, address: e.target.value }))} className="rounded-none font-body text-sm border-border resize-none" rows={3} />
                </div>

                <Button onClick={handleCheckout} disabled={isSubmitting} className="w-full bg-gold hover:bg-gold-dark text-primary rounded-none font-body text-sm tracking-[0.12em] uppercase py-5">
                  {isSubmitting ? 'Envoi en cours...' : 'Passer Commande'}
                </Button>
                <p className="font-body text-[11px] text-muted-foreground text-center leading-relaxed">
                  Nous vous contacterons pour confirmer et organiser le paiement.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Cart;
