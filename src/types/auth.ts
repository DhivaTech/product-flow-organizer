
export type UserRole = 'customer' | 'cashier' | 'owner';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string, role: UserRole) => Promise<User>;
  signup: (name: string, email: string, password: string, role: UserRole) => Promise<User>;
  logout: () => void;
}
