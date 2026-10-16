# Decisões de arquitetura e produto

Registo das decisões relevantes para manutenção futura. Formato: problema → alternativas → escolha → consequências.

## D1 — Conteúdo em TypeScript tipado (sem CMS)

- **Problema:** precisar de PT/EN/ES consistentes com tipagem e SEO.
- **Alternativas:** CMS headless; JSON soltos; ficheiros markdown.
- **Escolha:** `content.ts` + `extended-content.ts` tipados.
- **Razão:** volume editorial ainda baixo; zero auth/preview; typecheck garante chaves.
- **Limite:** editores não técnicos dependem de desenvolvedor.
- **Rever quando:** frequência de publicação ou workflow editorial o justificarem.

## D2 — Email transacional sem base de dados

- **Problema:** receber orçamentos sem inventar CRM.
- **Alternativas:** BD + fila; formulário só mailto; terceiros tipo Formspree.
- **Escolha:** server functions TanStack + Resend (configurável).
- **Razão:** segredos no servidor; validação Zod; superfície mínima.
- **Limite:** sem histórico pesquisável; rate limit em memória não é global em serverless.
- **Rever quando:** volume ou SLA exigirem leads persistidos.

## D3 — Animação de construção preservada

- **Problema:** experiência visual diferenciadora vs. templates estáticos.
- **Escolha:** quatro stages locais + progresso no scroll da narrativa da homepage.
- **Razão:** identidade do projeto; assets já existentes.
- **Limite:** custo de LCP/JS; precisa de `prefers-reduced-motion`.
- **Rever quando:** fotos reais de obras substituírem ilustrações (mantendo a sequência).

## D4 — Posicionamento: sede em Coimbra, não “só Coimbra”

- **Problema:** SEO local útil vs. limitar artificialmente o mercado.
- **Escolha:** sede e região comunicadas; pedidos noutros sítios “caso a caso”; títulos SEO sem “em Coimbra” como única identidade.
- **Razão:** não inventar cobertura nacional; não rejeitar visitantes de outras zonas no copy.
- **Limite:** área exata ainda por confirmar comercialmente ([`OPEN-QUESTIONS.md`](OPEN-QUESTIONS.md)).

## D5 — Consentimento local para mapa

- **Problema:** Google Maps carrega terceiros.
- **Escolha:** preferência em `localStorage`; mapa só após autorização.
- **Razão:** proporcionalidade; sem analytics/ads nesta fase.
- **Limite:** políticas legais ainda sujeitas a revisão jurídica.

## D6 — Sem uploads de CV

- **Problema:** candidaturas espontâneas.
- **Escolha:** mensagem textual apenas; upload desligado.
- **Razão:** risco de malware, retenção e acesso sem infraestrutura.
- **Rever quando:** storage privado, antimalware e retenção estiverem definidos.

## D7 — Remoção do kit shadcn não usado

- **Problema:** dezenas de componentes sem referência.
- **Escolha:** remover e manter UI própria + Lucide.
- **Razão:** menos dependências e superfície de manutenção.

## D8 — Telefone internacional com `libphonenumber-js`

- **Problema:** campos `tel` simples aceitavam qualquer sequência de dígitos e não separavam país do número.
- **Alternativas:** máscara manual; `react-phone-number-input`; validação só por comprimento; `libphonenumber-js`.
- **Escolha:** `libphonenumber-js` + componente próprio `PhoneInput` (`src/components/phone-input.tsx`), PT (`+351`) por predefinição, valor enviado em E.164.
- **Razão:** biblioteca mantida, sem UI React acoplada (compatível com React 19 / TanStack Start), validação real por país, bundle relativamente pequeno.
- **Limite:** lista de países curada (não cobertura mundial completa); bandeiras via emoji regional indicator (identificador visual do seletor, não ícone de UI genérico).
