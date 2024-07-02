export const convertDataDate = (number) => {
  let date = new Date(number);
  return date.getDate() + "/" + (date.getMonth() + 1);
}