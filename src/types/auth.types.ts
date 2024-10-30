export interface AuthState {
  isAuthenticated: boolean;
  user: string | null;
}

export interface LoginCredentials {
  username: string;
  password: string;
}