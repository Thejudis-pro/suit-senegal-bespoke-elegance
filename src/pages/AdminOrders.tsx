import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Mail, Calendar, Phone, MapPin, LogOut, Check, Truck, Package, X, ShoppingBag } from 'lucide-react';
import AdminPasswordForm from '@/components/AdminPasswordForm';
import { useToast } from '@/hooks/use-toast';
import Navbar from '@/components/Navbar';

interface Order {
  id: string;
  email: string;
  phone: string | null;
  total_amount: number;
  status: string;
  created_at: string;
  shipping_address: any;
  order_items: Array<{ product_name: string; quantity: number; product_price: number; size: string | null }>;
}

const AdminOrders = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  useEffect(() => {
    setIsAuthenticated(localStorage.getItem('admin-authenticated') === 'true');
  }, []);

  const handleLogout = () => { localStorage.removeItem('admin-authenticated'); setIsAuthenticated(false); };

  const { data: orders, isLoading } = useQuery({
    queryKey: ['admin-orders'],
    queryFn: async () => {
      const { data, error } = await (supabase as any)
        .from('orders')
        .select('*, order_items (product_name, quantity, product_price, size)')
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data as Order[];
    },
    enabled: isAuthenticated,
  });

  const updateOrderStatus = useMutation({
    mutationFn: async ({ orderId, status }: { orderId: string; status: string }) => {
      const { error } = await (supabase as any)
        .from('orders')
        .update({ status, updated_at: new Date().toISOString() })
        .eq('id', orderId);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-orders'] });
      toast({ title: 'Statut mis à jour' });
    },
    onError: () => toast({ title: 'Erreur', variant: 'destructive' }),
  });

  if (!isAuthenticated) return <AdminPasswordForm onAuthenticated={() => setIsAuthenticated(true)} />;

  const statusConfig: Record<string, { label: string; class: string }> = {
    pending: { label: 'En attente', class: 'bg-accent/20 text-accent border-accent/30' },
    confirmed: { label: 'Confirmée', class: 'bg-blue-100 text-blue-800 border-blue-200' },
    shipped: { label: 'Expédiée', class: 'bg-purple-100 text-purple-800 border-purple-200' },
    delivered: { label: 'Livrée', class: 'bg-green-100 text-green-800 border-green-200' },
    cancelled: { label: 'Annulée', class: 'bg-destructive/10 text-destructive border-destructive/20' },
  };

  const getActions = (orderId: string, status: string) => {
    const isPending = updateOrderStatus.isPending;
    const actions: Record<string, JSX.Element> = {
      pending: (
        <div className="flex gap-2">
          <Button size="sm" onClick={() => updateOrderStatus.mutate({ orderId, status: 'confirmed' })} disabled={isPending} className="bg-blue-600 hover:bg-blue-700 rounded-none text-xs"><Check className="w-3 h-3 mr-1" />Confirmer</Button>
          <Button size="sm" variant="destructive" onClick={() => updateOrderStatus.mutate({ orderId, status: 'cancelled' })} disabled={isPending} className="rounded-none text-xs"><X className="w-3 h-3 mr-1" />Annuler</Button>
        </div>
      ),
      confirmed: (
        <div className="flex gap-2">
          <Button size="sm" onClick={() => updateOrderStatus.mutate({ orderId, status: 'shipped' })} disabled={isPending} className="bg-purple-600 hover:bg-purple-700 rounded-none text-xs"><Truck className="w-3 h-3 mr-1" />Expédier</Button>
          <Button size="sm" variant="destructive" onClick={() => updateOrderStatus.mutate({ orderId, status: 'cancelled' })} disabled={isPending} className="rounded-none text-xs"><X className="w-3 h-3 mr-1" />Annuler</Button>
        </div>
      ),
      shipped: (
        <Button size="sm" onClick={() => updateOrderStatus.mutate({ orderId, status: 'delivered' })} disabled={isPending} className="bg-green-600 hover:bg-green-700 rounded-none text-xs"><Package className="w-3 h-3 mr-1" />Livré</Button>
      ),
    };
    return actions[status] || null;
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-20">
        <div className="bg-primary py-12 lg:py-16">
          <div className="container mx-auto px-6 lg:px-12 flex items-center justify-between">
            <div>
              <p className="font-body text-xs tracking-[0.35em] uppercase text-gold mb-2">Administration</p>
              <h1 className="font-display text-3xl lg:text-4xl font-bold text-primary-foreground">Commandes</h1>
            </div>
            <Button onClick={handleLogout} variant="outline" size="sm" className="border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10 rounded-none font-body text-xs tracking-wider uppercase">
              <LogOut className="w-4 h-4 mr-2" />Déconnexion
            </Button>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-6 lg:px-12 py-12">
        {isLoading ? (
          <div className="flex justify-center py-32">
            <div className="w-12 h-12 border-2 border-gold border-t-transparent rounded-full animate-spin" />
          </div>
        ) : !orders?.length ? (
          <div className="text-center py-20">
            <ShoppingBag className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
            <h3 className="font-display text-xl font-semibold text-foreground">Aucune commande</h3>
            <p className="font-body text-sm text-muted-foreground mt-2">Les commandes apparaîtront ici.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => {
              const sc = statusConfig[order.status] || { label: order.status, class: 'bg-muted text-muted-foreground' };
              return (
                <div key={order.id} className="border border-border bg-card">
                  {/* Header */}
                  <div className="p-6 border-b border-border bg-cream flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <h3 className="font-display text-lg font-semibold text-foreground">
                          #{order.id.slice(0, 8)}
                        </h3>
                        <Badge className={`${sc.class} rounded-none font-body text-[10px] tracking-[0.1em] uppercase border`}>
                          {sc.label}
                        </Badge>
                      </div>
                      <div className="flex flex-wrap gap-4 font-body text-xs text-muted-foreground">
                        <span className="flex items-center gap-1"><Mail className="w-3 h-3" />{order.email}</span>
                        {order.phone && <span className="flex items-center gap-1"><Phone className="w-3 h-3" />{order.phone}</span>}
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {new Date(order.created_at).toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                    </div>
                    {getActions(order.id, order.status)}
                  </div>

                  {/* Body */}
                  <div className="p-6 grid lg:grid-cols-2 gap-6">
                    <div>
                      <p className="font-body text-xs tracking-[0.15em] uppercase text-muted-foreground mb-3">Articles</p>
                      <Table>
                        <TableHeader>
                          <TableRow><TableHead className="font-body text-xs">Article</TableHead><TableHead className="font-body text-xs">Taille</TableHead><TableHead className="font-body text-xs">Qté</TableHead><TableHead className="font-body text-xs text-right">Prix</TableHead></TableRow>
                        </TableHeader>
                        <TableBody>
                          {order.order_items?.map((item, idx) => (
                            <TableRow key={idx}>
                              <TableCell className="font-body text-sm">{item.product_name}</TableCell>
                              <TableCell className="font-body text-sm">{item.size || '—'}</TableCell>
                              <TableCell className="font-body text-sm">{item.quantity}</TableCell>
                              <TableCell className="font-body text-sm text-right">{(item.product_price * item.quantity).toLocaleString()} CFA</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                      <div className="mt-4 pt-4 border-t border-border flex justify-between">
                        <span className="font-body text-sm font-semibold">Total</span>
                        <span className="font-display text-lg font-bold text-gold">{order.total_amount.toLocaleString()} CFA</span>
                      </div>
                    </div>

                    {(order.shipping_address?.address || order.phone) && (
                      <div>
                        <p className="font-body text-xs tracking-[0.15em] uppercase text-muted-foreground mb-3">Livraison</p>
                        <div className="bg-cream p-4 space-y-3 font-body text-sm">
                          <div className="flex items-start gap-2"><Mail className="w-4 h-4 text-muted-foreground mt-0.5" /><span>{order.email}</span></div>
                          {order.phone && <div className="flex items-start gap-2"><Phone className="w-4 h-4 text-muted-foreground mt-0.5" /><span>{order.phone}</span></div>}
                          {order.shipping_address?.address && <div className="flex items-start gap-2"><MapPin className="w-4 h-4 text-muted-foreground mt-0.5" /><span>{order.shipping_address.address}</span></div>}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminOrders;
