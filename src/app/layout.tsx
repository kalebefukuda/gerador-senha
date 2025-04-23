'use client';

import { useState } from "react";

// Função responsável por gerar a senha com base nas opções selecionadas
function generatePassword({
  length,
  useUpper,
  useLower,
  useDigits,
  useSpecial,
}: {
  length: number;
  useUpper: boolean;
  useLower: boolean;
  useDigits: boolean;
  useSpecial: boolean;
}) {
  let chars = "";

  // Adiciona caracteres ao conjunto com base nas opções escolhidas
  if (useUpper) chars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  if (useLower) chars += "abcdefghijklmnopqrstuvwxyz";
  if (useDigits) chars += "0123456789";
  if (useSpecial) chars += "!@#$%&*?";

  // Se nenhuma opção for selecionada, retorna string vazia
  if (!chars) return "";

  // Gera uma senha que atenda os critérios escolhidos
  while (true) {
    let pwd = "";
    for (let i = 0; i < length; i++) {
      pwd += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    // Valida se a senha contém todos os tipos de caracteres requeridos
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

export default function GeneratePasswordPage() {
  // Estados para controle das opções e da senha gerada
  const [length, setLength] = useState(12);
  const [useUpper, setUseUpper] = useState(true);
  const [useLower, setUseLower] = useState(true);
  const [useDigits, setUseDigits] = useState(true);
  const [useSpecial, setUseSpecial] = useState(true);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Função chamada ao clicar em "Gerar Senha"
  function handleGenerate() {
    // Validações básicas de entrada
    if (
      length < 8 ||
      length > 32 ||
      ![useUpper, useLower, useDigits, useSpecial].some(Boolean)
    ) {
      setError("Selecione pelo menos um tipo e tamanho entre 8 e 32.");
      setPassword("");
      return;
    }

    // Gera senha e atualiza os estados
    setError("");
    setPassword(
      generatePassword({ length, useUpper, useLower, useDigits, useSpecial })
    );
  }

  // Interface da página
  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-900">
      <div className="bg-neutral-800 p-8 rounded-2xl shadow-2xl w-full max-w-md">
        <h1 className="text-2xl font-extrabold mb-5 text-white text-center tracking-tight">
          Gerador de Senhas Seguras
        </h1>

        {/* Campo para definir o tamanho da senha */}
        <div className="mb-3">
          <label className="block font-semibold mb-1 text-neutral-300">
            Tamanho da senha
          </label>
          <input
            type="number"
            className="w-full p-2 bg-neutral-900 border border-neutral-700 rounded text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
            value={length}
            min={8}
            max={32}
            onChange={e => setLength(Number(e.target.value))}
          />
        </div>

        {/* Opções de composição da senha */}
        <div className="flex flex-col gap-2 mb-5">
          <label className="flex gap-2 items-center text-neutral-200 font-medium">
            <input
              type="checkbox"
              checked={useUpper}
              onChange={e => setUseUpper(e.target.checked)}
            />
            Incluir letras <span className="font-bold">MAIÚSCULAS</span>
          </label>
          <label className="flex gap-2 items-center text-neutral-200 font-medium">
            <input
              type="checkbox"
              checked={useLower}
              onChange={e => setUseLower(e.target.checked)}
            />
            Incluir letras <span className="font-bold">minúsculas</span>
          </label>
          <label className="flex gap-2 items-center text-neutral-200 font-medium">
            <input
              type="checkbox"
              checked={useDigits}
              onChange={e => setUseDigits(e.target.checked)}
            />
            Incluir <span className="font-bold">números</span>
          </label>
          <label className="flex gap-2 items-center text-neutral-200 font-medium">
            <input
              type="checkbox"
              checked={useSpecial}
              onChange={e => setUseSpecial(e.target.checked)}
            />
            Incluir símbolos <span className="font-bold">(!@#$%&*?)</span>
          </label>
        </div>

        {/* Botão de geração de senha */}
        <button
          className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg font-extrabold text-lg shadow-md transition"
          onClick={handleGenerate}
        >
          Gerar Senha
        </button>

        {/* Exibição de mensagens de erro */}
        {error && (
          <div className="mt-4 text-red-400 font-semibold text-center">{error}</div>
        )}

        {/* Exibição da senha gerada */}
        {password && (
          <div className="mt-6">
            <label className="font-bold text-neutral-200">Senha gerada:</label>
            <div className="mt-2 p-3 bg-neutral-900 rounded-lg font-mono text-lg text-green-400 border border-green-700 tracking-wide select-all shadow-inner">
              {password}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
 