export interface NewsItem {
  id: string;
  slug: string;
  title: string;
  image: string; // Путь к изображению (например, "/images/news1.jpg")
  category: string;
  date: string; // Формат: "DD.MM.YYYY"
  author: string;
  authorRole: string; // Например, "Администратор"
  tags: string[];
  excerpt: string; // Краткое описание
  content: string; // HTML-контент новости
  featured: boolean; // Для выделенной новости
}

export const newsItems: NewsItem[] = [
  {
    id: "1",
    slug: "moderator-team-recruitment",
    title: "Набор в модераторскую команду",
    image: "/screens/sc1.png",
    category: "Обновления",
    date: "15.03.2025",
    author: "Admin",
    authorRole: "Администратор",
    tags: ["модерация", "набор", "сообщество"],
    excerpt: "Мы открываем набор в команду модераторов MTI-World. Присоединяйтесь к нам!",
    content: `
      <p>Мы рады объявить о новом наборе в команду модераторов нашего сервера MTI-World! Если вы хотите стать частью нашей команды и помогать поддерживать порядок, то это ваш шанс.</p>
      <h2>Требования:</h2>
      <ul>
        <li>Возраст от 16 лет</li>
        <li>Активность на сервере не менее 2 месяцев</li>
        <li>Знание правил сервера</li>
      </ul>
      <p>Подать заявку можно в нашем Discord-сообществе. Удачи!</p>
    `,
    featured: true,
  },
  {
    id: "2",
    slug: "new-event-announcement",
    title: "Анонс нового ивента: Весенний фестиваль",
    image: "/screens/sc2.png",
    category: "Ивенты",
    date: "10.03.2025",
    author: "EventMaster",
    authorRole: "Организатор мероприятий",
    tags: ["ивент", "фестиваль", "весна"],
    excerpt: "Присоединяйтесь к нашему Весеннему фестивалю с множеством наград!",
    content: `
      <p>Друзья, мы рады анонсировать Весенний фестиваль на сервере MTI-World! Вас ждут увлекательные квесты, конкурсы и ценные призы.</p>
      <h2>Что вас ждет:</h2>
      <ul>
        <li>Квесты на ловкость и смекалку</li>
        <li>Конкурс на лучший весенний скин</li>
        <li>Награды: редкие предметы и титулы</li>
      </ul>
      <p>Ивент пройдет с 20 по 25 марта. Не пропустите!</p>
    `,
    featured: false,
  },
  {
    id: "3",
    slug: "server-update-1-2-3",
    title: "Обновление сервера до версии 1.2.3",
    image: "/screens/sc3.png",
    category: "Обновления",
    date: "05.03.2025",
    author: "TechLead",
    authorRole: "Технический администратор",
    tags: ["обновление", "патч", "исправления"],
    excerpt: "Новое обновление 1.2.3 с улучшениями и исправлениями багов.",
    content: `
      <p>Мы выпустили обновление сервера до версии 1.2.3. В этом патче мы сосредоточились на улучшении производительности и исправлении багов.</p>
      <h2>Основные изменения:</h2>
      <ul>
        <li>Исправлен баг с исчезновением предметов</li>
        <li>Улучшена производительность в зонах с высоким онлайном</li>
        <li>Добавлены новые команды для модераторов</li>
      </ul>
      <p>Спасибо за вашу поддержку! Если вы заметите баги, сообщите нам в Discord.</p>
    `,
    featured: false,
  },
  {
    id: "4",
    slug: "community-tournament",
    title: "Турнир сообщества: Битва за титул чемпиона",
    image: "/screens/sc4.png",
    category: "Ивенты",
    date: "01.03.2025",
    author: "EventMaster",
    authorRole: "Организатор мероприятий",
    tags: ["турнир", "соревнование", "pvp"],
    excerpt: "Участвуйте в нашем первом турнире сообщества и станьте чемпионом!",
    content: `
      <p>Пришло время сразиться за титул чемпиона MTI-World! Мы проводим первый турнир сообщества, где игроки смогут показать свои навыки в PvP.</p>
      <h2>Детали турнира:</h2>
      <ul>
        <li>Дата: 10 марта 2025</li>
        <li>Формат: 1v1 и 2v2</li>
        <li>Призы: эксклюзивные титулы и ресурсы</li>
      </ul>
      <p>Регистрация уже открыта в нашем Discord. Не упустите шанс!</p>
    `,
    featured: false,
  },
];