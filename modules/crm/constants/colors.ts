export const priorityColors = {
  LOW: "bg-green-100 text-green-800 border-green-200",
  MEDIUM: "bg-blue-100 text-blue-800 border-blue-200",
  HIGH: "bg-orange-100 text-orange-800 border-orange-200",
  URGENT: "bg-red-100 text-red-800 border-red-200",
} ;

export const statusColors = {
  NEW: "bg-gray-100 text-gray-800 border-gray-200",
  CONTACTED: "bg-blue-100 text-blue-800 border-blue-200",
  QUALIFIED: "bg-cyan-100 text-cyan-800 border-cyan-200",
  QUOTE_TO_PREPARE: "bg-amber-100 text-amber-800 border-amber-200",
  QUOTE_SENT: "bg-indigo-100 text-indigo-800 border-indigo-200",
  NEGOTIATION: "bg-purple-100 text-purple-800 border-purple-200",
  WON: "bg-green-100 text-green-800 border-green-200",
  LOST: "bg-red-100 text-red-800 border-red-200",
  FOLLOW_UP_LATER: "bg-yellow-100 text-yellow-800 border-yellow-200",

  ACTIVE: "bg-emerald-100 text-emerald-800 border-emerald-200",
  GOOD_CLIENT: "bg-green-100 text-green-800 border-green-200",
  TO_MONITOR: "bg-orange-100 text-orange-800 border-orange-200",
  INACTIVE: "bg-slate-100 text-slate-800 border-slate-200",
  BLOCKED: "bg-red-100 text-red-800 border-red-200",
} as const;