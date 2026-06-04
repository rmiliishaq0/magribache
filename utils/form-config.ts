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
    defaultValues: {
      Nom:"",
      Civilité:"",
      Téléphone:"",
      Entreprise:"",
      Ville:"",
      Pays:"",
      Actif:"Non"
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
      Nom:"",
      Prospect:"",
      Email:"",
      Téléphone:"",
      //"Attribué à":[{isInput:true,type:"text"}],
      Statut:"",
      Source:"",
      "Date d'ajout":"",
      "Dernier contact":"",
      "Localisation":"",
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
} as const;

export type EntityKey = keyof typeof entityConfig;