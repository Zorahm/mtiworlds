"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  User,
  Tag,
  ArrowLeft,
  ChevronRight,
} from "lucide-react";

const cardVariants = {
  hover: { scale: 1.02, transition: { duration: 0.3 } },
};

export default function NewsClient({
  news,
  prevNews,
  nextNews,
  relatedNews,
  uniqueCategories,
  uniqueTags,
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background z-10" />
          <div className="relative h-[400px] w-full overflow-hidden">
            <Image
              src={news.image || "/placeholder.jpg"} // Используем безопасное значение
              alt={news.title}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          <motion.div
            className="container relative z-20 -mt-32 flex flex-col items-center text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Badge className="mb-4 bg-primary/10 text-primary">{news.category}</Badge>
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl max-w-[900px]">
              {news.title}
            </h1>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
              <div className="flex items-center" aria-label="Дата публикации">
                <Calendar className="mr-2 h-4 w-4" />
                <span>{news.date}</span>
              </div>
              <div className="flex items-center" aria-label="Автор">
                <User className="mr-2 h-4 w-4" />
                <span>{news.author}</span>
              </div>
              <div className="flex items-center" aria-label="Теги">
                <Tag className="mr-2 h-4 w-4" />
                <div className="flex gap-2">
                  {news.tags.map((tag) => (
                    <span key={tag} className="text-primary">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Back Button */}
        <section className="container py-6">
          <Button variant="outline" size="sm" asChild>
            <Link href="/news" className="flex items-center">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Назад к новостям
            </Link>
          </Button>
        </section>

        {/* News Content */}
        <section className="container py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <motion.div className="lg:col-span-2" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <div className="prose prose-lg max-w-none dark:prose-invert">
                <div dangerouslySetInnerHTML={{ __html: news.content }} />
              </div>

              {/* Author Info */}
              <div className="mt-10 flex items-center border-t border-b py-6">
                <div className="relative h-16 w-16 rounded-full overflow-hidden">
                  <Image
                    src="/placeholder.jpg"
                    alt={news.author}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <div className="ml-4">
                  <h3 className="font-medium">{news.author}</h3>
                  <p className="text-sm text-muted-foreground">{news.authorRole}</p>
                </div>
              </div>

              {/* Navigation between news */}
              <div className="mt-10 flex justify-between">
                {prevNews ? (
                  <Button variant="outline" asChild>
                    <Link href={`/news/${prevNews.slug}`} className="flex items-center">
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      {prevNews.title.length > 30 ? prevNews.title.substring(0, 30) + "..." : prevNews.title}
                    </Link>
                  </Button>
                ) : (
                  <div></div>
                )}

                {nextNews ? (
                  <Button variant="outline" asChild>
                    <Link href={`/news/${nextNews.slug}`} className="flex items-center">
                      {nextNews.title.length > 30 ? nextNews.title.substring(0, 30) + "..." : nextNews.title}
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                ) : (
                  <div></div>
                )}
              </div>
            </motion.div>

            {/* Sidebar */}
            <motion.div className="lg:col-span-1" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
              {/* Related News */}
              <div className="mb-8">
                <h3 className="text-xl font-bold mb-4">Похожие новости</h3>
                <div className="space-y-4">
                  {relatedNews.length > 0 ? (
                    relatedNews.map((item) => (
                      <motion.div
                        key={item.id}
                        className="flex gap-4"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        whileHover="hover"
                        variants={cardVariants}
                      >
                        <div className="relative h-16 w-24 flex-shrink-0 rounded-md overflow-hidden">
                          <Image
                            src={item.image || "/placeholder.jpg"}
                            alt={item.title}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 50vw"
                          />
                        </div>
                        <div>
                          <h4 className="font-medium line-clamp-2">
                            <Link href={`/news/${item.slug}`} className="hover:underline text-primary">
                              {item.title}
                            </Link>
                          </h4>
                          <p className="text-xs text-muted-foreground mt-1">{item.date}</p>
                        </div>
                      </motion.div>
                    ))
                  ) : (
                    <p className="text-muted-foreground">Похожих новостей нет.</p>
                  )}
                </div>
              </div>

              {/* Categories */}
              <div className="mb-8">
                <h3 className="text-xl font-bold mb-4">Категории</h3>
                <div className="flex flex-wrap gap-2">
                  {uniqueCategories.map((category) => (
                    <Badge
                      key={category}
                      variant="outline"
                      className="px-3 py-1 hover:bg-accent cursor-pointer transition-colors"
                      onClick={() => {
                        window.location.href = `/news?category=${category}`;
                      }}
                    >
                      {category}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Tags */}
              <div>
                <h3 className="text-xl font-bold mb-4">Теги</h3>
                <div className="flex flex-wrap gap-2">
                  {uniqueTags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="px-3 py-1 hover:bg-accent cursor-pointer transition-colors"
                      onClick={() => {
                        window.location.href = `/news?tag=${tag}`;
                      }}
                    >
                      #{tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  );
}