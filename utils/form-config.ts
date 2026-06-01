// entity-config.ts

import { clientSchema, fournisseurSchema ,contactsfournisseurSchema,prospectsschema,contratsschema,contactsschema} from "@/utils/schema";

export const entityConfig = {
  Clients: {
    schema: clientSchema,
    defaultValues: { },
  },

  Fournisseurs: {
    schema: fournisseurSchema,
    defaultValues: {}
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