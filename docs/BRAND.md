# Identidade visual JGM Construções

Paleta extraída da logótipo oficial geométrica (azul elétrico, laranja solar, prata e preto).

Para voz, tom e regras de copy nos três idiomas, ver [`CONTENT-AND-BRAND-GUIDE.md`](CONTENT-AND-BRAND-GUIDE.md).

## Cores

| Token | Hex | Uso |
| --- | --- | --- |
| Azul brilhante | `#00B4F0` | Identidade, eyebrows, hover secundário (`sky`) |
| Azul | `#0078E4` | Gradiente de marca |
| Azul profundo | `#003CCC` | Profundidade do gradiente azul |
| Laranja brilhante | `#FCA80C` | Início do CTA |
| Laranja | `#F0840C` | CTA principal (`primary`) |
| Laranja profundo | `#E86A08` | Fim do gradiente CTA |
| Prata | `#9C9CA8` | Elementos secundários (`steel`) |
| Prata clara | `#C8C8D0` | Texto em fundos escuros (`ink-muted`) |
| Preto carvão | `#0A0C10` | Fundos escuros, footer, ink |
| Neblina | `#F2F5F8` | Cards e secções claras |
| Branco | `#FFFFFF` | Fundo principal |

Constantes centralizadas em `src/config/brand.ts` e tokens CSS em `src/styles.css`.

## Assets

- Logótipo completo: `src/assets/brand/jgm-logo.png` (OG e usos em grande escala)
- Emblema / mark: `src/assets/brand/jgm-mark.png` (header/footer com wordmark HTML + favicon)
- Favicon: `public/favicon.png` (+ fallback SVG)
- Apple touch: `public/apple-touch-icon.png`
- Open Graph: `public/og-image.png` (1200×630, logo + “JGM Construções” legível)

No header/footer o emblema (já com JGM) é acompanhado apenas de “Construções”, colado ao mark, com gradiente prata metálico da logótipo — sem repetir as iniciais nem traços laterais.

Os PNG de marca têm fundo transparente para funcionar sobre hero e sobre o footer escuro.
