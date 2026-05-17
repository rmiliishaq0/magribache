import { create } from "zustand";

type AuthData = {
    name: string | null;
    email: string | null;
    phone: string | null;
    address: string | null;
    website: string | null;
    description: string | null;
    logo: string | null;
    profilIcon: string | null;
};

type AuthState = AuthData & {
    setAuthState: (authState: AuthData) => void;
    logout: () => void;
};

export const useAuthStore = create<AuthState>()((set) => ({
  name: null,
  email: null,
  phone: null,
  address: null,
  website: null,
  description: null,
  logo: null,
  profilIcon: null,
  setAuthState: (authState:AuthData) => set(authState),
  logout: () => set({ name:null,email:null,phone:null,address:null,website:null,description:null,logo:null,profilIcon:null }),
}))
