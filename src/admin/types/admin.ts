// Types pour l'administration (ancien AdminUser supprimé - remplacé par Profile)

export interface IPWhitelist {
  id: string;
  ip_address: string;
  description?: string;
  is_active: boolean;
  created_at: string;
}

export interface PageLink {
  id: string;
  title: string;
  url: string;
  description?: string;
  icon?: string;
  is_active: boolean;
  order_index: number;
  click_count: number;
  created_at: string;
}

export interface SpotifyConfig {
  id: string;
  playlist_id?: string;
  playlist_name?: string;
  is_active: boolean;
  updated_at: string;
}

export interface MaintenanceConfig {
  id: string;
  is_enabled: boolean;
  message?: string;
  estimated_time?: string;
  updated_at: string;
}

export interface VisitorStats {
  id: string;
  date: string;
  visitors_count: number;
  page_views: number;
  top_page?: string;
  created_at: string;
}

export interface LinkClick {
  id: string;
  link_id: string;
  clicked_at: string;
  referrer?: string;
}

// Types pour les analytics dashboard
export interface DashboardMetrics {
  visitorsToday: number;
  pageViewsToday: number;
  totalLinks: number;
  activeLinks: number;
  totalClicks: number;
  topLinks: Array<{
    title: string;
    clicks: number;
    url: string;
  }>;
}

// Types pour les formulaires
export interface LinkFormData {
  title: string;
  url: string;
  description?: string;
  icon?: string;
  is_active: boolean;
}

export interface MaintenanceFormData {
  is_active: boolean;
  title: string;
  message?: string;
  show_progress: boolean;
  progress_percentage: number;
}

export interface SecurityCheck {
  ipAllowed: boolean;
  sessionValid: boolean;
  userAuthenticated: boolean;
}

// Nouveaux types pour Supabase Auth
export interface Profile {
  id: string;
  email: string;
  nickname?: string;
  is_admin: boolean;
  role: 'admin' | 'moderator' | 'user';
  updated_at: string;
  created_at: string;
}

export interface AuthContextType {
  user: any | null; // Supabase User type
  profile: Profile | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  isAdmin: boolean;
  refreshProfile: () => Promise<void>;
}
