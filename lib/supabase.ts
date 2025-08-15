// Types for your database
export type Profile = {
  id: string;
  state: string;
  phone: string;
  date_of_birth: string;
  created_at: string;
};

export type Assessment = {
  id: string;
  user_id: string;
  goals: string[];
  symptoms: string[];
  medications: string[];
  medical_history: any;
  status: 'pending' | 'paid_awaiting_review' | 'approved' | 'denied';
  provider_notes?: string;
  created_at: string;
};

export type Subscription = {
  id: string;
  user_id: string;
  stripe_subscription_id: string;
  stripe_customer_id: string;
  plan_type: 'essential' | 'comprehensive' | 'elite';
  status: 'active' | 'past_due' | 'cancelled';
  current_period_end: string;
  created_at: string;
};