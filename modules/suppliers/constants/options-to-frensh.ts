export const supplierStatusLabels = {
  ACTIVE: "Actif",
  INACTIVE: "Inactif",
  SUSPENDED: "Suspendu",
} as const;

export const fields = [
  ["name", "Nom"],
  ["contactName", "Nom du contact"],
  ["email", "Email"],
  ["phone", "Téléphone"],
  ["whatsapp", "WhatsApp"],
  ["country", "Pays"],
  ["city", "Ville"],
  ["address", "Adresse"],
  ["ice", "ICE"],
  ["rc", "RC"],
  ["ifNumber", "IF"],
  ["paymentTerms", "Conditions de paiement"],
  ["currency", "Devise"],
  ["deliveryDelayDays", "Délai de livraison (jours)"],
] as const