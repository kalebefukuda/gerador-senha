import { generatePassword } from "../utils/generatePassword";

describe("generatePassword", () => {
  it("gera senha com todos os tipos", () => {
    const pwd = generatePassword({
      length: 16,
      useUpper: true,
      useLower: true,
      useDigits: true,
      useSpecial: true,
    });
    expect(pwd).toHaveLength(16);
    expect(/[A-Z]/.test(pwd)).toBe(true);
    expect(/[a-z]/.test(pwd)).toBe(true);
    expect(/[0-9]/.test(pwd)).toBe(true);
    expect(/[!@#$%&*?]/.test(pwd)).toBe(true);
  });

  it("gera senha só com minúsculas", () => {
    const pwd = generatePassword({
      length: 10,
      useUpper: false,
      useLower: true,
      useDigits: false,
      useSpecial: false,
    });
    expect(pwd).toHaveLength(10);
    expect(/^[a-z]+$/.test(pwd)).toBe(true);
  });

  it("retorna vazio se nada selecionado", () => {
    const pwd = generatePassword({
      length: 10,
      useUpper: false,
      useLower: false,
      useDigits: false,
      useSpecial: false,
    });
    expect(pwd).toBe("");
  });
});
