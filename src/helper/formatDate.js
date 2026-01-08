export default function DateFormat(date){
    const d = new Date(date);
    return d.toLocaleDateString("tr-TR",{
        year: "numeric", 
        month: "2-digit", 
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit"
    })
} 