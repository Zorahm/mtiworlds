// lib/store-data.ts
export const storeItems = {
  ranks: [
    {
      id: "vip",
      name: "VIP",
      price: "200 ₽",
      rating: 3,
      features: [
        "Префикс [VIP] в чате",
        "5 точек дома",
        "Доступ к /fly в мирном режиме",
        "Цветной чат",
        "Доступ к VIP-серверам",
      ],
    },
    {
      id: "mvp",
      name: "MVP",
      price: "500 ₽",
      rating: 5,
      popular: true,
      features: [
        "Все преимущества VIP",
        "Префикс [MVP] в чате",
        "10 точек дома",
        "Доступ к /fly везде",
        "Доступ к /nick",
        "Приоритетный вход на сервер",
      ],
    },
  ],
  cosmetics: [
    {
      id: "particles",
      name: "Эффекты частиц",
      price: "150 ₽",
      description: "Уникальные эффекты частиц вокруг вашего персонажа",
      image: "/placeholder.svg?height=300&width=300",
    },
    {
      id: "hats",
      name: "Коллекция шляп",
      price: "200 ₽",
      description: "50+ уникальных шляп для вашего персонажа",
      image: "/placeholder.svg?height=300&width=300",
    },
    {
      id: "pets",
      name: "Питомцы",
      price: "300 ₽",
      description: "Декоративные питомцы, которые следуют за вами",
      image: "/placeholder.svg?height=300&width=300",
    },
    {
      id: "emotes",
      name: "Эмоции",
      price: "150 ₽",
      description: "Анимированные эмоции для общения с другими игроками",
      image: "/placeholder.svg?height=300&width=300",
    },
  ],
};