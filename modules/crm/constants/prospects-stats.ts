import { Clock4, OctagonX ,Trophy, UserCheck} from "lucide-react";
import { CrmStats } from "../types";

export const crmStats:CrmStats[]  = [
    {
        icon:UserCheck,
        description:"Nouveaux prospects",
        style:"NEW",
        accessKey:"newClients"
    },
    {
        icon:Clock4,
        description:"A relancer aujourd'hui",
        style:"TO_MONITOR",
        accessKey:"followUp"
    },
    {
        icon:Trophy,
        description:"Gagnés",
        style:"WON",
        accessKey:"win"
    },
    {
        icon:OctagonX,
        description:"Perdus",
        style:"LOST",
        accessKey:"lost"
    }
]