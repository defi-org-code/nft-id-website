export const delay = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const isSameAccount = (account1?: string, account2?: string) => {
  if (!account1 || !account2) return false;
  return account1.toLowerCase() === account2.toLowerCase();
};
