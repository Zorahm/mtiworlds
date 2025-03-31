"use client";

import React, { useState } from 'react';
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronRight, ChevronLeft, Calendar, User, Search } from "lucide-react";
import { newsItems } from "@/lib/news-data";
import axios from "axios";
import { toast } from "@/components/ui/use-toast";

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  hover: { scale: 1.03, transition: { duration: 0.3 } },
};

export default function NewsPage() {
  const featuredNews = newsItems.find((item) => item.featured) || newsItems[0];
  const [selectedCategory, setSelectedCategory] = useState("Все новости");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const itemsPerPage = 6;

  const filteredNews = newsItems
    .filter((item) => item.id !== featuredNews.id)
    .filter((item) => selectedCategory === "Все новости" || item.category === selectedCategory)
    .filter((item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    );

  const totalPages = Math.ceil(filteredNews.length / itemsPerPage);
  const paginatedNews = filteredNews.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const categories = ["Все новости", ...Array.from(new Set(newsItems.map((item) => item.category)))];

  const handleSubscribe = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await axios.post('/api/subscribe', { email });
      toast({
        title: "Успех",
        description: "Вы успешно подписались на новости!",
      });
      setEmail("");
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось подписаться. Попробуйте снова.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background z-10" />
          <div className="relative h-[300px] w-full overflow-hidden">
            <Image
              src="/backgrounds/bg-2.png"
              alt="News"
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
          </div>
          <div className="container relative z-20 -mt-20 flex flex-col items-center text-center">
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl"
            >
              Новости MTI-World
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mt-4 max-w-[700px] text-lg text-muted-foreground md:text-xl"
            >
              Будьте в курсе последних обновлений, событий и анонсов
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-6 w-full max-w-md relative"
            >
              <input
                type="text"
                placeholder="Поиск новостей..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full h-10 rounded-md border border-input bg-background pl-10 pr-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            </motion.div>
          </div>
        </section>

        {/* News Categories */}
        <section className="container py-8">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                className="rounded-full"
                onClick={() => {
                  setSelectedCategory(category);
                  setCurrentPage(1);
                }}
              >
                {category}
              </Button>
            ))}
          </div>
        </section>

        {/* Featured News */}
        <section className="container py-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="overflow-hidden shadow-lg">
              <div className="grid md:grid-cols-2">
                <div className="relative h-[300px] md:h-auto">
                  <Image
                    src={featuredNews.image || "/placeholder.svg"}
                    alt={featuredNews.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <div className="p-6 flex flex-col justify-center">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                    <span className="bg-primary/10 text-primary px-2 py-1 rounded-full text-xs font-medium">
                      {featuredNews.category}
                    </span>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      <span>{featuredNews.date}</span>
                    </div>
                    <div className="flex items-center">
                      <User className="h-4 w-4 mr-1" />
                      <span>{featuredNews.author}</span>
                    </div>
                  </div>
                  <h2 className="text-2xl font-bold mb-4">{featuredNews.title}</h2>
                  <p className="text-muted-foreground mb-6">{featuredNews.excerpt}</p>
                  <Button className="w-fit" asChild>
                    <Link href={`/news/${featuredNews.slug}`}>
                      Читать полностью
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        </section>

        {/* News Grid */}
        <section className="container py-12">
          {paginatedNews.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginatedNews.map((item, index) => (
                <motion.div
                  key={item.id}
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  whileHover="hover"
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="overflow-hidden flex flex-col shadow-md">
                    <div className="relative h-[200px]">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                      <div className="absolute top-2 left-2 bg-primary/90 text-primary-foreground px-2 py-1 rounded text-xs font-medium">
                        {item.category}
                      </div>
                    </div>
                    <CardHeader>
                      <CardTitle>{item.title}</CardTitle>
                      <CardDescription className="flex items-center gap-4 text-xs">
                        <div className="flex items-center">
                          <Calendar className="h-3 w-3 mr-1" />
                          <span>{item.date}</span>
                        </div>
                        <div className="flex items-center">
                          <User className="h-3 w-3 mr-1" />
                          <span>{item.author}</span>
                        </div>
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <p className="text-muted-foreground">{item.excerpt}</p>
                    </CardContent>
                    <CardFooter>
                      <Button variant="ghost" size="sm" className="ml-auto" asChild>
                        <Link href={`/news/${item.slug}`}>
                          Читать полностью
                          <ChevronRight className="ml-1 h-4 w-4" />
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </div>
          ) : (
            <p className="text-center text-muted-foreground">
              Новостей по запросу "{searchQuery}" в категории "{selectedCategory}" не найдено.
            </p>
          )}
        </section>

        {/* Pagination */}
        {totalPages > 1 && (
          <section className="container pb-12 flex justify-center">
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="icon"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => prev - 1)}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
                <Button
                  key={page}
                  variant={currentPage === page ? "default" : "outline"}
                  size="icon"
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </Button>
              ))}
              <Button
                variant="outline"
                size="icon"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((prev) => prev + 1)}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </section>
        )}

        {/* Newsletter */}
        <section className="bg-muted py-16">
          <div className="container flex flex-col items-center text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">Подпишитесь на новости</h2>
            <p className="max-w-[600px] text-muted-foreground mb-8">
              Получайте последние новости и обновления сервера MTI-World прямо на вашу электронную почту.
            </p>
            <form onSubmit={handleSubscribe} className="flex w-full max-w-md gap-2">
              <input
                type="email"
                placeholder="Ваш email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                required
              />
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Отправка..." : "Подписаться"}
              </Button>
            </form>
          </div>
        </section>
      </main>
    </div>
  );
}