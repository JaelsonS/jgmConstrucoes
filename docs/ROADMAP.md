# Roadmap de evolução

O roadmap está organizado por valor e dependências. Cada fase deve entrar em produção apenas depois de critérios de aceitação, revisão de conteúdo e rollback definidos.

## Fase 0 — Preparação para lançamento

- [x] Aplicar identidade visual oficial (paleta, logótipo, favicon e OG) — ver `docs/BRAND.md`.
- Confirmar email comercial, recrutamento e contacto de privacidade.
- Escolher alojamento e fornecedor transacional.
- Verificar domínio, HTTPS, DNS e remetente autenticado com SPF/DKIM/DMARC.
- Rever políticas com apoio jurídico e aprovar prazos de conservação.
- Fornecer perfil Google e redes sociais oficiais.
- Testar emails fictícios, falha do fornecedor, rate limiting no edge e headers públicos.

Critério de saída: build verde, rotas diretas funcionais, nenhuma chave no bundle e checklist jurídica aprovada.

## Fase 1 — Conteúdo real e conversão

- Substituir imagens ilustrativas por obras autorizadas, mantendo a sequência cinematográfica.
- Criar portefólio com estado real, localização apenas quando autorizada, serviços e galeria otimizada.
- Adicionar telefone/email oficiais e canais confirmados.
- Medir cliques e submissões apenas com analytics consentido e minimização de dados.
- Testar versões de CTA sem alterar a identidade visual.

Critério de saída: cada projeto tem autorização, origem e alt text; não existem renders apresentados como obra real.

## Fase 2 — Operação editorial

- Definir responsáveis, revisão e calendário do blog.
- Avaliar conteúdo em ficheiros versus CMS headless.
- Só adotar CMS se houver edição não técnica, workflow, preview e frequência que justifiquem a nova superfície.
- Automatizar sitemap e feeds a partir da fonte editorial.

Critério de saída: backup/exportação, papéis mínimos, MFA e processo de publicação documentado.

## Fase 3 — Gestão de pedidos

- Avaliar volume, SLA e necessidade de histórico.
- Se email deixar de ser suficiente, introduzir um sistema mínimo de leads com autenticação, autorização e auditoria.
- Definir retenção, eliminação, exportação e resposta a pedidos de titulares.
- Implementar webhooks do fornecedor para distinguir aceite, entregue, rejeitado e bounce.

Critério de saída: RLS/autorização testada, dados privados inacessíveis anonimamente e recuperação de falhas comprovada.

## Fase 4 — Candidaturas com currículo

- Aprovar finalidade, base legal, prazo de retenção e acesso interno.
- Usar bucket privado e nomes gerados pelo servidor.
- Validar assinatura real do ficheiro, tamanho e lista positiva de tipos.
- Integrar análise antimalware e quarentena.
- Notificar por email sem anexar o CV; gerar acesso autenticado e temporário.
- Automatizar eliminação e consentimento separado para oportunidades futuras.

Critério de saída: testes de path traversal, ficheiro disfarçado, acesso anónimo, expiração e eliminação.

## Fase 5 — Qualidade contínua

- CI com typecheck, lint, testes, build, auditoria de dependências e verificação de links.
- Testes E2E para menu, idiomas, consentimento, formulários e animação.
- Orçamento de performance por rota e monitorização de Core Web Vitals consentida.
- Auditoria manual WCAG 2.2 AA e testes com tecnologias de apoio.
- Revisão trimestral de dependências, políticas e terceiros.

## Ideias condicionadas

- Área de cliente: apenas se houver casos de uso e modelo de autorização claros.
- Orçamentação automática: não implementar sem dados, regras comerciais e revisão humana.
- Chat/WhatsApp: apenas com canal oficial e análise de privacidade.
- Geolocalização de obras: nunca publicar moradas de clientes sem autorização explícita.
