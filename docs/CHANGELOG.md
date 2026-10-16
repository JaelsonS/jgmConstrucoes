# Changelog — intervenção de transformação

Registo das alterações desta passagem de produto (outubro 2026). Distingue tipo de mudança.

## Assistente comercial, cookies e contactos (passagem seguinte)

- Preferências de cookies: nomenclatura corrigida; botão discreto inferior esquerdo; categorias reais (necessários + mapa).
- Assistente virtual comercial (FSM) em PT/EN/ES com encaminhamento WhatsApp pré-preenchido.
- Contacto WhatsApp oficial `+351 911 040 509` e redes Instagram/Facebook no footer + schema `sameAs`.
- Documentação: [`SALES-ASSISTANT-AND-CONSENT.md`](SALES-ASSISTANT-AND-CONSENT.md).
- Testes: `src/test/assistant-and-consent.test.ts`.
- **Não publicado automaticamente em produção.**

## Conteúdo e marca

- Reposicionamento editorial: sede em Adémia/Coimbra sem limitar a marca a “só Coimbra”.
- Hero com marca como sinal principal + proposta de valor concreta.
- Copy revisto em PT-PT, EN e ES (homepage, sobre, serviços, FAQ, contactos, footer, meta).
- Páginas de serviço: títulos SEO sem apego exclusivo a “em Coimbra”; sede referida nas descriptions.
- Sobre: bloco adicional “quem pode contactar”.
- CTAs: “Apresentar um projeto” / equivalentes EN/ES em vez de linguagem genérica.
- Guia verbal: [`CONTENT-AND-BRAND-GUIDE.md`](CONTENT-AND-BRAND-GUIDE.md).
- Questões comerciais: [`OPEN-QUESTIONS.md`](OPEN-QUESTIONS.md).

## Experiência e UI

- Hierarquia do hero (brand → eyebrow → h1 → sub → CTAs).
- Grid Sobre adaptado a 4 blocos.
- Strings hardcoded (completion, formulários, 404/erro, breadcrumb) movidas para dicionários i18n.

## SEO e i18n

- Meta titles/descriptions atualizados nos três idiomas.
- JSON-LD: removido `areaServed` não confirmado além da morada.
- Documentação: [`I18N-AND-SEO.md`](I18N-AND-SEO.md).

## Engenharia e documentação

- Documentação alargada: PROJECT-STRUCTURE, DEVELOPMENT-GUIDE, DEPLOYMENT-AND-ENVIRONMENT, QUALITY-AND-TESTING, DECISIONS, CHANGELOG, CONTENT-AND-BRAND-GUIDE, OPEN-QUESTIONS.
- README atualizado para apontar a documentação completa e Node 24.x.

## Preservado (sem regressão intencional)

- Animação de construção por scroll.
- Formulários com validação server-side e honeypot.
- Consentimento do mapa.
- Headers de segurança / CSP.
- Três idiomas e slugs localizados.
- Assets de marca e stages otimizados.

## Não feito nesta passagem (dependências externas)

- Deploy em produção / DNS.
- Configuração real de email.
- Fotografias de obras reais.
- Revisão jurídica das políticas.
- Medição Lighthouse em produção (sem declarar scores inventados).
