# JGM Construções

Website institucional multilingue da JGM Construções, com experiência visual de construção progressiva durante o scroll.

## Stack

- TanStack Start e TanStack Router (SSR)
- React 19 e TypeScript
- Vite 8 / Nitro
- Tailwind CSS 4
- Vitest e Testing Library

Não existe base de dados. Os pedidos de orçamento são enviados por uma função server-side para um fornecedor transacional configurável.

## Desenvolvimento local

Requisitos: Node.js 22+ e npm 10+.

```sh
npm install
cp .env.example .env.local
npm run dev
```

Comandos de validação:

```sh
npm run typecheck
npm run lint
npm run test
npm run build
# ou todos:
npm run check
```

## Variáveis de ambiente

Copie `.env.example` e preencha apenas no ambiente local/host. Nunca coloque segredos em variáveis `VITE_*`.

- `EMAIL_PROVIDER`: atualmente `resend`.
- `EMAIL_API_KEY`: chave privada do fornecedor.
- `EMAIL_FROM`: remetente verificado no domínio da JGM.
- `CONTACT_RECIPIENT`: email comercial oficial da JGM.
- `RECRUITMENT_RECIPIENT`: reservado para uma fase futura; o website não recebe CVs.
- `VITE_SITE_URL`: origem canónica pública.
- `TURNSTILE_SECRET_KEY` e `VITE_TURNSTILE_SITE_KEY`: reservadas para proteção adicional no host, quando configurada.

Sem as quatro variáveis de email obrigatórias, o formulário apresenta erro e não simula um envio bem-sucedido.

## Rotas e idiomas

Português europeu é o idioma padrão. O conteúdo também existe em inglês e espanhol, com slugs localizados:

- `/pt`, `/en`, `/es`
- páginas institucionais, serviços, legais e blog sob cada idioma
- `/` redireciona para `/pt`

O conteúdo principal está em `src/i18n/content.ts` e `src/i18n/extended-content.ts`.

## Documentação

- [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md): módulos, routing, fluxos e decisões.
- [`docs/AUDIT.md`](docs/AUDIT.md): diagnóstico, riscos e pendências.
- [`docs/BRAND.md`](docs/BRAND.md): paleta e assets da identidade visual.
- [`docs/OPERATIONS.md`](docs/OPERATIONS.md): configuração, release e resposta a incidentes.
- [`docs/ROADMAP.md`](docs/ROADMAP.md): evolução faseada do produto.

## Privacidade e segurança

- O mapa externo só carrega após consentimento.
- As preferências são guardadas localmente no navegador.
- O formulário é novamente validado no servidor, limita tamanhos, inclui honeypot, deduplicação por submissão, limite temporário por email e timeout.
- Não são guardados pedidos numa base de dados nem registados corpos completos do formulário.
- O upload de currículos permanece desativado até existir armazenamento privado, controlo de acesso, análise antimalware e retenção aprovada.

Antes do lançamento é obrigatório confirmar: destinatário comercial, fornecedor de email, contacto de privacidade, prazos de conservação, URLs de Google/rede sociais, HTTPS permanente e revisão jurídica das políticas.

## Deployment

O preset Lovable gera a aplicação TanStack Start/Nitro. No host:

1. Configurar as variáveis privadas.
2. Confirmar HTTPS e só então ativar HSTS na camada de edge.
3. Aplicar rate limiting/WAF ao endpoint de server functions.
4. Verificar CSP e restantes headers na resposta pública.
5. Testar um envio fictício e distinguir aceitação pelo fornecedor de entrega final.

Não fazer deploy de produção enquanto os itens pendentes acima não estiverem confirmados.
