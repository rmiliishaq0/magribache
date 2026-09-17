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
    signature: string | null;
    defaultColor: string | null;
    footerText: string | null;
    ice: string | null;
    rc: string | null;
    fiscalId: string | null;
    patente: string | null;
    cnss: string | null;
    shareCapital: string | null;
    watermark: string | null;
    documentSettings: string | null;
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
  signature: null,
  defaultColor: null,
footerText:null, ice:null, rc:null, fiscalId:null, patente:null, cnss:null, shareCapital:null, watermark:null, documentSettings:null,
  setAuthState: (authState:AuthData) => set(authState),
  logout: () => set({ name:null,email:null,phone:null,address:null,website:null,description:null,logo:null,profilIcon:null,signature:null,defaultColor:null,footerText:null,ice:null,rc:null,fiscalId:null,patente:null,cnss:null,shareCapital:null,watermark:null,documentSettings:null }),
}))
