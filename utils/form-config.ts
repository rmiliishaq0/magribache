import { clientSchema, fournisseurSchema ,contactsfournisseurSchema,prospectsschema,contratsschema,contactsschema} from "@/utils/schema";

export const entityConfig = {
  Clients: {
    schema: clientSchema,
    defaultValues: { 
      Entreprise:"",
      Téléphone:"",
      Catégories:"",
      ICE:"",
      "Identifiant fiscal (IF)": "",
      Ville: "",
      Pays: "",
      Actif: "Non",
    },
  },

  Fournisseurs: {
    schema: fournisseurSchema,
    defaultValues: {
      Fournisseur:"",
      Téléphone:"",
      ICE:"",
      "Identifiant fiscal (IF)":"",
      Ville: "",
      Pays:"",
      Catégories: "",
    }
  },
  Contacts:{
    schema: contactsschema,
    defaultValues: {}
  },

  "Contacts fournisseurs": {
    schema: contactsfournisseurSchema,
    defaultValues: {}
  },
  "Prospects": {
    schema: prospectsschema,
    defaultValues: {}
  },
  "Contrats": {
    schema: contratsschema,
    defaultValues: {},
  },
} as const;

export type EntityKey = keyof typeof entityConfig;