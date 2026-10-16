import type { ServiceId } from "@/i18n/content";
import type { ClarifyId, PhaseId, PropertyId, TimelineId } from "@/lib/assistant/types";

type Option<T extends string> = { id: T; label: string };

export type AssistantContent = {
  launcher: { open: string; close: string; title: string };
  badge: string;
  welcome: string;
  languagePrompt: string;
  languages: { pt: string; en: string; es: string };
  needPrompt: string;
  clarifyPrompt: string;
  otherPrompt: string;
  otherPlaceholder: string;
  otherContinue: string;
  propertyPrompt: string;
  locationPrompt: string;
  locationPlaceholder: string;
  locationHint: string;
  locationContinue: string;
  descriptionPrompt: string;
  descriptionPlaceholder: string;
  descriptionOptional: string;
  descriptionContinue: string;
  scopePrompt: string;
  scopePlaceholder: string;
  scopeSkip: string;
  scopeContinue: string;
  phasePrompt: string;
  timelinePrompt: string;
  summaryIntro: string;
  summary: {
    service: string;
    clarify: string;
    property: string;
    location: string;
    description: string;
    scope: string;
    phase: string;
    timeline: string;
  };
  summaryAsk: string;
  nextWhatsApp: string;
  nextDirect: string;
  editAnswers: string;
  preClose: string;
  previewLabel: string;
  openWhatsApp: string;
  whatsappNotConfigured: string;
  whatsappOpenedNote: string;
  back: string;
  restart: string;
  changeLanguage: string;
  directContact: string;
  labels: { otherService: string; unsure: string };
  options: {
    needExtra: Option<"other" | "unsure">[];
    clarify: Option<ClarifyId>[];
    property: Option<PropertyId>[];
    phase: Option<PhaseId>[];
    timeline: Option<TimelineId>[];
  };
  /** Ordem dos serviços anunciados no site, para o passo “necessidade”. */
  needServiceOrder: ServiceId[];
  whatsapp: {
    intro: string;
    outro: string;
    direct: string;
  };
  errors: {
    required: string;
    tooLong: string;
  };
};

const NEED_ORDER: ServiceId[] = [
  "buildings",
  "lsf",
  "renovations",
  "painting",
  "coverings",
  "etics",
  "plastering",
  "glazing",
  "roofing",
];

const pt: AssistantContent = {
  launcher: {
    open: "Abrir assistente comercial da JGM",
    close: "Fechar assistente",
    title: "Assistente JGM",
  },
  badge: "Assistente virtual da JGM",
  welcome:
    "Olá! Seja bem-vindo à JGM. Posso ajudar a identificar o serviço de que precisa e preparar o seu pedido para a equipa. Em que idioma prefere conversar?",
  languagePrompt: "Escolha o idioma da conversa.",
  languages: { pt: "Português", en: "English", es: "Español" },
  needPrompt: "O que pretende realizar?",
  clarifyPrompt: "Sem problema. Qual destas opções se aproxima mais do que precisa?",
  otherPrompt: "Descreva em poucas palavras o serviço que procura.",
  otherPlaceholder: "Ex.: reparação pontual, avaliação de fachada…",
  otherContinue: "Continuar",
  propertyPrompt: "O projeto diz respeito a que tipo de imóvel?",
  locationPrompt: "Em que localidade se encontra o imóvel ou onde será realizado o serviço?",
  locationPlaceholder: "Cidade, localidade ou código postal",
  locationHint:
    "A disponibilidade fora da área habitual de intervenção será confirmada pela equipa.",
  locationContinue: "Continuar",
  descriptionPrompt:
    "Pode explicar-nos, em poucas palavras, o que precisa? Por exemplo: pintar um apartamento, renovar uma cozinha ou avaliar uma solução de construção em LSF.",
  descriptionPlaceholder: "Descrição breve do trabalho",
  descriptionOptional: "Opcional — pode avançar sem descrever",
  descriptionContinue: "Continuar",
  scopePrompt:
    "Tem uma ideia da dimensão aproximada? Por exemplo: número de divisões, área ou extensão da intervenção.",
  scopePlaceholder: "Ex.: 2 divisões, cerca de 40 m²…",
  scopeSkip: "Ainda não sei",
  scopeContinue: "Continuar",
  phasePrompt: "Em que fase se encontra o projeto?",
  timelinePrompt: "Quando gostaria de realizar o trabalho?",
  summaryIntro: "Obrigado! Já temos uma ideia inicial do seu projeto.",
  summary: {
    service: "Serviço",
    clarify: "Necessidade indicada",
    property: "Tipo de imóvel",
    location: "Localização",
    description: "Descrição",
    scope: "Dimensão aproximada",
    phase: "Fase do projeto",
    timeline: "Prazo pretendido",
  },
  summaryAsk:
    "Quer enviar este pedido à equipa da JGM ou prefere falar diretamente com o responsável?",
  nextWhatsApp: "Preparar mensagem para WhatsApp",
  nextDirect: "Falar diretamente com o responsável",
  editAnswers: "Corrigir respostas",
  preClose:
    "Perfeito. Vamos preparar o seu pedido para que possa explicar o projeto à equipa sem ter de repetir tudo.",
  previewLabel: "Mensagem para WhatsApp (ainda não enviada)",
  openWhatsApp: "Abrir WhatsApp com esta mensagem",
  whatsappNotConfigured: "O contacto WhatsApp ainda não está configurado neste website.",
  whatsappOpenedNote:
    "O WhatsApp abrirá com a mensagem pronta. Só será enviada quando confirmar na aplicação.",
  back: "Voltar",
  restart: "Reiniciar conversa",
  changeLanguage: "Mudar idioma",
  directContact: "Contactar por WhatsApp sem questionário",
  labels: { otherService: "Outro serviço", unsure: "Ainda não tenho a certeza" },
  options: {
    needExtra: [
      { id: "other", label: "Outro serviço" },
      { id: "unsure", label: "Ainda não tenho a certeza" },
    ],
    clarify: [
      { id: "new_build", label: "Quero construir ou ampliar" },
      { id: "renovate", label: "Quero remodelar um espaço" },
      { id: "exterior", label: "Quero tratar da fachada ou isolamento" },
      { id: "paint_finish", label: "Quero pintura ou acabamentos" },
      { id: "still_unsure", label: "Ainda não sei — prefiro falar com a equipa" },
    ],
    property: [
      { id: "home", label: "Habitação" },
      { id: "commercial", label: "Espaço comercial ou empresarial" },
      { id: "other", label: "Outro tipo de imóvel" },
      { id: "unknown", label: "Ainda não sei" },
    ],
    phase: [
      { id: "preparing", label: "Estou a preparar o projeto" },
      { id: "evaluation", label: "Quero avançar com uma avaliação" },
      { id: "defined", label: "Já tenho uma ideia definida do trabalho" },
      { id: "question", label: "Quero apenas esclarecer uma dúvida" },
    ],
    timeline: [
      { id: "asap", label: "O mais brevemente possível" },
      { id: "months", label: "Nos próximos meses" },
      { id: "planning", label: "Ainda estou a planear" },
      { id: "undefined", label: "Não tenho uma data definida" },
    ],
  },
  needServiceOrder: NEED_ORDER,
  whatsapp: {
    intro: "Olá, equipa da JGM! Gostaria de pedir informações sobre um projeto.",
    outro: "Podem ajudar-me a perceber os próximos passos?\n\nObrigado.",
    direct:
      "Olá! Vim através do website da JGM e gostaria de falar com o responsável sobre um projeto.",
  },
  errors: {
    required: "Preencha este campo para continuar.",
    tooLong: "O texto é demasiado longo. Resuma, por favor.",
  },
};

const en: AssistantContent = {
  launcher: {
    open: "Open the JGM sales assistant",
    close: "Close assistant",
    title: "JGM assistant",
  },
  badge: "JGM virtual assistant",
  welcome:
    "Hello! Welcome to JGM. I can help identify the service you need and prepare your request for the team. Which language would you like to use?",
  languagePrompt: "Choose the conversation language.",
  languages: { pt: "Português", en: "English", es: "Español" },
  needPrompt: "What would you like to do?",
  clarifyPrompt: "No problem. Which of these is closest to what you need?",
  otherPrompt: "Please describe the service you are looking for in a few words.",
  otherPlaceholder: "e.g. a local repair, a façade assessment…",
  otherContinue: "Continue",
  propertyPrompt: "What type of property is the project for?",
  locationPrompt: "Where is the property, or where will the work take place?",
  locationPlaceholder: "City, locality or postcode",
  locationHint:
    "Availability outside the usual service area will be confirmed by the team.",
  locationContinue: "Continue",
  descriptionPrompt:
    "In a few words, what do you need? For example: painting a flat, renovating a kitchen, or assessing an LSF build.",
  descriptionPlaceholder: "Short description of the work",
  descriptionOptional: "Optional — you can continue without a description",
  descriptionContinue: "Continue",
  scopePrompt:
    "Do you have a rough idea of the size? For example: number of rooms, floor area or extent of the work.",
  scopePlaceholder: "e.g. 2 rooms, about 40 m²…",
  scopeSkip: "I don’t know yet",
  scopeContinue: "Continue",
  phasePrompt: "Where are you in the project?",
  timelinePrompt: "When would you like the work to take place?",
  summaryIntro: "Thank you. We now have an initial picture of your project.",
  summary: {
    service: "Service",
    clarify: "Need indicated",
    property: "Property type",
    location: "Location",
    description: "Description",
    scope: "Approximate size",
    phase: "Project stage",
    timeline: "Preferred timing",
  },
  summaryAsk: "Would you like to send this request to the JGM team, or speak directly with the person in charge?",
  nextWhatsApp: "Prepare a WhatsApp message",
  nextDirect: "Speak directly with the person in charge",
  editAnswers: "Edit answers",
  preClose:
    "Perfect. We’ll prepare your request so you can explain the project to the team without repeating everything.",
  previewLabel: "WhatsApp message (not sent yet)",
  openWhatsApp: "Open WhatsApp with this message",
  whatsappNotConfigured: "WhatsApp contact is not configured on this website yet.",
  whatsappOpenedNote:
    "WhatsApp will open with the message ready. It is only sent when you confirm in the app.",
  back: "Back",
  restart: "Restart conversation",
  changeLanguage: "Change language",
  directContact: "Contact via WhatsApp without the questionnaire",
  labels: { otherService: "Another service", unsure: "I’m not sure yet" },
  options: {
    needExtra: [
      { id: "other", label: "Another service" },
      { id: "unsure", label: "I’m not sure yet" },
    ],
    clarify: [
      { id: "new_build", label: "I want to build or extend" },
      { id: "renovate", label: "I want to renovate a space" },
      { id: "exterior", label: "I want façade work or insulation" },
      { id: "paint_finish", label: "I want painting or finishes" },
      { id: "still_unsure", label: "Still unsure — I’d rather speak with the team" },
    ],
    property: [
      { id: "home", label: "Home" },
      { id: "commercial", label: "Commercial or business premises" },
      { id: "other", label: "Another type of property" },
      { id: "unknown", label: "I don’t know yet" },
    ],
    phase: [
      { id: "preparing", label: "I’m preparing the project" },
      { id: "evaluation", label: "I want an assessment" },
      { id: "defined", label: "I already have a clear idea of the work" },
      { id: "question", label: "I only want to clarify a question" },
    ],
    timeline: [
      { id: "asap", label: "As soon as possible" },
      { id: "months", label: "In the coming months" },
      { id: "planning", label: "I’m still planning" },
      { id: "undefined", label: "I don’t have a set date" },
    ],
  },
  needServiceOrder: NEED_ORDER,
  whatsapp: {
    intro: "Hello, JGM team! I would like information about a project.",
    outro: "Could you help me understand the next steps?\n\nThank you.",
    direct:
      "Hello! I came through the JGM website and would like to speak with the person in charge about a project.",
  },
  errors: {
    required: "Please fill in this field to continue.",
    tooLong: "That text is too long. Please shorten it.",
  },
};

const es: AssistantContent = {
  launcher: {
    open: "Abrir el asistente comercial de JGM",
    close: "Cerrar asistente",
    title: "Asistente JGM",
  },
  badge: "Asistente virtual de JGM",
  welcome:
    "¡Hola! Bienvenido a JGM. Puedo ayudarle a identificar el servicio que necesita y preparar su solicitud para el equipo. ¿En qué idioma prefiere conversar?",
  languagePrompt: "Elija el idioma de la conversación.",
  languages: { pt: "Português", en: "English", es: "Español" },
  needPrompt: "¿Qué desea realizar?",
  clarifyPrompt: "Sin problema. ¿Cuál de estas opciones se acerca más a lo que necesita?",
  otherPrompt: "Describa en pocas palabras el servicio que busca.",
  otherPlaceholder: "Ej.: reparación puntual, evaluación de fachada…",
  otherContinue: "Continuar",
  propertyPrompt: "¿A qué tipo de inmueble se refiere el proyecto?",
  locationPrompt: "¿En qué localidad se encuentra el inmueble o dónde se realizará el servicio?",
  locationPlaceholder: "Ciudad, localidad o código postal",
  locationHint:
    "La disponibilidad fuera del área habitual de intervención la confirmará el equipo.",
  locationContinue: "Continuar",
  descriptionPrompt:
    "¿Puede explicarnos, en pocas palabras, qué necesita? Por ejemplo: pintar un piso, renovar una cocina o evaluar una solución de construcción en LSF.",
  descriptionPlaceholder: "Breve descripción del trabajo",
  descriptionOptional: "Opcional — puede continuar sin describir",
  descriptionContinue: "Continuar",
  scopePrompt:
    "¿Tiene una idea de la dimensión aproximada? Por ejemplo: número de estancias, superficie o alcance de la intervención.",
  scopePlaceholder: "Ej.: 2 estancias, unos 40 m²…",
  scopeSkip: "Todavía no lo sé",
  scopeContinue: "Continuar",
  phasePrompt: "¿En qué fase se encuentra el proyecto?",
  timelinePrompt: "¿Cuándo le gustaría realizar el trabajo?",
  summaryIntro: "¡Gracias! Ya tenemos una idea inicial de su proyecto.",
  summary: {
    service: "Servicio",
    clarify: "Necesidad indicada",
    property: "Tipo de inmueble",
    location: "Ubicación",
    description: "Descripción",
    scope: "Dimensión aproximada",
    phase: "Fase del proyecto",
    timeline: "Plazo deseado",
  },
  summaryAsk:
    "¿Quiere enviar esta solicitud al equipo de JGM o prefiere hablar directamente con el responsable?",
  nextWhatsApp: "Preparar mensaje para WhatsApp",
  nextDirect: "Hablar directamente con el responsable",
  editAnswers: "Corregir respuestas",
  preClose:
    "Perfecto. Prepararemos su solicitud para que pueda explicar el proyecto al equipo sin tener que repetirlo todo.",
  previewLabel: "Mensaje para WhatsApp (aún no enviado)",
  openWhatsApp: "Abrir WhatsApp con este mensaje",
  whatsappNotConfigured: "El contacto de WhatsApp todavía no está configurado en este sitio.",
  whatsappOpenedNote:
    "WhatsApp se abrirá con el mensaje listo. Solo se enviará cuando lo confirme en la aplicación.",
  back: "Volver",
  restart: "Reiniciar conversación",
  changeLanguage: "Cambiar idioma",
  directContact: "Contactar por WhatsApp sin el cuestionario",
  labels: { otherService: "Otro servicio", unsure: "Todavía no estoy seguro" },
  options: {
    needExtra: [
      { id: "other", label: "Otro servicio" },
      { id: "unsure", label: "Todavía no estoy seguro" },
    ],
    clarify: [
      { id: "new_build", label: "Quiero construir o ampliar" },
      { id: "renovate", label: "Quiero reformar un espacio" },
      { id: "exterior", label: "Quiero tratar la fachada o el aislamiento" },
      { id: "paint_finish", label: "Quiero pintura o acabados" },
      { id: "still_unsure", label: "Todavía no lo sé — prefiero hablar con el equipo" },
    ],
    property: [
      { id: "home", label: "Vivienda" },
      { id: "commercial", label: "Espacio comercial o empresarial" },
      { id: "other", label: "Otro tipo de inmueble" },
      { id: "unknown", label: "Todavía no lo sé" },
    ],
    phase: [
      { id: "preparing", label: "Estoy preparando el proyecto" },
      { id: "evaluation", label: "Quiero avanzar con una evaluación" },
      { id: "defined", label: "Ya tengo una idea definida del trabajo" },
      { id: "question", label: "Solo quiero aclarar una duda" },
    ],
    timeline: [
      { id: "asap", label: "Lo antes posible" },
      { id: "months", label: "En los próximos meses" },
      { id: "planning", label: "Todavía estoy planificando" },
      { id: "undefined", label: "No tengo una fecha definida" },
    ],
  },
  needServiceOrder: NEED_ORDER,
  whatsapp: {
    intro: "¡Hola, equipo de JGM! Me gustaría pedir información sobre un proyecto.",
    outro: "¿Pueden ayudarme a entender los próximos pasos?\n\nGracias.",
    direct:
      "¡Hola! He llegado a través del sitio web de JGM y me gustaría hablar con el responsable sobre un proyecto.",
  },
  errors: {
    required: "Rellene este campo para continuar.",
    tooLong: "El texto es demasiado largo. Resúmalo, por favor.",
  },
};

export const ASSISTANT_CONTENT: Record<"pt" | "en" | "es", AssistantContent> = {
  pt,
  en,
  es,
};

export const ASSISTANT_SESSION_KEY = "jgm-assistant-v1";
export const MAX_SHORT_TEXT = 280;
export const MAX_DESCRIPTION = 600;
