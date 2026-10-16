import { SITE_CONFIG } from "@/config/site";

export const LANGS = ["pt", "en", "es"] as const;
export type Lang = (typeof LANGS)[number];
export const isLang = (v: string): v is Lang => (LANGS as readonly string[]).includes(v);

export type PageKey =
  | "about"
  | "services"
  | "contact"
  | "faq"
  | "blog"
  | "careers"
  | "privacy"
  | "cookies"
  | "terms";
export type ServiceId =
  | "buildings"
  | "lsf"
  | "renovations"
  | "painting"
  | "coverings"
  | "plastering"
  | "glazing"
  | "roofing"
  | "etics";
export const SERVICE_IDS: ServiceId[] = [
  "buildings",
  "lsf",
  "renovations",
  "painting",
  "coverings",
  "plastering",
  "glazing",
  "roofing",
  "etics",
];

export const PAGE_SLUGS: Record<Lang, Record<PageKey, string>> = {
  pt: { about: "sobre", services: "servicos", contact: "contactos", faq: "perguntas-frequentes", blog: "blog", careers: "candidaturas", privacy: "privacidade", cookies: "cookies", terms: "termos" },
  en: { about: "about", services: "services", contact: "contact", faq: "faq", blog: "blog", careers: "careers", privacy: "privacy", cookies: "cookies", terms: "terms" },
  es: { about: "sobre-nosotros", services: "servicios", contact: "contacto", faq: "preguntas-frecuentes", blog: "blog", careers: "candidaturas", privacy: "privacidad", cookies: "cookies", terms: "terminos" },
};

export const SERVICE_SLUGS: Record<Lang, Record<ServiceId, string>> = {
  pt: { buildings: "construcao-edificios", lsf: "construcao-lsf", renovations: "remodelacoes", painting: "pintura", coverings: "pavimentos-paredes", plastering: "estucagem", glazing: "colocacao-vidros", roofing: "coberturas", etics: "isolamento-termico-capoto" },
  en: { buildings: "building-construction", lsf: "lsf-construction", renovations: "renovations", painting: "painting", coverings: "floor-wall-coverings", plastering: "plastering", glazing: "glazing", roofing: "roofing", etics: "thermal-insulation-etics" },
  es: { buildings: "construccion-edificios", lsf: "construccion-lsf", renovations: "reformas", painting: "pintura", coverings: "suelos-paredes", plastering: "enlucidos", glazing: "colocacion-vidrios", roofing: "cubiertas", etics: "aislamiento-termico-sate" },
};

export const pageKeyFromSlug = (lang: Lang, slug: string): PageKey | undefined =>
  (Object.keys(PAGE_SLUGS[lang]) as PageKey[]).find((k) => PAGE_SLUGS[lang][k] === slug);
export const serviceFromSlug = (lang: Lang, slug: string): ServiceId | undefined =>
  SERVICE_IDS.find((s) => SERVICE_SLUGS[lang][s] === slug);

export const COMPANY = {
  brand: "JGM Construções",
  legal: "JGM - Remodelações e Pinturas, Unipessoal Lda.",
  nif: "517470942",
  address: ["Beco dos Travassos, n.º 20, 1.º", "Adémia, 3025-124 Coimbra", "Portugal"],
  since: 2026,
};

type Faq = { q: string; a: string };
type ServiceContent = {
  name: string;
  short: string;
  title: string;
  metaDesc: string;
  intro: string;
  problems: string[];
  benefits: string[];
  steps: { t: string; d: string }[];
  faqs: Faq[];
};

type Dict = {
  langName: string;
  nav: { home: string; about: string; services: string; blog: string; contact: string; faq: string; quote: string; menu: string; close: string; language: string; skip: string };
  home: {
    metaTitle: string; metaDesc: string;
    eyebrow: string; h1: string; sub: string; cta1: string; cta2: string; scroll: string;
    introLabel: string; introTitle: string; introText: string;
    servicesLabel: string; servicesTitle: string; more: string;
    otherServices: string; otherList: string[]; otherNote: string;
    buildLabel: string; buildTitle: string; buildNote: string; stages: { t: string; d: string }[];
    processLabel: string; processTitle: string; process: { t: string; d: string }[];
    portfolioLabel: string; portfolioTitle: string; portfolioText: string;
    faqLabel: string; faqTitle: string; allFaq: string;
    ctaTitle: string; ctaText: string;
  };
  about: { metaTitle: string; metaDesc: string; label: string; h1: string; lead: string; blocks: { t: string; d: string }[] };
  servicesPage: { metaTitle: string; metaDesc: string; label: string; h1: string; lead: string };
  service: { problems: string; benefits: string; process: string; faq: string; related: string; cta: string; ctaText: string; illustrative: string };
  contact: {
    metaTitle: string; metaDesc: string; label: string; h1: string; lead: string; address: string; legal: string;
    form: { name: string; email: string; phone: string; optional: string; service: string; choose: string; other: string; location: string; message: string; submit: string; pending: string; required: string; invalidEmail: string; privacy: string };
  };
  faqPage: { metaTitle: string; metaDesc: string; label: string; h1: string; lead: string };
  faqs: Faq[];
  footer: { desc: string; services: string; company: string; legal: string; privacy: string; cookies: string; preferences: string; terms: string; careers: string; complaints: string; review: string; rights: string; credit: string; soon: string };
  illustrative: string;
  services: Record<ServiceId, ServiceContent>;
};

const pt: Dict = {
  langName: "Português",
  nav: { home: "Início", about: "Sobre", services: "Serviços", blog: "Blog", contact: "Contactos", faq: "Perguntas frequentes", quote: "Pedir orçamento", menu: "Abrir menu", close: "Fechar menu", language: "Idioma", skip: "Saltar para o conteúdo" },
  home: {
    metaTitle: "JGM Construções — Construção, LSF e remodelações em Coimbra",
    metaDesc: "Construção em Light Steel Frame, remodelações, pintura e isolamento térmico em Coimbra e região. Peça o seu orçamento à JGM Construções.",
    eyebrow: "Coimbra · Construção e renovação",
    h1: "Construímos e transformamos espaços para viver melhor.",
    sub: "Construção em LSF, remodelações, pintura, revestimentos e isolamento térmico, com rigor técnico e acompanhamento próximo em cada fase da obra.",
    cta1: "Pedir orçamento", cta2: "Conhecer os serviços", scroll: "Descer",
    introLabel: "A JGM", introTitle: "Rigor na execução. Proximidade na relação.",
    introText: "A JGM Construções é a marca da JGM - Remodelações e Pinturas, Unipessoal Lda., sediada em Coimbra. Trabalhamos em construção nova e renovação, com uma comunicação clara desde o primeiro contacto até à entrega da obra.",
    servicesLabel: "Serviços", servicesTitle: "Do primeiro traço ao último acabamento.", more: "Saber mais",
    otherServices: "Também executamos",
    otherList: ["Pintura e revestimentos", "Pavimentos e paredes", "Estucagem", "Colocação de vidros", "Coberturas"],
    otherNote: "Fale connosco para confirmar o âmbito do seu projeto.",
    buildLabel: "Da fundação à entrega", buildTitle: "Uma obra cresce em fases. Acompanhamos todas.",
    buildNote: "Imagens ilustrativas geradas digitalmente. Não representam obras realizadas pela JGM.",
    stages: [
      { t: "Fundação", d: "Preparação do terreno e execução da base que sustenta todo o edifício." },
      { t: "Estrutura", d: "Montagem da estrutura, em LSF ou sistema tradicional, conforme o projeto." },
      { t: "Envolvente", d: "Fecho de paredes, coberturas e isolamento térmico pelo exterior." },
      { t: "Conclusão", d: "Acabamentos, revestimentos e pintura para uma casa pronta a viver." },
    ],
    processLabel: "Como trabalhamos", processTitle: "Um processo claro, sem surpresas.",
    process: [
      { t: "Primeiro contacto", d: "Ouvimos o que pretende e recolhemos a informação essencial sobre a obra." },
      { t: "Visita e análise", d: "Avaliamos o local e as condições existentes para preparar uma proposta realista." },
      { t: "Proposta", d: "Apresentamos um orçamento detalhado, com o âmbito dos trabalhos bem definido." },
      { t: "Execução e acompanhamento", d: "Executamos a obra com um ponto de contacto dedicado e comunicação regular." },
    ],
    portfolioLabel: "Portefólio", portfolioTitle: "Os nossos projetos, em breve.",
    portfolioText: "Estamos a preparar o portefólio com fotografias reais das nossas obras. Até lá, as imagens deste site são ilustrativas.",
    faqLabel: "Dúvidas", faqTitle: "Perguntas frequentes", allFaq: "Ver todas as perguntas",
    ctaTitle: "Tem uma obra em mente?", ctaText: "Conte-nos o que pretende. Analisamos o seu pedido e respondemos com a informação necessária para avançar.",
  },
  about: {
    metaTitle: "Sobre a JGM Construções — Coimbra",
    metaDesc: "Conheça a JGM Construções: abordagem de trabalho, atenção ao detalhe e acompanhamento próximo em construção e remodelação em Coimbra.",
    label: "Sobre", h1: "Uma empresa de construção feita de proximidade e rigor.",
    lead: "A JGM Construções é a marca comercial da JGM - Remodelações e Pinturas, Unipessoal Lda., com sede em Coimbra. Dedicamo-nos à construção e renovação de espaços residenciais e não residenciais.",
    blocks: [
      { t: "Atenção ao detalhe", d: "Cada acabamento conta. Planeamos e executamos com cuidado para que o resultado corresponda ao que foi combinado." },
      { t: "Comunicação clara", d: "Explicamos as opções, os passos e as decisões em linguagem simples, para que saiba sempre em que fase está a obra." },
      { t: "Acompanhamento próximo", d: "Mantemos um contacto regular durante a execução e estamos disponíveis para esclarecer qualquer dúvida." },
    ],
  },
  servicesPage: {
    metaTitle: "Serviços de construção e remodelação em Coimbra — JGM",
    metaDesc: "Construção LSF, remodelações, isolamento térmico ETICS/capoto, pintura, revestimentos, estucagem, vidros e coberturas em Coimbra.",
    label: "Serviços", h1: "Serviços de construção e renovação",
    lead: "Da construção nova à melhoria de um espaço existente, reunimos as especialidades necessárias para levar a sua obra até ao fim.",
  },
  service: { problems: "O que resolve", benefits: "Vantagens", process: "Como executamos", faq: "Perguntas frequentes", related: "Serviços relacionados", cta: "Pedir orçamento", ctaText: "Descreva o seu projeto e responderemos com os próximos passos.", illustrative: "Imagem ilustrativa" },
  contact: {
    metaTitle: "Contactos e pedido de orçamento — JGM Construções",
    metaDesc: "Peça um orçamento à JGM Construções. Morada em Adémia, Coimbra. Construção, remodelações e isolamento térmico.",
    label: "Contactos", h1: "Peça o seu orçamento",
    lead: "Partilhe alguns dados sobre a sua obra. Só pedimos a informação necessária para preparar uma resposta útil.",
    address: "Morada", legal: "Dados da empresa",
    form: { name: "Nome", email: "Email", phone: "Telefone", optional: "opcional", service: "Serviço pretendido", choose: "Selecione um serviço", other: "Outro", location: "Localização aproximada da obra", message: "Descrição do projeto", submit: "Enviar pedido", pending: "O envio online está a ser configurado e ficará disponível brevemente.", required: "Campo obrigatório.", invalidEmail: "Indique um email válido.", privacy: "Os dados enviados serão usados apenas para responder ao seu pedido, pela JGM - Remodelações e Pinturas, Unipessoal Lda., responsável pelo tratamento." },
  },
  faqPage: { metaTitle: "Perguntas frequentes — JGM Construções", metaDesc: "Respostas sobre orçamentos, construção LSF, sistema ETICS/capoto, remodelações e zonas atendidas pela JGM Construções.", label: "FAQ", h1: "Perguntas frequentes", lead: "Respostas às dúvidas mais comuns antes de iniciar uma obra." },
  faqs: [
    { q: "Como posso pedir um orçamento?", a: "Preencha o formulário na página de contactos com uma descrição da obra e a localização aproximada. Analisamos o pedido e entramos em contacto para os próximos passos." },
    { q: "Que informações devo enviar sobre a obra?", a: "O tipo de trabalho, a localização aproximada, as dimensões ou divisões envolvidas e, se existirem, projetos ou fotografias do espaço. Quanto mais claro for o pedido, mais rigorosa poderá ser a resposta." },
    { q: "Como funciona o primeiro contacto?", a: "Começamos por esclarecer o que pretende. Quando necessário, combinamos uma visita ao local antes de apresentar uma proposta." },
    { q: "Que tipos de remodelação executam?", a: "Remodelações interiores e exteriores, incluindo pintura, revestimentos de pavimentos e paredes, estucagem, colocação de vidros e coberturas." },
    { q: "Como funciona a construção LSF?", a: "O Light Steel Frame usa perfis de aço leve galvanizado para formar a estrutura do edifício, que é depois fechada com placas, isolamento e acabamentos. É um sistema construtivo seco e industrializado." },
    { q: "O que é o sistema ETICS/capoto?", a: "É um sistema de isolamento térmico aplicado pelo exterior das paredes, composto por placas isolantes, reboco armado e acabamento final." },
    { q: "Que zonas atendem?", a: "Trabalhamos sobretudo em Coimbra e região envolvente. Pedidos noutras zonas de Portugal podem ser analisados caso a caso." },
    { q: "Como é feito o acompanhamento da obra?", a: "Mantemos um contacto regular com o cliente durante toda a execução, informando sobre o avanço dos trabalhos e as decisões a tomar." },
  ],
  footer: { desc: "Construção e renovação com rigor, acompanhamento próximo e atenção ao detalhe.", services: "Serviços", company: "Empresa", legal: "Informação legal", privacy: "Política de Privacidade", cookies: "Política de Cookies", preferences: "Preferências de cookies", terms: "Termos e Condições", careers: "Candidaturas espontâneas", complaints: "Livro de Reclamações", review: "Avaliar no Google", rights: "Todos os direitos reservados.", credit: "Website desenvolvido pela", soon: "em breve" },
  illustrative: "Imagem ilustrativa",
  services: {
    buildings: {
      name: "Construção de edifícios", short: "Execução coordenada de edifícios residenciais e não residenciais, do projeto à entrega.",
      title: "Construção de edifícios em Coimbra — JGM",
      metaDesc: "Construção de edifícios em Coimbra, com planeamento, coordenação e acompanhamento de obra.",
      intro: "A construção de um edifício exige planeamento, coordenação entre especialidades e controlo de cada etapa. Acompanhamos a execução desde a preparação até aos acabamentos, de acordo com os projetos e o âmbito contratado.",
      problems: ["Coordenação de várias especialidades", "Controlo rigoroso das etapas", "Construção nova residencial ou não residencial"],
      benefits: ["Planeamento faseado", "Comunicação clara ao longo da obra", "Coordenação entre estrutura, envolvente e acabamentos"],
      steps: [{ t: "Preparação", d: "Análise do projeto, condições e sequência." }, { t: "Estrutura", d: "Execução da base e do sistema estrutural." }, { t: "Envolvente", d: "Paredes, cobertura, vãos e isolamento." }, { t: "Acabamentos", d: "Revestimentos, pintura e revisão final." }],
      faqs: [{ q: "Que tipo de edifícios constroem?", a: "Analisamos projetos residenciais e não residenciais de acordo com o âmbito, localização e especialidades necessárias." }, { q: "Trabalham a partir de um projeto existente?", a: "Sim. O projeto e as condições do local são analisados antes de definir a proposta." }],
    },
    lsf: {
      name: "Construção LSF", short: "Estruturas em aço leve para moradias e edifícios, com construção seca e precisa.",
      title: "Construção em Light Steel Frame (LSF) em Coimbra — JGM",
      metaDesc: "O que é a construção LSF, como funciona e como a JGM Construções executa moradias e edifícios em Light Steel Frame (LSF) em Coimbra.",
      intro: "O Light Steel Frame é um sistema construtivo em que a estrutura do edifício é formada por perfis de aço leve galvanizado. Depois de montada, a estrutura é fechada com placas, isolamento e acabamentos, resultando numa construção em que a obra decorre de forma mais seca e organizada.",
      problems: ["Necessidade de uma alternativa à construção tradicional", "Ampliações onde o peso da estrutura é uma preocupação", "Projetos que exigem planeamento rigoroso de cada fase"],
      benefits: ["Estrutura leve, adequada também a ampliações", "Processo construtivo seco e mais limpo em obra", "Elevado controlo dimensional dos elementos", "Compatível com diferentes acabamentos exteriores e interiores"],
      steps: [{ t: "Análise do projeto", d: "Estudo do projeto e das condições do terreno." }, { t: "Fundação", d: "Execução da base de apoio da estrutura." }, { t: "Estrutura", d: "Montagem dos perfis de aço leve." }, { t: "Fecho e acabamentos", d: "Placas, isolamento, revestimentos e pintura." }],
      faqs: [{ q: "Uma casa em LSF é resistente?", a: "A estrutura é dimensionada no projeto de especialidades de acordo com as exigências aplicáveis. O desempenho depende de cada projeto e da sua correta execução." }, { q: "O LSF é mais rápido?", a: "O sistema permite uma obra muito organizada, mas os prazos dependem do projeto, do licenciamento e dos acabamentos. Indicamos prazos apenas após analisar cada caso." }],
    },
    renovations: {
      name: "Remodelações", short: "Renovação de casas, apartamentos e espaços comerciais, do interior ao exterior.",
      title: "Remodelações de casas e apartamentos em Coimbra — JGM",
      metaDesc: "Remodelações interiores e exteriores em Coimbra: pintura, pavimentos, paredes, estucagem, vidros e coberturas, com acompanhamento próximo.",
      intro: "Uma remodelação bem planeada transforma a forma como se vive um espaço. Coordenamos as diferentes especialidades — pintura, revestimentos, estucagem, vidros e coberturas — para que a obra avance de forma organizada.",
      problems: ["Espaços desatualizados ou pouco funcionais", "Paredes e tetos danificados ou com fissuras", "Pavimentos e revestimentos degradados", "Coberturas e vãos que precisam de renovação"],
      benefits: ["Um único interlocutor para várias especialidades", "Planeamento por fases para reduzir transtornos", "Acabamentos cuidados e adequados ao uso do espaço"],
      steps: [{ t: "Levantamento", d: "Visita ao espaço e definição das necessidades." }, { t: "Proposta", d: "Orçamento detalhado por trabalhos." }, { t: "Execução", d: "Obra organizada por fases e especialidades." }, { t: "Entrega", d: "Revisão final dos trabalhos com o cliente." }],
      faqs: [{ q: "Posso continuar a viver em casa durante a obra?", a: "Depende do tipo e dimensão dos trabalhos. Avaliamos essa possibilidade no início e organizamos a obra em conformidade." }, { q: "Fazem remodelações parciais?", a: "Sim. Podemos intervir apenas numa divisão ou num tipo de trabalho específico." }],
    },
    etics: {
      name: "Isolamento térmico e capoto", short: "Sistemas ETICS aplicados pelo exterior para fachadas novas ou existentes.",
      title: "Isolamento térmico pelo exterior ETICS/capoto em Coimbra — JGM",
      metaDesc: "Aplicação de isolamento térmico pelo exterior (ETICS/capoto) em Coimbra. Saiba como funciona o sistema e como é executado.",
      intro: "O sistema ETICS, conhecido como capoto, é um isolamento térmico aplicado pelo exterior das paredes. É composto por placas isolantes fixadas à fachada, uma camada de reboco armado com rede e um acabamento final, podendo ser aplicado em construção nova ou na reabilitação de edifícios.",
      problems: ["Paredes frias e desconforto térmico no interior", "Condensações associadas a pontes térmicas", "Fachadas degradadas que precisam de renovação"],
      benefits: ["Contribui para um maior conforto térmico interior", "Ajuda a reduzir pontes térmicas na envolvente", "Renova a imagem da fachada", "Aplicação pelo exterior, com menor interferência no interior"],
      steps: [{ t: "Avaliação da fachada", d: "Análise do suporte e dos pontos singulares." }, { t: "Preparação", d: "Limpeza e regularização da superfície." }, { t: "Aplicação", d: "Fixação das placas, reboco armado e rede." }, { t: "Acabamento", d: "Revestimento final na cor escolhida." }],
      faqs: [{ q: "Quanto se poupa com o capoto?", a: "Os resultados dependem do edifício, da espessura do isolamento, do clima e da utilização. Não indicamos valores de poupança sem um estudo adequado." }, { q: "Pode ser aplicado em edifícios existentes?", a: "Sim, após avaliação do estado da fachada e das condições de aplicação." }],
    },
    painting: {
      name: "Pintura", short: "Preparação e pintura de interiores, exteriores e fachadas.",
      title: "Serviços de pintura em Coimbra — JGM", metaDesc: "Pintura interior e exterior em Coimbra, com preparação de superfícies.",
      intro: "Um acabamento durável começa no diagnóstico e na preparação do suporte. Executamos pintura interior e exterior com soluções adequadas às condições existentes.",
      problems: ["Paredes degradadas, manchadas ou fissuradas", "Renovação de interiores e fachadas", "Superfícies que exigem preparação"],
      benefits: ["Preparação cuidada", "Soluções adequadas ao suporte", "Acabamento uniforme"],
      steps: [{ t: "Avaliação", d: "Observação do suporte." }, { t: "Preparação", d: "Proteção, limpeza e correção." }, { t: "Pintura", d: "Aplicação das demãos previstas." }, { t: "Revisão", d: "Verificação final e limpeza." }],
      faqs: [{ q: "A preparação está incluída?", a: "O âmbito é definido após avaliar as superfícies e fica discriminado na proposta." }],
    },
    coverings: {
      name: "Revestimentos de pavimentos e paredes", short: "Aplicação e renovação de revestimentos interiores e exteriores.",
      title: "Pavimentos e paredes em Coimbra — JGM", metaDesc: "Aplicação de pavimentos e revestimentos de paredes em Coimbra.",
      intro: "Pavimentos e paredes precisam de suportes regulares e soluções compatíveis com o uso. Preparamos e aplicamos revestimentos de acordo com o projeto e o material.",
      problems: ["Pavimentos gastos ou irregulares", "Paredes a renovar", "Alteração funcional e visual"],
      benefits: ["Preparação do suporte", "Alinhamentos e remates cuidados", "Materiais adequados ao uso"],
      steps: [{ t: "Medição", d: "Levantamento da área." }, { t: "Preparação", d: "Regularização do suporte." }, { t: "Aplicação", d: "Colocação e remates." }, { t: "Verificação", d: "Limpeza e controlo final." }],
      faqs: [{ q: "Fazem remodelações parciais?", a: "Sim, após confirmar a compatibilidade com os elementos existentes." }],
    },
    plastering: {
      name: "Estucagem", short: "Regularização e acabamento de paredes e tetos.",
      title: "Estucagem em Coimbra — JGM", metaDesc: "Estucagem e regularização de paredes e tetos em Coimbra.",
      intro: "A estucagem cria uma base regular para o acabamento. Intervimos em paredes e tetos novos ou existentes após avaliar o suporte.",
      problems: ["Paredes e tetos irregulares", "Superfícies degradadas", "Acabamento em obra nova"],
      benefits: ["Base uniforme", "Correção de irregularidades", "Integração com pintura"],
      steps: [{ t: "Diagnóstico", d: "Verificação do suporte." }, { t: "Preparação", d: "Tratamento das zonas necessárias." }, { t: "Aplicação", d: "Execução das camadas." }, { t: "Acabamento", d: "Regularização final." }],
      faqs: [{ q: "A estucagem resolve qualquer fissura?", a: "A causa deve ser avaliada; fissuras ativas exigem uma abordagem específica." }],
    },
    glazing: {
      name: "Colocação de vidros", short: "Aplicação e substituição de vidros compatíveis com cada vão.",
      title: "Colocação de vidros em Coimbra — JGM", metaDesc: "Colocação e substituição de vidros em Coimbra.",
      intro: "A escolha e colocação de vidro depende do vão, utilização e caixilharia. Avaliamos as condições antes da medição e instalação.",
      problems: ["Vidros danificados", "Vãos renovados", "Novas soluções com vidro"],
      benefits: ["Medição no local", "Compatibilidade com o vão", "Instalação cuidada"],
      steps: [{ t: "Avaliação", d: "Inspeção do vão." }, { t: "Medição", d: "Definição das dimensões." }, { t: "Preparação", d: "Organização da montagem." }, { t: "Instalação", d: "Colocação e selagem." }],
      faqs: [{ q: "Substituem apenas um vidro?", a: "O pedido pode ser analisado conforme o vidro, a caixilharia e o acesso." }],
    },
    roofing: {
      name: "Coberturas", short: "Execução, renovação e manutenção de coberturas.",
      title: "Coberturas em Coimbra — JGM", metaDesc: "Execução e renovação de coberturas em Coimbra.",
      intro: "Uma cobertura deve gerir água, exposição e continuidade do isolamento. Avaliamos a solução antes de definir materiais e intervenção.",
      problems: ["Coberturas degradadas", "Infiltrações a diagnosticar", "Renovação de isolamento e remates"],
      benefits: ["Avaliação dos pontos singulares", "Coordenação com drenagem", "Execução faseada"],
      steps: [{ t: "Inspeção", d: "Avaliação e acessos." }, { t: "Solução", d: "Definição do âmbito." }, { t: "Execução", d: "Intervenção e remates." }, { t: "Revisão", d: "Verificação final." }],
      faqs: [{ q: "Uma infiltração mostra sempre onde está a falha?", a: "Não. A água pode percorrer elementos, pelo que a origem deve ser avaliada." }],
    },
  },
};

const en: Dict = {
  langName: "English",
  nav: { home: "Home", about: "About", services: "Services", blog: "Blog", contact: "Contact", faq: "FAQ", quote: "Request a quote", menu: "Open menu", close: "Close menu", language: "Language", skip: "Skip to content" },
  home: {
    metaTitle: "JGM Construções — Construction, LSF and renovations in Coimbra",
    metaDesc: "Light Steel Frame construction, renovations, painting and thermal insulation in Coimbra, Portugal. Request a quote from JGM Construções.",
    eyebrow: "Coimbra · Construction and renovation",
    h1: "We build and transform spaces for better living.",
    sub: "LSF construction, renovations, painting, finishes and thermal insulation, with technical rigour and close support at every stage of the project.",
    cta1: "Request a quote", cta2: "Explore our services", scroll: "Scroll",
    introLabel: "About JGM", introTitle: "Rigour in execution. Closeness in every relationship.",
    introText: "JGM Construções is the brand of JGM - Remodelações e Pinturas, Unipessoal Lda., based in Coimbra, Portugal. We work on new builds and renovations, with clear communication from the first contact through to handover.",
    servicesLabel: "Services", servicesTitle: "From the first sketch to the final finish.", more: "Learn more",
    otherServices: "We also carry out",
    otherList: ["Painting and finishes", "Floor and wall coverings", "Plastering", "Glazing", "Roofing"],
    otherNote: "Get in touch to confirm the scope of your project.",
    buildLabel: "From foundation to handover", buildTitle: "A building grows in stages. We are there for all of them.",
    buildNote: "Digitally generated illustrative images. They do not depict projects carried out by JGM.",
    stages: [
      { t: "Foundation", d: "Site preparation and the base that supports the entire building." },
      { t: "Structure", d: "Erecting the frame, in LSF or a traditional system, as designed." },
      { t: "Envelope", d: "Closing walls and roof, and applying external thermal insulation." },
      { t: "Completion", d: "Finishes, coverings and paint for a home ready to live in." },
    ],
    processLabel: "How we work", processTitle: "A clear process, with no surprises.",
    process: [
      { t: "First contact", d: "We listen to what you need and gather the essential information about the project." },
      { t: "Site visit and assessment", d: "We assess the site and existing conditions to prepare a realistic proposal." },
      { t: "Proposal", d: "We present a detailed quote with a clearly defined scope of work." },
      { t: "Execution and follow-up", d: "We carry out the work with a dedicated point of contact and regular updates." },
    ],
    portfolioLabel: "Portfolio", portfolioTitle: "Our projects, coming soon.",
    portfolioText: "We are preparing our portfolio with real photographs of our work. Until then, the images on this site are illustrative.",
    faqLabel: "Questions", faqTitle: "Frequently asked questions", allFaq: "See all questions",
    ctaTitle: "Have a project in mind?", ctaText: "Tell us what you have in mind. We will review your request and reply with what you need to move forward.",
  },
  about: {
    metaTitle: "About JGM Construções — Coimbra",
    metaDesc: "Meet JGM Construções: our way of working, attention to detail and close support in construction and renovation in Coimbra.",
    label: "About", h1: "A construction company built on closeness and rigour.",
    lead: "JGM Construções is the trading name of JGM - Remodelações e Pinturas, Unipessoal Lda., headquartered in Coimbra. We build and renovate residential and non-residential spaces.",
    blocks: [
      { t: "Attention to detail", d: "Every finish matters. We plan and execute carefully so the result matches what was agreed." },
      { t: "Clear communication", d: "We explain options, steps and decisions in plain language, so you always know where your project stands." },
      { t: "Close support", d: "We stay in regular contact throughout the works and are available to answer any question." },
    ],
  },
  servicesPage: {
    metaTitle: "Construction and renovation services in Coimbra — JGM",
    metaDesc: "LSF construction, renovations, ETICS thermal insulation, painting, finishes, plastering, glazing and roofing in Coimbra, Portugal.",
    label: "Services", h1: "Construction and renovation services",
    lead: "From new builds to improving an existing space, we bring together the trades needed to see your project through.",
  },
  service: { problems: "What it solves", benefits: "Advantages", process: "How we carry it out", faq: "Frequently asked questions", related: "Related services", cta: "Request a quote", ctaText: "Describe your project and we will reply with the next steps.", illustrative: "Illustrative image" },
  contact: {
    metaTitle: "Contact and quote request — JGM Construções",
    metaDesc: "Request a quote from JGM Construções. Based in Adémia, Coimbra. Construction, renovations and thermal insulation.",
    label: "Contact", h1: "Request your quote",
    lead: "Share a few details about your project. We only ask for what we need to prepare a useful reply.",
    address: "Address", legal: "Company details",
    form: { name: "Name", email: "Email", phone: "Phone", optional: "optional", service: "Service required", choose: "Select a service", other: "Other", location: "Approximate project location", message: "Project description", submit: "Send request", pending: "Online submission is being set up and will be available shortly.", required: "This field is required.", invalidEmail: "Please enter a valid email.", privacy: "The data you submit will be used solely to reply to your request by JGM - Remodelações e Pinturas, Unipessoal Lda., the data controller." },
  },
  faqPage: { metaTitle: "Frequently asked questions — JGM Construções", metaDesc: "Answers about quotes, LSF construction, the ETICS system, renovations and the areas served by JGM Construções.", label: "FAQ", h1: "Frequently asked questions", lead: "Answers to the most common questions before starting a project." },
  faqs: [
    { q: "How can I request a quote?", a: "Fill in the form on the contact page with a description of the work and its approximate location. We will review your request and get in touch about next steps." },
    { q: "What information should I send?", a: "The type of work, approximate location, dimensions or rooms involved and, if available, plans or photos of the space. The clearer the request, the more accurate our reply can be." },
    { q: "How does the first contact work?", a: "We start by understanding what you need. Where necessary, we arrange a site visit before presenting a proposal." },
    { q: "What kinds of renovation do you carry out?", a: "Interior and exterior renovations, including painting, floor and wall coverings, plastering, glazing and roofing." },
    { q: "How does LSF construction work?", a: "Light Steel Frame uses galvanised light steel profiles to form the building's structure, which is then closed with boards, insulation and finishes. It is a dry, industrialised building system." },
    { q: "What is the ETICS system?", a: "ETICS is an external thermal insulation system for walls, made up of insulation boards, a reinforced base coat and a final finish." },
    { q: "Which areas do you serve?", a: "We work mainly in Coimbra and the surrounding region. Requests elsewhere in Portugal can be assessed case by case." },
    { q: "How do you keep clients informed?", a: "We stay in regular contact throughout the works, reporting on progress and on decisions to be made." },
  ],
  footer: { desc: "Construction and renovation with rigour, close support and attention to detail.", services: "Services", company: "Company", legal: "Legal", privacy: "Privacy Policy", cookies: "Cookie Policy", preferences: "Cookie preferences", terms: "Terms and Conditions", careers: "Unsolicited applications", complaints: "Complaints Book", review: "Review on Google", rights: "All rights reserved.", credit: "Website developed by", soon: "coming soon" },
  illustrative: "Illustrative image",
  services: {
    buildings: {
      name: "Building construction", short: "Coordinated delivery of residential and non-residential buildings.",
      title: "Building construction in Coimbra — JGM", metaDesc: "Residential and non-residential building construction in Coimbra.",
      intro: "Building delivery requires planning, coordination between trades and control at every stage. We follow execution from site preparation to finishes according to the approved designs and scope.",
      problems: ["Coordinating several trades", "Controlling each construction stage", "New residential or non-residential builds"],
      benefits: ["Phased planning", "Clear communication", "Coordination of structure, envelope and finishes"],
      steps: [{ t: "Preparation", d: "Reviewing designs and sequence." }, { t: "Structure", d: "Building the base and structural system." }, { t: "Envelope", d: "Walls, roof, openings and insulation." }, { t: "Finishes", d: "Coverings, painting and final review." }],
      faqs: [{ q: "What buildings do you construct?", a: "We assess residential and non-residential projects according to scope, location and required trades." }],
    },
    lsf: {
      name: "LSF construction", short: "Light steel structures for houses and buildings, with dry and precise construction.",
      title: "Light Steel Frame (LSF) construction in Coimbra — JGM",
      metaDesc: "What LSF construction is, how it works and how JGM Construções builds Light Steel Frame houses and buildings in Coimbra.",
      intro: "Light Steel Frame (LSF) is a building system in which the structure is made of galvanised light steel profiles. Once erected, the frame is closed with boards, insulation and finishes, resulting in a drier and more organised building site.",
      problems: ["Looking for an alternative to traditional construction", "Extensions where structural weight is a concern", "Projects that require careful planning of every stage"],
      benefits: ["Lightweight structure, also suited to extensions", "Dry, cleaner construction process on site", "High dimensional control of components", "Compatible with a range of exterior and interior finishes"],
      steps: [{ t: "Project review", d: "Studying the design and site conditions." }, { t: "Foundation", d: "Building the base that supports the frame." }, { t: "Structure", d: "Assembling the light steel profiles." }, { t: "Closing and finishes", d: "Boards, insulation, coverings and paint." }],
      faqs: [{ q: "Is an LSF house strong?", a: "The structure is designed by the structural engineering project in line with applicable requirements. Performance depends on each design and its proper execution." }, { q: "Is LSF faster?", a: "The system allows a very organised build, but timelines depend on the design, permits and finishes. We only give timelines after reviewing each case." }],
    },
    renovations: {
      name: "Renovations", short: "Renovation of houses, apartments and commercial spaces, inside and out.",
      title: "House and apartment renovations in Coimbra — JGM",
      metaDesc: "Interior and exterior renovations in Coimbra: painting, floors, walls, plastering, glazing and roofing, with close support.",
      intro: "A well-planned renovation changes how you live in a space. We coordinate the different trades — painting, coverings, plastering, glazing and roofing — so the works progress in an organised way.",
      problems: ["Outdated or impractical spaces", "Damaged or cracked walls and ceilings", "Worn floors and coverings", "Roofs and openings in need of renewal"],
      benefits: ["One point of contact for several trades", "Phased planning to reduce disruption", "Careful finishes suited to how the space is used"],
      steps: [{ t: "Survey", d: "Visiting the space and defining needs." }, { t: "Proposal", d: "Detailed quote broken down by task." }, { t: "Execution", d: "Works organised by phase and trade." }, { t: "Handover", d: "Final review of the work with the client." }],
      faqs: [{ q: "Can I stay at home during the works?", a: "It depends on the type and scale of the work. We assess this at the start and organise the project accordingly." }, { q: "Do you do partial renovations?", a: "Yes. We can work on a single room or a specific type of task." }],
    },
    etics: {
      name: "Thermal insulation (ETICS)", short: "External ETICS systems for new or existing façades.",
      title: "External thermal insulation (ETICS) in Coimbra — JGM",
      metaDesc: "External thermal insulation (ETICS) installation in Coimbra. Learn how the system works and how it is applied.",
      intro: "ETICS (External Thermal Insulation Composite System) is insulation applied to the outside of walls. It consists of insulation boards fixed to the façade, a mesh-reinforced base coat and a final finish, and can be used in new builds or building rehabilitation.",
      problems: ["Cold walls and indoor thermal discomfort", "Condensation linked to thermal bridges", "Worn façades in need of renewal"],
      benefits: ["Contributes to greater indoor thermal comfort", "Helps reduce thermal bridges in the envelope", "Refreshes the look of the façade", "Applied from the outside, with less disruption indoors"],
      steps: [{ t: "Façade assessment", d: "Reviewing the substrate and critical details." }, { t: "Preparation", d: "Cleaning and levelling the surface." }, { t: "Application", d: "Fixing boards, base coat and mesh." }, { t: "Finish", d: "Final coating in the chosen colour." }],
      faqs: [{ q: "How much will ETICS save me?", a: "Results depend on the building, insulation thickness, climate and use. We do not quote savings without a proper study." }, { q: "Can it be applied to existing buildings?", a: "Yes, after assessing the condition of the façade and the application conditions." }],
    },
    painting: {
      name: "Painting", short: "Preparation and painting of interiors, exteriors and façades.",
      title: "Painting services in Coimbra — JGM", metaDesc: "Interior and exterior painting services in Coimbra.",
      intro: "A durable finish starts with assessment and substrate preparation. We paint interiors and exteriors using systems suited to existing conditions.",
      problems: ["Worn or stained walls", "Interior and façade renovation", "Surfaces requiring preparation"], benefits: ["Careful preparation", "Suitable coating systems", "Even finish"],
      steps: [{ t: "Assessment", d: "Reviewing the substrate." }, { t: "Preparation", d: "Protection, cleaning and repairs." }, { t: "Painting", d: "Applying the specified coats." }, { t: "Review", d: "Final check and cleaning." }],
      faqs: [{ q: "Is preparation included?", a: "The scope is defined after assessing the surfaces and is detailed in the proposal." }],
    },
    coverings: {
      name: "Floor and wall coverings", short: "Installation and renovation of interior and exterior coverings.",
      title: "Floor and wall coverings in Coimbra — JGM", metaDesc: "Floor and wall covering installation in Coimbra.",
      intro: "Floors and walls require regular substrates and materials suited to their use. We prepare and install coverings according to the project.",
      problems: ["Worn or uneven floors", "Walls in need of renovation", "Functional and visual upgrades"], benefits: ["Substrate preparation", "Careful alignment and edges", "Materials suited to use"],
      steps: [{ t: "Survey", d: "Measuring and checking the substrate." }, { t: "Preparation", d: "Levelling and planning." }, { t: "Installation", d: "Applying and finishing." }, { t: "Check", d: "Cleaning and final control." }],
      faqs: [{ q: "Do you carry out partial work?", a: "Yes, after checking compatibility with the existing elements." }],
    },
    plastering: {
      name: "Plastering", short: "Levelling and finishing walls and ceilings.",
      title: "Plastering in Coimbra — JGM", metaDesc: "Wall and ceiling plastering in Coimbra.",
      intro: "Plastering creates a regular base for the final finish. We work on new or existing walls and ceilings after assessing the substrate.",
      problems: ["Uneven walls and ceilings", "Worn surfaces", "New-build finishing"], benefits: ["Even base", "Correction of irregularities", "Integration with painting"],
      steps: [{ t: "Assessment", d: "Checking the substrate." }, { t: "Preparation", d: "Treating required areas." }, { t: "Application", d: "Applying the planned layers." }, { t: "Finish", d: "Final levelling." }],
      faqs: [{ q: "Does plaster solve every crack?", a: "The cause must first be assessed; active cracks require a specific approach." }],
    },
    glazing: {
      name: "Glazing", short: "Installation and replacement of glass suited to each opening.",
      title: "Glazing in Coimbra — JGM", metaDesc: "Glass installation and replacement in Coimbra.",
      intro: "Glass selection depends on the opening, use and frame. We assess conditions before measuring and installing.",
      problems: ["Damaged glass", "Renovated openings", "New glazed solutions"], benefits: ["On-site measurement", "Compatibility with the opening", "Careful installation"],
      steps: [{ t: "Assessment", d: "Inspecting the opening." }, { t: "Measurement", d: "Defining dimensions." }, { t: "Preparation", d: "Planning safe installation." }, { t: "Installation", d: "Fitting and sealing." }],
      faqs: [{ q: "Can you replace one pane?", a: "The request can be assessed according to the glass, frame and access." }],
    },
    roofing: {
      name: "Roofing", short: "Construction, renovation and maintenance of roofs.",
      title: "Roofing in Coimbra — JGM", metaDesc: "Roof construction and renovation in Coimbra.",
      intro: "A roof must manage water, exposure and insulation continuity. We assess the solution before defining materials and works.",
      problems: ["Worn roofs", "Leaks requiring diagnosis", "Insulation and flashing renewal"], benefits: ["Critical-detail assessment", "Drainage coordination", "Phased execution"],
      steps: [{ t: "Inspection", d: "Assessing conditions and access." }, { t: "Solution", d: "Defining scope." }, { t: "Works", d: "Executing and detailing." }, { t: "Review", d: "Final verification." }],
      faqs: [{ q: "Does a leak show where the fault is?", a: "Not always. Water can travel through elements, so the source must be assessed." }],
    },
  },
};

const es: Dict = {
  langName: "Español",
  nav: { home: "Inicio", about: "Sobre nosotros", services: "Servicios", blog: "Blog", contact: "Contacto", faq: "Preguntas frecuentes", quote: "Pedir presupuesto", menu: "Abrir menú", close: "Cerrar menú", language: "Idioma", skip: "Saltar al contenido" },
  home: {
    metaTitle: "JGM Construções — Construcción, LSF y reformas en Coímbra",
    metaDesc: "Construcción en Light Steel Frame, reformas, pintura y aislamiento térmico en Coímbra, Portugal. Pida su presupuesto a JGM Construções.",
    eyebrow: "Coímbra · Construcción y renovación",
    h1: "Construimos y transformamos espacios para vivir mejor.",
    sub: "Construcción en LSF, reformas, pintura, revestimientos y aislamiento térmico, con rigor técnico y un seguimiento cercano en cada fase de la obra.",
    cta1: "Pedir presupuesto", cta2: "Conocer los servicios", scroll: "Bajar",
    introLabel: "JGM", introTitle: "Rigor en la ejecución. Cercanía en la relación.",
    introText: "JGM Construções es la marca de JGM - Remodelações e Pinturas, Unipessoal Lda., con sede en Coímbra, Portugal. Trabajamos en obra nueva y renovación, con una comunicación clara desde el primer contacto hasta la entrega.",
    servicesLabel: "Servicios", servicesTitle: "Del primer trazo al último acabado.", more: "Saber más",
    otherServices: "También realizamos",
    otherList: ["Pintura y revestimientos", "Pavimentos y paredes", "Enlucidos", "Colocación de vidrios", "Cubiertas"],
    otherNote: "Contacte con nosotros para confirmar el alcance de su proyecto.",
    buildLabel: "De la cimentación a la entrega", buildTitle: "Una obra crece por fases. Las acompañamos todas.",
    buildNote: "Imágenes ilustrativas generadas digitalmente. No representan obras realizadas por JGM.",
    stages: [
      { t: "Cimentación", d: "Preparación del terreno y ejecución de la base que sostiene el edificio." },
      { t: "Estructura", d: "Montaje de la estructura, en LSF o sistema tradicional, según el proyecto." },
      { t: "Envolvente", d: "Cierre de muros y cubierta, y aislamiento térmico por el exterior." },
      { t: "Finalización", d: "Acabados, revestimientos y pintura para una casa lista para vivir." },
    ],
    processLabel: "Cómo trabajamos", processTitle: "Un proceso claro, sin sorpresas.",
    process: [
      { t: "Primer contacto", d: "Escuchamos lo que necesita y recogemos la información esencial de la obra." },
      { t: "Visita y análisis", d: "Evaluamos el lugar y las condiciones existentes para preparar una propuesta realista." },
      { t: "Propuesta", d: "Presentamos un presupuesto detallado, con el alcance de los trabajos bien definido." },
      { t: "Ejecución y seguimiento", d: "Ejecutamos la obra con un interlocutor dedicado y comunicación regular." },
    ],
    portfolioLabel: "Portafolio", portfolioTitle: "Nuestros proyectos, muy pronto.",
    portfolioText: "Estamos preparando el portafolio con fotografías reales de nuestras obras. Mientras tanto, las imágenes de este sitio son ilustrativas.",
    faqLabel: "Dudas", faqTitle: "Preguntas frecuentes", allFaq: "Ver todas las preguntas",
    ctaTitle: "¿Tiene una obra en mente?", ctaText: "Cuéntenos lo que necesita. Analizamos su solicitud y le respondemos con la información necesaria para avanzar.",
  },
  about: {
    metaTitle: "Sobre JGM Construções — Coímbra",
    metaDesc: "Conozca JGM Construções: nuestra forma de trabajar, atención al detalle y seguimiento cercano en construcción y reformas en Coímbra.",
    label: "Sobre nosotros", h1: "Una empresa de construcción basada en la cercanía y el rigor.",
    lead: "JGM Construções es la marca comercial de JGM - Remodelações e Pinturas, Unipessoal Lda., con sede en Coímbra. Nos dedicamos a la construcción y renovación de espacios residenciales y no residenciales.",
    blocks: [
      { t: "Atención al detalle", d: "Cada acabado cuenta. Planificamos y ejecutamos con cuidado para que el resultado corresponda a lo acordado." },
      { t: "Comunicación clara", d: "Explicamos opciones, pasos y decisiones con un lenguaje sencillo, para que sepa siempre en qué fase está la obra." },
      { t: "Seguimiento cercano", d: "Mantenemos un contacto regular durante la ejecución y estamos disponibles para resolver cualquier duda." },
    ],
  },
  servicesPage: {
    metaTitle: "Servicios de construcción y reformas en Coímbra — JGM",
    metaDesc: "Construcción LSF, reformas, aislamiento térmico SATE/ETICS, pintura, revestimientos, enlucidos, vidrios y cubiertas en Coímbra.",
    label: "Servicios", h1: "Servicios de construcción y renovación",
    lead: "De la obra nueva a la mejora de un espacio existente, reunimos las especialidades necesarias para llevar su proyecto hasta el final.",
  },
  service: { problems: "Qué resuelve", benefits: "Ventajas", process: "Cómo lo ejecutamos", faq: "Preguntas frecuentes", related: "Servicios relacionados", cta: "Pedir presupuesto", ctaText: "Describa su proyecto y le responderemos con los próximos pasos.", illustrative: "Imagen ilustrativa" },
  contact: {
    metaTitle: "Contacto y solicitud de presupuesto — JGM Construções",
    metaDesc: "Pida un presupuesto a JGM Construções. Dirección en Adémia, Coímbra. Construcción, reformas y aislamiento térmico.",
    label: "Contacto", h1: "Pida su presupuesto",
    lead: "Comparta algunos datos sobre su obra. Solo pedimos la información necesaria para preparar una respuesta útil.",
    address: "Dirección", legal: "Datos de la empresa",
    form: { name: "Nombre", email: "Correo electrónico", phone: "Teléfono", optional: "opcional", service: "Servicio deseado", choose: "Seleccione un servicio", other: "Otro", location: "Ubicación aproximada de la obra", message: "Descripción del proyecto", submit: "Enviar solicitud", pending: "El envío en línea se está configurando y estará disponible en breve.", required: "Campo obligatorio.", invalidEmail: "Indique un correo válido.", privacy: "Los datos enviados se utilizarán únicamente para responder a su solicitud por JGM - Remodelações e Pinturas, Unipessoal Lda., responsable del tratamiento." },
  },
  faqPage: { metaTitle: "Preguntas frecuentes — JGM Construções", metaDesc: "Respuestas sobre presupuestos, construcción LSF, sistema SATE/ETICS, reformas y zonas atendidas por JGM Construções.", label: "FAQ", h1: "Preguntas frecuentes", lead: "Respuestas a las dudas más habituales antes de empezar una obra." },
  faqs: [
    { q: "¿Cómo puedo pedir un presupuesto?", a: "Rellene el formulario de la página de contacto con una descripción de la obra y su ubicación aproximada. Analizaremos la solicitud y nos pondremos en contacto para los próximos pasos." },
    { q: "¿Qué información debo enviar?", a: "El tipo de trabajo, la ubicación aproximada, las dimensiones o estancias implicadas y, si existen, planos o fotografías del espacio. Cuanto más clara sea la solicitud, más precisa será la respuesta." },
    { q: "¿Cómo funciona el primer contacto?", a: "Empezamos por entender lo que necesita. Cuando es necesario, acordamos una visita antes de presentar una propuesta." },
    { q: "¿Qué tipos de reforma realizan?", a: "Reformas interiores y exteriores, incluyendo pintura, revestimientos de suelos y paredes, enlucidos, colocación de vidrios y cubiertas." },
    { q: "¿Cómo funciona la construcción LSF?", a: "El Light Steel Frame utiliza perfiles de acero ligero galvanizado para formar la estructura del edificio, que después se cierra con placas, aislamiento y acabados. Es un sistema constructivo en seco e industrializado." },
    { q: "¿Qué es el sistema SATE/ETICS?", a: "Es un sistema de aislamiento térmico aplicado por el exterior de los muros, compuesto por placas aislantes, mortero armado y acabado final." },
    { q: "¿Qué zonas atienden?", a: "Trabajamos principalmente en Coímbra y su región. Las solicitudes en otras zonas de Portugal se analizan caso por caso." },
    { q: "¿Cómo se realiza el seguimiento de la obra?", a: "Mantenemos un contacto regular con el cliente durante toda la ejecución, informando del avance y de las decisiones a tomar." },
  ],
  footer: { desc: "Construcción y renovación con rigor, seguimiento cercano y atención al detalle.", services: "Servicios", company: "Empresa", legal: "Información legal", privacy: "Política de Privacidad", cookies: "Política de Cookies", preferences: "Preferencias de cookies", terms: "Términos y Condiciones", careers: "Candidaturas espontáneas", complaints: "Libro de Reclamaciones", review: "Valorar en Google", rights: "Todos los derechos reservados.", credit: "Sitio web desarrollado por", soon: "próximamente" },
  illustrative: "Imagen ilustrativa",
  services: {
    buildings: {
      name: "Construcción de edificios", short: "Ejecución coordinada de edificios residenciales y no residenciales.",
      title: "Construcción de edificios en Coímbra — JGM", metaDesc: "Construcción de edificios residenciales y no residenciales en Coímbra.",
      intro: "Construir un edificio exige planificación, coordinación de especialidades y control de cada etapa. Acompañamos la ejecución desde la preparación hasta los acabados.",
      problems: ["Coordinar varias especialidades", "Controlar cada fase", "Obra nueva residencial o no residencial"], benefits: ["Planificación por fases", "Comunicación clara", "Coordinación de estructura, envolvente y acabados"],
      steps: [{ t: "Preparación", d: "Análisis del proyecto." }, { t: "Estructura", d: "Ejecución del sistema estructural." }, { t: "Envolvente", d: "Muros, cubierta, huecos y aislamiento." }, { t: "Acabados", d: "Revestimientos, pintura y revisión." }],
      faqs: [{ q: "¿Qué edificios construyen?", a: "Analizamos proyectos residenciales y no residenciales según alcance, ubicación y especialidades." }],
    },
    lsf: {
      name: "Construcción LSF", short: "Estructuras de acero ligero para viviendas y edificios, con construcción en seco y precisa.",
      title: "Construcción en Light Steel Frame (LSF) en Coímbra — JGM",
      metaDesc: "Qué es la construcción LSF, cómo funciona y cómo JGM Construções ejecuta viviendas y edificios en Light Steel Frame (LSF) en Coímbra.",
      intro: "El Light Steel Frame es un sistema constructivo en el que la estructura del edificio está formada por perfiles de acero ligero galvanizado. Una vez montada, la estructura se cierra con placas, aislamiento y acabados, dando lugar a una obra más seca y organizada.",
      problems: ["Búsqueda de una alternativa a la construcción tradicional", "Ampliaciones en las que el peso de la estructura es una preocupación", "Proyectos que exigen una planificación rigurosa de cada fase"],
      benefits: ["Estructura ligera, adecuada también para ampliaciones", "Proceso constructivo en seco y más limpio en obra", "Alto control dimensional de los elementos", "Compatible con distintos acabados exteriores e interiores"],
      steps: [{ t: "Análisis del proyecto", d: "Estudio del proyecto y de las condiciones del terreno." }, { t: "Cimentación", d: "Ejecución de la base de apoyo de la estructura." }, { t: "Estructura", d: "Montaje de los perfiles de acero ligero." }, { t: "Cierre y acabados", d: "Placas, aislamiento, revestimientos y pintura." }],
      faqs: [{ q: "¿Es resistente una casa en LSF?", a: "La estructura se dimensiona en el proyecto de estructuras conforme a las exigencias aplicables. Su comportamiento depende de cada proyecto y de su correcta ejecución." }, { q: "¿Es más rápido el LSF?", a: "El sistema permite una obra muy organizada, pero los plazos dependen del proyecto, las licencias y los acabados. Solo indicamos plazos tras analizar cada caso." }],
    },
    renovations: {
      name: "Reformas", short: "Renovación de casas, pisos y locales comerciales, por dentro y por fuera.",
      title: "Reformas de casas y pisos en Coímbra — JGM",
      metaDesc: "Reformas interiores y exteriores en Coímbra: pintura, suelos, paredes, enlucidos, vidrios y cubiertas, con seguimiento cercano.",
      intro: "Una reforma bien planificada cambia la forma de vivir un espacio. Coordinamos las distintas especialidades — pintura, revestimientos, enlucidos, vidrios y cubiertas — para que la obra avance de forma organizada.",
      problems: ["Espacios anticuados o poco funcionales", "Paredes y techos dañados o con fisuras", "Suelos y revestimientos deteriorados", "Cubiertas y huecos que necesitan renovación"],
      benefits: ["Un único interlocutor para varias especialidades", "Planificación por fases para reducir molestias", "Acabados cuidados y adecuados al uso del espacio"],
      steps: [{ t: "Levantamiento", d: "Visita al espacio y definición de necesidades." }, { t: "Propuesta", d: "Presupuesto detallado por partidas." }, { t: "Ejecución", d: "Obra organizada por fases y especialidades." }, { t: "Entrega", d: "Revisión final de los trabajos con el cliente." }],
      faqs: [{ q: "¿Puedo seguir viviendo en casa durante la obra?", a: "Depende del tipo y la magnitud de los trabajos. Lo evaluamos al inicio y organizamos la obra en consecuencia." }, { q: "¿Hacen reformas parciales?", a: "Sí. Podemos intervenir en una sola estancia o en un tipo de trabajo concreto." }],
    },
    etics: {
      name: "Aislamiento térmico SATE", short: "Sistemas SATE/ETICS aplicados por el exterior en fachadas nuevas o existentes.",
      title: "Aislamiento térmico por el exterior SATE/ETICS en Coímbra — JGM",
      metaDesc: "Aplicación de aislamiento térmico por el exterior (SATE/ETICS) en Coímbra. Conozca cómo funciona el sistema y cómo se ejecuta.",
      intro: "El SATE (Sistema de Aislamiento Térmico por el Exterior), conocido en Portugal como capoto, es un aislamiento aplicado en la cara exterior de los muros. Se compone de placas aislantes fijadas a la fachada, una capa de mortero armado con malla y un acabado final.",
      problems: ["Paredes frías y falta de confort térmico interior", "Condensaciones asociadas a puentes térmicos", "Fachadas deterioradas que necesitan renovación"],
      benefits: ["Contribuye a un mayor confort térmico interior", "Ayuda a reducir puentes térmicos en la envolvente", "Renueva la imagen de la fachada", "Aplicación exterior, con menor interferencia en el interior"],
      steps: [{ t: "Evaluación de la fachada", d: "Análisis del soporte y de los puntos singulares." }, { t: "Preparación", d: "Limpieza y regularización de la superficie." }, { t: "Aplicación", d: "Fijación de placas, mortero armado y malla." }, { t: "Acabado", d: "Revestimiento final en el color elegido." }],
      faqs: [{ q: "¿Cuánto se ahorra con el SATE?", a: "Los resultados dependen del edificio, el espesor del aislamiento, el clima y el uso. No indicamos cifras de ahorro sin un estudio adecuado." }, { q: "¿Se puede aplicar en edificios existentes?", a: "Sí, tras evaluar el estado de la fachada y las condiciones de aplicación." }],
    },
    painting: {
      name: "Pintura", short: "Preparación y pintura de interiores, exteriores y fachadas.",
      title: "Servicios de pintura en Coímbra — JGM", metaDesc: "Pintura interior y exterior en Coímbra.",
      intro: "Un acabado duradero empieza por evaluar y preparar el soporte. Pintamos interiores y exteriores con soluciones adecuadas.",
      problems: ["Paredes deterioradas", "Renovación de interiores y fachadas", "Superficies que requieren preparación"], benefits: ["Preparación cuidada", "Sistemas adecuados", "Acabado uniforme"],
      steps: [{ t: "Evaluación", d: "Revisión del soporte." }, { t: "Preparación", d: "Protección, limpieza y corrección." }, { t: "Pintura", d: "Aplicación de capas." }, { t: "Revisión", d: "Control final." }],
      faqs: [{ q: "¿Incluye la preparación?", a: "El alcance se define tras evaluar las superficies y se detalla en la propuesta." }],
    },
    coverings: {
      name: "Suelos y revestimientos de paredes", short: "Aplicación y renovación de revestimientos.",
      title: "Suelos y paredes en Coímbra — JGM", metaDesc: "Aplicación de suelos y revestimientos de paredes en Coímbra.",
      intro: "Suelos y paredes necesitan soportes regulares y materiales compatibles con el uso. Preparamos y aplicamos los revestimientos.",
      problems: ["Suelos desgastados", "Paredes a renovar", "Mejoras funcionales"], benefits: ["Preparación del soporte", "Remates cuidados", "Materiales adecuados"],
      steps: [{ t: "Medición", d: "Levantamiento del área." }, { t: "Preparación", d: "Regularización." }, { t: "Aplicación", d: "Colocación y remates." }, { t: "Control", d: "Limpieza y revisión." }],
      faqs: [{ q: "¿Realizan trabajos parciales?", a: "Sí, tras comprobar la compatibilidad con los elementos existentes." }],
    },
    plastering: {
      name: "Enlucidos", short: "Regularización y acabado de paredes y techos.",
      title: "Enlucidos en Coímbra — JGM", metaDesc: "Enlucido y regularización de paredes y techos en Coímbra.",
      intro: "El enlucido crea una base regular para el acabado final en paredes y techos nuevos o existentes.",
      problems: ["Paredes irregulares", "Superficies deterioradas", "Acabado de obra nueva"], benefits: ["Base uniforme", "Corrección de irregularidades", "Integración con pintura"],
      steps: [{ t: "Diagnóstico", d: "Comprobación del soporte." }, { t: "Preparación", d: "Tratamiento previo." }, { t: "Aplicación", d: "Ejecución de capas." }, { t: "Acabado", d: "Regularización final." }],
      faqs: [{ q: "¿Resuelve cualquier fisura?", a: "Primero hay que evaluar la causa; las fisuras activas requieren una solución específica." }],
    },
    glazing: {
      name: "Colocación de vidrios", short: "Instalación y sustitución de vidrios adecuados a cada hueco.",
      title: "Colocación de vidrios en Coímbra — JGM", metaDesc: "Instalación y sustitución de vidrios en Coímbra.",
      intro: "La elección del vidrio depende del hueco, uso y carpintería. Evaluamos las condiciones antes de medir e instalar.",
      problems: ["Vidrios dañados", "Huecos renovados", "Nuevas soluciones acristaladas"], benefits: ["Medición in situ", "Compatibilidad", "Instalación cuidada"],
      steps: [{ t: "Evaluación", d: "Inspección del hueco." }, { t: "Medición", d: "Definición de dimensiones." }, { t: "Preparación", d: "Planificación segura." }, { t: "Instalación", d: "Colocación y sellado." }],
      faqs: [{ q: "¿Sustituyen un solo vidrio?", a: "Se puede analizar según el vidrio, la carpintería y el acceso." }],
    },
    roofing: {
      name: "Cubiertas", short: "Ejecución, renovación y mantenimiento de cubiertas.",
      title: "Cubiertas en Coímbra — JGM", metaDesc: "Construcción y renovación de cubiertas en Coímbra.",
      intro: "Una cubierta debe gestionar el agua, la exposición y la continuidad del aislamiento. Evaluamos la solución antes de intervenir.",
      problems: ["Cubiertas deterioradas", "Filtraciones", "Renovación de aislamiento"], benefits: ["Evaluación de puntos singulares", "Coordinación del drenaje", "Ejecución por fases"],
      steps: [{ t: "Inspección", d: "Evaluación y accesos." }, { t: "Solución", d: "Definición del alcance." }, { t: "Ejecución", d: "Intervención y remates." }, { t: "Revisión", d: "Control final." }],
      faqs: [{ q: "¿Una filtración muestra siempre el fallo?", a: "No. El agua puede desplazarse, por lo que hay que evaluar el origen." }],
    },
  },
};

export const DICT: Record<Lang, Dict> = { pt, en, es };
export const HTML_LANG: Record<Lang, string> = { pt: "pt-PT", en: "en", es: "es" };
export const SITE = SITE_CONFIG.canonicalOrigin;

export function altLinks(paths: Record<Lang, string>) {
  return [
    ...LANGS.map((l) => ({ rel: "alternate", hrefLang: HTML_LANG[l], href: SITE + paths[l] })),
    { rel: "alternate", hrefLang: "x-default", href: SITE + paths.pt },
  ];
}
export const pagePaths = (k: PageKey) =>
  Object.fromEntries(LANGS.map((l) => [l, `/${l}/${PAGE_SLUGS[l][k]}`])) as Record<Lang, string>;
export const servicePaths = (s: ServiceId) =>
  Object.fromEntries(LANGS.map((l) => [l, `/${l}/${PAGE_SLUGS[l].services}/${SERVICE_SLUGS[l][s]}`])) as Record<Lang, string>;
export const homePaths = () => Object.fromEntries(LANGS.map((l) => [l, `/${l}`])) as Record<Lang, string>;

export function seoHead(lang: Lang, title: string, desc: string, paths: Record<Lang, string>) {
  return {
    meta: [
      { title },
      { name: "description", content: desc },
      { property: "og:title", content: title },
      { property: "og:description", content: desc },
      { property: "og:type", content: "website" },
      { property: "og:url", content: SITE + paths[lang] },
      { property: "og:image", content: `${SITE}/og-image.png` },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: "JGM Construções" },
      { property: "og:site_name", content: "JGM Construções" },
      { property: "og:locale", content: HTML_LANG[lang].replace("-", "_") },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: `${SITE}/og-image.png` },
    ],
    links: [{ rel: "canonical", href: SITE + paths[lang] }, ...altLinks(paths)],
  };
}
