
import { useQuery } from '@tanstack/react-query';
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Mail, Calendar, User } from "lucide-react";

interface OrderConfirmation {
  id: string;
  order_id: string;
  email: string;
  message: string;
  sent: boolean;
  created_at: string;
}

const OrderConfirmations = () => {
  const { data: confirmations, isLoading } = useQuery({
    queryKey: ['order-confirmations'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('order_confirmations')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as OrderConfirmation[];
    }
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-stone-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-amber-600 mx-auto"></div>
          <p className="mt-4 text-slate-600">Chargement des confirmations...</p>
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
              <a href="/cart" className="text-slate-700 hover:text-amber-600 transition-colors font-medium">Panier</a>
              <a href="/order-confirmations" className="text-amber-600 font-medium">Confirmations</a>
            </nav>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-serif font-bold text-slate-800 mb-2">Confirmations de Commande</h2>
          <p className="text-slate-600">Emails de confirmation générés automatiquement</p>
        </div>

        {!confirmations?.length ? (
          <div className="text-center py-12">
            <Mail className="w-24 h-24 text-slate-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-slate-600 mb-2">Aucune confirmation</h3>
            <p className="text-slate-500">Les confirmations d'email apparaîtront ici automatiquement</p>
          </div>
        ) : (
          <div className="space-y-6">
            {confirmations.map((confirmation) => (
              <Card key={confirmation.id} className="overflow-hidden">
                <CardHeader className="bg-slate-50">
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <Mail className="w-5 h-5 text-amber-600" />
                      Commande #{confirmation.order_id.slice(0, 8)}...
                    </CardTitle>
                    <Badge variant={confirmation.sent ? "default" : "secondary"}>
                      {confirmation.sent ? "Envoyé" : "En attente"}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-slate-600">
                    <div className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      {confirmation.email}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {new Date(confirmation.created_at).toLocaleDateString('fr-FR', {
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
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-slate-800 mb-3">Message de confirmation :</h4>
                    <pre className="whitespace-pre-wrap text-sm text-slate-700 font-mono">
                      {confirmation.message}
                    </pre>
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

export default OrderConfirmations;
