import { DocumentStatus } from "@/app/generated/prisma/browser";
import {
  CircleCheck,
  CirclePlus,
  CircleX,
  FilePenLine,
  FileText,
  Mail,
  MessageCircle,
  MessageSquarePlus,
  Phone,
  Play,
  Send,
  CheckCircle2,
  ArrowRightLeft,
  CreditCard,
  CalendarDays,
  Trash2,
} from "lucide-react";


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
    GOOD_CLIENT: "bg-teal-100 text-teal-800 border-teal-200",
    TO_MONITOR: "bg-orange-100 text-orange-800 border-orange-200",

    INACTIVE: "bg-slate-100 text-slate-800 border-slate-200",
    BLOCKED: "bg-red-100 text-red-800 border-red-200",
} as const;

export const sourceColors = {
  PHONE: "bg-green-100 text-green-800 border-green-200",
  WHATSAPP: "bg-emerald-100 text-emerald-800 border-emerald-200",
  FACEBOOK: "bg-blue-100 text-blue-800 border-blue-200",
  INSTAGRAM: "bg-pink-100 text-pink-800 border-pink-200",
  WEBSITE: "bg-indigo-100 text-indigo-800 border-indigo-200",
  TIKTOK: "bg-slate-100 text-slate-800 border-slate-200",
  LINKEDIN: "bg-sky-100 text-sky-800 border-sky-200",
  VISIT: "bg-violet-100 text-violet-800 border-violet-200",
  REFERRAL: "bg-amber-100 text-amber-800 border-amber-200",
  OTHER: "bg-gray-100 text-gray-800 border-gray-200",
} as const;


export const ACTIVITY_TYPE_CONFIG = {
  CREATED: {
    icon: CirclePlus,
    className: "bg-emerald-100 text-emerald-600",
  },

  UPDATED: {
    icon: FilePenLine,
    className: "bg-blue-100 text-blue-600",
  },

  DELETED: {
    icon: Trash2,
    className: "bg-red-100 text-red-600",
  },

  NOTE: {
    icon: MessageSquarePlus,
    className: "bg-violet-100 text-violet-600",
  },

  CALL: {
    icon: Phone,
    className: "bg-cyan-100 text-cyan-600",
  },

  EMAIL: {
    icon: Mail,
    className: "bg-sky-100 text-sky-600",
  },

  WHATSAPP: {
    icon: MessageCircle,
    className: "bg-green-100 text-green-600",
  },

  MEETING: {
    icon: CalendarDays,
    className: "bg-indigo-100 text-indigo-600",
  },

  STATUS_CHANGED: {
    icon: ArrowRightLeft,
    className: "bg-amber-100 text-amber-600",
  },

  PDF_GENERATED: {
    icon: FileText,
    className: "bg-orange-100 text-orange-600",
  },

  SENT: {
    icon: Send,
    className: "bg-blue-100 text-blue-600",
  },

  PAYMENT_RECEIVED: {
    icon: CreditCard,
    className: "bg-emerald-100 text-emerald-600",
  },

  STARTED: {
    icon: Play,
    className: "bg-yellow-100 text-yellow-600",
  },

  COMPLETED: {
    icon: CheckCircle2,
    className: "bg-emerald-100 text-emerald-600",
  },
} as const;


export const DOCUMENT_STATUS_STYLES: Record<DocumentStatus, string> = {
  BROUILLON: "bg-muted text-muted-foreground",
  ENVOYE: "bg-blue-100 text-blue-700",
  PAYE: "bg-green-100 text-green-700",
  ANNULE: "bg-red-100 text-red-700",
};