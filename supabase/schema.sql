-- Glowly - Schema e dados iniciais
-- Execute este arquivo no SQL Editor do Supabase

-- Tabela de perfis de usuário
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT,
  email TEXT,
  phone TEXT,
  role TEXT NOT NULL DEFAULT 'client' CHECK (role IN ('client', 'professional', 'admin')),
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);


ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public profiles are viewable by everyone" ON profiles FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- Tabela de serviços
CREATE TABLE IF NOT EXISTS services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  duration INTEGER NOT NULL CHECK (duration > 0),
  price DECIMAL(10, 2) NOT NULL CHECK (price >= 0),
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Tabela de profissionais
CREATE TABLE IF NOT EXISTS professionals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Tabela de associação profissional <-> serviços (N:N)
CREATE TABLE IF NOT EXISTS professional_services (
  professional_id UUID NOT NULL REFERENCES professionals(id) ON DELETE CASCADE,
  service_id UUID NOT NULL REFERENCES services(id) ON DELETE CASCADE,
  PRIMARY KEY (professional_id, service_id)
);

-- Tabela de horários de trabalho dos profissionais
CREATE TABLE IF NOT EXISTS professional_schedules (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  professional_id UUID NOT NULL REFERENCES professionals(id) ON DELETE CASCADE,
  day_of_week INTEGER NOT NULL CHECK (day_of_week >= 0 AND day_of_week <= 6),
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  UNIQUE (professional_id, day_of_week)
);

-- Tabela de agendamentos
CREATE TABLE IF NOT EXISTS appointments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_name TEXT NOT NULL,
  client_phone TEXT NOT NULL,
  service_id UUID NOT NULL REFERENCES services(id),
  professional_id UUID NOT NULL REFERENCES professionals(id),
  appointment_date DATE NOT NULL,
  appointment_time TIME NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'completed', 'cancelled')),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Habilitar Row Level Security (acesso público para leitura e escrita por enquanto)
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE professionals ENABLE ROW LEVEL SECURITY;
ALTER TABLE professional_services ENABLE ROW LEVEL SECURITY;
ALTER TABLE professional_schedules ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "public_all" ON services FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "public_all" ON professionals FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "public_all" ON professional_services FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "public_all" ON professional_schedules FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "public_all" ON appointments FOR ALL USING (true) WITH CHECK (true);

-- ==========================================
-- Dados iniciais (seed)
-- ==========================================

-- Serviços
INSERT INTO services (id, name, duration, price, description) VALUES
  ('a1111111-0000-0000-0000-000000000001', 'Corte Feminino',  60,  80.00, 'Corte de cabelo feminino com lavagem'),
  ('a1111111-0000-0000-0000-000000000002', 'Corte Masculino', 30,  45.00, 'Corte de cabelo masculino'),
  ('a1111111-0000-0000-0000-000000000003', 'Coloração',      120, 180.00, 'Coloração completa'),
  ('a1111111-0000-0000-0000-000000000004', 'Escova',          45,  60.00, 'Escova modeladora'),
  ('a1111111-0000-0000-0000-000000000005', 'Hidratação',      60,  90.00, 'Tratamento de hidratação profunda'),
  ('a1111111-0000-0000-0000-000000000006', 'Manicure',        45,  40.00, 'Manicure completa'),
  ('a1111111-0000-0000-0000-000000000007', 'Pedicure',        45,  50.00, 'Pedicure completa')
ON CONFLICT (id) DO NOTHING;

-- Profissionais
INSERT INTO professionals (id, name) VALUES
  ('b1111111-0000-0000-0000-000000000001', 'Ana Silva'),
  ('b1111111-0000-0000-0000-000000000002', 'Carlos Mendes'),
  ('b1111111-0000-0000-0000-000000000003', 'Mariana Costa')
ON CONFLICT (id) DO NOTHING;

-- Serviços por profissional
INSERT INTO professional_services (professional_id, service_id) VALUES
  ('b1111111-0000-0000-0000-000000000001', 'a1111111-0000-0000-0000-000000000001'),
  ('b1111111-0000-0000-0000-000000000001', 'a1111111-0000-0000-0000-000000000003'),
  ('b1111111-0000-0000-0000-000000000001', 'a1111111-0000-0000-0000-000000000004'),
  ('b1111111-0000-0000-0000-000000000001', 'a1111111-0000-0000-0000-000000000005'),
  ('b1111111-0000-0000-0000-000000000002', 'a1111111-0000-0000-0000-000000000001'),
  ('b1111111-0000-0000-0000-000000000002', 'a1111111-0000-0000-0000-000000000002'),
  ('b1111111-0000-0000-0000-000000000002', 'a1111111-0000-0000-0000-000000000004'),
  ('b1111111-0000-0000-0000-000000000003', 'a1111111-0000-0000-0000-000000000006'),
  ('b1111111-0000-0000-0000-000000000003', 'a1111111-0000-0000-0000-000000000007')
ON CONFLICT DO NOTHING;

-- Horários de trabalho
INSERT INTO professional_schedules (professional_id, day_of_week, start_time, end_time) VALUES
  -- Ana Silva: seg-sex 09-18, sab 09-14
  ('b1111111-0000-0000-0000-000000000001', 1, '09:00', '18:00'),
  ('b1111111-0000-0000-0000-000000000001', 2, '09:00', '18:00'),
  ('b1111111-0000-0000-0000-000000000001', 3, '09:00', '18:00'),
  ('b1111111-0000-0000-0000-000000000001', 4, '09:00', '18:00'),
  ('b1111111-0000-0000-0000-000000000001', 5, '09:00', '18:00'),
  ('b1111111-0000-0000-0000-000000000001', 6, '09:00', '14:00'),
  -- Carlos Mendes: seg,ter,qui,sex 10-19, sab 10-16
  ('b1111111-0000-0000-0000-000000000002', 1, '10:00', '19:00'),
  ('b1111111-0000-0000-0000-000000000002', 2, '10:00', '19:00'),
  ('b1111111-0000-0000-0000-000000000002', 4, '10:00', '19:00'),
  ('b1111111-0000-0000-0000-000000000002', 5, '10:00', '19:00'),
  ('b1111111-0000-0000-0000-000000000002', 6, '10:00', '16:00'),
  -- Mariana Costa: seg-sex 09-17
  ('b1111111-0000-0000-0000-000000000003', 1, '09:00', '17:00'),
  ('b1111111-0000-0000-0000-000000000003', 2, '09:00', '17:00'),
  ('b1111111-0000-0000-0000-000000000003', 3, '09:00', '17:00'),
  ('b1111111-0000-0000-0000-000000000003', 4, '09:00', '17:00'),
  ('b1111111-0000-0000-0000-000000000003', 5, '09:00', '17:00')
ON CONFLICT DO NOTHING;

-- Agendamentos de exemplo
INSERT INTO appointments (client_name, client_phone, service_id, professional_id, appointment_date, appointment_time, status) VALUES
  ('Julia Santos',   '(11) 98765-4321', 'a1111111-0000-0000-0000-000000000001', 'b1111111-0000-0000-0000-000000000001', CURRENT_DATE + 1, '10:00', 'confirmed'),
  ('Pedro Oliveira', '(11) 91234-5678', 'a1111111-0000-0000-0000-000000000002', 'b1111111-0000-0000-0000-000000000002', CURRENT_DATE + 1, '14:30', 'confirmed'),
  ('Fernanda Lima',  '(11) 99999-8888', 'a1111111-0000-0000-0000-000000000003', 'b1111111-0000-0000-0000-000000000001', CURRENT_DATE + 2, '09:00', 'pending');
