-- Users table (Supabase auth handles PII separately)
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  state VARCHAR(2),
  phone VARCHAR(20),
  date_of_birth DATE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Health assessments (the money maker)
CREATE TABLE assessments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id),
  goals JSONB,
  symptoms JSONB,
  medications TEXT[],
  medical_history JSONB,
  status VARCHAR(20) DEFAULT 'pending', -- pending, approved, denied
  provider_notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Subscriptions (Stripe will be source of truth, this is cache)
CREATE TABLE subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id),
  stripe_subscription_id VARCHAR(255) UNIQUE,
  stripe_customer_id VARCHAR(255),
  plan_type VARCHAR(50), -- essential, comprehensive, elite
  status VARCHAR(20),
  current_period_end TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- State restrictions (admin-editable)
CREATE TABLE restricted_states (
  state_code VARCHAR(2) PRIMARY KEY,
  restriction_type VARCHAR(20), -- 'full', 'peptides', 'glp1'
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE assessments ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;