import moment from "moment";

moment.locale("pt-br");

export function formatDate(value: string | Date | number): string {
  const formattedDate = moment(value).format("DD, MMMM").toUpperCase();
  return formattedDate;
}
