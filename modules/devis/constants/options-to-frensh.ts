export const documentStatusLabels = {
  DRAFT: "Brouillon",

  // Devis
  SENT: "Envoyé",
  UNDER_NEGOTIATION: "En négociation",
  ACCEPTED: "Accepté",
  REJECTED: "Refusé",
  EXPIRED: "Expiré",
  CONVERTED_TO_ORDER: "Transformé en commande",

  // General
  VALIDATED: "Validé",
  CANCELLED: "Annulé",
  CLOSED: "Clôturé",
} as const;

export const paymentStatusLabels = {
  UNPAID: "Non payée",
  PARTIALLY_PAID: "Partiellement payée",
  PAID: "Payée",
  OVERDUE: "En retard",
} as const;