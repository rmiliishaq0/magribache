import { Eye, Trophy, UserPlus, Users } from "lucide-react";
import { CrmStats } from "../../crm/types";

export const clientsStats: CrmStats[] = [
    {
        icon: Users,
        description: "Clients actifs",
        style: "ACTIVE",
        accessKey: "activeClients",
    },
    {
        icon: UserPlus,
        description: "Nouveaux clients",
        style: "NEW",
        accessKey: "newClients",
    },
    {
        icon: Trophy,
        description: "Bons clients",
        style: "GOOD_CLIENT",
        accessKey: "goodClients",
    },
    {
        icon: Eye,
        description: "Clients à surveiller",
        style: "TO_MONITOR",
        accessKey: "needFollowUP",
    },
];