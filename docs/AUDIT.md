# Auditoria técnica — JGM Construções

Data da auditoria: 16 de outubro de 2026.  
Atualização (mesma data): reposicionamento editorial (sede ≠ limite de mercado), copy nos 3 idiomas, i18n de strings hardcoded, documentação alargada — ver [`CHANGELOG.md`](CHANGELOG.md).

## Diagnóstico (síntese desta passagem)

| Dimensão | Preservar | Fraco / corrigido | Em falta (depende do cliente) |
| --- | --- | --- | --- |
| Técnica | SSR, schemas, consentimento, animação, headers | Copy demasiado “só Coimbra”; strings fora do i18n | Email de produção, rate limit edge |
| Comercial | Serviços claros, processo de orçamento honesto | Hero sem marca como sinal principal | Área exata, fotos reais, telefone |
| Docs | AUDIT/OPS parciais | Suite incompleta face a onboarding sénior | Revisão jurídica |

Riscos de modificar: quebrar slugs/`hreflang`, degradar LCP da animação, simular envio de formulário. Mitigação: testes de slugs/sitemap, reduced-motion, sem sucesso sem `accepted`.

## Estado inicial

O projeto era um website SSR em TanStack Start, React 19, TypeScript, Vite/Nitro e Tailwind CSS 4. A experiência principal já existia: quatro imagens locais eram cruzadas de acordo com o progresso global do scroll para simular a construção gradual de um edifício.

O conteúdo PT/EN/ES, slugs localizados e canonical/hreflang básicos estavam centralizados. O site não tinha backend de negócio: o formulário mostrava uma mensagem visual sem enviar dados. Também existiam imports em falta para Supabase e telemetria, configuração ESLint com nome incorreto, configuração Drizzle sem schema, páginas legais em falta e dependências de terceiros carregadas antes de consentimento.

## Prioridades encontradas

### Crítico

- Imports inexistentes bloqueavam typecheck/build.
- O formulário aparentava submeter, mas não comunicava com qualquer serviço.
- Não existia validação server-side nem configuração privada de email.

### Alto

- Políticas de privacidade/cookies/termos, candidaturas e consentimento estavam ausentes.
- Google Maps e Google Fonts eram carregados sem controlo de consentimento.
- Não existiam headers de segurança definidos pelo projeto.
- A animação ignorava `prefers-reduced-motion`.
- Menu de serviços, navegação mobile, troca contextual de idioma e footer estavam incompletos.

### Médio

- Faltavam sitemap, robots, favicon, Open Graph completo e dados estruturados.
- Blog não existia; portefólio continha apenas imagens corretamente identificadas como ilustrativas.
- FAQ e formulários tinham associações ARIA incompletas.
- O progresso da construção dependia de toda a altura da página.

### Baixo

- O scaffold continha 46 componentes shadcn sem qualquer referência nas páginas; foram removidos juntamente com as dependências exclusivas desse kit.
- O repositório continha ficheiros locais `.DS_Store`, agora abrangidos pelo `.gitignore`.

## Arquitetura implementada

- As rotas continuam file-based e localizadas sob `/{lang}`.
- O conteúdo base e serviços permanecem em `src/i18n/content.ts`; legais, consentimento e blog estão em `src/i18n/extended-content.ts`.
- O envio usa server functions do TanStack Start e o endpoint transacional do fornecedor configurado. Não existe base de dados.
- O browser nunca recebe `EMAIL_API_KEY`, remetente ou destinatários.
- Consentimento é guardado em `localStorage` e o mapa só é montado depois de autorização.
- Currículos não são recebidos; a página de candidaturas aceita apenas uma manifestação textual e explica a limitação.

## Segurança aplicada

- Schemas Zod no servidor, limites de campos e listas fechadas.
- Honeypot, deduplicação por UUID, limite temporário por email na instância e timeout de fornecedor.
- Remetente controlado pelo servidor e `Reply-To` validado.
- Escape de conteúdo HTML; nenhum corpo de formulário é escrito em logs.
- CSP, proteção contra framing, `nosniff`, política de referência e permissões restritas.
- Segredos documentados apenas em `.env.example`; `.env*` está ignorado.

O limite em memória é apenas uma camada complementar e não é global num ambiente serverless. Antes de produção, o host deve aplicar rate limiting/WAF e, se necessário, Turnstile.

## Pendências obrigatórias antes de produção

1. Confirmar email comercial e email de recrutamento.
2. Criar remetente verificado e configurar o fornecedor transacional.
3. Confirmar contacto oficial de privacidade e prazos de conservação.
4. Obter revisão jurídica das páginas legais.
5. Confirmar URL real de Google Reviews e redes sociais; até lá não são publicadas.
6. Confirmar alojamento, HTTPS permanente e regras de rate limiting.
7. Decidir se candidaturas textuais devem permanecer ativas.
8. Para aceitar CVs no futuro: armazenamento privado, autorização, links temporários, análise antimalware e eliminação automática.
9. Substituir imagens ilustrativas por fotografias reais apenas quando a JGM as fornecer e confirmar direitos de utilização.

## Limites da auditoria

Não foram executados testes intrusivos, entregas reais de email, deploy, alterações de DNS ou validação jurídica. A aceitação pelo endpoint do fornecedor não prova entrega final na caixa de correio; webhooks e monitorização do fornecedor devem ser avaliados quando a infraestrutura for escolhida.

## Validação executada

- TypeScript: sem erros.
- ESLint: sem erros ou warnings.
- Vitest: 2 ficheiros, 8 testes aprovados.
- Build SSR/Nitro: concluído para o preset Cloudflare.
- Auditoria npm de runtime: 0 vulnerabilidades conhecidas.
- Browser: 320, 390, 768 e 1440 px; menu, idiomas, rotas, consentimento, formulários sem credenciais, animação e footer.
- Headers locais: CSP, `nosniff`, `Referrer-Policy`, `Permissions-Policy` e `frame-ancestors` presentes.
- IDE diagnostics: nenhum erro encontrado nos ficheiros do projeto.

### Avisos de build (não bloqueantes)

O deploy na Vercel conclui com sucesso. Alguns avisos podem continuar a aparecer e **não travam** o sistema:

| Aviso | Origem | Ação |
| --- | --- | --- |
| `engines.node` | Resolvido: pinado em `24.x` (alinhado à Vercel) + `.nvmrc` | Usar Node 24 no projeto |
| `vite-tsconfig-paths` / `tsconfck` | Preset Lovable (interno) | Aguardar correção upstream; não afeta runtime |
| `eslint deprecated` | Resolvido: ESLint 10 | — |
| `Unknown env config "cache-dir"` | Variável de ambiente da Vercel/CI (`npm_config_cache_dir`) | Mitigado em `vercel.json` com `env -u`; não afeta o runtime |
| `tsconfck unmaintained` | Preset Lovable → `vite-tsconfig-paths` | Não removível sem sair do preset; aviso inofensivo |

Foram removidos os avisos de `abab` / `domexception` / `whatwg-encoding` ao atualizar `jsdom` (apenas testes).
