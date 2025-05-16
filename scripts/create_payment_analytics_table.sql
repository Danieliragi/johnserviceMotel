-- Create payment_analytics table
CREATE TABLE IF NOT EXISTS payment_analytics (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  payment_method TEXT NOT NULL,
  amount DECIMAL(10, 2) NOT NULL,
  status TEXT NOT NULL,
  currency TEXT NOT NULL,
  error_message TEXT,
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  reservation_id UUID,
  client_id UUID,
  FOREIGN KEY (reservation_id) REFERENCES reservations(id),
  FOREIGN KEY (client_id) REFERENCES clients(id)
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_payment_analytics_timestamp ON payment_analytics(timestamp);
CREATE INDEX IF NOT EXISTS idx_payment_analytics_status ON payment_analytics(status);
CREATE INDEX IF NOT EXISTS idx_payment_analytics_method ON payment_analytics(payment_method);

-- Add RLS policies
ALTER TABLE payment_analytics ENABLE ROW LEVEL SECURITY;

-- Only allow admins to view payment analytics
CREATE POLICY "Admins can view payment analytics"
  ON payment_analytics
  FOR SELECT
  USING (
    auth.role() = 'authenticated' AND 
    EXISTS (
      SELECT 1 FROM utilisateurs
      WHERE utilisateurs.id = auth.uid() AND utilisateurs.role = 'admin'
    )
  );

-- Only allow system to insert payment analytics
CREATE POLICY "System can insert payment analytics"
  ON payment_analytics
  FOR INSERT
  WITH CHECK (true);
