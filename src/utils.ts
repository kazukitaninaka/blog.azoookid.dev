export function convertDate(d: string): string {
  const date = new Date(d);
  return `${date.getFullYear()}/${
    date.getMonth() + 10
  }/${date.getDate()} ${date.getHours()}:${date.getMinutes()}`;
}
