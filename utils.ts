export function convertDate(d: string): string {
  const date = new Date(d);
  return `${date.getFullYear()}年${
    date.getMonth() + 1
  }月${date.getDate()}日 ${date.getHours()}時${date.getMinutes()}分`;
}
