-- Création de la table reservations si elle n'existe pas
CREATE TABLE IF NOT EXISTS public.reservations (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  client_id UUID NOT NULL REFERENCES public.clients(id) ON DELETE CASCADE,
  chambre_id UUID NOT NULL REFERENCES public.chambres(id) ON DELETE CASCADE,
  date_arrivee TIMESTAMP WITH TIME ZONE NOT NULL,
  date_depart TIMESTAMP WITH TIME ZONE NOT NULL,
  statut TEXT NOT NULL DEFAULT 'En attente' CHECK (statut IN ('Confirmé', 'En attente', 'Annulé')),
  code_reservation TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  
  -- Contrainte pour s'assurer que la date de départ est après la date d'arrivée
  CONSTRAINT date_depart_apres_arrivee CHECK (date_depart > date_arrivee)
);

-- Création d'index pour améliorer les performances des requêtes
CREATE INDEX IF NOT EXISTS idx_reservations_client_id ON public.reservations(client_id);
CREATE INDEX IF NOT EXISTS idx_reservations_chambre_id ON public.reservations(chambre_id);
CREATE INDEX IF NOT EXISTS idx_reservations_dates ON public.reservations(date_arrivee, date_depart);
CREATE INDEX IF NOT EXISTS idx_reservations_statut ON public.reservations(statut);
