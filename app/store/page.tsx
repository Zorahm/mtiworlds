// app/store/page.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Star, ShoppingCart, Shield } from "lucide-react";
import { storeItems } from "@/lib/store-data";
import PurchaseDialog from "./PurchaseDialog";

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  hover: { scale: 1.05, transition: { duration: 0.3 } },
};

export default function StorePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background z-10" />
          <div className="relative h-[300px] w-full overflow-hidden">
            <Image src="/placeholder.svg?height=600&width=1920" alt="Store" fill className="object-cover" priority />
          </div>
          <motion.div
            className="container relative z-20 -mt-20 flex flex-col items-center text-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">Магазин сервера</h1>
            <p className="mt-4 max-w-[700px] text-lg text-muted-foreground md:text-xl">
              Поддержите развитие сервера и получите уникальные привилегии и предметы
            </p>
          </motion.div>
        </section>

        {/* Store Tabs */}
        <section className="container py-12">
          <Tabs defaultValue="ranks" className="w-full">
            <TabsList className="grid w-full grid-cols-1 md:grid-cols-2 h-auto">
              <TabsTrigger value="ranks" className="py-3">Ранги</TabsTrigger>
              <TabsTrigger value="cosmetics" className="py-3">Косметика</TabsTrigger>
            </TabsList>

            {/* Ranks Tab */}
            <TabsContent value="ranks" className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                {storeItems.ranks.map((rank, index) => (
                  <motion.div
                    key={rank.id}
                    variants={cardVariants}
                    initial="hidden"
                    animate="visible"
                    whileHover="hover"
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className={`border-2 ${rank.popular ? "border-primary" : "border-muted"} relative`}>
                      {rank.popular && (
                        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-bold">
                          Популярный выбор
                        </div>
                      )}
                      <CardHeader className="text-center pb-2">
                        <CardTitle className="text-xl">{rank.name}</CardTitle>
                        <div className="flex justify-center">
                          {Array.from({ length: 5 }, (_, i) => (
                            <Star
                              key={i}
                              className={`h-5 w-5 ${i < rank.rating ? "fill-primary text-primary" : "text-muted-foreground"}`}
                            />
                          ))}
                        </div>
                      </CardHeader>
                      <CardContent className="text-center">
                        <div className="text-4xl font-bold mb-4">{rank.price}</div>
                        <ul className="space-y-2 text-left mb-6">
                          {rank.features.map((feature, featureIndex) => (
                            <li key={featureIndex} className="flex items-center">
                              <Shield className="h-4 w-4 mr-2 text-green-500" />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                      <CardFooter>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button className="w-full">
                              <ShoppingCart className="h-4 w-4 mr-2" />
                              Купить
                            </Button>
                          </DialogTrigger>
                          <PurchaseDialog product={rank} />
                        </Dialog>
                      </CardFooter>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            {/* Cosmetics Tab */}
            <TabsContent value="cosmetics" className="pt-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                {storeItems.cosmetics.map((cosmetic, index) => (
                  <motion.div
                    key={cosmetic.id}
                    variants={cardVariants}
                    initial="hidden"
                    animate="visible"
                    whileHover="hover"
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card>
                      <div className="relative h-[150px]">
                        <Image src={cosmetic.image} alt={cosmetic.name} fill className="object-contain p-4" />
                      </div>
                      <CardHeader className="pb-2">
                        <CardTitle>{cosmetic.name}</CardTitle>
                        <p className="text-sm text-muted-foreground">{cosmetic.description}</p>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">{cosmetic.price}</div>
                      </CardContent>
                      <CardFooter>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button className="w-full">
                              <ShoppingCart className="h-4 w-4 mr-2" />
                              Купить
                            </Button>
                          </DialogTrigger>
                          <PurchaseDialog product={cosmetic} />
                        </Dialog>
                      </CardFooter>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </section>

        {/* FAQ */}
        <section className="bg-muted py-16">
          <div className="container">
            <motion.div
              className="flex flex-col items-center text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Часто задаваемые вопросы</h2>
              <p className="mt-4 max-w-[700px] text-lg text-muted-foreground">
                Ответы на популярные вопросы о нашем магазине
              </p>
            </motion.div>

            <div className="max-w-3xl mx-auto space-y-4">
              {[
                {
                  question: "Как долго действуют привилегии?",
                  answer:
                    "Если не указано иное, все привилегии действуют бессрочно. Некоторые специальные предложения могут иметь ограниченный срок действия, который будет явно указан в описании.",
                },
                {
                  question: "Как быстро я получу купленные предметы?",
                  answer:
                    "Все покупки обрабатываются автоматически. Вы получите свои предметы и привилегии сразу после успешной оплаты. В редких случаях может потребоваться до 15 минут.",
                },
                {
                  question: "Могу ли я получить возврат средств?",
                  answer:
                    "Мы не предоставляем возврат средств за цифровые товары после их активации. Если у вас возникли проблемы с покупкой, пожалуйста, свяжитесь с нашей службой поддержки.",
                },
                {
                  question: "Как связаться с поддержкой по вопросам покупок?",
                  answer:
                    "Вы можете связаться с нашей службой поддержки через Discord или по электронной почте support@mti-world.com. Мы отвечаем на все запросы в течение 24 часов.",
                },
              ].map((faq, index) => (
                <motion.div
                  key={index}
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: index * 0.1 }}
                >
                  <Card>
                    <CardHeader>
                      <CardTitle>{faq.question}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p>{faq.answer}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}