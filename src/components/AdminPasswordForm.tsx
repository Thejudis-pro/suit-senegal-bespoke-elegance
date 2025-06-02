
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Lock } from "lucide-react";

interface AdminPasswordFormProps {
  onAuthenticated: () => void;
}

const AdminPasswordForm = ({ onAuthenticated }: AdminPasswordFormProps) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple password check - in production, this should be more secure
    if (password === 'admin123') {
      localStorage.setItem('admin-authenticated', 'true');
      onAuthenticated();
    } else {
      setError('Mot de passe incorrect');
      setPassword('');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-stone-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center gap-2 text-2xl">
            <Lock className="w-6 h-6 text-amber-600" />
            Accès Administration
          </CardTitle>
          <p className="text-slate-600">Entrez le mot de passe pour accéder aux commandes</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="password">Mot de passe</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Entrez votre mot de passe"
                className="w-full"
              />
            </div>
            {error && (
              <p className="text-red-600 text-sm">{error}</p>
            )}
            <Button type="submit" className="w-full bg-amber-600 hover:bg-amber-700">
              Se connecter
            </Button>
          </form>
          <div className="mt-4 p-3 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>Mot de passe par défaut :</strong> admin123
            </p>
            <p className="text-xs text-blue-600 mt-1">
              Changez ce mot de passe en production !
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminPasswordForm;
