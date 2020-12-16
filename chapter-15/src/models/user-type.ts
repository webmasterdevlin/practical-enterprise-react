export type Subscription = {
  name: string;
  price: number;
  currency: string;
  proposalsLeft: number;
  templatesLeft: number;
  invitesLeft: number;
  adsLeft: number;
  hasAnalytics: boolean;
  hasEmailAlerts: boolean;
};

export type UserType = {
  id: string;
  email: string;
  password: string;
  country: string;
  isPublic: boolean;
  phone: string;
  role: string;
  state: string;
  tier: string;
  name: string;
  avatar: string;
  city: string;
  canHire: boolean;
  subscription?: Subscription;
};
