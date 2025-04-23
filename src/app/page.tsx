'use client'; // Indica que este componente roda no lado do cliente (Next.js 13+)

// Importa os hooks de estado do React
import { useState } from "react";
// Importa a função de geração de senha (função pura)
import { generatePassword } from "@/utils/generatePassword";

// Componente principal da página de geração de senha
export default function GeneratePasswordPage() {
  // Estados para controlar as opções de geração
  const [length, setLength] = useState(12);             // Comprimento da senha
  const [useUpper, setUseUpper] = useState(true);       // Letras maiúsculas
  const [useLower, setUseLower] = useState(true);       // Letras minúsculas
  const [useDigits, setUseDigits] = useState(true);     // Números
  const [useSpecial, setUseSpecial] = useState(true);   // Caracteres especiais
  const [password, setPassword] = useState("");         // Senha gerada
  const [error, setError] = useState("");               // Mensagem de erro

  // Função chamada ao clicar no botão "Gerar Senha"
  function handleGenerate() {
    // Validação: precisa ter ao menos um tipo e tamanho permitido
    if (
      length < 8 ||
      length > 32 ||
      ![useUpper, useLower, useDigits, useSpecial].some(Boolean)
    ) {
      setError("Selecione pelo menos um tipo e tamanho entre 8 e 32.");
      setPassword(""); // Limpa a senha se inválido
      return;
    }
    setError(""); // Limpa erro, se houver
    // Gera a senha e armazena no estado
    setPassword(
      generatePassword({ length, useUpper, useLower, useDigits, useSpecial })
    );
  }

  // Renderização da interface
  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-900">
      {/* Caixa principal, centralizada na tela */}
      <div className="bg-neutral-800 p-8 rounded-2xl shadow-2xl w-full max-w-md">
        {/* Título */}
        <h1 className="text-2xl font-extrabold mb-5 text-white text-center tracking-tight">
          Gerador de Senhas Seguras
        </h1>
        {/* Campo de tamanho da senha */}
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
          {/* Maiúsculas */}
          <label className="flex gap-2 items-center text-neutral-200 font-medium">
            <input
              type="checkbox"
              checked={useUpper}
              onChange={e => setUseUpper(e.target.checked)}
            />
            Incluir letras <span className="font-bold">MAIÚSCULAS</span>
          </label>
          {/* Minúsculas */}
          <label className="flex gap-2 items-center text-neutral-200 font-medium">
            <input
              type="checkbox"
              checked={useLower}
              onChange={e => setUseLower(e.target.checked)}
            />
            Incluir letras <span className="font-bold">minúsculas</span>
          </label>
          {/* Números */}
          <label className="flex gap-2 items-center text-neutral-200 font-medium">
            <input
              type="checkbox"
              checked={useDigits}
              onChange={e => setUseDigits(e.target.checked)}
            />
            Incluir <span className="font-bold">números</span>
          </label>
          {/* Símbolos */}
          <label className="flex gap-2 items-center text-neutral-200 font-medium">
            <input
              type="checkbox"
              checked={useSpecial}
              onChange={e => setUseSpecial(e.target.checked)}
            />
            Incluir símbolos <span className="font-bold">(!@#$%&*?)</span>
          </label>
        </div>
        {/* Botão para gerar senha */}
        <button
          className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg font-extrabold text-lg shadow-md transition"
          onClick={handleGenerate}
        >
          Gerar Senha
        </button>
        {/* Mensagem de erro se algo estiver inválido */}
        {error && (
          <div className="mt-4 text-red-400 font-semibold text-center">{error}</div>
        )}
        {/* Exibe a senha gerada, se houver */}
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
