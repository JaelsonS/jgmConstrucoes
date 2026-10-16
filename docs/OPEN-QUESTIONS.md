# Questões em aberto — confirmação comercial

Informações necessárias para fechos editoriais, legais ou de produto. **Não publicar placeholders no site.**

| # | Questão | Porque importa | O que depende |
| --- | --- | --- | --- |
| 1 | Email comercial oficial e remetente verificado | Formulário de orçamento | `CONTACT_RECIPIENT`, `EMAIL_FROM`, envio real |
| 2 | Fornecedor de email (ex.: Resend) e chave | Entrega dos pedidos | Variáveis `EMAIL_*`, checklist de release |
| 3 | Email / contacto de privacidade | Páginas legais e RGPD | Política de Privacidade, direitos dos titulares |
| 4 | Prazos de conservação dos dados do formulário | Conformidade | Textos legais; retenção no fornecedor |
| 5 | Revisão jurídica de privacidade, cookies e termos | Risco legal | Remoção do aviso “sujeito a validação jurídica” |
| 6 | Telefone comercial adicional (voz) além do WhatsApp | Conversão e confiança | Contactos, schema, footer |
| 7 | Área de intervenção confirmada (concelhos / regiões) | Posicionamento sem inventar | FAQ, Sobre, SEO local |
| 8 | Quais serviços estão operacionais *hoje* (ex.: LSF, construção de edifícios) | Credibilidade | Páginas de serviço; possível desativação |
| 9 | Fotografias reais de obras + autorização de uso | Portefólio | Secção de imagens; alts; eventual CMS |
| 10 | URL Google Reviews | Prova social sem inventar | Footer; schema |
| 11 | Manter candidaturas textuais ativas? | Privacidade / expectativa | Página carreiras; `RECRUITMENT_RECIPIENT` |
| 12 | Domínio final, HTTPS e rate limiting no edge | Produção segura | Deploy, HSTS, anti-spam |
| 13 | Analytics com consentimento? | Se necessário medir conversão | Banner de consentimento; categorias |

### Confirmado e ligado no código

- WhatsApp: `+351 911 040 509` → `src/config/contacts.ts`
- Instagram: https://www.instagram.com/jgm_remodelacoes_e_pinturas/
- Facebook: https://www.facebook.com/profile.php?id=61560446386054

## Serviços anunciados — validação recomendada

Presentes no site e sujeitos a confirmação operacional pelo cliente:

- Construção de edifícios
- Construção LSF
- Remodelações
- Pintura
- Revestimentos de pavimentos e paredes
- Estucagem
- Colocação de vidros
- Coberturas
- Isolamento térmico / capoto (ETICS)

A presença no site **não prova** capacidade em qualquer localidade.
