# Internacionalização e SEO

## Idiomas

| Código de rota | `html lang` | Mercado editorial |
| --- | --- | --- |
| `pt` | `pt-PT` | Português de Portugal (padrão) |
| `en` | `en` | Inglês internacional |
| `es` | `es` | Espanhol (Espanha) |

`/` redireciona para `/pt`.

## Onde está o conteúdo

- Conteúdo principal: `src/i18n/content.ts` (`DICT`, slugs, `seoHead`).
- Extensões: `src/i18n/extended-content.ts` (`EXTRA_CONTENT`).
- Não introduzir um segundo sistema de i18n.

## Rotas

```
/{lang}
/{lang}/{page}
/{lang}/{services}/{service}
/{lang}/{blog}/{article}
```

Slugs por idioma em `PAGE_SLUGS` e `SERVICE_SLUGS`. Chaves semânticas (`about`, `lsf`, …) permitem trocar de idioma mantendo a página equivalente (`LangSwitch` em `site.tsx`).

## Como editar ou adicionar conteúdo

1. Alterar as três entradas (`pt`, `en`, `es`) no dicionário.
2. Se for página/serviço novo: adicionar chave + slugs + rota (se necessário) + entrada no `public/sitemap.xml`.
3. Correr `npm run test` (cobertura de slugs e sitemap).
4. Verificar visualmente `/pt`, `/en`, `/es` na mesma página.

## Metadados

`seoHead(lang, title, desc, paths)` define:

- `<title>` e meta description
- Open Graph / Twitter
- `canonical`
- `hreflang` para `pt-PT`, `en`, `es` e `x-default` → PT

Cada página/rota deve chamar `seoHead` no `head` da rota.

## Schema.org

Em `__root.tsx`: `HomeAndConstructionBusiness` com nome legal, NIF e morada confirmados. **Não** inventar `aggregateRating`, horários, `sameAs` ou `areaServed` alargado sem confirmação.

## Sitemap e robots

- `public/sitemap.xml` — lista explícita de URLs.
- `public/robots.txt` — regras de rastreamento.

## Validação

```sh
npm run test          # slugs + sitemap + schemas
npm run build         # gera output SSR
```

Checklist manual: trocar idioma a meio de um serviço; confirmar que o URL muda de slug; inspecionar canonical/hreflang no HTML; partilhar URL e ver `og-image.png`.

## Erros frequentes

| Erro | Correção |
| --- | --- |
| Texto só em PT | Completar EN/ES no mesmo commit |
| Slug novo sem sitemap | Atualizar `sitemap.xml` |
| `hreflang` para página inexistente | Só emitir pares reais via `seoHead` |
| Afirmar cobertura nacional no SEO | Usar sede/região confirmada; pedidos caso a caso |
| Hardcode de copy no componente | Mover para `DICT` / `EXTRA_CONTENT` |
