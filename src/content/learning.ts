import { book } from "@/content/book";

export const libraryScope = {
  title: "ما ورد في مصادرنا",
  body: "ما ورد من أسماء الله وصفاته في الكتاب كثير جدًا. والكتاب يقول إنه يذكر طائفة على سبيل التمثيل لا الحصر. هذه النسخة تعرض اثنتي عشرة مادة مراجعة من هذا الباب، لا قائمة مغلقة.",
  excerpt:
    "والأسماء والصفات الثابتة بالكتاب والسنة كثيرة جدًّا دونت فيها الكتب والمصنفات وعد أهل العلم الكثير منها. ونذكر هنا طائفة منها على سبيل التمثيل لا الحصر.",
  page: 83,
  bookTitle: book.title,
};

export const featured = [
  {
    id: "how-known",
    question: "كيف نعرف أن هذا اسم من أسماء الله؟",
    summary:
      "بالكتاب والسنة فقط. الأسماء والصفات توقيفية، فلا نزيد فيها ولا ننقص.",
    slug: "tawqifi",
  },
  {
    id: "sami",
    question: "ماذا يعني أن الله هو السميع؟",
    summary:
      "الآية التي شرحها الكتاب تنفي المماثلة وتثبت السمع والبصر، وسمع الله ليس كسمع المخلوقين.",
    slug: "as-sami",
  },
  {
    id: "not-all",
    question: "هل الأمثلة هي كل الأسماء؟",
    summary:
      "لا. الكتاب يقول إن الثابت كثير جدًا، وإن ما يذكره طائفة على سبيل التمثيل لا الحصر.",
    slug: "tawhid-asma",
  },
] as const;

export const pathSteps = [
  { id: "iman", title: "ما معنى الإيمان بالله؟", href: "/topic/iman-billah" },
  { id: "tawhid-kinds", title: "تعرف على التوحيد", href: "/topic/iman-billah" },
  { id: "meaning", title: "ما معنى أسماء الله وصفاته؟", href: "/topic/tawhid-asma" },
  { id: "prove", title: "كيف تثبت أسماء الله؟", href: "/topic/tawqifi" },
  { id: "names", title: "أسماء نتعرف عليها", href: "/library?type=name" },
  { id: "attributes", title: "صفات نتعرف عليها", href: "/library?type=attribute" },
  { id: "rules", title: "قواعد مهمة", href: "/topic/husna" },
  { id: "common", title: "أسئلة شائعة", href: "/discover#sayings" },
  { id: "quiz", title: "اختبر فهمك", href: "/discover#quiz" },
] as const;

export const questionGroups = [
  {
    id: "names",
    title: "أسئلة عن أسماء الله",
    slugs: ["al-hayy", "al-qayyum", "ar-rahman-rahim", "al-alim"],
  },
  {
    id: "attributes",
    title: "أسئلة عن الصفات",
    slugs: ["as-sami", "al-ilm", "al-hayat", "al-qudra"],
  },
  {
    id: "concepts",
    title: "مفاهيم محتاجة توضيح",
    slugs: ["iman-billah", "tawhid-asma", "tawqifi", "husna"],
  },
] as const;

export const sayings = [
  {
    id: "musahhil",
    prompt: "هل «المسهّل» اسم من أسماء الله؟",
    correct: "لا" as const,
    explanation:
      "القاعدة في الكتاب: الأسماء والصفات توقيفية، فلا يُزاد فيها على الكتاب والسنة. ولفظ «المسهّل» لم يرد في مصادرنا المعتمدة اسمًا، لذلك لا نثبته هنا.",
    slug: "tawqifi",
  },
  {
    id: "hearing-like-ours",
    prompt: "هل إثبات السمع يعني أن سمع الله كسمعنا؟",
    correct: "لا" as const,
    explanation:
      "الكتاب يقول إن الآية تنفي المماثلة وتثبت السمع والبصر، وإن ما يثبت لله من السمع ليس كما يثبت للمخلوقين.",
    slug: "as-sami",
  },
  {
    id: "hayy-is-name",
    prompt: "هل «الحي» اسم أثبته الكتاب؟",
    correct: "نعم" as const,
    explanation:
      "نعم. قال الكتاب: الحي والقيوم قد دل عليهما الكتاب والسنة، ثم قال في قاعدة أخرى: الحي اسم من أسماء الله متضمن للحياة الكاملة.",
    slug: "al-hayy",
  },
];

export const quizzes = [
  {
    id: "tawqif-check",
    kind: "true-false" as const,
    prompt: "يجوز أن نسمي الله باسم لم يرد في الكتاب أو السنة إذا كان معناه حسنًا.",
    choices: [
      { id: "true", label: "صواب" },
      { id: "false", label: "خطأ" },
    ],
    correctChoiceId: "false",
    explanation:
      "الكتاب يقول: الأسماء والصفات توقيفية لا مجال للعقل فيها، فيجب الوقوف على ما جاء به الكتاب والسنة فلا يزاد فيها ولا ينقص.",
    slug: "tawqifi",
  },
  {
    id: "three-parts",
    kind: "choice" as const,
    prompt: "الإيمان بالله، كما افتتح الكتاب هذا الباب، يقوم على:",
    choices: [
      { id: "rububiyyah", label: "الربوبية فقط" },
      { id: "uluhiiyyah", label: "الألوهية فقط" },
      { id: "three", label: "الربوبية، والألوهية، والأسماء والصفات" },
      { id: "names", label: "الأسماء فقط" },
    ],
    correctChoiceId: "three",
    explanation:
      "نص الكتاب: الإيمان بالله هو الإيمان بوحدانيته في ربوبية، وألوهيته، وأسمائه وصفاته، فهذه أصول ثلاثة.",
    slug: "iman-billah",
  },
  {
    id: "alim-kind",
    kind: "choice" as const,
    prompt: "«العليم» في هذا الكتاب:",
    choices: [
      { id: "attribute", label: "صفة ذكرها ولم يسمها اسمًا" },
      { id: "name", label: "اسم متضمن للعلم الكامل" },
      { id: "missing", label: "لفظ لم يرد في النص" },
    ],
    correctChoiceId: "name",
    explanation:
      "قال الكتاب: العليم اسم من أسماء الله تعالى متضمن للعلم الكامل الذي لم يسبق بجهل ولا يلحقه نسيان. وصفة العلم مذكورة في موضع آخر.",
    slug: "al-alim",
  },
  {
    id: "hearing",
    kind: "true-false" as const,
    prompt: "إثبات السمع لله يعني أن سمعه كسمع المخلوقين.",
    choices: [
      { id: "true", label: "صواب" },
      { id: "false", label: "خطأ" },
    ],
    correctChoiceId: "false",
    explanation:
      "مقتضى الآية عند الكتاب: نفي المماثلة مع إثبات السمع والبصر، فما يثبت لله من السمع ليس كما يثبت للمخلوقين.",
    slug: "as-sami",
  },
];

export const intentCopy = {
  foundation: {
    label: "أبدأ من الأساس",
    hint: "ابدأ من معنى الإيمان بالله، ثم انتقل بهدوء.",
    href: "/topic/iman-billah",
    cta: "ابدأ من الأساس",
  },
  names: {
    label: "أفهم أسماء الله وصفاته",
    hint: "اسم واحد اليوم يكفي. الحي مثال واضح من الكتاب.",
    href: "/topic/al-hayy",
    cta: "اقرأ عن الحي",
  },
  review: {
    label: "أراجع معلوماتي",
    hint: "سؤال قصير، ثم المصدر. من غير سباق.",
    href: "/discover#quiz",
    cta: "راجع بسؤال",
  },
  deep: {
    label: "أتعمق في العقيدة",
    hint: "القاعدة أولًا: كيف يَثبت الاسم، ثم التفصيل.",
    href: "/topic/tawqifi",
    cta: "افتح القاعدة",
  },
} as const;
