import { entityConfig, EntityKey } from "@/utils/form-config";

import {
  useCreateClients,
  useCreateFournisseurs,
  useCreateContacts,
  useCreateContactsFournisseurs,
  useCreateProspects,
  useCreateContrats,
  useUpdateClients,
  useUpdateFournisseurs,
  useUpdateContacts,
  useUpdateContactsFournisseurs,
  useUpdateProspects,
  useUpdateContrats,
  useDeleteClients,
  useDeleteFournisseurs,
  useDeleteContacts,
  useDeleteContactsFournisseurs,
  useDeleteProspects,
  useDeleteContrats,
  useDeleteDevis,
  useDeleteFacture,
} from "@/hooks/mutations";
import { useClients ,useFournisseurs,useContacts,useContactsFournisseurs,useProspects,useContrats, useDevis, useFacture} from "./querys";
import {SortingState} from "@tanstack/react-table";

type Pagination = {
  pageIndex: number;
  pageSize: number;
};

export function useEntity(activeTab: EntityKey,{pagination, sorting}: { pagination: Pagination; sorting: SortingState}) {
  const createClientMutation = useCreateClients();
  const createSupplierMutation = useCreateFournisseurs();
  const createContactMutation = useCreateContacts();
  const createSupplierContactMutation = useCreateContactsFournisseurs();
  const createProspectMutation = useCreateProspects();
  const createContractMutation = useCreateContrats();

  const updateClientMutation = useUpdateClients();
  const updateSupplierMutation = useUpdateFournisseurs();
  const updateContactMutation = useUpdateContacts();
  const updateSupplierContactMutation = useUpdateContactsFournisseurs();
  const updateProspectMutation = useUpdateProspects();
  const updateContractMutation = useUpdateContrats();
  
  const deleteClientMutation = useDeleteClients();
  const deleteSupplierMutation = useDeleteFournisseurs();
  const deleteContactMutation = useDeleteContacts();
  const deleteSupplierContactMutation = useDeleteContactsFournisseurs();
  const deleteProspectMutation = useDeleteProspects();
  const deleteContractMutation = useDeleteContrats();
  const deleteDevis = useDeleteDevis();
  const deleteFacture = useDeleteFacture();

  const clients = useClients({ pagination, sorting },activeTab == "Clients");
  const fournisseurs = useFournisseurs({ pagination, sorting },activeTab == "Fournisseurs");
  const contacts = useContacts({ pagination, sorting },activeTab == "Contacts");
  const supplierContacts = useContactsFournisseurs({ pagination, sorting },activeTab == "Contacts fournisseurs");
  const prospects = useProspects({ pagination, sorting },activeTab == "Prospects");
  const contracts = useContrats({ pagination, sorting },activeTab == "Contrats");

  const devis=useDevis({ pagination, sorting },activeTab == "Devis")
  const facture=useFacture({ pagination, sorting },activeTab == "Factures")

  const entityActions = {
    Clients: {
      create: createClientMutation,
      update: updateClientMutation,
      delete: deleteClientMutation,
      query:clients,
    },

    Fournisseurs: {
      create: createSupplierMutation,
      update: updateSupplierMutation,
      delete: deleteSupplierMutation,
      query:fournisseurs,
    },

    Contacts: {
      create: createContactMutation,
      update: updateContactMutation,
      delete: deleteContactMutation,
      query:contacts,
    },

    "Contacts fournisseurs": {
      create: createSupplierContactMutation,
      update: updateSupplierContactMutation,
      delete: deleteSupplierContactMutation,
      query:supplierContacts,
    },

    Prospects: {
      create: createProspectMutation,
      update: updateProspectMutation,
      delete: deleteProspectMutation,
      query:prospects,
    },

    Contrats: {
      create: createContractMutation,
      update: updateContractMutation,
      delete: deleteContractMutation,
      query:contracts,
    },
    Devis: {
      //create: createContractMutation,
      //update: updateContractMutation,
      delete: deleteDevis,
      query:devis,
    },
    Factures: {
      //create: createContractMutation,
      //update: updateContractMutation,
      delete: deleteFacture,
      query:facture,
    },
  };

  return {
    schema: entityConfig[activeTab].schema,
    defaultValues: entityConfig[activeTab].defaultValues,
    actions: entityActions[activeTab],
  };
}