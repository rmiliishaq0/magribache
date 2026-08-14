import {
  UserPlus,
  Phone,
  BadgeCheck,
  FilePenLine,
  Send,
  Handshake,
  Trophy,
  XCircle,
  Clock3,
  CircleCheck,
  Star,
  Eye,
  CircleOff,
  Ban,
} from "lucide-react"
import {
  SiWhatsapp,
  SiFacebook,
  SiInstagram,
  SiTiktok,
  SiLinkerd,
} from "@icons-pack/react-simple-icons";

import {
  Globe,
  UserRound,
  MoreHorizontal,
} from "lucide-react"

export const statusIcons = {
  NEW: UserPlus,
  CONTACTED: Phone,
  QUALIFIED: BadgeCheck,
  QUOTE_TO_PREPARE: FilePenLine,
  QUOTE_SENT: Send,
  NEGOTIATION: Handshake,
  WON: Trophy,
  LOST: XCircle,
  FOLLOW_UP_LATER: Clock3,

  ACTIVE: CircleCheck,
  GOOD_CLIENT: Star,
  TO_MONITOR: Eye,
  INACTIVE: CircleOff,
  BLOCKED: Ban,
} as const


export const partnerSourceIcons = {
  PHONE: Phone,
  WHATSAPP: SiWhatsapp,
  FACEBOOK: SiFacebook,
  INSTAGRAM: SiInstagram,
  WEBSITE: Globe,
  TIKTOK: SiTiktok,
  LINKEDIN: SiLinkerd,
  VISIT: UserRound,
  REFERRAL: UserRound,
  OTHER: MoreHorizontal,
} as const