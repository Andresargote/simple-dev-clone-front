export default function useFormatDate(dateString) {
  if (!dateString) {
    return false;
  }
  const date = new Date(dateString);
  const formatDate = new Intl.DateTimeFormat("en", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(date);

  return formatDate;
}
