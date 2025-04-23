# Gerador de Senhas Seguras

Projeto de mini software para geração de senhas seguras e customizáveis, desenvolvido em Next.js e React.

---

## Documento de Requisitos Funcionais

### Objetivo

Permitir que o usuário gere senhas seguras conforme parâmetros escolhidos, garantindo praticidade e segurança.

### Funcionalidades

- Selecionar o tamanho da senha (mínimo 8, máximo 32).
- Escolher quais tipos de caracteres incluir:
  - Letras maiúsculas (A-Z)
  - Letras minúsculas (a-z)
  - Números (0-9)
  - Símbolos (!@#$%&*?)
- Gerar senha aleatória contendo ao menos um caractere de cada tipo selecionado.
- Exibir a senha gerada de forma destacada.
- Mostrar mensagem de erro caso:
  - Nenhum tipo de caractere seja selecionado.
  - O tamanho da senha esteja fora do permitido.
- Permitir gerar nova senha sem recarregar a página.
- Interface visual responsiva, modo escuro por padrão, sem necessidade de login.

---

## Plano de Testes

| Caso de Teste | Cenário                                             | Entrada                                      | Resultado Esperado                                         |
|---------------|-----------------------------------------------------|----------------------------------------------|------------------------------------------------------------|
| CT01          | Todas opções ativas, tamanho 16                     | Tamanho: 16, maiúsculas, minúsculas, números, símbolos | Senha de 16 caracteres, contendo pelo menos um de cada tipo|
| CT02          | Apenas minúsculas, tamanho mínimo                   | Tamanho: 8, só minúsculas                    | Senha de 8 caracteres, apenas letras minúsculas            |
| CT03          | Nenhuma opção selecionada e tamanho fora do limite  | Tamanho: 5, todas opções desativadas         | Mensagem de erro exibida, senha não gerada                 |

---

## Como rodar

```bash
git clone <repo>
npm install
npm run dev
