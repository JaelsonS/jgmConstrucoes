# Guia de desenvolvimento

Para quem abre o repositório pela primeira vez.

## Preparar o ambiente

1. Instalar **Node.js 24.x** (ver `package.json` → `engines` e `.nvmrc` se existir).
2. Clonar o repositório.
3. Na raiz:

```sh
npm install
cp .env.example .env.local
```

4. Preencher variáveis de email apenas se for testar o envio; sem elas o formulário devolve erro controlado (não sucesso falso).

## Arrancar

```sh
npm run dev
```

Abrir a URL indicada pelo Vite (normalmente `http://localhost:3000` ou porta equivalente). Começar por `/pt`.

## Onde está cada coisa

| Pretende alterar… | Ficheiro / sítio |
| --- | --- |
| Texto da homepage / serviços | `src/i18n/content.ts` |
| Políticas, blog, consentimento | `src/i18n/extended-content.ts` |
| Header / footer / FAQ UI | `src/components/site.tsx` |
| Animação do edifício | `src/routes/$lang/index.tsx` + `src/lib/photos.ts` |
| Formulário de contacto | `src/routes/$lang/$page/index.tsx` + `src/lib/contact*` |
| Cores / tipografia | `src/styles.css` + `src/config/brand.ts` |
| Domínio canónico / links oficiais | `src/config/site.ts` |

## Adicionar um serviço (exemplo)

1. Adicionar id em `ServiceId` e `SERVICE_IDS`.
2. Adicionar slugs em `SERVICE_SLUGS` (pt/en/es).
3. Escrever `services.<id>` nas três línguas (nome, short, title, metaDesc, intro, problems, benefits, steps, faqs).
4. Mapear imagem em `SVC_STAGE` / `IMG` nas rotas se necessário.
5. Atualizar `public/sitemap.xml`.
6. `npm run test && npm run typecheck`.

## Adicionar uma página institucional

1. Nova chave em `PageKey` + `PAGE_SLUGS`.
2. Conteúdo em `DICT` ou `EXTRA_CONTENT`.
3. Render em `$lang/$page/index.tsx`.
4. Sitemap + testes.

## Layout e CSS

- Tailwind CSS 4 via `@tailwindcss/vite`.
- Classes utilitárias de projeto: `.container-x`, `.btn`, `.eyebrow`, `.shade-hero` em `styles.css`.
- Preferir tokens (`primary`, `ink`, `sky`) em vez de hex soltos.

## Acessibilidade (checklist rápida)

- Contraste do header sobre hero (`data-header-overlay`).
- Labels nos formulários; `aria-invalid` / `aria-describedby` nos erros.
- Menu: Escape fecha; `aria-expanded`.
- FAQ: botão + região associada.
- `prefers-reduced-motion` na animação e em `Reveal`.

## Verificações antes de pedir revisão

```sh
npm run check
```

Equivale a typecheck + lint + test + build.

## Convenções

- TypeScript estrito; evitar `any`.
- Conteúdo fora dos componentes sempre que possível.
- Não adicionar bibliotecas UI se o padrão existente chega.
- Não commit de `.env*` nem de `.output/`.
