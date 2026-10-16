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
    metaTitle: "JGM Construções — obras e remodelações em Coimbra",
    metaDesc: "Construção, remodelações, pintura, revestimentos, estucagem, vidros, coberturas e isolamento térmico a partir de Adémia, Coimbra. Descreva a obra e peça um orçamento.",
    eyebrow: "Coimbra · Construção e renovação",
    h1: "Construção e remodelação em Coimbra.",
    sub: "Obras novas, remodelações, pintura, revestimentos, estucagem, vidros, coberturas e isolamento térmico. A sede é em Adémia. Para avançar, descreva o trabalho e peça um orçamento.",
    cta1: "Pedir orçamento", cta2: "Ver os serviços", scroll: "Descer",
    introLabel: "A JGM", introTitle: "O que pode pedir e como começar",
    introText: "A JGM Construções é a marca da JGM - Remodelações e Pinturas, Unipessoal Lda., com sede em Adémia, Coimbra. Neste site estão os trabalhos que pode solicitar. O pedido de orçamento pede o tipo de obra, a zona e uma descrição. Com isso, a resposta pode ser mais concreta.",
    servicesLabel: "Serviços", servicesTitle: "Trabalhos que pode pedir", more: "Ver este serviço",
    otherServices: "Outros trabalhos",
    otherList: ["Pintura", "Pavimentos e paredes", "Estucagem", "Vidros", "Coberturas"],
    otherNote: "Se o trabalho não estiver na lista, descreva-o no pedido. Confirmamos se o podemos analisar.",
    buildLabel: "A sequência da obra", buildTitle: "Um edifício constrói-se por fases.",
    buildNote: "Imagens ilustrativas. Não são fotografias de obras da JGM.",
    stages: [
      { t: "Fundação", d: "O terreno é preparado e executa-se a base que recebe o edifício." },
      { t: "Estrutura", d: "Monta-se a estrutura prevista no projeto, em LSF ou noutro sistema." },
      { t: "Envolvente", d: "Fecham-se paredes e cobertura. O isolamento exterior entra nesta fase, quando faz parte da obra." },
      { t: "Acabamentos", d: "Revestimentos, estucagem e pintura deixam os espaços prontos para o uso previsto." },
    ],
    processLabel: "Orçamento", processTitle: "Do pedido à proposta",
    process: [
      { t: "O pedido", d: "No formulário, indique o tipo de trabalho, a zona e o que pretende fazer." },
      { t: "Analisamos o pedido", d: "Se faltar informação, pedimos o que for necessário. Uma visita ao local só é combinada quando fizer falta para perceber a obra." },
      { t: "A proposta", d: "O orçamento indica o âmbito dos trabalhos. Preço e prazo, quando existirem, ficam escritos nessa proposta." },
      { t: "A obra segue o combinado", d: "Se a proposta for aceite, a execução corresponde ao que ficou definido. O que mudar depois é acordado à parte." },
    ],
    portfolioLabel: "Imagens", portfolioTitle: "Ainda não há fotografias de obras.",
    portfolioText: "As imagens deste site são ilustrativas. Fotografias de obras da JGM só serão publicadas quando existirem e houver autorização para as mostrar.",
    faqLabel: "Dúvidas", faqTitle: "Antes de pedir orçamento", allFaq: "Ver todas as perguntas",
    ctaTitle: "Quer falar de uma obra?", ctaText: "Descreva o que pretende fazer e onde. É a forma mais direta de a JGM perceber o pedido e responder.",
  },
  about: {
    metaTitle: "Sobre a JGM Construções — Adémia, Coimbra",
    metaDesc: "A JGM Construções é a marca da JGM - Remodelações e Pinturas, Unipessoal Lda., com sede em Adémia, Coimbra. Veja os trabalhos que pode pedir e como solicitar um orçamento.",
    label: "Sobre", h1: "Uma empresa de construção sediada em Adémia.",
    lead: "A JGM Construções é a marca comercial da JGM - Remodelações e Pinturas, Unipessoal Lda. A sede fica no Beco dos Travassos, em Adémia, Coimbra. O site serve para explicar os trabalhos e receber pedidos de orçamento.",
    blocks: [
      { t: "Trabalhos", d: "Construção de edifícios, LSF, remodelações, pintura, revestimentos de pavimentos e paredes, estucagem, vidros, coberturas e isolamento térmico pelo exterior." },
      { t: "Zona", d: "Os pedidos são tratados a partir de Coimbra e da região. Trabalhos noutras zonas de Portugal podem ser analisados, sem compromisso de os aceitar." },
      { t: "Como começar", d: "Use o formulário de contactos. Nome, email, tipo de trabalho, zona e uma descrição chegam para o primeiro contacto." },
    ],
  },
  servicesPage: {
    metaTitle: "Serviços de construção e remodelação em Coimbra — JGM",
    metaDesc: "Construção, LSF, remodelações, pintura, pavimentos e paredes, estucagem, vidros, coberturas e capoto em Coimbra. Cada serviço explica o que pode pedir.",
    label: "Serviços", h1: "Serviços de construção e remodelação",
    lead: "Cada página explica um tipo de trabalho, as situações em que costuma ser pedido e o que convém dizer no orçamento. Se o seu caso juntar vários, descreva-os no mesmo pedido.",
  },
  service: { problems: "Quando se pede", benefits: "O que convém dizer", process: "Como se prepara", faq: "Perguntas frequentes", related: "Outros serviços", cta: "Pedir orçamento deste trabalho", ctaText: "Indique a zona e o que pretende fazer. A resposta parte dessa descrição.", illustrative: "Imagem ilustrativa" },
  contact: {
    metaTitle: "Pedir orçamento — JGM Construções, Adémia",
    metaDesc: "Formulário de orçamento da JGM Construções. Sede no Beco dos Travassos, Adémia, 3025-124 Coimbra.",
    label: "Contactos", h1: "Descreva a obra e peça orçamento",
    lead: "Quanto mais claro for o pedido, mais útil pode ser a resposta. Não precisa de medidas exatas nesta fase.",
    address: "Morada", legal: "Dados da empresa",
    form: { name: "Nome", email: "Email", phone: "Telefone", optional: "opcional", service: "Tipo de trabalho", choose: "Escolha um tipo de trabalho", other: "Outro", location: "Zona da obra", message: "O que pretende fazer", submit: "Enviar pedido de orçamento", pending: "O envio online ainda não está disponível.", required: "Preencha este campo.", invalidEmail: "Esse email não parece válido.", privacy: "Os dados servem apenas para responder a este pedido. O responsável pelo tratamento é a JGM - Remodelações e Pinturas, Unipessoal Lda." },
  },
  faqPage: { metaTitle: "Perguntas frequentes — JGM Construções", metaDesc: "Como pedir orçamento, que informação enviar, que trabalhos existem e em que zona a JGM Construções atua, a partir de Coimbra.", label: "Perguntas", h1: "Perguntas frequentes", lead: "Respostas diretas sobre o pedido de orçamento, os trabalhos e a zona." },
  faqs: [
    { q: "Como peço um orçamento?", a: "Na página de contactos, escolha o tipo de trabalho, indique a zona e descreva o que pretende. O pedido segue com o seu nome e email." },
    { q: "Que informação ajuda no primeiro pedido?", a: "O tipo de trabalho, a localidade, se é interior ou exterior e, se tiver, fotografias ou um projeto. Medidas aproximadas chegam. As exatas, quando forem precisas, confirmam-se depois." },
    { q: "Há sempre uma visita ao local?", a: "Não. Muitos pedidos percebem-se pela descrição. A visita combina-se quando, sem ver o espaço, não dá para definir o âmbito." },
    { q: "Que remodelações posso pedir?", a: "Interiores e exteriores: pintura, pavimentos e paredes, estucagem, vidros e coberturas. Pode ser uma divisão ou um conjunto de trabalhos." },
    { q: "O que é a construção LSF?", a: "Light Steel Frame é uma estrutura de perfis de aço leve galvanizado, fechada depois com placas, isolamento e acabamentos. Se o seu projeto for neste sistema, descreva-o no pedido para o analisarmos." },
    { q: "O que é o capoto, ou ETICS?", a: "É isolamento térmico colado e fixado pelo exterior da parede, com uma camada armada e um acabamento. Aplica-se em fachadas novas ou existentes, depois de se ver o estado do suporte." },
    { q: "Em que zona trabalham?", a: "A sede é em Adémia, Coimbra, e os pedidos são tratados a partir daí e da região. Fora dessa área, o pedido pode ser visto caso a caso." },
    { q: "O site mostra obras já feitas?", a: "Não. As fotografias são ilustrativas. Não publicamos obras, prazos nem preços enquanto não estiverem confirmados para cada pedido." },
  ],
  footer: { desc: "Construção e remodelação a partir de Adémia, Coimbra.", services: "Serviços", company: "Empresa", legal: "Informação legal", privacy: "Política de Privacidade", cookies: "Política de Cookies", preferences: "Preferências de cookies", terms: "Termos e Condições", careers: "Candidaturas espontâneas", complaints: "Livro de Reclamações", review: "Avaliar no Google", rights: "Todos os direitos reservados.", credit: "Website desenvolvido pela", soon: "em breve" },
  illustrative: "Imagem ilustrativa",
  services: {
    buildings: {
      name: "Construção de edifícios", short: "Edifícios residenciais e não residenciais, a partir do projeto e das condições do terreno.",
      title: "Construção de edifícios em Coimbra — JGM",
      metaDesc: "Construção de edifícios residenciais e não residenciais em Coimbra. Envie o projeto e a localização para um orçamento.",
      intro: "Esta página é para quem tem um edifício para construir, ou um projeto já desenhado, e quer saber se a JGM o pode executar. O orçamento parte do projeto, da localização e do que está incluído: estrutura, envolvente e acabamentos não são a mesma coisa.",
      problems: ["Obra nova de habitação", "Edifício não residencial com projeto", "Dúvida sobre o que entra na empreitada"],
      benefits: ["Se já existe projeto de arquitetura e de especialidades", "A morada ou a freguesia do terreno", "O que pretende que a proposta inclua"],
      steps: [{ t: "Projeto", d: "Vemos o que está desenhado e o que ainda falta decidir." }, { t: "Local", d: "A zona e o acesso ao terreno entram na análise." }, { t: "Âmbito", d: "A proposta separa estrutura, envolvente e acabamentos." }, { t: "Decisão", d: "A obra só avança depois de a proposta ser aceite." }],
      faqs: [{ q: "Constroem sem projeto?", a: "Não avançamos com uma empreitada sem saber o que está previsto construir. Se o projeto ainda não existir, diga em que fase está." }, { q: "Que edifícios podem analisar?", a: "Residenciais e não residenciais, conforme o projeto, a localização e os trabalhos pedidos. Cada caso é visto antes de haver proposta." }],
    },
    lsf: {
      name: "Construção LSF", short: "Estrutura em perfis de aço leve, para quem já sabe que o projeto é em Light Steel Frame.",
      title: "Construção LSF em Coimbra — JGM",
      metaDesc: "O que é o Light Steel Frame e que informação enviar se o seu projeto em Coimbra for em LSF.",
      intro: "LSF, ou Light Steel Frame, é uma estrutura de perfis de aço leve galvanizado. Depois de montada, fecha-se com placas, isolamento e os acabamentos do projeto. Se a sua obra está prevista neste sistema, descreva-a aqui. Não comparamos prazos com outros sistemas sem ver o caso.",
      problems: ["Projeto já definido em LSF", "Ampliação em que o peso da estrutura importa", "Dúvida sobre o que vem depois da estrutura"],
      benefits: ["Se o projeto de estrutura já existe", "Se é moradia, ampliação ou outro edifício", "Que acabamentos quer incluir no pedido"],
      steps: [{ t: "Projeto", d: "Confirmamos se a estrutura prevista é em LSF." }, { t: "Base", d: "A fundação tem de estar prevista para receber os perfis." }, { t: "Montagem", d: "Os perfis são montados segundo o projeto." }, { t: "Fecho", d: "Placas, isolamento e acabamentos fecham o edifício." }],
      faqs: [{ q: "Uma casa em LSF é mais resistente?", a: "A resistência não se decide no site. O dimensionamento está no projeto de estrutura e a execução tem de o seguir." }, { q: "É mais rápido do que a construção tradicional?", a: "Não damos essa garantia. O prazo depende do projeto, das licenças e dos acabamentos, e só se indica depois de os analisar." }],
    },
    renovations: {
      name: "Remodelações", short: "Casas, apartamentos e espaços comerciais, numa divisão ou em vários trabalhos ao mesmo tempo.",
      title: "Remodelações em Coimbra — JGM",
      metaDesc: "Remodelações em Coimbra: pintura, pavimentos, paredes, estucagem, vidros e coberturas. Diga o que quer alterar.",
      intro: "Uma remodelação pode ser a pintura de uma divisão ou a renovação de um apartamento inteiro. O que muda o orçamento é o estado atual, o que fica e o que se substitui. Pode juntar pintura, revestimentos, estucagem, vidros e coberturas no mesmo pedido.",
      problems: ["Uma divisão que deixou de servir", "Pavimento ou paredes a substituir", "Casa ou loja a renovar por fases", "Telhado ou janelas a tratar em conjunto"],
      benefits: ["Que divisões entram na obra", "O que quer manter", "Se precisa de continuar a usar o espaço durante os trabalhos"],
      steps: [{ t: "Pedido", d: "Descreva as divisões e o que quer mudar." }, { t: "Esclarecimento", d: "Se a descrição não chegar, pedimos fotos ou uma visita." }, { t: "Proposta", d: "Os trabalhos ficam separados, para se perceber o que está incluído." }, { t: "Obra", d: "A execução segue a ordem combinada na proposta." }],
      faqs: [{ q: "Posso ficar em casa durante a obra?", a: "Depende dos trabalhos e das divisões. Não é uma regra. Dizemos se é viável depois de perceber o pedido." }, { q: "Fazem só uma divisão?", a: "Sim. Uma casa de banho, uma cozinha ou um único tipo de trabalho podem ser o pedido inteiro." }],
    },
    etics: {
      name: "Isolamento térmico e capoto", short: "Sistema ETICS, o capoto, aplicado pelo exterior em fachadas novas ou existentes.",
      title: "Capoto e isolamento térmico em Coimbra — JGM",
      metaDesc: "Isolamento térmico pelo exterior (ETICS, conhecido como capoto) em Coimbra. O que é e o que avaliar na fachada.",
      intro: "O capoto, ou ETICS, é um sistema colado e fixado pelo lado de fora da parede: placas de isolamento, uma camada de reboco com rede e o acabamento. Serve em fachadas novas e em edifícios já construídos. O estado do suporte decide se a aplicação é possível.",
      problems: ["Fachada a renovar e a isolar ao mesmo tempo", "Parede exterior sem isolamento", "Suporte irregular, fissurado ou húmido"],
      benefits: ["Se a fachada é nova ou existente", "O material atual da parede, se o souber", "Pontos singulares: janelas, varandas, remates com a cobertura"],
      steps: [{ t: "Fachada", d: "Vê-se o suporte e os pontos onde o sistema muda de plano." }, { t: "Preparação", d: "A superfície tem de estar em condições de receber as placas." }, { t: "Sistema", d: "Placas, fixações, camada armada e rede." }, { t: "Acabamento", d: "O revestimento final é o que fica visível." }],
      faqs: [{ q: "Quanto se poupa na fatura?", a: "Não indicamos poupanças. Dependem do edifício, da espessura, da exposição e do uso. Isso não se estima por uma frase." }, { q: "Aplica-se numa casa já construída?", a: "Muitas vezes sim, depois de se ver se a fachada aguenta o sistema e como se resolvem os vãos e os remates." }],
    },
    painting: {
      name: "Pintura", short: "Paredes, tetos e fachadas, interiores ou exteriores.",
      title: "Pintura em Coimbra — JGM", metaDesc: "Pintura interior e exterior em Coimbra. Diga se é uma divisão, a casa ou a fachada.",
      intro: "A pintura pede-se quando as paredes estão manchadas, a cor já não serve ou a superfície ficou irregular depois de outras obras. Interior e exterior não se tratam da mesma forma. A preparação, quando for necessária, fica escrita no orçamento e não se assume incluída.",
      problems: ["Paredes manchadas ou com a tinta a descascar", "Divisão a pintar depois de obras", "Fachada a renovar"],
      benefits: ["Interior, exterior ou os dois", "Se há humidade, fissuras ou tinta solta", "Se quer só pintura ou também correção da superfície"],
      steps: [{ t: "Superfície", d: "Percebe-se o estado da parede ou da fachada." }, { t: "Preparação", d: "Proteção, limpeza e correções entram se forem precisas." }, { t: "Aplicação", d: "As demãos previstas no orçamento." }, { t: "Fim", d: "Revista a pintura e a proteção é retirada." }],
      faqs: [{ q: "A preparação das paredes está incluída?", a: "Só se estiver na proposta. Massa, lixagem ou tratamento de manchas alteram o trabalho e têm de ser pedidos." }],
    },
    coverings: {
      name: "Revestimentos de pavimentos e paredes", short: "Pavimentos e paredes interiores ou exteriores, em obra nova ou a substituir.",
      title: "Revestimento de pavimentos e paredes em Coimbra — JGM", metaDesc: "Colocação e substituição de pavimentos e revestimentos de paredes em Coimbra.",
      intro: "O revestimento é o material que fica à vista no chão ou na parede. Pode ser a primeira aplicação ou a substituição de um pavimento gasto. O suporte por baixo — regular, húmido ou a demolir — muda o trabalho tanto como o material escolhido.",
      problems: ["Pavimento gasto, partido ou desnivelado", "Parede a revestir de novo", "Casa de banho ou cozinha a renovar o acabamento"],
      benefits: ["A divisão e a área aproximada", "Se o revestimento atual sai ou fica", "O material, se já estiver escolhido"],
      steps: [{ t: "Área", d: "A divisão e uma medida aproximada chegam para começar." }, { t: "Suporte", d: "Vê-se se é preciso levantar o existente e regularizar." }, { t: "Colocação", d: "O material assenta com os remates previstos." }, { t: "Entrega", d: "A superfície fica limpa e os cortes revistos." }],
      faqs: [{ q: "Trocam só parte do pavimento?", a: "Pode ser possível. Depende de haver material compatível e de o suporte estar em condições na zona que fica." }],
    },
    plastering: {
      name: "Estucagem", short: "Paredes e tetos a regularizar, em obra nova ou em reparação.",
      title: "Estucagem em Coimbra — JGM", metaDesc: "Estucagem de paredes e tetos em Coimbra, em obra nova ou sobre superfícies existentes.",
      intro: "A estucagem deixa a parede ou o teto planos para receber pintura ou outro acabamento. Em obra nova faz parte da sequência. Numa casa já habitada, serve para corrigir zonas irregulares, desde que o suporte esteja estável.",
      problems: ["Teto ou paredes fora de plano", "Superfície marcada depois de tirar um revestimento", "Acabamento em falta numa obra nova"],
      benefits: ["Se é parede, teto ou os dois", "Se a superfície é nova ou já estava pintada", "Se há fissuras e se elas parecem ativas"],
      steps: [{ t: "Suporte", d: "Confirma-se se a base aguenta o estuque." }, { t: "Preparação", d: "Tratam-se as zonas que não podem ficar por baixo." }, { t: "Aplicação", d: "As camadas nivelam a superfície." }, { t: "Pronto a pintar", d: "O acabamento fica preparado para a pintura, se ela fizer parte do pedido." }],
      faqs: [{ q: "A estucagem fecha qualquer fissura?", a: "Não. Uma fissura que continua a mexer volta a aparecer. Primeiro percebe-se a causa; o estuque não a substitui." }],
    },
    glazing: {
      name: "Colocação de vidros", short: "Vidros novos ou a substituir, conforme o vão e a caixilharia.",
      title: "Colocação de vidros em Coimbra — JGM", metaDesc: "Colocação e substituição de vidros em Coimbra. Indique o vão e se a caixilharia se mantém.",
      intro: "O vidro depende do vão onde entra: a medida, a caixilharia e o uso da divisão. Pode ser a substituição de um vidro partido ou a colocação em vãos novos. Sem ver o caixilho, não se escolhe o vidro à distância.",
      problems: ["Vidro partido ou riscado", "Vão novo ainda sem vidro", "Caixilharia que se mantém e vidro que se troca"],
      benefits: ["Quantos vãos são", "Se a caixilharia fica ou também muda", "O acesso: rés do chão, andar, andaime"],
      steps: [{ t: "Vão", d: "Vê-se o caixilho e o estado do aro." }, { t: "Medida", d: "O vidro corta-se à medida real, não a uma estimativa." }, { t: "Encomenda", d: "O tipo de vidro fica definido antes da colocação." }, { t: "Colocação", d: "Assenta-se e veda-se no vão existente ou novo." }],
      faqs: [{ q: "Trocam um único vidro?", a: "O pedido pode ser só esse. Confirma-se se o caixilho o recebe e se o acesso permite a colocação." }],
    },
    roofing: {
      name: "Coberturas", short: "Telhados novos, a renovar ou com um problema de água por identificar.",
      title: "Coberturas em Coimbra — JGM", metaDesc: "Colocação e renovação de coberturas em Coimbra. Descreva o telhado e, se existir, o problema de água.",
      intro: "A cobertura é a parte do edifício que recebe a chuva. Pede-se uma intervenção quando o telhado está degradado, quando há água a entrar ou quando a obra nova ainda não tem cobertura. A mancha no teto nem sempre está por baixo da falha.",
      problems: ["Telhas partidas ou deslocadas", "Água a aparecer no interior", "Cobertura de uma obra nova"],
      benefits: ["Tipo de cobertura, se o conhecer", "Há quanto tempo entra água e em que divisão aparece", "Se há acesso seguro ao telhado"],
      steps: [{ t: "Inspeção", d: "Vê-se a cobertura, os remates e por onde a água pode correr." }, { t: "Âmbito", d: "A proposta distingue reparação local de renovação mais larga." }, { t: "Execução", d: "Trabalha-se a zona definida, com os remates incluídos." }, { t: "Verificação", d: "Confere-se o escoamento depois da intervenção." }],
      faqs: [{ q: "A nódoa no teto mostra o sítio da falha?", a: "Nem sempre. A água pode andar pelo desvão antes de aparecer. Por isso a cobertura tem de ser vista, não só a mancha." }],
    },
  },
};

const en: Dict = {
  langName: "English",
  nav: { home: "Home", about: "About", services: "Services", blog: "Blog", contact: "Contact", faq: "FAQ", quote: "Request a quote", menu: "Open menu", close: "Close menu", language: "Language", skip: "Skip to content" },
  home: {
    metaTitle: "JGM Construções — building and renovation in Coimbra",
    metaDesc: "New buildings, renovations, painting, floors and walls, plastering, glazing, roofing and external insulation from Adémia, Coimbra. Describe the work and ask for a quote.",
    eyebrow: "Coimbra · Building and renovation",
    h1: "Building and renovation in Coimbra.",
    sub: "New buildings, renovations, painting, floors and walls, plastering, glazing, roofing and external insulation. The office is in Adémia. To go further, describe the work and ask for a quote.",
    cta1: "Ask for a quote", cta2: "See the services", scroll: "Scroll",
    introLabel: "About JGM", introTitle: "What you can ask for, and how to start",
    introText: "JGM Construções is the trading name of JGM - Remodelações e Pinturas, Unipessoal Lda., based in Adémia, Coimbra. This site lists the work you can request. The quote form asks for the type of job, the area and a short description, so the reply can be specific.",
    servicesLabel: "Services", servicesTitle: "Work you can request", more: "See this service",
    otherServices: "Other work",
    otherList: ["Painting", "Floors and walls", "Plastering", "Glazing", "Roofing"],
    otherNote: "If the job is not on the list, describe it in the form. We will say whether we can look at it.",
    buildLabel: "How a building goes up", buildTitle: "A building is put together in stages.",
    buildNote: "Illustrative images. These are not photographs of JGM projects.",
    stages: [
      { t: "Foundation", d: "The ground is prepared and the base that carries the building is built." },
      { t: "Structure", d: "The frame in the design is erected, in LSF or another system." },
      { t: "Envelope", d: "Walls and roof are closed. External insulation comes in at this stage when it is part of the job." },
      { t: "Finishes", d: "Coverings, plaster and paint leave the rooms ready for their intended use." },
    ],
    processLabel: "Quote", processTitle: "From the request to a proposal",
    process: [
      { t: "Describe the job", d: "In the form, say what kind of work it is, where it is and what you want done." },
      { t: "We read the request", d: "If something is missing, we ask for it. A site visit is arranged only when the job cannot be understood without one." },
      { t: "You receive a proposal", d: "The quote states the scope. Price and timing, when they exist, are written in that proposal." },
      { t: "The work follows what was agreed", d: "If you accept the proposal, the job matches what was set out. Later changes are agreed separately." },
    ],
    portfolioLabel: "Images", portfolioTitle: "There are no job photographs yet.",
    portfolioText: "The images on this site are illustrative. Photographs of JGM work will be published only when they exist and we have permission to show them.",
    faqLabel: "Questions", faqTitle: "Before you ask for a quote", allFaq: "See all questions",
    ctaTitle: "Want to talk about a job?", ctaText: "Say what you want done and where. That is the most direct way for JGM to understand the request and reply.",
  },
  about: {
    metaTitle: "About JGM Construções — Adémia, Coimbra",
    metaDesc: "JGM Construções is the trading name of JGM - Remodelações e Pinturas, Unipessoal Lda., based in Adémia, Coimbra. See the work you can request and how to ask for a quote.",
    label: "About", h1: "A construction company based in Adémia.",
    lead: "JGM Construções is the trading name of JGM - Remodelações e Pinturas, Unipessoal Lda. The registered office is on Beco dos Travassos, in Adémia, Coimbra. The site explains the work and receives quote requests.",
    blocks: [
      { t: "The work", d: "Building construction, LSF, renovations, painting, floor and wall coverings, plastering, glazing, roofing and external wall insulation." },
      { t: "The area", d: "Requests are handled from Coimbra and the surrounding area. Jobs elsewhere in Portugal can be looked at, with no commitment to take them on." },
      { t: "How to start", d: "Use the contact form. A name, an email, the type of work, the area and a description are enough for a first message." },
    ],
  },
  servicesPage: {
    metaTitle: "Building and renovation services in Coimbra — JGM",
    metaDesc: "Buildings, LSF, renovations, painting, floors and walls, plastering, glazing, roofing and ETICS in Coimbra. Each page says what you can ask for.",
    label: "Services", h1: "Building and renovation services",
    lead: "Each page explains one kind of work, the situations in which people usually ask for it, and what is useful to say in a quote request. If your job combines several, describe them together.",
  },
  service: { problems: "When people ask", benefits: "What helps to say", process: "How the job is prepared", faq: "Questions", related: "Other services", cta: "Ask for a quote for this work", ctaText: "Give the area and what you want done. The reply starts from that description.", illustrative: "Illustrative image" },
  contact: {
    metaTitle: "Ask for a quote — JGM Construções, Adémia",
    metaDesc: "Quote form for JGM Construções. Office at Beco dos Travassos, Adémia, 3025-124 Coimbra.",
    label: "Contact", h1: "Describe the job and ask for a quote",
    lead: "A clearer request can get a more useful reply. Exact measurements are not needed at this stage.",
    address: "Address", legal: "Company details",
    form: { name: "Name", email: "Email", phone: "Phone", optional: "optional", service: "Type of work", choose: "Choose a type of work", other: "Other", location: "Area of the job", message: "What you want done", submit: "Send quote request", pending: "Online sending is not available yet.", required: "Fill in this field.", invalidEmail: "That email does not look valid.", privacy: "The details are used only to reply to this request. The controller is JGM - Remodelações e Pinturas, Unipessoal Lda." },
  },
  faqPage: { metaTitle: "Questions — JGM Construções", metaDesc: "How to ask for a quote, what to send, which jobs are listed and where JGM Construções works from Coimbra.", label: "Questions", h1: "Questions", lead: "Direct answers about the quote, the work and the area." },
  faqs: [
    { q: "How do I ask for a quote?", a: "On the contact page, choose the type of work, give the area and describe what you want done. The request is sent with your name and email." },
    { q: "What helps in a first request?", a: "The type of work, the town, whether it is inside or outside and, if you have them, photos or a drawing. Approximate sizes are enough. Exact ones are checked later, when they matter." },
    { q: "Is there always a site visit?", a: "No. Many requests are clear from the description. A visit is arranged when the scope cannot be set without seeing the place." },
    { q: "What renovations can I ask for?", a: "Inside and outside: painting, floors and walls, plastering, glazing and roofing. It can be one room or several jobs together." },
    { q: "What is LSF construction?", a: "Light Steel Frame is a structure of galvanised light-steel profiles, later closed with boards, insulation and finishes. If your project uses this system, describe it in the request so we can look at it." },
    { q: "What is ETICS?", a: "It is thermal insulation fixed to the outside of the wall, with a reinforced coat and a finish. In Portugal it is often called capoto. It is used on new façades and on existing ones, after the substrate is checked." },
    { q: "Where do you work?", a: "The office is in Adémia, Coimbra, and requests are handled from there and the surrounding area. Outside that area, a request can be looked at case by case." },
    { q: "Does the site show finished jobs?", a: "No. The photographs are illustrative. We do not publish jobs, timings or prices until they are confirmed for each request." },
  ],
  footer: { desc: "Building and renovation from Adémia, Coimbra.", services: "Services", company: "Company", legal: "Legal", privacy: "Privacy policy", cookies: "Cookie policy", preferences: "Cookie preferences", terms: "Terms and conditions", careers: "Speculative applications", complaints: "Complaints book", review: "Review on Google", rights: "All rights reserved.", credit: "Website by", soon: "coming soon" },
  illustrative: "Illustrative image",
  services: {
    buildings: {
      name: "Building construction", short: "Residential and non-residential buildings, starting from the drawings and the site.",
      title: "Building construction in Coimbra — JGM", metaDesc: "Residential and non-residential buildings in Coimbra. Send the drawings and the location for a quote.",
      intro: "This page is for someone who has a building to put up, or drawings already done, and wants to know whether JGM can carry it out. A quote starts from the design, the location and what is included. Structure, envelope and finishes are not the same item.",
      problems: ["A new house", "A non-residential building with drawings", "Uncertainty about what the contract covers"],
      benefits: ["Whether architecture and engineering drawings already exist", "The address or parish of the plot", "What you want the proposal to include"],
      steps: [{ t: "Drawings", d: "We look at what is drawn and what is still undecided." }, { t: "Site", d: "The area and access to the plot are part of the review." }, { t: "Scope", d: "The proposal separates structure, envelope and finishes." }, { t: "Decision", d: "Work starts only after the proposal is accepted." }],
      faqs: [{ q: "Do you build without drawings?", a: "We do not start a building contract without knowing what is to be built. If the design does not exist yet, say what stage you are at." }, { q: "Which buildings can you look at?", a: "Residential and non-residential, depending on the drawings, the location and the work requested. Each case is reviewed before there is a proposal." }],
    },
    lsf: {
      name: "LSF construction", short: "A light-steel frame, for a project that is already planned in Light Steel Frame.",
      title: "LSF construction in Coimbra — JGM",
      metaDesc: "What Light Steel Frame is, and what to send if your Coimbra project is in LSF.",
      intro: "LSF, or Light Steel Frame, is a structure of galvanised light-steel profiles. Once it is up, it is closed with boards, insulation and the finishes in the design. If your job is planned in this system, describe it here. We do not compare timings with other systems without seeing the case.",
      problems: ["A design already set in LSF", "An extension where the weight of the frame matters", "A question about what happens after the frame"],
      benefits: ["Whether a structural design already exists", "Whether it is a house, an extension or another building", "Which finishes you want in the request"],
      steps: [{ t: "Design", d: "We check that the planned structure is LSF." }, { t: "Base", d: "The foundation has to be designed to receive the profiles." }, { t: "Assembly", d: "The profiles are erected to the design." }, { t: "Closing", d: "Boards, insulation and finishes close the building." }],
      faqs: [{ q: "Is an LSF house stronger?", a: "Strength is not decided on a website. It is set in the structural design, and the build has to follow that design." }, { q: "Is it faster than traditional construction?", a: "We do not promise that. Timing depends on the design, the permits and the finishes, and it is given only after those are reviewed." }],
    },
    renovations: {
      name: "Renovations", short: "Houses, flats and shops, one room or several jobs at once.",
      title: "Renovations in Coimbra — JGM",
      metaDesc: "Renovations in Coimbra: painting, floors, walls, plastering, glazing and roofing. Say what you want to change.",
      intro: "A renovation can be painting one room or renewing a whole flat. What changes the quote is the current condition, what stays and what is replaced. Painting, coverings, plastering, glazing and roofing can go in the same request.",
      problems: ["A room that no longer works", "A floor or walls to replace", "A house or shop to renew in stages", "A roof or windows to deal with at the same time"],
      benefits: ["Which rooms are in the job", "What you want to keep", "Whether you need to keep using the space during the work"],
      steps: [{ t: "Request", d: "Describe the rooms and what you want changed." }, { t: "Clarification", d: "If the description is not enough, we ask for photos or a visit." }, { t: "Proposal", d: "The tasks are listed separately, so the scope is clear." }, { t: "Work", d: "The job follows the order set in the proposal." }],
      faqs: [{ q: "Can I stay in the house during the work?", a: "It depends on the tasks and the rooms. It is not a rule. We say whether it is realistic once we understand the request." }, { q: "Can you do just one room?", a: "Yes. A bathroom, a kitchen or a single trade can be the whole request." }],
    },
    etics: {
      name: "External insulation (ETICS)", short: "ETICS, called capoto in Portugal, fixed to new or existing façades.",
      title: "ETICS external insulation in Coimbra — JGM",
      metaDesc: "External wall insulation (ETICS, locally called capoto) in Coimbra. What it is and what to check on the façade.",
      intro: "ETICS is insulation bonded and fixed to the outside of the wall: insulation boards, a reinforced base coat and the finish. In Portugal it is commonly called capoto. It is used on new façades and on buildings already standing. The condition of the wall decides whether it can be applied.",
      problems: ["A façade to renew and insulate at the same time", "An external wall with no insulation", "A substrate that is uneven, cracked or damp"],
      benefits: ["Whether the façade is new or existing", "The current wall material, if you know it", "Details: windows, balconies, junctions with the roof"],
      steps: [{ t: "Façade", d: "The substrate is checked, and the places where the system changes plane." }, { t: "Preparation", d: "The surface has to be fit to take the boards." }, { t: "System", d: "Boards, fixings, reinforced coat and mesh." }, { t: "Finish", d: "The final coating is what stays visible." }],
      faqs: [{ q: "How much will it save on the bill?", a: "We do not state savings. They depend on the building, the thickness, the exposure and how it is used. That is not something to guess in a sentence." }, { q: "Can it go on a house that is already built?", a: "Often yes, after checking that the façade can take the system and how openings and junctions will be dealt with." }],
    },
    painting: {
      name: "Painting", short: "Walls, ceilings and façades, inside or outside.",
      title: "Painting in Coimbra — JGM", metaDesc: "Interior and exterior painting in Coimbra. Say whether it is one room, the house or the façade.",
      intro: "Painting is requested when walls are stained, the colour no longer works, or the surface was left uneven by other work. Inside and outside are not treated the same way. Preparation, when it is needed, is written into the quote. It is not assumed.",
      problems: ["Stained walls or paint coming off", "A room to paint after other work", "A façade to renew"],
      benefits: ["Inside, outside, or both", "Whether there is damp, cracking or loose paint", "Whether you want paint only, or surface repairs as well"],
      steps: [{ t: "Surface", d: "The condition of the wall or façade is established." }, { t: "Preparation", d: "Protection, cleaning and repairs are included if they are needed." }, { t: "Application", d: "The coats set out in the quote." }, { t: "Finish", d: "The paint is checked and the protection is removed." }],
      faqs: [{ q: "Is wall preparation included?", a: "Only if it is in the proposal. Filling, sanding or stain treatment changes the job and has to be asked for." }],
    },
    coverings: {
      name: "Floor and wall coverings", short: "Floors and walls, inside or outside, in a new build or as a replacement.",
      title: "Floor and wall coverings in Coimbra — JGM", metaDesc: "Laying and replacing floors and wall coverings in Coimbra.",
      intro: "The covering is the material you see on the floor or the wall. It can be the first installation or the replacement of a worn floor. What is underneath — level, damp, or to be taken up — changes the job as much as the material you choose.",
      problems: ["A worn, broken or uneven floor", "A wall to cover again", "A bathroom or kitchen finish to renew"],
      benefits: ["The room and an approximate area", "Whether the existing covering comes out or stays", "The material, if you have already chosen it"],
      steps: [{ t: "Area", d: "The room and an approximate size are enough to start." }, { t: "Substrate", d: "We see whether the existing finish has to come up and the base made good." }, { t: "Laying", d: "The material goes down with the edges that were planned." }, { t: "Handover", d: "The surface is cleaned and the cuts are checked." }],
      faqs: [{ q: "Can you replace only part of a floor?", a: "It can be possible. It depends on finding a compatible material and on the base being sound in the area that remains." }],
    },
    plastering: {
      name: "Plastering", short: "Walls and ceilings to be made flat, in a new build or a repair.",
      title: "Plastering in Coimbra — JGM", metaDesc: "Plastering walls and ceilings in Coimbra, in new work or over existing surfaces.",
      intro: "Plastering leaves a wall or ceiling flat enough to take paint or another finish. In a new build it is part of the sequence. In an occupied house it is used to correct uneven areas, provided the base is stable.",
      problems: ["A ceiling or walls out of plane", "A surface left marked after a covering was removed", "A finish still missing in a new build"],
      benefits: ["Whether it is walls, ceilings or both", "Whether the surface is new or already painted", "Whether there are cracks, and whether they seem to be moving"],
      steps: [{ t: "Base", d: "We check that the background can take the plaster." }, { t: "Preparation", d: "Areas that should not stay underneath are dealt with." }, { t: "Application", d: "The coats bring the surface level." }, { t: "Ready to paint", d: "The finish is left ready for paint, if painting is part of the request." }],
      faqs: [{ q: "Will plaster close any crack?", a: "No. A crack that is still moving will come back. The cause is looked at first. Plaster does not replace that." }],
    },
    glazing: {
      name: "Glazing", short: "New glass or a replacement, depending on the opening and the frame.",
      title: "Glazing in Coimbra — JGM", metaDesc: "Fitting and replacing glass in Coimbra. Say which opening, and whether the frame stays.",
      intro: "The glass depends on the opening it goes into: the size, the frame and how the room is used. It can be a broken pane to replace, or glass for new openings. The glass is not chosen from a distance without seeing the frame.",
      problems: ["Broken or scratched glass", "A new opening still without glass", "A frame that stays and glass that is replaced"],
      benefits: ["How many openings", "Whether the frame stays or changes too", "Access: ground floor, upper floor, scaffold"],
      steps: [{ t: "Opening", d: "The frame and the condition of the surround are checked." }, { t: "Size", d: "The glass is cut to the real size, not to an estimate." }, { t: "Order", d: "The type of glass is set before it is fitted." }, { t: "Fitting", d: "It is set and sealed in the existing or new opening." }],
      faqs: [{ q: "Can you replace a single pane?", a: "The request can be just that. We check that the frame will take it and that access allows the fitting." }],
    },
    roofing: {
      name: "Roofing", short: "New roofs, roofs to renew, or a water problem still to be found.",
      title: "Roofing in Coimbra — JGM", metaDesc: "New and renewed roofs in Coimbra. Describe the roof and, if there is one, the water problem.",
      intro: "The roof is the part of the building that takes the rain. People ask for work when the covering is worn, when water is getting in, or when a new building does not have its roof yet. A stain on the ceiling is not always under the fault.",
      problems: ["Broken or slipped tiles", "Water showing indoors", "The roof of a new building"],
      benefits: ["The type of roof, if you know it", "How long water has been coming in, and in which room it shows", "Whether there is safe access to the roof"],
      steps: [{ t: "Inspection", d: "The covering, the junctions and the paths water can take are looked at." }, { t: "Scope", d: "The proposal separates a local repair from a wider renewal." }, { t: "Work", d: "The defined area is done, including the junctions that belong to it." }, { t: "Check", d: "Drainage is checked after the work." }],
      faqs: [{ q: "Does the stain on the ceiling show where the fault is?", a: "Not always. Water can travel through the roof space before it appears. The roof has to be seen, not only the stain." }],
    },
  },
};

const es: Dict = {
  langName: "Español",
  nav: { home: "Inicio", about: "Sobre nosotros", services: "Servicios", blog: "Blog", contact: "Contacto", faq: "Preguntas frecuentes", quote: "Pedir presupuesto", menu: "Abrir menú", close: "Cerrar menú", language: "Idioma", skip: "Saltar al contenido" },
  home: {
    metaTitle: "JGM Construções — construcción y reformas en Coímbra",
    metaDesc: "Obra nueva, reformas, pintura, suelos y paredes, enlucidos, vidrios, cubiertas y aislamiento por el exterior desde Adémia, Coímbra. Describa el trabajo y pida presupuesto.",
    eyebrow: "Coímbra · Construcción y reforma",
    h1: "Construcción y reformas en Coímbra.",
    sub: "Obra nueva, reformas, pintura, suelos y paredes, enlucidos, vidrios, cubiertas y aislamiento por el exterior. La sede está en Adémia. Para seguir, describa el trabajo y pida presupuesto.",
    cta1: "Pedir presupuesto", cta2: "Ver los servicios", scroll: "Bajar",
    introLabel: "JGM", introTitle: "Qué puede pedir y cómo empezar",
    introText: "JGM Construções es la marca de JGM - Remodelações e Pinturas, Unipessoal Lda., con sede en Adémia, Coímbra. En este sitio están los trabajos que puede solicitar. El formulario pide el tipo de obra, la zona y una descripción, para que la respuesta pueda ser concreta.",
    servicesLabel: "Servicios", servicesTitle: "Trabajos que puede pedir", more: "Ver este servicio",
    otherServices: "Otros trabajos",
    otherList: ["Pintura", "Suelos y paredes", "Enlucidos", "Vidrios", "Cubiertas"],
    otherNote: "Si el trabajo no está en la lista, descríbalo en la solicitud. Confirmamos si podemos estudiarlo.",
    buildLabel: "La secuencia de la obra", buildTitle: "Un edificio se construye por fases.",
    buildNote: "Imágenes ilustrativas. No son fotografías de obras de JGM.",
    stages: [
      { t: "Cimentación", d: "Se prepara el terreno y se ejecuta la base que recibe el edificio." },
      { t: "Estructura", d: "Se monta la estructura prevista en el proyecto, en LSF o en otro sistema." },
      { t: "Envolvente", d: "Se cierran muros y cubierta. El aislamiento exterior entra en esta fase cuando forma parte de la obra." },
      { t: "Acabados", d: "Revestimientos, enlucidos y pintura dejan los espacios listos para el uso previsto." },
    ],
    processLabel: "Presupuesto", processTitle: "De la solicitud a la propuesta",
    process: [
      { t: "Describa la obra", d: "En el formulario indique el tipo de trabajo, la zona y lo que quiere hacer." },
      { t: "Estudiamos la solicitud", d: "Si falta información, la pedimos. Una visita al lugar solo se acuerda cuando haga falta para entender la obra." },
      { t: "Recibe una propuesta", d: "El presupuesto indica el alcance. El precio y el plazo, cuando existan, quedan escritos en esa propuesta." },
      { t: "La obra sigue lo acordado", d: "Si acepta la propuesta, la ejecución corresponde a lo definido. Lo que cambie después se acuerda aparte." },
    ],
    portfolioLabel: "Imágenes", portfolioTitle: "Todavía no hay fotografías de obras.",
    portfolioText: "Las imágenes de este sitio son ilustrativas. Las fotografías de obras de JGM solo se publicarán cuando existan y haya autorización para mostrarlas.",
    faqLabel: "Dudas", faqTitle: "Antes de pedir presupuesto", allFaq: "Ver todas las preguntas",
    ctaTitle: "¿Quiere hablar de una obra?", ctaText: "Describa lo que quiere hacer y dónde. Es la forma más directa de que JGM entienda la solicitud y responda.",
  },
  about: {
    metaTitle: "Sobre JGM Construções — Adémia, Coímbra",
    metaDesc: "JGM Construções es la marca de JGM - Remodelações e Pinturas, Unipessoal Lda., con sede en Adémia, Coímbra. Vea los trabajos que puede pedir y cómo solicitar un presupuesto.",
    label: "Sobre nosotros", h1: "Una empresa de construcción con sede en Adémia.",
    lead: "JGM Construções es la marca comercial de JGM - Remodelações e Pinturas, Unipessoal Lda. La sede está en Beco dos Travassos, en Adémia, Coímbra. El sitio sirve para explicar los trabajos y recibir solicitudes de presupuesto.",
    blocks: [
      { t: "Trabajos", d: "Construcción de edificios, LSF, reformas, pintura, suelos y paredes, enlucidos, vidrios, cubiertas y aislamiento térmico por el exterior." },
      { t: "Zona", d: "Las solicitudes se tratan desde Coímbra y la región. Los trabajos en otras zonas de Portugal pueden estudiarse, sin compromiso de aceptarlos." },
      { t: "Cómo empezar", d: "Use el formulario de contacto. Nombre, correo, tipo de trabajo, zona y una descripción bastan para el primer mensaje." },
    ],
  },
  servicesPage: {
    metaTitle: "Servicios de construcción y reformas en Coímbra — JGM",
    metaDesc: "Construcción, LSF, reformas, pintura, suelos y paredes, enlucidos, vidrios, cubiertas y SATE en Coímbra. Cada servicio explica qué puede pedir.",
    label: "Servicios", h1: "Servicios de construcción y reforma",
    lead: "Cada página explica un tipo de trabajo, las situaciones en las que suele pedirse y qué conviene decir en el presupuesto. Si su caso junta varios, descríbalos en la misma solicitud.",
  },
  service: { problems: "Cuándo se pide", benefits: "Qué conviene decir", process: "Cómo se prepara", faq: "Preguntas", related: "Otros servicios", cta: "Pedir presupuesto de este trabajo", ctaText: "Indique la zona y lo que quiere hacer. La respuesta parte de esa descripción.", illustrative: "Imagen ilustrativa" },
  contact: {
    metaTitle: "Pedir presupuesto — JGM Construções, Adémia",
    metaDesc: "Formulario de presupuesto de JGM Construções. Sede en Beco dos Travassos, Adémia, 3025-124 Coímbra.",
    label: "Contacto", h1: "Describa la obra y pida presupuesto",
    lead: "Cuanto más clara sea la solicitud, más útil puede ser la respuesta. En esta fase no hacen falta medidas exactas.",
    address: "Dirección", legal: "Datos de la empresa",
    form: { name: "Nombre", email: "Correo electrónico", phone: "Teléfono", optional: "opcional", service: "Tipo de trabajo", choose: "Elija un tipo de trabajo", other: "Otro", location: "Zona de la obra", message: "Qué quiere hacer", submit: "Enviar solicitud de presupuesto", pending: "El envío en línea todavía no está disponible.", required: "Rellene este campo.", invalidEmail: "Ese correo no parece válido.", privacy: "Los datos sirven solo para responder a esta solicitud. El responsable del tratamiento es JGM - Remodelações e Pinturas, Unipessoal Lda." },
  },
  faqPage: { metaTitle: "Preguntas frecuentes — JGM Construções", metaDesc: "Cómo pedir presupuesto, qué información enviar, qué trabajos hay y en qué zona actúa JGM Construções, desde Coímbra.", label: "Preguntas", h1: "Preguntas frecuentes", lead: "Respuestas directas sobre el presupuesto, los trabajos y la zona." },
  faqs: [
    { q: "¿Cómo pido un presupuesto?", a: "En la página de contacto, elija el tipo de trabajo, indique la zona y describa lo que quiere hacer. La solicitud se envía con su nombre y su correo." },
    { q: "¿Qué información ayuda en la primera solicitud?", a: "El tipo de trabajo, la localidad, si es interior o exterior y, si los tiene, fotografías o un proyecto. Las medidas aproximadas bastan. Las exactas, cuando hagan falta, se confirman después." },
    { q: "¿Hay siempre una visita?", a: "No. Muchas solicitudes se entienden por la descripción. La visita se acuerda cuando, sin ver el espacio, no se puede definir el alcance." },
    { q: "¿Qué reformas puedo pedir?", a: "Interiores y exteriores: pintura, suelos y paredes, enlucidos, vidrios y cubiertas. Puede ser una estancia o un conjunto de trabajos." },
    { q: "¿Qué es la construcción LSF?", a: "Light Steel Frame es una estructura de perfiles de acero ligero galvanizado, cerrada después con placas, aislamiento y acabados. Si su proyecto es de este sistema, descríbalo en la solicitud para que lo estudiemos." },
    { q: "¿Qué es el SATE?", a: "Es aislamiento térmico fijado por el exterior del muro, con una capa armada y un acabado. En Portugal se llama a menudo capoto. Se aplica en fachadas nuevas o existentes, después de ver el estado del soporte." },
    { q: "¿En qué zona trabajan?", a: "La sede está en Adémia, Coímbra, y las solicitudes se tratan desde ahí y de la región. Fuera de esa zona, la solicitud puede verse caso a caso." },
    { q: "¿El sitio muestra obras ya hechas?", a: "No. Las fotografías son ilustrativas. No publicamos obras, plazos ni precios mientras no estén confirmados para cada solicitud." },
  ],
  footer: { desc: "Construcción y reforma desde Adémia, Coímbra.", services: "Servicios", company: "Empresa", legal: "Información legal", privacy: "Política de privacidad", cookies: "Política de cookies", preferences: "Preferencias de cookies", terms: "Términos y condiciones", careers: "Candidaturas espontáneas", complaints: "Libro de reclamaciones", review: "Valorar en Google", rights: "Todos los derechos reservados.", credit: "Sitio web desarrollado por", soon: "próximamente" },
  illustrative: "Imagen ilustrativa",
  services: {
    buildings: {
      name: "Construcción de edificios", short: "Edificios residenciales y no residenciales, a partir del proyecto y de las condiciones del terreno.",
      title: "Construcción de edificios en Coímbra — JGM", metaDesc: "Construcción de edificios residenciales y no residenciales en Coímbra. Envíe el proyecto y la ubicación para un presupuesto.",
      intro: "Esta página es para quien tiene un edificio que construir, o un proyecto ya dibujado, y quiere saber si JGM puede ejecutarlo. El presupuesto parte del proyecto, de la ubicación y de lo que está incluido: estructura, envolvente y acabados no son lo mismo.",
      problems: ["Obra nueva de vivienda", "Edificio no residencial con proyecto", "Duda sobre lo que entra en el contrato"],
      benefits: ["Si ya hay proyecto de arquitectura y de instalaciones", "La dirección o la localidad del terreno", "Qué quiere que incluya la propuesta"],
      steps: [{ t: "Proyecto", d: "Vemos lo que está dibujado y lo que aún falta decidir." }, { t: "Lugar", d: "La zona y el acceso al terreno entran en el análisis." }, { t: "Alcance", d: "La propuesta separa estructura, envolvente y acabados." }, { t: "Decisión", d: "La obra solo avanza cuando se acepta la propuesta." }],
      faqs: [{ q: "¿Construyen sin proyecto?", a: "No empezamos un contrato de obra sin saber qué está previsto construir. Si el proyecto todavía no existe, diga en qué fase está." }, { q: "¿Qué edificios pueden estudiar?", a: "Residenciales y no residenciales, según el proyecto, la ubicación y los trabajos pedidos. Cada caso se ve antes de que haya propuesta." }],
    },
    lsf: {
      name: "Construcción LSF", short: "Estructura de perfiles de acero ligero, para quien ya sabe que el proyecto es en Light Steel Frame.",
      title: "Construcción LSF en Coímbra — JGM",
      metaDesc: "Qué es el Light Steel Frame y qué información enviar si su proyecto en Coímbra es en LSF.",
      intro: "El LSF, o Light Steel Frame, es una estructura de perfiles de acero ligero galvanizado. Una vez montada, se cierra con placas, aislamiento y los acabados del proyecto. Si su obra está prevista en este sistema, descríbala aquí. No comparamos plazos con otros sistemas sin ver el caso.",
      problems: ["Proyecto ya definido en LSF", "Ampliación en la que importa el peso de la estructura", "Duda sobre lo que viene después de la estructura"],
      benefits: ["Si el proyecto de estructura ya existe", "Si es vivienda, ampliación u otro edificio", "Qué acabados quiere incluir en la solicitud"],
      steps: [{ t: "Proyecto", d: "Confirmamos si la estructura prevista es en LSF." }, { t: "Base", d: "La cimentación tiene que estar prevista para recibir los perfiles." }, { t: "Montaje", d: "Los perfiles se montan según el proyecto." }, { t: "Cierre", d: "Placas, aislamiento y acabados cierran el edificio." }],
      faqs: [{ q: "¿Una casa en LSF es más resistente?", a: "La resistencia no se decide en el sitio web. El dimensionamiento está en el proyecto de estructura y la ejecución tiene que seguirlo." }, { q: "¿Es más rápido que la construcción tradicional?", a: "No damos esa garantía. El plazo depende del proyecto, de las licencias y de los acabados, y solo se indica después de analizarlos." }],
    },
    renovations: {
      name: "Reformas", short: "Casas, pisos y locales, en una estancia o en varios trabajos a la vez.",
      title: "Reformas en Coímbra — JGM",
      metaDesc: "Reformas en Coímbra: pintura, suelos, paredes, enlucidos, vidrios y cubiertas. Diga qué quiere cambiar.",
      intro: "Una reforma puede ser la pintura de una estancia o la renovación de un piso entero. Lo que cambia el presupuesto es el estado actual, lo que se queda y lo que se sustituye. Puede juntar pintura, revestimientos, enlucidos, vidrios y cubiertas en la misma solicitud.",
      problems: ["Una estancia que ya no sirve", "Suelo o paredes que hay que sustituir", "Casa o local que se renueva por fases", "Cubierta o ventanas que se tratan a la vez"],
      benefits: ["Qué estancias entran en la obra", "Qué quiere conservar", "Si necesita seguir usando el espacio durante los trabajos"],
      steps: [{ t: "Solicitud", d: "Describa las estancias y lo que quiere cambiar." }, { t: "Aclaración", d: "Si la descripción no basta, pedimos fotos o una visita." }, { t: "Propuesta", d: "Los trabajos quedan separados, para que se vea qué está incluido." }, { t: "Obra", d: "La ejecución sigue el orden acordado en la propuesta." }],
      faqs: [{ q: "¿Puedo quedarme en casa durante la obra?", a: "Depende de los trabajos y de las estancias. No es una regla. Decimos si es viable después de entender la solicitud." }, { q: "¿Hacen solo una estancia?", a: "Sí. Un baño, una cocina o un único tipo de trabajo pueden ser la solicitud entera." }],
    },
    etics: {
      name: "Aislamiento térmico SATE", short: "Sistema SATE, el capoto en Portugal, aplicado por el exterior en fachadas nuevas o existentes.",
      title: "SATE y aislamiento térmico en Coímbra — JGM",
      metaDesc: "Aislamiento térmico por el exterior (SATE; en Portugal, capoto) en Coímbra. Qué es y qué evaluar en la fachada.",
      intro: "El SATE es un sistema pegado y fijado por la cara exterior del muro: placas de aislamiento, una capa de mortero con malla y el acabado. En Portugal se conoce como capoto. Sirve en fachadas nuevas y en edificios ya construidos. El estado del soporte decide si la aplicación es posible.",
      problems: ["Fachada que se renueva y se aísla a la vez", "Muro exterior sin aislamiento", "Soporte irregular, fisurado o húmedo"],
      benefits: ["Si la fachada es nueva o existente", "El material actual del muro, si lo conoce", "Puntos singulares: ventanas, balcones, encuentros con la cubierta"],
      steps: [{ t: "Fachada", d: "Se ve el soporte y los puntos en los que el sistema cambia de plano." }, { t: "Preparación", d: "La superficie tiene que estar en condiciones de recibir las placas." }, { t: "Sistema", d: "Placas, fijaciones, capa armada y malla." }, { t: "Acabado", d: "El revestimiento final es lo que queda a la vista." }],
      faqs: [{ q: "¿Cuánto se ahorra en la factura?", a: "No indicamos ahorros. Dependen del edificio, del espesor, de la exposición y del uso. Eso no se estima con una frase." }, { q: "¿Se aplica en una casa ya construida?", a: "Muchas veces sí, después de ver si la fachada aguanta el sistema y cómo se resuelven los huecos y los encuentros." }],
    },
    painting: {
      name: "Pintura", short: "Paredes, techos y fachadas, interiores o exteriores.",
      title: "Pintura en Coímbra — JGM", metaDesc: "Pintura interior y exterior en Coímbra. Diga si es una estancia, la casa o la fachada.",
      intro: "La pintura se pide cuando las paredes están manchadas, el color ya no sirve o la superficie quedó irregular después de otras obras. Interior y exterior no se tratan igual. La preparación, cuando haga falta, queda escrita en el presupuesto y no se da por incluida.",
      problems: ["Paredes manchadas o con la pintura desconchada", "Estancia que se pinta después de obras", "Fachada que se renueva"],
      benefits: ["Interior, exterior o los dos", "Si hay humedad, fisuras o pintura suelta", "Si quiere solo pintura o también corrección de la superficie"],
      steps: [{ t: "Superficie", d: "Se entiende el estado de la pared o de la fachada." }, { t: "Preparación", d: "Protección, limpieza y correcciones entran si hacen falta." }, { t: "Aplicación", d: "Las manos previstas en el presupuesto." }, { t: "Fin", d: "Se revisa la pintura y se retira la protección." }],
      faqs: [{ q: "¿La preparación de las paredes está incluida?", a: "Solo si está en la propuesta. Masilla, lijado o tratamiento de manchas cambian el trabajo y tienen que pedirse." }],
    },
    coverings: {
      name: "Suelos y revestimientos de paredes", short: "Suelos y paredes interiores o exteriores, en obra nueva o para sustituir.",
      title: "Revestimiento de suelos y paredes en Coímbra — JGM", metaDesc: "Colocación y sustitución de suelos y revestimientos de paredes en Coímbra.",
      intro: "El revestimiento es el material que queda a la vista en el suelo o en la pared. Puede ser la primera colocación o la sustitución de un suelo gastado. El soporte de debajo — regular, húmedo o que hay que demoler — cambia el trabajo tanto como el material elegido.",
      problems: ["Suelo gastado, roto o desnivelado", "Pared que se reviste de nuevo", "Baño o cocina en los que se renueva el acabado"],
      benefits: ["La estancia y la superficie aproximada", "Si el revestimiento actual sale o se queda", "El material, si ya está elegido"],
      steps: [{ t: "Superficie", d: "La estancia y una medida aproximada bastan para empezar." }, { t: "Soporte", d: "Se ve si hay que levantar lo existente y regularizar." }, { t: "Colocación", d: "El material se coloca con los remates previstos." }, { t: "Entrega", d: "La superficie queda limpia y se revisan los cortes." }],
      faqs: [{ q: "¿Cambian solo parte del suelo?", a: "Puede ser posible. Depende de que haya material compatible y de que el soporte esté en condiciones en la zona que se queda." }],
    },
    plastering: {
      name: "Enlucidos", short: "Paredes y techos que hay que regularizar, en obra nueva o en reparación.",
      title: "Enlucidos en Coímbra — JGM", metaDesc: "Enlucido de paredes y techos en Coímbra, en obra nueva o sobre superficies existentes.",
      intro: "El enlucido deja la pared o el techo planos para recibir pintura u otro acabado. En obra nueva forma parte de la secuencia. En una casa ya habitada sirve para corregir zonas irregulares, siempre que el soporte esté estable.",
      problems: ["Techo o paredes fuera de plano", "Superficie marcada después de quitar un revestimiento", "Acabado que falta en una obra nueva"],
      benefits: ["Si es pared, techo o los dos", "Si la superficie es nueva o ya estaba pintada", "Si hay fisuras y si parecen activas"],
      steps: [{ t: "Soporte", d: "Se confirma si la base aguanta el enlucido." }, { t: "Preparación", d: "Se tratan las zonas que no pueden quedar debajo." }, { t: "Aplicación", d: "Las capas nivelan la superficie." }, { t: "Listo para pintar", d: "El acabado queda preparado para la pintura, si forma parte de la solicitud." }],
      faqs: [{ q: "¿El enlucido cierra cualquier fisura?", a: "No. Una fisura que sigue moviéndose vuelve a aparecer. Primero se entiende la causa; el enlucido no la sustituye." }],
    },
    glazing: {
      name: "Colocación de vidrios", short: "Vidrios nuevos o de sustitución, según el hueco y la carpintería.",
      title: "Colocación de vidrios en Coímbra — JGM", metaDesc: "Colocación y sustitución de vidrios en Coímbra. Indique el hueco y si la carpintería se mantiene.",
      intro: "El vidrio depende del hueco en el que entra: la medida, la carpintería y el uso de la estancia. Puede ser la sustitución de un vidrio roto o la colocación en huecos nuevos. Sin ver el marco, no se elige el vidrio a distancia.",
      problems: ["Vidrio roto o rayado", "Hueco nuevo todavía sin vidrio", "Carpintería que se mantiene y vidrio que se cambia"],
      benefits: ["Cuántos huecos son", "Si la carpintería se queda o también cambia", "El acceso: planta baja, piso, andamio"],
      steps: [{ t: "Hueco", d: "Se ve el marco y el estado del cerco." }, { t: "Medida", d: "El vidrio se corta a la medida real, no a una estimación." }, { t: "Pedido", d: "El tipo de vidrio queda definido antes de la colocación." }, { t: "Colocación", d: "Se asienta y se sella en el hueco existente o nuevo." }],
      faqs: [{ q: "¿Cambian un solo vidrio?", a: "La solicitud puede ser solo esa. Se confirma si el marco lo admite y si el acceso permite la colocación." }],
    },
    roofing: {
      name: "Cubiertas", short: "Cubiertas nuevas, por renovar o con un problema de agua por localizar.",
      title: "Cubiertas en Coímbra — JGM", metaDesc: "Colocación y renovación de cubiertas en Coímbra. Describa la cubierta y, si existe, el problema de agua.",
      intro: "La cubierta es la parte del edificio que recibe la lluvia. Se pide una intervención cuando el tejado está deteriorado, cuando entra agua o cuando la obra nueva todavía no tiene cubierta. La mancha en el techo no siempre está debajo del fallo.",
      problems: ["Tejas rotas o desplazadas", "Agua que aparece en el interior", "Cubierta de una obra nueva"],
      benefits: ["Tipo de cubierta, si lo conoce", "Desde cuándo entra agua y en qué estancia aparece", "Si hay un acceso seguro al tejado"],
      steps: [{ t: "Inspección", d: "Se ve la cubierta, los encuentros y por dónde puede correr el agua." }, { t: "Alcance", d: "La propuesta distingue una reparación local de una renovación más amplia." }, { t: "Ejecución", d: "Se trabaja la zona definida, con los encuentros incluidos." }, { t: "Comprobación", d: "Se revisa el desagüe después de la intervención." }],
      faqs: [{ q: "¿La mancha del techo muestra el sitio del fallo?", a: "No siempre. El agua puede recorrer el bajo cubierta antes de aparecer. Por eso hay que ver la cubierta, no solo la mancha." }],
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
