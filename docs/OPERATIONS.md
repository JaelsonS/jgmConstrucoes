# Operação e deployment

## Ambientes

Use ambientes separados para desenvolvimento, preview e produção. Cada ambiente deve ter variáveis e destinatários próprios. Nunca testar produção com dados pessoais reais.

## Deploy na Vercel (preview)

O projeto está pronto para deploy na Vercel (`vercel.json` + Nitro/TanStack Start).

1. Ligar o repositório na Vercel (framework: TanStack Start).
2. Definir `VITE_SITE_URL` com o URL público do deployment (ex.: `https://o-teu-projeto.vercel.app`) para o Open Graph/partilha usar a logo correta.
3. Em produção, apontar `VITE_SITE_URL` para `https://jgmconstrucoes.com`.
4. Variáveis de email (`EMAIL_*`, destinatários) são opcionais no primeiro preview; sem elas o formulário mostra erro controlado, não sucesso falso.
5. Depois do deploy, validar partilha com [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/) ou equivalente (WhatsApp/LinkedIn fazem cache da imagem).

Critério mínimo de preview: homepage, menu, idiomas, footer e cartão de partilha com `og-image.png`.

## Configuração de email

1. Criar um domínio/remetente verificado no fornecedor.
2. Configurar `EMAIL_PROVIDER=resend`.
3. Guardar `EMAIL_API_KEY`, `EMAIL_FROM`, `CONTACT_RECIPIENT` e, se aprovado, `RECRUITMENT_RECIPIENT` no secret manager do host.
4. Aplicar rate limiting ao endpoint de server functions.
5. Efetuar um teste fictício e confirmar o estado no painel do fornecedor.

Aceitação pelo endpoint significa que o fornecedor recebeu o pedido; não comprova entrega final. Para esse nível é necessário processar eventos de entrega/bounce.

## Checklist de release

- `npm ci`
- `npm run check`
- `npm audit --omit=dev`
- validar `/pt`, `/en`, `/es` e rotas diretas;
- testar consentimento num perfil limpo;
- testar formulário sem configuração e com configuração;
- inspecionar o bundle para segredos;
- confirmar canonical, hreflang, sitemap e robots;
- validar CSP e restantes headers no domínio público;
- verificar 320, 390, 768, 1440 e desktop largo;
- guardar evidências e plano de rollback.

## Headers

O projeto define CSP, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy` e proteção contra framing. HSTS deve ser configurado no edge apenas depois de confirmar que domínio e subdomínios funcionam permanentemente em HTTPS.

## Incidentes

Em caso de chave exposta:

1. revogar/rodar imediatamente;
2. procurar utilização indevida no fornecedor sem copiar dados pessoais;
3. substituir o secret no host;
4. reconstruir e validar o bundle;
5. documentar causa e medidas preventivas.

Em caso de spam, aumentar regras no edge e ativar Turnstile antes de introduzir armazenamento.

## Backups e dados

O website não guarda pedidos numa base de dados. A retenção ocorre no fornecedor de email e na caixa empresarial, pelo que a empresa deve definir acesso, arquivo e eliminação nesses sistemas.

## Manutenção

- Mensal: links, formulários, erros e atualizações de segurança.
- Trimestral: dependências, terceiros, políticas, acessibilidade e performance.
- Anual: dados empresariais, sitemap, contactos, responsáveis e validade jurídica.
