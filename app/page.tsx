"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { toast } from "@/components/ui/use-toast"
import { Copy, Users, Server, Clock, DiscIcon as Discord, ArrowRight, Sparkles, Shield, Gamepad } from "lucide-react"
import { serverFeatures, serverRules } from "@/lib/server-data"

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

export default function MinecraftServer() {
  const [copied, setCopied] = useState(false)
  const [serverStatus, setServerStatus] = useState({ online: false, players: 0 })
  const [serverStats, setServerStats] = useState({ version: 'Загрузка...', uptime: 'Загрузка...' }); // Добавляем состояние для статистики
  const serverIP = "mc.mtiworld.ru:25638"

  // Функция копирования IP с проверкой на клиентскую среду
  const copyServerIP = () => {
    if (typeof window === "undefined" || !navigator.clipboard) {
      toast({
        title: "Ошибка",
        description: "Копирование недоступно в этой среде.",
        variant: "destructive",
      })
      return
    }

    navigator.clipboard
      .writeText(serverIP)
      .then(() => {
        setCopied(true)
        toast({
          title: "IP скопирован!",
          description: `${serverIP} готов к использованию.`,
        })
        setTimeout(() => setCopied(false), 2000)
      })
      .catch((err) => {
        console.error("Ошибка копирования:", err)
        toast({
          title: "Ошибка",
          description: "Не удалось скопировать IP.",
          variant: "destructive",
        })
      })
  }

  // Проверка статуса сервера
  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const response = await fetch(`https://api.mcsrvstat.us/3/${serverIP}`)
        const data = await response.json()
        setServerStatus({
          online: data.online,
          players: data.players?.online || 0,
        })
        setServerStats({
          version: data.protocol?.name || 'Неизвестно', // Добавляем версию
          uptime: '99%', // Предположим, что uptime статический
        });
      } catch (error) {
        console.error("Ошибка получения статуса:", error)
        setServerStatus({ online: false, players: 0 })
      }
    }
    fetchStatus()

    const intervalId = setInterval(fetchStatus, 60000); // Обновление каждую минуту

    return () => clearInterval(intervalId); // Очистка интервала при размонтировании компонента
  }, [])

  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section id="home" className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background z-10" />
        <div className="relative h-[90vh] w-full overflow-hidden"></div>
        <div className="container absolute inset-0 z-20 flex flex-col items-center justify-center text-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            <Badge className="mb-4 px-4 py-1.5 text-sm font-medium bg-primary/20 text-primary border-primary/30">
              Версия 1.21.4
            </Badge>
            <h1 className="mb-6 gradient-text">
              Добро пожаловать в мир <br />
              <span className="text-5xl sm:text-6xl md:text-7xl">MTI-World</span>
            </h1>
            <p className="mb-8 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Исследуйте, стройте и создавайте в нашем уникальном Minecraft сообществе. Присоединяйтесь к приключению
              прямо сейчас!
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <div className="relative flex items-center glass-card rounded-full overflow-hidden p-1 pl-4 pr-1 shadow-lg">
                <span className="font-mono text-sm mr-2">{serverIP}</span>
                <Button variant="default" size="sm" className="rounded-full" onClick={copyServerIP}>
                  <Copy className="h-4 w-4 mr-1" />
                  <span>{copied ? "Скопировано" : "Копировать"}</span>
                </Button>
              </div>
              <Button size="lg" className="rounded-full shadow-lg button-glow" asChild>
                <Link href="#how-to-join">
                  Начать играть
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="mt-6"
            >
              <Badge
                variant={serverStatus.online ? "default" : "destructive"}
                className="px-3 py-1.5 rounded-full text-sm"
              >
                {serverStatus.online ? `Онлайн: ${serverStatus.players} игроков` : "Оффлайн"}
              </Badge>
            </motion.div>
          </motion.div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-10" />
      </section>

      {/* Features Section */}
      <section id="features" className="section-padding bg-muted/50">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="text-center mb-16"
          >
            <Badge className="mb-4 px-3 py-1 text-sm font-medium">Особенности</Badge>
            <h2 className="mb-4">Что делает наш сервер особенным</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Откройте для себя уникальные возможности и особенности, которые делают MTI-World уникальным местом для
              игры и общения.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {serverFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                variants={fadeIn}
                transition={{ delay: index * 0.1 }}
                className="card-hover"
              >
                <Card className="h-full glass-card border-primary/10 overflow-hidden">
                  <div className="relative h-[200px]">
                    <Image
                      src={feature.image || "/placeholder.svg"}
                      alt={feature.title}
                      fill
                      className="object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Sparkles className="h-5 w-5 text-primary" />
                      {feature.title}
                    </CardTitle>
                    <CardDescription>{feature.description}</CardDescription>
                  </CardHeader>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Statistics Section */}
      <section id="stats" className="section-padding bg-[url('/backgrounds/deepslate_bg.jpg')] bg-cover bg-center">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="text-center mb-16"
          >
            <Badge className="mb-4 px-3 py-1 text-sm font-medium">Статистика</Badge>
            <h2 className="mb-4">Наш сервер в цифрах</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Узнайте больше о нашем сервере в реальном времени и присоединяйтесь к растущему сообществу.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="animate-float"
            >
              <Card className="glass-card border-primary/10 hover-glow text-center">
                <CardContent className="pt-6">
                  <div className="mb-4 rounded-full bg-primary/10 p-3 w-16 h-16 mx-auto flex items-center justify-center">
                    <Users className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-3xl font-bold mb-1">{serverStatus.players}</h3>
                  <p className="text-muted-foreground">Игроков онлайн</p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="animate-float"
              style={{ animationDelay: "0.2s" }}
            >
              <Card className="glass-card border-primary/10 hover-glow text-center">
                <CardContent className="pt-6">
                  <div className="mb-4 rounded-full bg-primary/10 p-3 w-16 h-16 mx-auto flex items-center justify-center">
                    <Server className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-3xl font-bold mb-1">{serverStats.version}</h3> {/* Динамическая версия */}
                  <p className="text-muted-foreground">Версия сервера</p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="animate-float"
              style={{ animationDelay: "0.4s" }}
            >
              <Card className="glass-card border-primary/10 hover-glow text-center">
                <CardContent className="pt-6">
                  <div className="mb-4 rounded-full bg-primary/10 p-3 w-16 h-16 mx-auto flex items-center justify-center">
                    <Clock className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-3xl font-bold mb-1">{serverStats.uptime}</h3> {/* Статический uptime */}
                  <p className="text-muted-foreground">Uptime</p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How to Join Section */}
      <section id="how-to-join" className="section-padding bg-muted/50">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="text-center mb-16"
          >
            <Badge className="mb-4 px-3 py-1 text-sm font-medium">Руководство</Badge>
            <h2 className="mb-4">Как присоединиться к серверу</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Следуйте этим простым шагам, чтобы начать играть на нашем сервере.
            </p>
          </motion.div>

          <div className="max-w-3xl mx-auto">
            <Tabs defaultValue="java" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-8">
                <TabsTrigger value="java" className="text-base py-3">
                  Java Edition
                </TabsTrigger>
                <TabsTrigger value="bedrock" className="text-base py-3">
                  Bedrock Edition
                </TabsTrigger>
              </TabsList>

              <TabsContent value="java" className="p-0">
                <Card className="glass-card border-primary/10">
                  <CardContent className="pt-6">
                    <div className="space-y-8">
                      <motion.div
                        className="flex items-start gap-4"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                      >
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                          1
                        </div>
                        <div>
                          <h3 className="text-xl font-medium mb-2">Запустите Minecraft Java Edition</h3>
                          <p className="text-muted-foreground">Убедитесь, что у вас установлена версия 1.21.4.</p>
                        </div>
                      </motion.div>

                      <motion.div
                        className="flex items-start gap-4"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                      >
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                          2
                        </div>
                        <div>
                          <h3 className="text-xl font-medium mb-2">Нажмите на "Сетевая игра"</h3>
                          <p className="text-muted-foreground">Выберите "Сетевая игра" в главном меню.</p>
                        </div>
                      </motion.div>

                      <motion.div
                        className="flex items-start gap-4"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                      >
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                          3
                        </div>
                        <div>
                          <h3 className="text-xl font-medium mb-2">Добавьте сервер</h3>
                          <p className="text-muted-foreground">
                            Нажмите "Добавить сервер" и введите: <code className="bg-muted px-2 py-1 rounded font-mono">{serverIP}</code>
                          </p>
                        </div>
                      </motion.div>

                      <motion.div
                        className="flex items-start gap-4"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 }}
                      >
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                          4
                        </div>
                        <div>
                          <h3 className="text-xl font-medium mb-2">Присоединяйтесь!</h3>
                          <p className="text-muted-foreground">Выберите сервер из списка и нажмите "Присоединиться".</p>
                        </div>
                      </motion.div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="bedrock" className="p-0">
                <Card className="glass-card border-primary/10">
                  <CardContent className="pt-6">
                    <div className="space-y-8">
                      <motion.div
                        className="flex items-start gap-4"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                      >
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                          1
                        </div>
                        <div>
                          <h3 className="text-xl font-medium mb-2">Запустите Bedrock Edition</h3>
                          <p className="text-muted-foreground">Убедитесь, что версия актуальна.</p>
                        </div>
                      </motion.div>

                      <motion.div
                        className="flex items-start gap-4"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                      >
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                          2
                        </div>
                        <div>
                          <h3 className="text-xl font-medium mb-2">Перейдите в "Серверы"</h3>
                          <p className="text-muted-foreground">Откройте вкладку "Серверы" в главном меню.</p>
                        </div>
                      </motion.div>

                      <motion.div
                        className="flex items-start gap-4"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                      >
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                          3
                        </div>
                        <div>
                          <h3 className="text-xl font-medium mb-2">Добавьте сервер</h3>
                          <p className="text-muted-foreground">
                            Название: MTI-World, Адрес: <code className="bg-muted px-2 py-1 rounded font-mono">{serverIP}</code>, Порт: 19132
                          </p>
                        </div>
                      </motion.div>

                      <motion.div
                        className="flex items-start gap-4"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 }}
                      >
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                          4
                        </div>
                        <div>
                          <h3 className="text-xl font-medium mb-2">Присоединяйтесь!</h3>
                          <p className="text-muted-foreground">Сохраните и подключитесь к серверу.</p>
                        </div>
                      </motion.div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>

      {/* Rules Section */}
      <section id="rules" className="section-padding">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="text-center mb-16"
          >
            <Badge className="mb-4 px-3 py-1 text-sm font-medium">Правила</Badge>
            <h2 className="mb-4">Правила сервера</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Соблюдайте правила для комфортной игры всех участников сообщества.
            </p>
          </motion.div>

          <div className="max-w-3xl mx-auto">
            <Card className="glass-card border-primary/10">
              <CardContent className="pt-6">
                <div className="space-y-6">
                  {serverRules.map((rule, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start gap-4"
                    >
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <Shield className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="text-lg font-medium mb-1">{rule.split(":")[0]}</h3>
                        <p className="text-muted-foreground">{rule.split(":")[1]}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent-foreground/20 dark:from-primary/10 dark:to-accent-foreground/10" />
        <div className="absolute inset-0 bg-[url('/backgrounds/sculk_veins_bg.jpg')] bg-cover bg-center opacity-5" />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="container relative z-10"
        >
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6 gradient-text">Готовы начать приключение?</h2>
            <p className="text-lg mb-8 text-muted-foreground">
              Присоединяйтесь к нашему сообществу в Discord и будьте в курсе всех событий!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="rounded-full shadow-lg button-glow" asChild>
                <Link href="https://discord.gg/KpQgkdUkgF" target="_blank">
                  <Discord className="h-5 w-5 mr-2" />
                  Присоединиться к Discord
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="rounded-full" asChild>
                <Link href="/store">
                  <Gamepad className="h-5 w-5 mr-2" />
                  Посетить магазин
                </Link>
              </Button>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  )
}