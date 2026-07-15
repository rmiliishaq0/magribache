import { clientSchema, fournisseurSchema ,contactsfournisseurSchema,prospectsschema,contratsschema,contactsschema,salesSchema} from "@/utils/schema";

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
      Email:""
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
      Email:""
    }
  },
  Contacts:{
    schema: contactsschema,
    defaultValues: {
      Nom:"",
      Civilité:"",
      Téléphone:"",
      Entreprise:"",
      Ville:"",
      Pays:"",
      Actif:"Non",
      Email:""
    }
  },

  "Contacts fournisseurs": {
    schema: contactsfournisseurSchema,
    defaultValues: {
      Name:"",
      Title:"",
      Email:"",
      Téléphone:"",
      Fournisseur:"",
      City:"",
      Country:""
    }
  },
  "Prospects": {
    schema: prospectsschema,
    defaultValues: {
      Entreprise:"",
      Nom:"",
      Prospect:"",
      Téléphone:"",
      Statut:"",
      Source:"",
      "Date d'ajout":"",
      "Dernier contact":"",
      "Localisation":"",
      Email:""
    }
  },
  "Contrats": {
    schema: contratsschema,
    defaultValues: {
      "Sujet":"",
      "Client":"",
      "Modèle de contrat":"",
      "Date de depart":"",
      "Date de fin":""
    },
  },
  "Devis":{
    schema:salesSchema,
    defaultValues: {
      "Sujet":"",
      "Client":"",
      "Modèle de contrat":"",
      "Date de depart":"",
      "Date de fin":""
    },
  },
  "Factures":{
    schema:salesSchema,
    defaultValues: {
      "Sujet":"",
      "Client":"",
      "Modèle de contrat":"",
      "Date de depart":"",
      "Date de fin":""
    }}
} as const;

export type EntityKey = keyof typeof entityConfig;