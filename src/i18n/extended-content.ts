import type { Lang, PageKey } from "./content";

type Section = { title: string; paragraphs: string[] };
type Article = {
  slug: string;
  title: string;
  description: string;
  category: string;
  sections: Section[];
};

type ExtraContent = {
  pages: Record<
    Exclude<PageKey, "about" | "services" | "contact" | "faq">,
    { label: string; title: string; lead: string; metaTitle: string; metaDesc: string }
  >;
  legal: {
    privacy: Section[];
    cookies: Section[];
    terms: Section[];
    reviewRequired: string;
  };
  careers: {
    notice: string;
    noUpload: string;
    voluntary: string;
    form: {
      name: string;
      email: string;
      phone: string;
      area: string;
      message: string;
      consent: string;
      submit: string;
      success: string;
      error: string;
    };
  };
  blog: {
    read: string;
    back: string;
    articles: Article[];
  };
  consent: {
    title: string;
    text: string;
    accept: string;
    reject: string;
    customise: string;
    save: string;
    necessary: string;
    necessaryText: string;
    external: string;
    externalText: string;
    mapBlocked: string;
    loadMap: string;
    reopen: string;
    close: string;
  };
};

export const EXTRA_CONTENT: Record<Lang, ExtraContent> = {
  pt: {
    pages: {
      blog: { label: "Artigos", title: "Notas práticas antes de pedir orçamento", lead: "Textos curtos sobre o que convém saber antes de descrever uma obra. Não substituem uma visita nem uma proposta.", metaTitle: "Artigos sobre obras e remodelações — JGM Construções", metaDesc: "Notas sobre orçamentos, LSF, capoto, remodelações e pintura, a partir de Coimbra." },
      careers: { label: "Candidaturas", title: "Candidaturas espontâneas", lead: "Neste momento o site não recebe currículos. A informação abaixo explica essa limitação.", metaTitle: "Candidaturas espontâneas — JGM Construções", metaDesc: "A JGM Construções não recebe currículos pelo website nesta fase." },
      privacy: { label: "Privacidade", title: "Política de Privacidade", lead: "O que acontece aos dados que envia no formulário deste site.", metaTitle: "Política de Privacidade — JGM Construções", metaDesc: "Quem trata os dados do formulário de orçamento da JGM Construções e para quê." },
      cookies: { label: "Privacidade", title: "Política de Cookies", lead: "O que o site guarda no navegador e quando o mapa da Google é carregado.", metaTitle: "Política de Cookies — JGM Construções", metaDesc: "Consentimento no site da JGM Construções: preferência guardada no navegador e mapa externo." },
      terms: { label: "Informação legal", title: "Termos e Condições", lead: "O que este site é, e o que não é: não é um orçamento nem um contrato.", metaTitle: "Termos e Condições — JGM Construções", metaDesc: "Condições de utilização do site da JGM Construções." },
    },
    legal: {
      privacy: [
        { title: "Responsável pelo tratamento", paragraphs: ["JGM - Remodelações e Pinturas, Unipessoal Lda., NIF 517470942, com sede no Beco dos Travassos, n.º 20, 1.º, Adémia, 3025-124 Coimbra, Portugal."] },
        { title: "Dados e finalidade", paragraphs: ["O formulário de orçamento recolhe nome, email, telefone opcional, serviço, localização aproximada e descrição do projeto para analisar e responder ao pedido. Não utilizamos estes dados para publicidade sem uma base legal própria."] },
        { title: "Conservação e direitos", paragraphs: ["Os dados devem ser conservados apenas durante o período necessário à resposta e às obrigações aplicáveis. O prazo concreto e o contacto oficial para exercer direitos de acesso, retificação, apagamento, limitação, oposição e portabilidade aguardam confirmação da empresa antes da publicação final."] },
        { title: "Destinatários", paragraphs: ["O fornecedor de alojamento e o fornecedor de email transacional poderão tratar dados em nome da JGM. Os fornecedores concretos serão identificados quando a infraestrutura de produção for escolhida."] },
      ],
      cookies: [
        { title: "Tecnologias necessárias", paragraphs: ["A preferência de consentimento é guardada localmente no navegador para recordar a escolha. Esta informação não identifica diretamente o visitante."] },
        { title: "Conteúdo externo", paragraphs: ["O mapa da Google só é carregado depois de o visitante autorizar conteúdo externo. Esse fornecedor poderá tratar dados técnicos de acordo com as respetivas políticas."] },
        { title: "Alterar a escolha", paragraphs: ["As preferências de cookies podem ser reabertas a qualquer momento pelo botão discreto no canto inferior esquerdo ou pelo link no footer. Não existem atualmente categorias de publicidade ou analytics ativas no website."] },
      ],
      terms: [
        { title: "Finalidade do website", paragraphs: ["Este website apresenta a JGM e os seus serviços. A informação disponibilizada não constitui orçamento, contrato, garantia técnica ou aconselhamento para um projeto específico."] },
        { title: "Pedidos de orçamento", paragraphs: ["Cada pedido é analisado individualmente. Prazos, preços e âmbito só ficam definidos numa proposta expressamente aceite pelas partes."] },
        { title: "Conteúdo e imagens", paragraphs: ["As imagens identificadas como ilustrativas não representam obras executadas pela JGM. Não é permitida a reutilização do conteúdo do website sem autorização, salvo nos casos permitidos por lei."] },
      ],
      reviewRequired: "Documento informativo sujeito a validação jurídica e à confirmação do contacto de privacidade e dos prazos de conservação antes do lançamento.",
    },
    careers: {
      notice: "Neste momento o site não recebe currículos.",
      noUpload: "O envio de ficheiros fica desligado enquanto não houver um sítio privado para os guardar, controlo de quem lhes acede e um prazo de eliminação definido.",
      voluntary: "Se mais tarde houver uma candidatura, será voluntária. Não é um convite para entrevista nem uma promessa de contratação.",
      form: {
        name: "Nome",
        email: "Email",
        phone: "Telefone (opcional)",
        area: "Área ou função",
        message: "Mensagem (opcional)",
        consent: "Li a Política de Privacidade e envio esta mensagem por minha iniciativa. Não é um pedido de entrevista.",
        submit: "Enviar mensagem",
        success: "Recebemos a mensagem. Não é um convite para entrevista nem uma proposta de trabalho.",
        error: "A mensagem não foi enviada. Verifique os dados e tente outra vez.",
      },
    },
    blog: {
      read: "Ler artigo",
      back: "Voltar aos artigos",
      articles: [
        {
          slug: "como-preparar-pedido-orcamento",
          title: "O que escrever no pedido de orçamento",
          description: "Tipo de trabalho, zona e uma descrição chegam para o primeiro contacto. O resto pede-se se fizer falta.",
          category: "Orçamento",
          sections: [
            { title: "Três dados que mudam a resposta", paragraphs: ["Diga o que quer fazer, em que divisão ou parte do edifício, e em que localidade. “Remodelar a casa” é pouco. “Pintar o apartamento e trocar o pavimento da sala, em Coimbra” já permite perceber o pedido."] },
            { title: "O que pode ficar para depois", paragraphs: ["Medidas exatas, marcas e cores não são obrigatórias nesta fase. Se tiver fotografias ou um projeto, junte-os quando lhos pedirem. O orçamento, com preço e prazo, só existe depois de o âmbito estar escrito."] },
          ],
        },
        {
          slug: "lsf-o-que-avaliar",
          title: "LSF: o que confirmar antes de pedir a estrutura",
          description: "O Light Steel Frame é um sistema de estrutura. A decisão não se faz só pelo nome.",
          category: "Construção LSF",
          sections: [
            { title: "O que o sistema é", paragraphs: ["A estrutura é feita de perfis de aço leve galvanizado e fecha-se depois com placas, isolamento e acabamentos. Sem projeto de estrutura, não há como dizer se o LSF serve para aquele terreno e para aquele edifício."] },
            { title: "O que não se decide no site", paragraphs: ["Resistência, prazo e custo dependem do projeto, das licenças e dos acabamentos. Se a obra estiver prevista em LSF, descreva-a no pedido e indique se o projeto de estrutura já existe."] },
          ],
        },
        {
          slug: "isolamento-exterior-etics",
          title: "Capoto: o que ver na fachada antes de isolar",
          description: "O ETICS aplica-se pelo exterior. O estado da parede decide se o sistema pode entrar.",
          category: "Isolamento térmico",
          sections: [
            { title: "As camadas, por ordem", paragraphs: ["Placas de isolamento fixadas à parede, uma camada de reboco com rede e o acabamento que fica à vista. Em Portugal este conjunto é conhecido como capoto."] },
            { title: "O que a fachada tem de aguentar", paragraphs: ["Humidade, fissuras e remates de janelas, varandas e cobertura mudam a preparação. Não se promete uma poupança na fatura sem estudar o edifício. No pedido, diga se a fachada é nova ou existente."] },
          ],
        },
        {
          slug: "planear-uma-remodelacao",
          title: "Como descrever uma remodelação sem a misturar toda",
          description: "Separe o que fica, o que sai e o que precisa de continuar a ser usado durante a obra.",
          category: "Remodelações",
          sections: [
            { title: "Uma lista vale mais do que um objetivo", paragraphs: ["“Modernizar o apartamento” não diz que trabalhos são. Uma lista curta chega: cozinha, casa de banho, pintura dos quartos, pavimento da sala. Cada linha pode ter um âmbito diferente."] },
            { title: "Viver no sítio durante a obra", paragraphs: ["Nem sempre é possível. Depende das divisões e da sujidade dos trabalhos. Diga no pedido se precisa de continuar a usar a casa. A resposta diz se isso é realista, não o assume."] },
          ],
        },
        {
          slug: "preparar-paredes-para-pintura",
          title: "Pintar não é só a última demão",
          description: "Manchas, tinta solta e fissuras mudam o trabalho. A preparação só entra se estiver no orçamento.",
          category: "Pintura",
          sections: [
            { title: "O que a parede mostra", paragraphs: ["Tinta a descascar, humidade ou uma superfície irregular depois de outras obras não se resolvem com uma demão por cima. Interior e fachada também não se tratam com o mesmo esquema."] },
            { title: "Peça a preparação em separado", paragraphs: ["Massa, lixagem e tratamento de manchas são trabalhos. Se não estiverem escritos na proposta, não estão incluídos. No pedido, diga o estado da superfície, mesmo que seja só “a tinta está a soltar-se”."] },
          ],
        },
        {
          slug: "melhorar-eficiencia-envolvente",
          title: "Por onde a casa perde calor, antes de trocar equipamentos",
          description: "Paredes, cobertura e vãos fazem parte da envolvente. Isolar uma delas não descreve o edifício inteiro.",
          category: "Envolvente",
          sections: [
            { title: "Três sítios diferentes", paragraphs: ["A parede exterior, a cobertura e as janelas não são a mesma intervenção. Isolar a fachada com capoto não corrige um telhado que deixa entrar água, nem uma caixilharia que não fecha."] },
            { title: "O que se pode afirmar", paragraphs: ["Um sistema bem aplicado reduz pontes térmicas na zona onde é colocado. Quanto isso muda a fatura depende do edifício e do uso. Esse número não se inventa numa página."] },
          ],
        },
        {
          slug: "manutencao-preventiva-habitacao",
          title: "Sinais numa casa que justificam um pedido, não uma obra imediata",
          description: "Uma mancha, uma telha partida ou uma fissura são motivos para descrever o problema. Não são um diagnóstico.",
          category: "Manutenção",
          sections: [
            { title: "O que fotografar", paragraphs: ["A mancha no teto, a zona da fachada ou a telha deslocada. Junte a divisão onde aparece e há quanto tempo a nota. A origem da água, por exemplo, pode não estar por baixo da nódoa."] },
            { title: "O que o pedido não decide", paragraphs: ["Descrever o sinal não marca uma data de obra nem um preço. Serve para a JGM perceber se o caso é de pintura, de cobertura, de estuque ou de outra coisa, e se é preciso ver o local."] },
          ],
        },
      ],
    },
    consent: { title: "Preferências de cookies", text: "Utilizamos cookies e armazenamento local estritamente necessários para recordar a sua escolha neste navegador. O mapa da Google, na página de contactos, só carrega se o autorizar. Não utilizamos cookies de publicidade nem analytics neste website.", accept: "Aceitar cookies necessários e mapa", reject: "Apenas cookies necessários", customise: "Personalizar", save: "Guardar preferências", necessary: "Cookies necessários", necessaryText: "Guardam esta escolha no navegador para não voltar a perguntar em cada visita. São sempre ativos.", external: "Conteúdo externo (mapa Google)", externalText: "Carrega o mapa na página de contactos. A Google pode tratar dados técnicos segundo as regras dela.", mapBlocked: "O mapa está desligado. A morada continua escrita na página.", loadMap: "Permitir e mostrar o mapa", reopen: "Preferências de cookies", close: "Fechar preferências de cookies" },
  },
  en: {
    pages: {
      blog: { label: "Articles", title: "Practical notes before you ask for a quote", lead: "Short notes on what is useful to know before you describe a job. They are not a site visit and they are not a proposal.", metaTitle: "Articles on building work and renovation — JGM Construções", metaDesc: "Notes on quotes, LSF, ETICS, renovations and painting, from Coimbra." },
      careers: { label: "Applications", title: "Speculative applications", lead: "This site does not take CVs at the moment. The note below explains that limit.", metaTitle: "Speculative applications — JGM Construções", metaDesc: "JGM Construções does not accept CVs through the website at this stage." },
      privacy: { label: "Privacy", title: "Privacy policy", lead: "What happens to the details you send in the form on this site.", metaTitle: "Privacy policy — JGM Construções", metaDesc: "Who handles the data from the JGM Construções quote form, and why." },
      cookies: { label: "Privacy", title: "Cookie policy", lead: "What the site stores in the browser, and when the Google map is loaded.", metaTitle: "Cookie policy — JGM Construções", metaDesc: "Consent on the JGM Construções site: a choice stored in the browser, and an external map." },
      terms: { label: "Legal", title: "Terms and conditions", lead: "What this site is, and what it is not: it is not a quote and it is not a contract.", metaTitle: "Terms and conditions — JGM Construções", metaDesc: "Terms of use for the JGM Construções website." },
    },
    legal: {
      privacy: [
        { title: "Data controller", paragraphs: ["JGM - Remodelações e Pinturas, Unipessoal Lda., Portuguese tax number 517470942, at Beco dos Travassos, no. 20, 1st floor, Adémia, 3025-124 Coimbra, Portugal."] },
        { title: "Data and purpose", paragraphs: ["The quote form collects name, email, optional phone number, service, approximate location and project description to assess and reply to the request. We do not use this data for advertising without a separate legal basis."] },
        { title: "Retention and rights", paragraphs: ["Data must be kept only for as long as needed to reply and meet applicable obligations. The precise period and official privacy contact for exercising data rights require company confirmation before final publication."] },
        { title: "Recipients", paragraphs: ["Hosting and transactional-email providers may process data for JGM. The providers will be identified once the production infrastructure is selected."] },
      ],
      cookies: [
        { title: "Necessary technology", paragraphs: ["Your consent preference is stored locally in the browser. This information does not directly identify you."] },
        { title: "External content", paragraphs: ["Google Maps is loaded only after external-content consent. Google may process technical data under its own policies."] },
        { title: "Changing your choice", paragraphs: ["Cookie preferences can be reopened at any time via the discreet control at the bottom left or the footer link. No advertising or analytics categories are currently active."] },
      ],
      terms: [
        { title: "Website purpose", paragraphs: ["This website presents JGM and its services. Its content is not a quote, contract, technical warranty or advice for a specific project."] },
        { title: "Quote requests", paragraphs: ["Each request is assessed individually. Timelines, prices and scope are defined only in a proposal expressly accepted by the parties."] },
        { title: "Content and images", paragraphs: ["Images marked as illustrative do not depict work carried out by JGM. Website content may not be reused without permission except where allowed by law."] },
      ],
      reviewRequired: "This information requires legal review and confirmation of the privacy contact and retention periods before launch.",
    },
    careers: {
      notice: "This site does not take CVs at the moment.",
      noUpload: "File upload stays off until there is a private place to store them, control over who can open them, and a set period after which they are deleted.",
      voluntary: "If an application is possible later, it will be voluntary. It is not an invitation to an interview and it is not a promise of a job.",
      form: {
        name: "Name",
        email: "Email",
        phone: "Phone (optional)",
        area: "Area or role",
        message: "Message (optional)",
        consent: "I have read the Privacy Policy and I am sending this message on my own initiative. It is not a request for an interview.",
        submit: "Send message",
        success: "We received the message. It is not an invitation to an interview and it is not a job offer.",
        error: "The message was not sent. Check the details and try again.",
      },
    },
    blog: {
      read: "Read article",
      back: "Back to articles",
      articles: [
        {
          slug: "planning-a-quote-request",
          title: "What to write in a quote request",
          description: "The type of work, the area and a description are enough for a first message. The rest is asked for if it is needed.",
          category: "Quotes",
          sections: [
            { title: "Three details that change the reply", paragraphs: ["Say what you want done, in which room or part of the building, and in which town. “Renovate the house” is thin. “Paint the flat and replace the living-room floor, in Coimbra” is a request someone can read."] },
            { title: "What can wait", paragraphs: ["Exact sizes, brands and colours are not required at this stage. If you have photos or drawings, send them when they are asked for. A quote with a price and a timing exists only after the scope is written down."] },
          ],
        },
        {
          slug: "what-to-consider-lsf",
          title: "LSF: what to check before you ask for the frame",
          description: "Light Steel Frame is a structural system. The decision is not made by the name alone.",
          category: "LSF",
          sections: [
            { title: "What the system is", paragraphs: ["The frame is made of galvanised light-steel profiles and is later closed with boards, insulation and finishes. Without a structural design, there is no way to say whether LSF suits that plot and that building."] },
            { title: "What a website cannot decide", paragraphs: ["Strength, timing and cost depend on the design, the permits and the finishes. If the job is planned in LSF, describe it in the request and say whether a structural design already exists."] },
          ],
        },
        {
          slug: "external-insulation-etics",
          title: "ETICS: what to look at on the façade before insulating",
          description: "The system is fixed to the outside. The condition of the wall decides whether it can go on.",
          category: "External insulation",
          sections: [
            { title: "The layers, in order", paragraphs: ["Insulation boards fixed to the wall, a base coat with mesh, and the finish you see. In Portugal this build-up is commonly called capoto."] },
            { title: "What the façade has to take", paragraphs: ["Damp, cracks and the junctions at windows, balconies and the roof change the preparation. A saving on the energy bill is not promised without looking at the building. In the request, say whether the façade is new or already there."] },
          ],
        },
        {
          slug: "planning-a-renovation",
          title: "How to describe a renovation without mixing it all together",
          description: "Separate what stays, what comes out, and what you still need to use during the work.",
          category: "Renovations",
          sections: [
            { title: "A list is clearer than a goal", paragraphs: ["“Update the flat” does not say which jobs those are. A short list is enough: kitchen, bathroom, painting the bedrooms, living-room floor. Each line can have a different scope."] },
            { title: "Staying in the place during the work", paragraphs: ["It is not always possible. It depends on the rooms and on how messy the tasks are. Say in the request if you need to keep using the house. The reply says whether that is realistic. It does not assume it."] },
          ],
        },
        {
          slug: "preparing-walls-for-paint",
          title: "Painting is not only the last coat",
          description: "Stains, loose paint and cracks change the job. Preparation is included only if it is in the quote.",
          category: "Painting",
          sections: [
            { title: "What the wall is showing", paragraphs: ["Paint coming off, damp, or a surface left uneven by other work is not solved by one coat on top. An interior and a façade are not treated with the same system either."] },
            { title: "Ask for preparation as its own item", paragraphs: ["Filling, sanding and stain treatment are work. If they are not written in the proposal, they are not included. In the request, describe the surface, even if that is only “the paint is coming off”."] },
          ],
        },
        {
          slug: "improving-envelope-efficiency",
          title: "Where a house loses heat, before you change the equipment",
          description: "Walls, the roof and the openings are different parts of the envelope. Insulating one of them does not describe the whole building.",
          category: "The envelope",
          sections: [
            { title: "Three different places", paragraphs: ["The external wall, the roof and the windows are not the same job. Insulating the façade with ETICS does not fix a roof that lets water in, or a window that does not close."] },
            { title: "What can actually be said", paragraphs: ["A system that is properly applied reduces thermal bridges where it is placed. How much that changes the bill depends on the building and how it is used. That figure is not something to invent on a page."] },
          ],
        },
        {
          slug: "preventive-home-maintenance",
          title: "Signs in a house that justify a request, not an immediate job",
          description: "A stain, a broken tile or a crack are reasons to describe the problem. They are not a diagnosis.",
          category: "Maintenance",
          sections: [
            { title: "What to photograph", paragraphs: ["The stain on the ceiling, the patch of façade or the slipped tile. Add the room where it shows and how long you have noticed it. The source of the water, for example, may not be under the mark."] },
            { title: "What the request does not decide", paragraphs: ["Describing the sign does not book a date or a price. It lets JGM see whether the case is painting, roofing, plaster or something else, and whether the place needs to be seen."] },
          ],
        },
      ],
    },
    consent: { title: "Cookie preferences", text: "We use strictly necessary cookies and local storage to remember your choice in this browser. The Google map on the contact page loads only if you allow it. We do not use advertising or analytics cookies on this website.", accept: "Accept necessary cookies and map", reject: "Necessary cookies only", customise: "Customise", save: "Save preferences", necessary: "Necessary cookies", necessaryText: "Store this choice in the browser so we do not ask again on every visit. Always on.", external: "External content (Google map)", externalText: "Loads the map on the contact page. Google may process technical data under its own rules.", mapBlocked: "The map is off. The address is still written on the page.", loadMap: "Allow and show the map", reopen: "Cookie preferences", close: "Close cookie preferences" },
  },
  es: {
    pages: {
      blog: { label: "Artículos", title: "Notas prácticas antes de pedir presupuesto", lead: "Textos cortos sobre lo que conviene saber antes de describir una obra. No sustituyen una visita ni una propuesta.", metaTitle: "Artículos sobre obras y reformas — JGM Construções", metaDesc: "Notas sobre presupuestos, LSF, SATE, reformas y pintura, desde Coímbra." },
      careers: { label: "Candidaturas", title: "Candidaturas espontáneas", lead: "En este momento el sitio no recibe currículos. La nota de abajo explica ese límite.", metaTitle: "Candidaturas espontáneas — JGM Construções", metaDesc: "JGM Construções no recibe currículos por el sitio web en esta fase." },
      privacy: { label: "Privacidad", title: "Política de privacidad", lead: "Qué ocurre con los datos que envía en el formulario de este sitio.", metaTitle: "Política de privacidad — JGM Construções", metaDesc: "Quién trata los datos del formulario de presupuesto de JGM Construções y para qué." },
      cookies: { label: "Privacidad", title: "Política de cookies", lead: "Qué guarda el sitio en el navegador y cuándo se carga el mapa de Google.", metaTitle: "Política de cookies — JGM Construções", metaDesc: "Consentimiento en el sitio de JGM Construções: una elección guardada en el navegador y un mapa externo." },
      terms: { label: "Información legal", title: "Términos y condiciones", lead: "Qué es este sitio y qué no es: no es un presupuesto ni un contrato.", metaTitle: "Términos y condiciones — JGM Construções", metaDesc: "Condiciones de uso del sitio de JGM Construções." },
    },
    legal: {
      privacy: [
        { title: "Responsable del tratamiento", paragraphs: ["JGM - Remodelações e Pinturas, Unipessoal Lda., NIF portugués 517470942, con domicilio en Beco dos Travassos, n.º 20, 1.º, Adémia, 3025-124 Coímbra, Portugal."] },
        { title: "Datos y finalidad", paragraphs: ["El formulario recoge nombre, email, teléfono opcional, servicio, ubicación aproximada y descripción para analizar y responder a la solicitud. No usamos estos datos para publicidad sin otra base jurídica."] },
        { title: "Conservación y derechos", paragraphs: ["Los datos se conservarán solo durante el tiempo necesario para responder y cumplir obligaciones aplicables. El plazo exacto y el contacto oficial de privacidad requieren confirmación antes de la publicación final."] },
        { title: "Destinatarios", paragraphs: ["Los proveedores de alojamiento y correo transaccional podrán tratar datos para JGM. Se identificarán cuando se elija la infraestructura de producción."] },
      ],
      cookies: [
        { title: "Tecnología necesaria", paragraphs: ["La preferencia de consentimiento se guarda localmente en el navegador y no identifica directamente al visitante."] },
        { title: "Contenido externo", paragraphs: ["Google Maps solo se carga tras autorizar contenido externo y podrá tratar datos técnicos según sus políticas."] },
        { title: "Cambiar la elección", paragraphs: ["Las preferencias de cookies pueden reabrirse en cualquier momento con el control discreto de la esquina inferior izquierda o el enlace del pie de página. Actualmente no hay categorías de publicidad o analítica activas."] },
      ],
      terms: [
        { title: "Finalidad del sitio", paragraphs: ["Este sitio presenta JGM y sus servicios. La información no constituye presupuesto, contrato, garantía técnica ni asesoramiento para un proyecto concreto."] },
        { title: "Solicitudes", paragraphs: ["Cada solicitud se analiza individualmente. Plazos, precios y alcance solo se definen en una propuesta aceptada expresamente."] },
        { title: "Contenido e imágenes", paragraphs: ["Las imágenes indicadas como ilustrativas no representan obras realizadas por JGM. El contenido no puede reutilizarse sin autorización, salvo cuando lo permita la ley."] },
      ],
      reviewRequired: "Este documento requiere revisión jurídica y confirmación del contacto de privacidad y de los plazos de conservación antes del lanzamiento.",
    },
    careers: {
      notice: "En este momento el sitio no recibe currículos.",
      noUpload: "El envío de archivos sigue desactivado mientras no haya un lugar privado donde guardarlos, control de quién puede abrirlos y un plazo de eliminación definido.",
      voluntary: "Si más adelante hubiera una candidatura, será voluntaria. No es una invitación a una entrevista ni una promesa de contratación.",
      form: {
        name: "Nombre",
        email: "Correo electrónico",
        phone: "Teléfono (opcional)",
        area: "Área o función",
        message: "Mensaje (opcional)",
        consent: "He leído la política de privacidad y envío este mensaje por mi cuenta. No es una solicitud de entrevista.",
        submit: "Enviar mensaje",
        success: "Hemos recibido el mensaje. No es una invitación a una entrevista ni una oferta de trabajo.",
        error: "El mensaje no se ha enviado. Revise los datos e inténtelo de nuevo.",
      },
    },
    blog: {
      read: "Leer artículo",
      back: "Volver a los artículos",
      articles: [
        {
          slug: "preparar-solicitud-presupuesto",
          title: "Qué escribir en la solicitud de presupuesto",
          description: "El tipo de trabajo, la zona y una descripción bastan para el primer contacto. El resto se pide si hace falta.",
          category: "Presupuesto",
          sections: [
            { title: "Tres datos que cambian la respuesta", paragraphs: ["Diga qué quiere hacer, en qué estancia o parte del edificio, y en qué localidad. “Reformar la casa” es poco. “Pintar el piso y cambiar el suelo del salón, en Coímbra” ya permite entender la solicitud."] },
            { title: "Lo que puede quedar para después", paragraphs: ["Las medidas exactas, las marcas y los colores no son obligatorios en esta fase. Si tiene fotografías o un proyecto, júntelos cuando se los pidan. El presupuesto, con precio y plazo, solo existe cuando el alcance está escrito."] },
          ],
        },
        {
          slug: "que-evaluar-lsf",
          title: "LSF: qué confirmar antes de pedir la estructura",
          description: "El Light Steel Frame es un sistema de estructura. La decisión no se toma solo por el nombre.",
          category: "Construcción LSF",
          sections: [
            { title: "Qué es el sistema", paragraphs: ["La estructura se hace con perfiles de acero ligero galvanizado y se cierra después con placas, aislamiento y acabados. Sin proyecto de estructura, no hay forma de decir si el LSF sirve para ese terreno y para ese edificio."] },
            { title: "Lo que no se decide en el sitio", paragraphs: ["La resistencia, el plazo y el coste dependen del proyecto, de las licencias y de los acabados. Si la obra está prevista en LSF, descríbala en la solicitud e indique si el proyecto de estructura ya existe."] },
          ],
        },
        {
          slug: "aislamiento-exterior-sate",
          title: "SATE: qué ver en la fachada antes de aislar",
          description: "El sistema se aplica por el exterior. El estado del muro decide si puede colocarse.",
          category: "Aislamiento térmico",
          sections: [
            { title: "Las capas, por orden", paragraphs: ["Placas de aislamiento fijadas al muro, una capa de mortero con malla y el acabado que queda a la vista. En Portugal este conjunto se conoce como capoto."] },
            { title: "Lo que la fachada tiene que aguantar", paragraphs: ["La humedad, las fisuras y los encuentros de ventanas, balcones y cubierta cambian la preparación. No se promete un ahorro en la factura sin estudiar el edificio. En la solicitud, diga si la fachada es nueva o existente."] },
          ],
        },
        {
          slug: "planificar-una-reforma",
          title: "Cómo describir una reforma sin mezclarlo todo",
          description: "Separe lo que se queda, lo que sale y lo que tiene que seguir usándose durante la obra.",
          category: "Reformas",
          sections: [
            { title: "Una lista vale más que un objetivo", paragraphs: ["“Modernizar el piso” no dice qué trabajos son. Una lista corta basta: cocina, baño, pintura de los dormitorios, suelo del salón. Cada línea puede tener un alcance distinto."] },
            { title: "Vivir en el sitio durante la obra", paragraphs: ["No siempre es posible. Depende de las estancias y de la suciedad de los trabajos. Diga en la solicitud si necesita seguir usando la casa. La respuesta indica si eso es realista; no lo da por hecho."] },
          ],
        },
        {
          slug: "preparar-paredes-para-pintar",
          title: "Pintar no es solo la última mano",
          description: "Las manchas, la pintura suelta y las fisuras cambian el trabajo. La preparación solo entra si está en el presupuesto.",
          category: "Pintura",
          sections: [
            { title: "Lo que muestra la pared", paragraphs: ["Pintura que se desconcha, humedad o una superficie irregular después de otras obras no se resuelven con una mano encima. Interior y fachada tampoco se tratan con el mismo sistema."] },
            { title: "Pida la preparación aparte", paragraphs: ["La masilla, el lijado y el tratamiento de manchas son trabajos. Si no están escritos en la propuesta, no están incluidos. En la solicitud, diga el estado de la superficie, aunque sea solo “la pintura se está soltando”."] },
          ],
        },
        {
          slug: "mejorar-eficiencia-envolvente",
          title: "Por dónde pierde calor la casa, antes de cambiar equipos",
          description: "Los muros, la cubierta y los huecos forman parte de la envolvente. Aislar uno de ellos no describe el edificio entero.",
          category: "Envolvente",
          sections: [
            { title: "Tres sitios distintos", paragraphs: ["El muro exterior, la cubierta y las ventanas no son la misma intervención. Aislar la fachada con SATE no corrige un tejado por el que entra agua, ni una carpintería que no cierra."] },
            { title: "Lo que sí se puede afirmar", paragraphs: ["Un sistema bien aplicado reduce los puentes térmicos en la zona donde se coloca. Cuánto cambia eso la factura depende del edificio y del uso. Esa cifra no se inventa en una página."] },
          ],
        },
        {
          slug: "mantenimiento-preventivo-vivienda",
          title: "Señales en una casa que justifican una solicitud, no una obra inmediata",
          description: "Una mancha, una teja rota o una fisura son motivos para describir el problema. No son un diagnóstico.",
          category: "Mantenimiento",
          sections: [
            { title: "Qué fotografiar", paragraphs: ["La mancha del techo, la zona de la fachada o la teja desplazada. Añada la estancia donde aparece y desde cuándo la nota. El origen del agua, por ejemplo, puede no estar debajo de la mancha."] },
            { title: "Lo que la solicitud no decide", paragraphs: ["Describir la señal no marca una fecha de obra ni un precio. Sirve para que JGM entienda si el caso es de pintura, de cubierta, de enlucido o de otra cosa, y si hace falta ver el lugar."] },
          ],
        },
      ],
    },
    consent: { title: "Preferencias de cookies", text: "Utilizamos cookies y almacenamiento local estrictamente necesarios para recordar su elección en este navegador. El mapa de Google, en la página de contacto, solo se carga si lo autoriza. No utilizamos cookies de publicidad ni de analítica en este sitio.", accept: "Aceptar cookies necesarias y mapa", reject: "Solo cookies necesarias", customise: "Personalizar", save: "Guardar preferencias", necessary: "Cookies necesarias", necessaryText: "Guardan esta elección en el navegador para no volver a preguntar en cada visita. Siempre activas.", external: "Contenido externo (mapa de Google)", externalText: "Carga el mapa en la página de contacto. Google puede tratar datos técnicos según sus propias reglas.", mapBlocked: "El mapa está desactivado. La dirección sigue escrita en la página.", loadMap: "Permitir y mostrar el mapa", reopen: "Preferencias de cookies", close: "Cerrar preferencias de cookies" },
  },
};

export function articleBySlug(lang: Lang, slug: string) {
  return EXTRA_CONTENT[lang].blog.articles.find((article) => article.slug === slug);
}

export function articlePaths(index: number) {
  return Object.fromEntries(
    (["pt", "en", "es"] as const).map((lang) => [
      lang,
      `/${lang}/${lang === "pt" ? "blog" : "blog"}/${EXTRA_CONTENT[lang].blog.articles[index]?.slug ?? ""}`,
    ]),
  ) as Record<Lang, string>;
}
