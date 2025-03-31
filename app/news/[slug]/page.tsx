import { newsItems } from "@/lib/news-data";
import { notFound } from "next/navigation";
import NewsClient from "./NewsClient";

// Генерация статических параметров
export function generateStaticParams() {
  return newsItems.map((news) => ({
    slug: news.slug,
  }));
}

// Асинхронный серверный компонент
export default async function NewsPage({ params }: { params: Promise<{ slug: string }> }) {
  // Дожидаемся разрешения params
  const resolvedParams = await params;
  const slug = resolvedParams.slug;

  const news = newsItems.find((item) => item.slug === slug);

  if (!news) {
    notFound();
  }

  // Дебаг для проверки структуры (временное)
  console.log("News object:", news);

  // Находим следующую и предыдущую новость для навигации
  const currentIndex = newsItems.findIndex((item) => item.slug === slug);
  const prevNews = currentIndex < newsItems.length - 1 ? newsItems[currentIndex + 1] : null;
  const nextNews = currentIndex > 0 ? newsItems[currentIndex - 1] : null;

  // Находим похожие новости (по категории или тегам)
  const relatedNews = newsItems
    .filter(
      (item) =>
        item.id !== news.id && (item.category === news.category || item.tags.some((tag) => news.tags.includes(tag))),
    )
    .slice(0, 3);

  // Уникальные категории и теги для боковой панели
  const uniqueCategories = Array.from(new Set(newsItems.map((item) => item.category)));
  const uniqueTags = Array.from(new Set(newsItems.flatMap((item) => item.tags)));

  // Проверка на существование и валидность image
  const safeImage = news.image && typeof news.image === "string" ? news.image : "/placeholder.jpg";

  return (
    <NewsClient
      news={{
        ...news,
        image: safeImage,
      }}
      prevNews={prevNews}
      nextNews={nextNews}
      relatedNews={relatedNews}
      uniqueCategories={uniqueCategories}
      uniqueTags={uniqueTags}
    />
  );
}