// /lib/teamMembers.ts
export interface TeamMember {
  id: number;
  name: string;
  nickname: string;
  role: string;
  description: string;
  longDescription: string;
  image: string;
  discord: string;
  twitter: string;
  github: string;
  email: string;
  website?: string;
  joinDate: string;
  location?: string;
  education?: string;
  experience?: string;
  skills: string[];
  achievements: string[];
  projects: { name: string; description: string; link: string }[];
  hobbies?: string[];
  quote?: string;
  awards?: string[];
  featured?: boolean;
}

export const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: "Михаил",
    nickname: "Zorahm",
    role: "Технический администратор",
    description: "Отвечает за техническую поддержку сервера, настройку плагинов и обеспечение стабильной работы.",
    longDescription:
      "Михаил — технический администратор, который присоединился к проекту с самого начала. Он отвечает за настройку и поддержку серверной инфраструктуры, а также за интеграцию новых плагинов.",
    image: "/placeholder.svg?height=400&width=400",
    discord: "https://discord.gg/zorahm",
    twitter: "https://twitter.com/zorahm",
    github: "https://github.com/zorahm",
    email: "zorahm@foxiland.ru",
    website: "https://zorahm.github.io",
    joinDate: "Январь 2025",
    location: "Москва, Россия",
    education: "МТИ. Самоучка",
    experience: "5+ лет опыта в создании серверов",
    skills: ["Linux", "Docker", "MySQL", "Настройка плагинов"],
    achievements: ["Оптимизация серверной производительности"],
    projects: [{ name: "ServerOptimizer", description: "Набор скриптов", link: "#" }],
    hobbies: ["Программирование", "Игры"],
    quote: "Код — это искусство.",
    awards: ["Лучший администратор 2025"],
    featured: true,
  },
  {
    id: 2,
    name: "Herman",
    nickname: "Herman_Debush",
    role: "PR-менеджер",
    description: "Отвечает за продвижение сервера и взаимодействие с сообществом.",
    longDescription: "Станислав — специалист по связям с общественностью, который занимается продвижением сервера.",
    image: "/placeholder.svg?height=400&width=400",
    discord: "https://discord.gg/herman_debush",
    twitter: "https://twitter.com/herman_debush",
    github: "",
    email: "stanislav@foxiland.ru",
    joinDate: "Февраль 2025",
    location: "Москва, Россия",
    education: "МТИ",
    experience: null,
    skills: ["SMM", "Копирайтинг"],
    achievements: ["Увеличение аудитории"],
    projects: [{ name: "MTI-World Social", description: "Стратегия продвижения", link: "#" }],
    hobbies: ["Фотография"],
  },
  {
    id: 3,
    name: "Иван",
    nickname: "crazymilkshake",
    role: "Помощник тех. админа",
    description: "Помогает в настройке и поддержке серверной инфраструктуры, а также в решении технических проблем.",
    longDescription:
      "Иван — технический специалист, который поддерживает работу сервера, помогая с настройкой плагинов и решением возникающих проблем. Он также занимается мониторингом серверной нагрузки и обеспечивает стабильность работы.",
    image: "/placeholder.svg?height=400&width=400",
    discord: "#",
    twitter: "#",
    github: "#",
    email: "ivan@foxiland.ru",
    website: "",
    joinDate: "Январь 2025",
    location: "Москва, Россия",
    education: null,
    experience: "3 года",
    skills: ["Linux", "MySQL", "Настройка плагинов", "Мониторинг"],
    achievements: ["Оптимизация серверной нагрузки", "Внедрение системы мониторинга"],
    projects: [{ name: "ServerMonitor", description: "Система мониторинга серверной нагрузки", link: "#" }],
  },
  {
    id: 4,
    name: "Максим",
    nickname: "MIRUOme",
    role: "Event-менеджмент",
    description: "Организует и проводит внутриигровые мероприятия, конкурсы и события для сообщества.",
    longDescription:
      "Максим — креативный организатор, который отвечает за проведение мероприятий на сервере. Он разрабатывает концепции событий, координирует их проведение и анализирует результаты.",
    image: "/placeholder.svg?height=400&width=400",
    discord: "#",
    twitter: "#",
    github: "#",
    email: "maxim@foxiland.ru",
    website: "",
    joinDate: "Январь 2025",
    location: "Магнитогорск, Россия",
    education: "?",
    experience: "3 года",
    skills: ["Event-менеджмент", "Планирование", "Коммуникация", "Аналитика"],
    achievements: ["Организация 3+ успешных мероприятий", "Увеличение активности игроков на 25%"],
    projects: [{ name: "SkyPVP", description: "Проект СкайПВП", link: "#" }],
  },
  {
    id: 5,
    name: "Просто Вирус",
    nickname: "ViRuS",
    role: "Поддержка игроков",
    description: "Помогает игрокам решать технические проблемы и отвечает на вопросы в чате и на форуме.",
    longDescription:
      "ViRuS — специалист по поддержке игроков, который отвечает за решение технических проблем и консультирование игроков. Он также занимается созданием справочных материалов и обучением новых модераторов.",
    image: "/placeholder.svg?height=400&width=400",
    discord: "#",
    twitter: "#",
    github: "#",
    email: "ViRuS@foxiland.ru",
    website: "",
    joinDate: "Февраль 2025",
    location: "Москва, Россия",
    education: null,
    experience: null,
    skills: ["Техническая поддержка", "Документация", "Коммуникация", "Minecraft troubleshooting"],
    achievements: ["Создание базы знаний для игроков", "Сокращение времени ответа на запросы на 40%"],
    projects: [{ name: "MTI-World Help Center", description: "Онлайн-справочник для игроков", link: "#" }],
  },
];