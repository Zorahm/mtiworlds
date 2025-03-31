"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ChevronRight, Users, Zap, Shield, Award, Star, Smile, Globe, Gamepad } from "lucide-react";

// Импортируем изображения
import bg1 from "@/app/img/backgrounds/bg-1.png";
import bg2 from "@/app/img/backgrounds/bg-2.png";
import bg3 from "@/app/img/backgrounds/bg-3.png";

// Варианты анимации
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const staggerChildren = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemFade = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0 },
};

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-[500px] w-full overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-gradient-to-b from-black/60 to-background z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        />
        <Image
          src={bg2}
          alt="About Us"
          fill
          className="object-cover"
          priority
          style={{ transform: "translateY(-10%)", transition: "transform 0.2s ease-out" }}
        />
        <div className="container relative z-20 flex flex-col items-center justify-center h-full text-center text-white">
          <motion.h1
            className="text-5xl font-extrabold tracking-tight sm:text-6xl md:text-7xl text-shadow-lg"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Добро пожаловать в MTI-World
          </motion.h1>
          <motion.p
            className="mt-6 max-w-[800px] text-xl md:text-2xl text-shadow"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Исследуйте уникальный мир, стройте, создавайте и находите новых друзей!
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-8 flex gap-4"
          >
            <Button size="lg" asChild>
              <Link href="#how-to-join">
                Присоединиться
                <ChevronRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="https://discord.gg/mtiworld" target="_blank">
                Discord
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Our Story */}
      <section className="container py-16 md:py-32">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20 items-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-4xl font-bold tracking-tight sm:text-5xl mb-8">Наша история</h2>
            <div className="space-y-6 text-muted-foreground">
              <p className="text-lg">
                MTI-World был основан в 2025 году группой энтузиастов Minecraft, которые хотели создать сервер для
                студентов колледжа МТИ.
              </p>
              <p className="text-xl italic text-primary font-semibold">
                "Мы начали с маленького сервера, но с большими мечтами."
              </p>
              <p className="text-lg">
                Сегодня мы — небольшое, но растущее сообщество, стремящееся быть удобным и интересным местом для игры.
                Наша цель — создать дружелюбную и творческую среду для всех.
              </p>
            </div>
          </motion.div>
          <motion.div
            className="relative h-[450px] rounded-xl overflow-hidden shadow-2xl"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <Image src={bg2} alt="Server History" fill className="object-cover" />
          </motion.div>
        </div>
      </section>

      <Separator />

      {/* Our Mission */}
      <section className="container py-16 md:py-32">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20 items-center">
          <motion.div
            className="relative h-[450px] rounded-xl overflow-hidden shadow-2xl order-last lg:order-first"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <Image src={bg1} alt="Our Mission" fill className="object-cover" />
          </motion.div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerChildren}
          >
            <h2 className="text-4xl font-bold tracking-tight sm:text-5xl mb-8">Наша миссия</h2>
            <div className="space-y-6 text-muted-foreground">
              <p className="text-lg">
                Мы стремимся создать лучший Minecraft-сервер, где игроки могут раскрыть свой творческий потенциал,
                найти новых друзей и получить незабываемые впечатления.
              </p>
              <motion.ul className="list-none pl-0 space-y-6" variants={staggerChildren}>
                <motion.li variants={itemFade} className="flex items-center p-6 bg-muted rounded-lg hover:bg-primary/10 transition-colors">
                  <Users className="h-8 w-8 mr-4 text-primary" />
                  <span className="text-lg">Сообщество на первом месте — мы ценим каждого игрока</span>
                </motion.li>
                <motion.li variants={itemFade} className="flex items-center p-6 bg-muted rounded-lg hover:bg-primary/10 transition-colors">
                  <Zap className="h-8 w-8 mr-4 text-primary" />
                  <span className="text-lg">Инновации — улучшаем игровой опыт каждый день</span>
                </motion.li>
                <motion.li variants={itemFade} className="flex items-center p-6 bg-muted rounded-lg hover:bg-primary/10 transition-colors">
                  <Shield className="h-8 w-8 mr-4 text-primary" />
                  <span className="text-lg">Безопасность — дружелюбная среда для всех</span>
                </motion.li>
                <motion.li variants={itemFade} className="flex items-center p-6 bg-muted rounded-lg hover:bg-primary/10 transition-colors">
                  <Award className="h-8 w-8 mr-4 text-primary" />
                  <span className="text-lg">Качество — стремимся к лучшему во всём</span>
                </motion.li>
              </motion.ul>
            </div>
          </motion.div>
        </div>
      </section>

      <Separator />

      {/* Features Section */}
      <section className="container py-16 md:py-32">
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
        >
          <h2 className="text-4xl font-bold tracking-tight sm:text-5xl mb-4">Почему MTI-World?</h2>
          <p className="text-lg text-muted-foreground">Уникальные возможности для каждого игрока</p>
        </motion.div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: <Star className="h-10 w-10 text-primary" />, title: "Уникальные миры", description: "Исследуйте уникальные миры, созданные нашим сообществом." },
            { icon: <Smile className="h-10 w-10 text-primary" />, title: "Дружелюбное сообщество", description: "Найдите новых друзей и наслаждайтесь игрой вместе." },
            { icon: <Globe className="h-10 w-10 text-primary" />, title: "Регулярные обновления", description: "Мы постоянно добавляем новый контент и улучшаем сервер." },
            { icon: <Gamepad className="h-10 w-10 text-primary" />, title: "Мини-игры", description: "Участвуйте в захватывающих мини-играх и соревнованиях." },
          ].map((feature, index) => (
            <motion.div
              key={index}
              className="p-8 bg-muted rounded-xl hover:bg-primary/10 transition-colors"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={itemFade}
            >
              <div className="flex flex-col items-center text-center">
                <div className="mb-6">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-muted py-24">
        <motion.div
          className="container flex flex-col items-center text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
        >
          <h2 className="text-4xl font-bold tracking-tight sm:text-5xl mb-6">Присоединяйтесь к нам сегодня!</h2>
          <p className="max-w-[800px] text-lg text-muted-foreground mb-8">
            Станьте частью нашего дружного сообщества и начните своё приключение в MTI-World.
          </p>
          <div className="flex gap-4">
            <Button size="lg" asChild>
              <Link href="/#how-to-join">
                Как присоединиться
                <ChevronRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="https://discord.gg/mtiworld" target="_blank">
                Discord
              </Link>
            </Button>
          </div>
        </motion.div>
      </section>
    </div>
  );
}