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
  };
};

const sharedArticleSections = {
  pt: [
    { title: "Antes de comparar propostas", paragraphs: ["Defina o âmbito da intervenção, reúna plantas e fotografias e identifique as prioridades. Uma descrição clara ajuda a comparar propostas com trabalhos equivalentes."] },
    { title: "Decisões informadas", paragraphs: ["Materiais, condições existentes e acessos influenciam a solução. Uma visita técnica permite confirmar limitações e evitar conclusões baseadas apenas em fotografias."] },
  ],
  en: [
    { title: "Before comparing proposals", paragraphs: ["Define the scope, gather plans and photographs, and identify priorities. A clear brief makes it easier to compare proposals covering equivalent work."] },
    { title: "Informed decisions", paragraphs: ["Materials, existing conditions and access affect the solution. A technical visit helps confirm constraints instead of relying only on photographs."] },
  ],
  es: [
    { title: "Antes de comparar propuestas", paragraphs: ["Defina el alcance, reúna planos y fotografías e identifique prioridades. Una descripción clara permite comparar propuestas que incluyan trabajos equivalentes."] },
    { title: "Decisiones informadas", paragraphs: ["Los materiales, el estado existente y los accesos influyen en la solución. Una visita técnica permite confirmar limitaciones sin depender solo de fotografías."] },
  ],
} satisfies Record<Lang, Section[]>;

export const EXTRA_CONTENT: Record<Lang, ExtraContent> = {
  pt: {
    pages: {
      blog: { label: "Conhecimento", title: "Guias para preparar a sua obra", lead: "Informação prática sobre construção, remodelação e eficiência da envolvente.", metaTitle: "Blog de construção e remodelação — JGM Construções", metaDesc: "Guias sobre construção LSF, remodelações e isolamento térmico em Coimbra." },
      careers: { label: "Carreiras", title: "Candidaturas espontâneas", lead: "Informação para quem pretende manifestar interesse em futuras oportunidades na JGM.", metaTitle: "Candidaturas espontâneas — JGM Construções", metaDesc: "Consulte como manifestar interesse em futuras oportunidades profissionais na JGM Construções." },
      privacy: { label: "Privacidade", title: "Política de Privacidade", lead: "Como a JGM trata os dados pessoais enviados através deste website.", metaTitle: "Política de Privacidade — JGM Construções", metaDesc: "Informação sobre o tratamento de dados pessoais pela JGM Construções." },
      cookies: { label: "Privacidade", title: "Política de Cookies", lead: "Informação sobre armazenamento local e conteúdos externos.", metaTitle: "Política de Cookies — JGM Construções", metaDesc: "Conheça as categorias de consentimento utilizadas no website da JGM Construções." },
      terms: { label: "Informação legal", title: "Termos e Condições", lead: "Condições de utilização do website institucional da JGM.", metaTitle: "Termos e Condições — JGM Construções", metaDesc: "Termos de utilização do website da JGM Construções." },
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
        { title: "Alterar a escolha", paragraphs: ["As preferências podem ser reabertas no footer a qualquer momento. Não existem atualmente categorias de publicidade ou analytics ativas no website."] },
      ],
      terms: [
        { title: "Finalidade do website", paragraphs: ["Este website apresenta a JGM e os seus serviços. A informação disponibilizada não constitui orçamento, contrato, garantia técnica ou aconselhamento para um projeto específico."] },
        { title: "Pedidos de orçamento", paragraphs: ["Cada pedido é analisado individualmente. Prazos, preços e âmbito só ficam definidos numa proposta expressamente aceite pelas partes."] },
        { title: "Conteúdo e imagens", paragraphs: ["As imagens identificadas como ilustrativas não representam obras executadas pela JGM. Não é permitida a reutilização do conteúdo do website sem autorização, salvo nos casos permitidos por lei."] },
      ],
      reviewRequired: "Documento informativo sujeito a validação jurídica e à confirmação do contacto de privacidade e dos prazos de conservação antes do lançamento.",
    },
    careers: {
      notice: "Neste momento não recolhemos currículos através do website.",
      noUpload: "O upload permanecerá desativado até existirem armazenamento privado, controlo de acesso, análise de ficheiros e um prazo de eliminação aprovado.",
      voluntary: "Uma futura candidatura será voluntária e não constituirá promessa de entrevista ou contratação.",
    },
    blog: {
      read: "Ler artigo",
      back: "Voltar ao blog",
      articles: [
        { slug: "como-preparar-pedido-orcamento", title: "Como preparar um pedido de orçamento para uma obra", description: "A informação essencial para tornar o primeiro contacto mais claro e útil.", category: "Guias para preparar uma obra", sections: sharedArticleSections.pt },
        { slug: "lsf-o-que-avaliar", title: "Construção LSF: o que avaliar antes de decidir", description: "Pontos a discutir com projetistas e executantes antes de escolher o sistema.", category: "Construção LSF", sections: sharedArticleSections.pt },
        { slug: "isolamento-exterior-etics", title: "Isolamento pelo exterior: compreender o sistema ETICS", description: "Uma introdução aos componentes e à avaliação prévia da fachada.", category: "Isolamento térmico e capoto", sections: sharedArticleSections.pt },
        { slug: "planear-uma-remodelacao", title: "Como planear uma remodelação por etapas", description: "Decisões essenciais antes de iniciar trabalhos interiores ou exteriores.", category: "Remodelações", sections: sharedArticleSections.pt },
        { slug: "preparar-paredes-para-pintura", title: "Preparação de paredes antes da pintura", description: "Porque o diagnóstico e a preparação do suporte influenciam o acabamento.", category: "Pintura e revestimentos", sections: sharedArticleSections.pt },
        { slug: "melhorar-eficiencia-envolvente", title: "Eficiência energética: começar pela envolvente", description: "Uma visão introdutória sobre isolamento, pontes térmicas e conforto.", category: "Eficiência energética", sections: sharedArticleSections.pt },
        { slug: "manutencao-preventiva-habitacao", title: "Manutenção preventiva da habitação", description: "Sinais que justificam uma avaliação antes de surgirem danos maiores.", category: "Manutenção da habitação", sections: sharedArticleSections.pt },
      ],
    },
    consent: { title: "Preferências de privacidade", text: "Usamos armazenamento estritamente necessário para guardar a sua escolha. O mapa externo só é carregado com a sua autorização.", accept: "Aceitar tudo", reject: "Rejeitar opcionais", customise: "Personalizar", save: "Guardar preferências", necessary: "Estritamente necessário", necessaryText: "Mantém o website e a sua escolha de privacidade a funcionar.", external: "Conteúdo externo", externalText: "Permite carregar o mapa da Google na página de contactos.", mapBlocked: "O mapa externo está bloqueado pelas suas preferências.", loadMap: "Autorizar e carregar mapa" },
  },
  en: {
    pages: {
      blog: { label: "Knowledge", title: "Guides for planning your project", lead: "Practical information about construction, renovation and building-envelope efficiency.", metaTitle: "Construction and renovation blog — JGM Construções", metaDesc: "Guides about LSF construction, renovation and thermal insulation in Coimbra." },
      careers: { label: "Careers", title: "Unsolicited applications", lead: "Information for people interested in future opportunities at JGM.", metaTitle: "Unsolicited applications — JGM Construções", metaDesc: "How to express interest in future professional opportunities at JGM Construções." },
      privacy: { label: "Privacy", title: "Privacy Policy", lead: "How JGM handles personal data submitted through this website.", metaTitle: "Privacy Policy — JGM Construções", metaDesc: "Information about personal data processing by JGM Construções." },
      cookies: { label: "Privacy", title: "Cookie Policy", lead: "Information about local storage and external content.", metaTitle: "Cookie Policy — JGM Construções", metaDesc: "Learn about consent categories used on the JGM Construções website." },
      terms: { label: "Legal", title: "Terms and Conditions", lead: "Terms governing use of JGM's corporate website.", metaTitle: "Terms and Conditions — JGM Construções", metaDesc: "Terms governing use of the JGM Construções website." },
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
        { title: "Changing your choice", paragraphs: ["Preferences can be reopened from the footer at any time. No advertising or analytics categories are currently active."] },
      ],
      terms: [
        { title: "Website purpose", paragraphs: ["This website presents JGM and its services. Its content is not a quote, contract, technical warranty or advice for a specific project."] },
        { title: "Quote requests", paragraphs: ["Each request is assessed individually. Timelines, prices and scope are defined only in a proposal expressly accepted by the parties."] },
        { title: "Content and images", paragraphs: ["Images marked as illustrative do not depict work carried out by JGM. Website content may not be reused without permission except where allowed by law."] },
      ],
      reviewRequired: "This information requires legal review and confirmation of the privacy contact and retention periods before launch.",
    },
    careers: { notice: "We do not currently collect CVs through this website.", noUpload: "Upload will remain disabled until private storage, access control, file scanning and an approved deletion period are in place.", voluntary: "A future application will be voluntary and will not promise an interview or employment." },
    blog: {
      read: "Read article",
      back: "Back to blog",
      articles: [
        { slug: "planning-a-quote-request", title: "How to prepare a quote request for building work", description: "The essential information for a clearer, more useful first contact.", category: "Project planning guides", sections: sharedArticleSections.en },
        { slug: "what-to-consider-lsf", title: "LSF construction: what to consider before deciding", description: "Points to discuss with designers and contractors before choosing the system.", category: "LSF construction", sections: sharedArticleSections.en },
        { slug: "external-insulation-etics", title: "External insulation: understanding ETICS", description: "An introduction to the components and prior façade assessment.", category: "Thermal insulation", sections: sharedArticleSections.en },
        { slug: "planning-a-renovation", title: "How to plan a renovation in stages", description: "Essential decisions before starting interior or exterior work.", category: "Renovations", sections: sharedArticleSections.en },
        { slug: "preparing-walls-for-paint", title: "Preparing walls before painting", description: "Why diagnosing and preparing the substrate affects the finish.", category: "Painting and finishes", sections: sharedArticleSections.en },
        { slug: "improving-envelope-efficiency", title: "Energy efficiency: start with the envelope", description: "An introduction to insulation, thermal bridges and comfort.", category: "Energy efficiency", sections: sharedArticleSections.en },
        { slug: "preventive-home-maintenance", title: "Preventive home maintenance", description: "Signs that warrant assessment before greater damage develops.", category: "Home maintenance", sections: sharedArticleSections.en },
      ],
    },
    consent: { title: "Privacy preferences", text: "We use strictly necessary storage to remember your choice. The external map loads only with your permission.", accept: "Accept all", reject: "Reject optional", customise: "Customise", save: "Save preferences", necessary: "Strictly necessary", necessaryText: "Keeps the website and your privacy choice working.", external: "External content", externalText: "Allows Google Maps to load on the contact page.", mapBlocked: "The external map is blocked by your preferences.", loadMap: "Allow and load map" },
  },
  es: {
    pages: {
      blog: { label: "Conocimiento", title: "Guías para preparar su obra", lead: "Información práctica sobre construcción, reformas y eficiencia de la envolvente.", metaTitle: "Blog de construcción y reformas — JGM Construções", metaDesc: "Guías sobre construcción LSF, reformas y aislamiento térmico en Coímbra." },
      careers: { label: "Empleo", title: "Candidaturas espontáneas", lead: "Información para quienes desean manifestar interés en futuras oportunidades en JGM.", metaTitle: "Candidaturas espontáneas — JGM Construções", metaDesc: "Cómo manifestar interés en futuras oportunidades profesionales en JGM Construções." },
      privacy: { label: "Privacidad", title: "Política de Privacidad", lead: "Cómo trata JGM los datos personales enviados a través de este sitio.", metaTitle: "Política de Privacidad — JGM Construções", metaDesc: "Información sobre el tratamiento de datos personales por JGM Construções." },
      cookies: { label: "Privacidad", title: "Política de Cookies", lead: "Información sobre almacenamiento local y contenido externo.", metaTitle: "Política de Cookies — JGM Construções", metaDesc: "Conozca las categorías de consentimiento utilizadas en el sitio de JGM Construções." },
      terms: { label: "Información legal", title: "Términos y Condiciones", lead: "Condiciones de uso del sitio corporativo de JGM.", metaTitle: "Términos y Condiciones — JGM Construções", metaDesc: "Términos de uso del sitio de JGM Construções." },
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
        { title: "Cambiar la elección", paragraphs: ["Las preferencias pueden reabrirse desde el pie de página. Actualmente no hay categorías de publicidad o analítica activas."] },
      ],
      terms: [
        { title: "Finalidad del sitio", paragraphs: ["Este sitio presenta JGM y sus servicios. La información no constituye presupuesto, contrato, garantía técnica ni asesoramiento para un proyecto concreto."] },
        { title: "Solicitudes", paragraphs: ["Cada solicitud se analiza individualmente. Plazos, precios y alcance solo se definen en una propuesta aceptada expresamente."] },
        { title: "Contenido e imágenes", paragraphs: ["Las imágenes indicadas como ilustrativas no representan obras realizadas por JGM. El contenido no puede reutilizarse sin autorización, salvo cuando lo permita la ley."] },
      ],
      reviewRequired: "Este documento requiere revisión jurídica y confirmación del contacto de privacidad y de los plazos de conservación antes del lanzamiento.",
    },
    careers: { notice: "Actualmente no recogemos currículos a través de este sitio.", noUpload: "La subida permanecerá desactivada hasta disponer de almacenamiento privado, control de acceso, análisis de archivos y un plazo de eliminación aprobado.", voluntary: "Una futura candidatura será voluntaria y no supondrá promesa de entrevista o contratación." },
    blog: {
      read: "Leer artículo",
      back: "Volver al blog",
      articles: [
        { slug: "preparar-solicitud-presupuesto", title: "Cómo preparar una solicitud de presupuesto para una obra", description: "La información esencial para un primer contacto más claro y útil.", category: "Guías para preparar una obra", sections: sharedArticleSections.es },
        { slug: "que-evaluar-lsf", title: "Construcción LSF: qué evaluar antes de decidir", description: "Puntos que conviene tratar con proyectistas y constructores.", category: "Construcción LSF", sections: sharedArticleSections.es },
        { slug: "aislamiento-exterior-sate", title: "Aislamiento exterior: entender el sistema SATE", description: "Introducción a sus componentes y a la evaluación previa de la fachada.", category: "Aislamiento térmico", sections: sharedArticleSections.es },
        { slug: "planificar-una-reforma", title: "Cómo planificar una reforma por etapas", description: "Decisiones esenciales antes de comenzar trabajos interiores o exteriores.", category: "Reformas", sections: sharedArticleSections.es },
        { slug: "preparar-paredes-para-pintar", title: "Preparación de paredes antes de pintar", description: "Por qué el diagnóstico y la preparación influyen en el acabado.", category: "Pintura y revestimientos", sections: sharedArticleSections.es },
        { slug: "mejorar-eficiencia-envolvente", title: "Eficiencia energética: empezar por la envolvente", description: "Introducción al aislamiento, los puentes térmicos y el confort.", category: "Eficiencia energética", sections: sharedArticleSections.es },
        { slug: "mantenimiento-preventivo-vivienda", title: "Mantenimiento preventivo de la vivienda", description: "Señales que aconsejan una evaluación antes de daños mayores.", category: "Mantenimiento de la vivienda", sections: sharedArticleSections.es },
      ],
    },
    consent: { title: "Preferencias de privacidad", text: "Usamos almacenamiento estrictamente necesario para recordar su elección. El mapa externo solo se carga con autorización.", accept: "Aceptar todo", reject: "Rechazar opcionales", customise: "Personalizar", save: "Guardar preferencias", necessary: "Estrictamente necesario", necessaryText: "Mantiene el sitio y su elección de privacidad en funcionamiento.", external: "Contenido externo", externalText: "Permite cargar Google Maps en la página de contacto.", mapBlocked: "El mapa externo está bloqueado por sus preferencias.", loadMap: "Autorizar y cargar mapa" },
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
