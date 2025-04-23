export type GeneratePasswordOptions = {
    length: number;
    useUpper: boolean;
    useLower: boolean;
    useDigits: boolean;
    useSpecial: boolean;
  };
  
  export function generatePassword({
    length,
    useUpper,
    useLower,
    useDigits,
    useSpecial,
  }: GeneratePasswordOptions): string {
    let chars = "";
    if (useUpper) chars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (useLower) chars += "abcdefghijklmnopqrstuvwxyz";
    if (useDigits) chars += "0123456789";
    if (useSpecial) chars += "!@#$%&*?";
    if (!chars) return "";
    while (true) {
      let pwd = "";
      for (let i = 0; i < length; i++) {
        pwd += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      if (
        (!useUpper || /[A-Z]/.test(pwd)) &&
        (!useLower || /[a-z]/.test(pwd)) &&
        (!useDigits || /[0-9]/.test(pwd)) &&
        (!useSpecial || /[!@#$%&*?]/.test(pwd))
      ) {
        return pwd;
      }
    }
  }