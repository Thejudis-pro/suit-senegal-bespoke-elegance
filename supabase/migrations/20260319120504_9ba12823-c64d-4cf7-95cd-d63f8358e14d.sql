
-- Create products table
CREATE TABLE public.products (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  price NUMERIC NOT NULL,
  category TEXT NOT NULL DEFAULT 'homme',
  image_url TEXT NOT NULL,
  sizes TEXT[] DEFAULT '{}',
  stock INTEGER NOT NULL DEFAULT 0,
  featured BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create cart_items table
CREATE TABLE public.cart_items (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id TEXT NOT NULL,
  product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  quantity INTEGER NOT NULL DEFAULT 1,
  size TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create orders table
CREATE TABLE public.orders (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL,
  phone TEXT,
  shipping_address JSONB,
  total_amount NUMERIC NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create order_items table
CREATE TABLE public.order_items (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id UUID NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
  product_id UUID REFERENCES public.products(id),
  product_name TEXT NOT NULL,
  product_price NUMERIC NOT NULL,
  quantity INTEGER NOT NULL DEFAULT 1,
  size TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cart_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;

-- Products: public read
CREATE POLICY "Anyone can view products" ON public.products FOR SELECT USING (true);

-- Cart items: guest session based
CREATE POLICY "Anyone can view cart items" ON public.cart_items FOR SELECT USING (true);
CREATE POLICY "Anyone can insert cart items" ON public.cart_items FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can update cart items" ON public.cart_items FOR UPDATE USING (true);
CREATE POLICY "Anyone can delete cart items" ON public.cart_items FOR DELETE USING (true);

-- Orders
CREATE POLICY "Anyone can create orders" ON public.orders FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can view orders" ON public.orders FOR SELECT USING (true);
CREATE POLICY "Anyone can update orders" ON public.orders FOR UPDATE USING (true);

-- Order items
CREATE POLICY "Anyone can view order items" ON public.order_items FOR SELECT USING (true);
CREATE POLICY "Anyone can insert order items" ON public.order_items FOR INSERT WITH CHECK (true);

-- Timestamp trigger
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON public.products FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON public.orders FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Seed products
INSERT INTO public.products (name, description, price, category, image_url, sizes, stock, featured) VALUES
('Costume Prestige Gris', 'Costume double boutonnage gris en laine mérinos. Coupe ajustée, finitions artisanales. L''élégance intemporelle incarnée.', 450000, 'homme', '/lovable-uploads/0342e967-a795-48ef-9918-5eb3f90d9417.png', ARRAY['S','M','L','XL','XXL'], 10, true),
('Costume Trois Pièces Beige', 'Ensemble trois pièces en lin premium. Idéal pour les cérémonies et événements estivaux. Sophistication moderne.', 590000, 'homme', '/lovable-uploads/6deb5998-ba20-4c03-8446-ffee8818d7b9.png', ARRAY['S','M','L','XL','XXL'], 8, true),
('Tailleur Bleu Royal', 'Tailleur femme double boutonnage en tissu italien. Coupe structurée pour une silhouette affirmée. Puissance et charisme.', 680000, 'femme', '/lovable-uploads/b481637d-ae7c-42c8-bbc7-517053557d23.png', ARRAY['XS','S','M','L','XL'], 6, true),
('Manteau Carreaux Prestige', 'Manteau oversize à carreaux en laine vierge. Pièce statement pour les journées fraîches. Luxe décontracté.', 520000, 'femme', '/lovable-uploads/ff49a873-9c1d-4ef0-ad93-416ef8156f1b.png', ARRAY['S','M','L','XL'], 5, false),
('Costume Croisé Noir', 'Le classique absolu. Costume croisé en laine super 120s. Finitions main, boutonnière fleur. L''excellence à l''état pur.', 750000, 'homme', '/lovable-uploads/86209660-17e5-4572-91af-5523dd7b03f7.png', ARRAY['S','M','L','XL','XXL'], 4, true),
('Ensemble Safari Chic', 'Ensemble inspiration safari en coton égyptien. Coupe décontractée mais raffinée. Le luxe casual sénégalais.', 380000, 'homme', '/lovable-uploads/938ed564-8209-491f-8d5a-62e6cc0c61ea.png', ARRAY['S','M','L','XL'], 12, false);
