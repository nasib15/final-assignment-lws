export const generateBookingId = ({
  prefix = "HOTEL",
  includeDate = true,
  randomLength = 6,
  separator = "-",
} = {}) => {
  const parts = [prefix];

  if (includeDate) {
    const date = new Date().toISOString().slice(2, 8); // YYMMDD
    parts.push(date);
  }

  // Generate random alphanumeric string
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let random = "";
  for (let i = 0; i < randomLength; i++) {
    random += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  parts.push(random);

  return parts.join(separator);
};
