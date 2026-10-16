# Estrutura do projeto

Visão orientada a quem precisa de alterar o site com segurança.

## Árvore relevante

```
jgmConstrucoes/
├── public/                 # Estáticos servidos na raiz (favicon, OG, robots, sitemap)
├── src/
│   ├── assets/             # Marca + stages JPG + variantes otimizadas (opt/)
│   ├── components/         # UI partilhada (site, consent, photo)
│   ├── config/             # Constantes de site e marca
│   ├── i18n/               # Conteúdos PT / EN / ES
│   ├── lib/                # Schemas, server functions, fotos, erros
│   ├── routes/             # Rotas file-based TanStack
│   ├── styles.css          # Tokens e utilitários Tailwind
│   └── test/               # Vitest
├── docs/                   # Documentação
├── package.json
├── vite.config.ts
├── vercel.json
└── .env.example
```

## Ficheiros críticos

### `src/i18n/content.ts`

- **Responsabilidade:** navegação, homepage, sobre, serviços, FAQ, contactos, footer, SEO helpers, slugs.
- **Quando alterar:** qualquer texto de marketing/serviço ou slug localizado.
- **Cuidados:** manter as três línguas alinhadas; atualizar `sitemap.xml` se criar rotas novas; não inventar factos.

### `src/i18n/extended-content.ts`

- **Responsabilidade:** legais, consentimento, carreiras, blog.
- **Quando alterar:** políticas, artigos, textos do banner de cookies, formulário de candidaturas.
- **Cuidados:** legais devem refletir o comportamento real; marcar revisão jurídica.

### `src/components/site.tsx`

- **Responsabilidade:** header, footer, hero de páginas, FAQ accordion, CTA band, Reveal.
- **Afeta:** todas as páginas.
- **Cuidados:** preservação de `data-header-overlay` (contraste do header); troca de idioma contextual; acessibilidade do menu.

### `src/components/consent.tsx`

- **Responsabilidade:** preferências locais e gate do mapa Google.
- **Cuidados:** não carregar conteúdo externo sem consentimento; `localStorage` apenas para a escolha.

### `src/components/photo.tsx` + `src/lib/photos.ts`

- **Responsabilidade:** picture AVIF/WebP/JPG dos stages da animação.
- **Cuidados:** o stage 0 deve permanecer prioridade no hero; não remover `src/assets/stage-*.jpg` sem substituir a sequência.

### `src/routes/$lang/index.tsx`

- **Responsabilidade:** homepage + animação de construção por scroll.
- **Cuidados:** progresso limitado à narrativa (`storyRef`); respeitar `prefers-reduced-motion`.

### `src/routes/$lang/$page/index.tsx`

- **Responsabilidade:** páginas institucionais (sobre, serviços, FAQ, contactos, blog índice, carreiras, legais) e formulários.
- **Cuidados:** validação client + server; honeypot; não simular sucesso sem `accepted`.

### `src/routes/$lang/$page/$service.tsx`

- **Responsabilidade:** detalhe de serviço ou artigo de blog (mesmo segmento de URL).
- **Cuidados:** `beforeLoad` rejeita slugs inválidos com 404.

### `src/lib/contact.server.ts` / `career.server.ts`

- **Responsabilidade:** envio de email via fornecedor; só no servidor.
- **Cuidados:** nunca expor `EMAIL_API_KEY`; limites e schemas Zod.

### `src/config/site.ts`

- **Responsabilidade:** origem canónica, links externos oficiais, ano de lançamento.
- **Cuidados:** deixar vazios URLs sociais/reviews até confirmação.

### `public/sitemap.xml`

- **Responsabilidade:** listar URLs públicas indexáveis.
- **Quando alterar:** nova página/serviço/artigo em qualquer idioma.
- **Cuidados:** testes em `content-and-security.test.ts` verificam cobertura.

### `vercel.json`

- **Responsabilidade:** headers de segurança e configuração de build na Vercel.
- **Cuidados:** HSTS só após HTTPS permanente no domínio real.
