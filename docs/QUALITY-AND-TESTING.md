# Qualidade e testes

## Comandos

| Comando | Objetivo | Resultado esperado |
| --- | --- | --- |
| `npm run typecheck` | TypeScript sem emitir | Exit 0, sem erros |
| `npm run lint` | ESLint | Exit 0, sem warnings bloqueantes |
| `npm run test` | Vitest | Todos os testes passam |
| `npm run build` | Build SSR/Nitro | Artefactos em `.output/` |
| `npm run check` | Pipeline completo | typecheck + lint + test + build |

## O que os testes automatizados cobrem

Ficheiros em `src/test/`:

- Round-trip de slugs de páginas e serviços (PT/EN/ES).
- `seoHead`: canonical, hreflang, OG.
- Sitemap contém todas as rotas públicas conhecidas.
- Schemas Zod de contacto e carreiras (honeypot, tamanhos).
- Routing smoke (`app-routing.test.tsx`).

## Verificação manual recomendada

1. **Rotas:** `/pt`, `/en`, `/es` e uma página de serviço em cada idioma.
2. **Idioma:** mudar bandeira a meio de um serviço → slug traduzido.
3. **Formulário:** sem env vars → erro; com env vars → aceite pelo fornecedor (não confundir com entrega na inbox).
4. **Consentimento:** mapa só após “carregar mapa” / aceitar externos; botão esquerdo reabre preferências de cookies.
5. **Assistente:** idioma → fluxo → resumo → WhatsApp; contacto direto sem questionário; ver [`SALES-ASSISTANT-AND-CONSENT.md`](SALES-ASSISTANT-AND-CONSENT.md).
6. **Animação:** scroll na homepage; com “reduce motion” → estágio final estático.
7. **Responsivo:** 320, 390, 768, 1440.
8. **Teclado:** menu, FAQ, formulário, skip link, assistente, preferências de cookies.
9. **SEO:** view-source de title/description/hreflang.

## Desempenho

Medir com Lighthouse / Web Vitals no ambiente real quando disponível. **Não** declarar percentagens sem medição.

Pontos sensíveis: imagens dos stages (AVIF/WebP), preload das fontes Sora, JS da animação limitado ao story da homepage.

## Acessibilidade

Objetivo de trabalho: WCAG 2.2 AA em revisão manual periódica (ver roadmap). Problemas conhecidos corrigidos nesta base: labels, foco, reduced motion, contraste do header.
