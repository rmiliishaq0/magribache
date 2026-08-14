import { format } from "date-fns";
import { fr } from "date-fns/locale";

export function formatDate(date:Date){
    return  format(new Date(),"d MMM',' kk:m",{locale:fr})
}