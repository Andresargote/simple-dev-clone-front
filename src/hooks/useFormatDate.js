export default function useFormatDate(dateString){
    const date = new Date(dateString);
    const formatDate = new Intl.DateTimeFormat("en", {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
    }).format(date);
    
    return formatDate;
}