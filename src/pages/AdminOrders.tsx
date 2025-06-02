
import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Mail, Calendar, User, ShoppingCart, Phone, MapPin, LogOut } from "lucide-react";
import AdminPasswordForm from "@/components/AdminPasswordForm";

interface Order {
  id: string;
  email: string;
  phone: string | null;
  total_amount: number;
  status: string;
  created_at: string;
  shipping_address: any;
  order_items: Array<{
    product_name: string;
    quantity: number;
    product_price: number;
    size: string | null;
  }>;
}

const AdminOrders = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if user is already authenticated
    const authenticated = localStorage.getItem('admin-authenticated') === 'true';
    setIsAuthenticated(authenticated);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('admin-authenticated');
    setIsAuthenticated(false);
  };

  const { data: orders, isLoading } = useQuery({
    queryKey: ['admin-orders'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('orders')
        .select(`
          *,
          order_items (
            product_name,
            quantity,
            product_price,
            size
          )
        `)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as Order[];
    },
    enabled: isAuthenticated // Only fetch data when authenticated
  });

  // Show password form if not authenticated
  if (!isAuthenticated) {
    return <AdminPasswordForm onAuthenticated={() => setIsAuthenticated(true)} />;
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-stone-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-amber-600 mx-auto"></div>
          <p className="mt-4 text-slate-600">Chargement des commandes...</p>
        </div>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'confirmed': return 'bg-blue-100 text-blue-800';
      case 'shipped': return 'bg-purple-100 text-purple-800';
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending': return 'En attente';
      case 'confirmed': return 'Confirmée';
      case 'shipped': return 'Expédiée';
      case 'delivered': return 'Livrée';
      case 'cancelled': return 'Annulée';
      default: return status;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-stone-100">
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-sm border-b border-stone-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-serif font-bold text-slate-800">SUIT SENEGAL - Admin</h1>
            <div className="flex items-center gap-4">
              <nav className="hidden md:flex space-x-8">
                <a href="/" className="text-slate-700 hover:text-amber-600 transition-colors font-medium">Accueil</a>
                <a href="/shop" className="text-slate-700 hover:text-amber-600 transition-colors font-medium">Boutique</a>
                <a href="/admin-orders" className="text-amber-600 font-medium">Commandes</a>
                <a href="/order-confirmations" className="text-slate-700 hover:text-amber-600 transition-colors font-medium">Confirmations</a>
              </nav>
              <Button 
                onClick={handleLogout} 
                variant="outline" 
                size="sm"
                className="flex items-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                Déconnexion
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-serif font-bold text-slate-800 mb-2">Gestion des Commandes</h2>
          <p className="text-slate-600">Toutes les commandes reçues sur votre boutique</p>
        </div>

        {!orders?.length ? (
          <div className="text-center py-12">
            <ShoppingCart className="w-24 h-24 text-slate-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-slate-600 mb-2">Aucune commande</h3>
            <p className="text-slate-500">Les commandes apparaîtront ici automatiquement</p>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <Card key={order.id} className="overflow-hidden">
                <CardHeader className="bg-slate-50">
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <ShoppingCart className="w-5 h-5 text-amber-600" />
                      Commande #{order.id.slice(0, 8)}...
                    </CardTitle>
                    <Badge className={getStatusColor(order.status)}>
                      {getStatusText(order.status)}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-slate-600">
                    <div className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      {order.email}
                    </div>
                    {order.phone && (
                      <div className="flex items-center gap-1">
                        <Phone className="w-4 h-4" />
                        {order.phone}
                      </div>
                    )}
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {new Date(order.created_at).toLocaleDateString('fr-FR', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Articles commandés */}
                    <div>
                      <h4 className="font-semibold text-slate-800 mb-3">Articles commandés :</h4>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Article</TableHead>
                            <TableHead>Taille</TableHead>
                            <TableHead>Qté</TableHead>
                            <TableHead>Prix</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {order.order_items?.map((item, index) => (
                            <TableRow key={index}>
                              <TableCell className="font-medium">{item.product_name}</TableCell>
                              <TableCell>{item.size || '-'}</TableCell>
                              <TableCell>{item.quantity}</TableCell>
                              <TableCell>{(item.product_price * item.quantity).toLocaleString()} CFA</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                      <div className="mt-4 pt-4 border-t">
                        <div className="flex justify-between items-center font-bold text-lg">
                          <span>Total :</span>
                          <span className="text-amber-600">{order.total_amount.toLocaleString()} CFA</span>
                        </div>
                      </div>
                    </div>

                    {/* Informations de livraison */}
                    <div>
                      <h4 className="font-semibold text-slate-800 mb-3">Informations de livraison :</h4>
                      <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                        <div className="flex items-start gap-2">
                          <Mail className="w-4 h-4 mt-1 text-slate-500" />
                          <div>
                            <span className="font-medium">Email :</span>
                            <p className="text-slate-700">{order.email}</p>
                          </div>
                        </div>
                        {order.phone && (
                          <div className="flex items-start gap-2">
                            <Phone className="w-4 h-4 mt-1 text-slate-500" />
                            <div>
                              <span className="font-medium">Téléphone :</span>
                              <p className="text-slate-700">{order.phone}</p>
                            </div>
                          </div>
                        )}
                        {order.shipping_address?.address && (
                          <div className="flex items-start gap-2">
                            <MapPin className="w-4 h-4 mt-1 text-slate-500" />
                            <div>
                              <span className="font-medium">Adresse :</span>
                              <p className="text-slate-700">{order.shipping_address.address}</p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminOrders;
