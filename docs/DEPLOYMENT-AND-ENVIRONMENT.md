# Deployment e ambientes

Documento alinhado com a infraestrutura **real** do projeto. Complementa e detalha [`OPERATIONS.md`](OPERATIONS.md).

## Ambientes conhecidos

| Ambiente | Uso | Notas |
| --- | --- | --- |
| Local | Desenvolvimento | `.env.local`; `npm run dev` |
| Preview (Vercel) | Revisão de PRs / deploys | `VITE_SITE_URL` = URL do preview |
| Produção | Domínio final | `VITE_SITE_URL=https://jgmconstrucoes.com` |

Não existem outros ambientes documentados no repositório.

## Variáveis

Fonte: `.env.example`. **Nunca** prefixar segredos com `VITE_`.

| Variável | Âmbito | Obrigatória para… |
| --- | --- | --- |
| `EMAIL_PROVIDER` | Servidor | Envio (atualmente `resend`) |
| `EMAIL_API_KEY` | Servidor | Envio |
| `EMAIL_FROM` | Servidor | Envio (remetente verificado) |
| `CONTACT_RECIPIENT` | Servidor | Destino comercial |
| `RECRUITMENT_RECIPIENT` | Servidor | Candidaturas textuais (se ativas) |
| `VITE_SITE_URL` | Público | Canonical / OG corretos |
| `TURNSTILE_*` / `VITE_TURNSTILE_*` | Opcional | Anti-bot futuro |

Sem as quatro variáveis de email, o formulário **não** finge sucesso.

## Build

```sh
npm ci
npm run check
```

Stack de saída: TanStack Start + Vite 8 + Nitro (preset Lovable). Deploy previsto na **Vercel** (`vercel.json`).

## Checklist pré-produção

1. Variáveis privadas no host.
2. `VITE_SITE_URL` = domínio canónico.
3. HTTPS confirmado; só depois HSTS no edge.
4. Rate limiting / WAF nas server functions.
5. Teste de envio fictício + verificação no painel do fornecedor.
6. Headers CSP / `nosniff` / Referrer / Permissions no domínio público.
7. Sitemap, robots, OG partilha.
8. Confirmações listadas em [`OPEN-QUESTIONS.md`](OPEN-QUESTIONS.md).

## Recuperação conhecida

**Chave exposta:** revogar → auditar utilização no fornecedor → substituir secret → rebuild → validar bundle.

**Spam no formulário:** reforçar edge + considerar Turnstile antes de persistir leads.

Não há procedimento de restore de base de dados: o site **não** grava pedidos em BD.
