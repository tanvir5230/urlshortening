const BASE_URL = "https://tit.com/"; // My service name

const characters =
  "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

const convertToBase62 = (num: number): string => {
  if (num === 0) return characters[0];

  let base62 = "";
  const base = characters.length;

  while (num > 0) {
    const rem = num % base;
    num = Math.floor(num / base);
    base62 = characters[rem] + base62;
  }

  return base62;
};

const generateShortUrl = (longUrl: string): string => {
  const timestamp = new Date().valueOf();
  const base62Value = convertToBase62(timestamp);
  const shortUrl = `${base62Value}`;

  return `${BASE_URL}${shortUrl}`;
};

export default generateShortUrl;
