"use client"

import Link from "next/link";
import Image from "next/image";
import { useState } from "react"; // Добавляем хук для поиска
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"; // Добавляем компонент Accordion
import { motion, AnimatePresence } from "framer-motion"; // Для анимации вкладок
import {
  Search,
  Server,
  ShieldCheck,
  CreditCard,
  Users,
  HelpCircle,
  ChevronRight,
  DiscIcon as Discord,
} from "lucide-react";

export default function FAQPage() {
  // Состояние для поиска
  const [searchTerm, setSearchTerm] = useState("");

  // Данные вопросов для фильтрации (можно вынести в отдельный файл для масштабируемости)
  const faqData = {
    general: [
      {
        question: "Что такое MTI-World?",
        answer:
          "MTI-World — ванильный сервер Minecraft с уникальными плагинами и дружелюбным сообществом. Мы предлагаем разнообразный игровой опыт для игроков всех уровней.",
      },
      {
        question: "Как присоединиться к серверу?",
        answer:
          "Чтобы присоединиться к нашему серверу, запустите Minecraft, перейдите в раздел 'Мультиплеер', нажмите 'Добавить сервер' и введите наш IP-адрес: play.yourserver.com. Подробные инструкции можно найти в разделе 'Как присоединиться' на главной странице.",
      },
      {
        question: "Какие режимы игры доступны на сервере?",
        answer: "На нашем сервере доступны следующие режимы: Выживание.",
      },
      {
        question: "Нужно ли платить за игру на сервере?",
        answer:
          "Нет, игра на нашем сервере полностью бесплатна. Однако, мы предлагаем дополнительные привилегии и косметические предметы в нашем магазине для тех, кто хочет поддержать развитие сервера.",
      },
      {
        question: "Какая версия Minecraft поддерживается?",
        answer:
          "Наш сервер поддерживает Minecraft Java Edition версии 1.21.4 и Bedrock-версию. Мы регулярно обновляем сервер до последних версий игры.",
      },
    ],
    technical: [
      {
        question: "Какие системные требования для игры на сервере?",
        answer:
          "Системные требования соответствуют официальным требованиям Minecraft. Рекомендуется иметь не менее 4 ГБ оперативной памяти и процессор с частотой не менее 2 ГГц для комфортной игры.",
      },
      {
        question: "Что делать, если я не могу подключиться к серверу?",
        answer: (
          <>
            <p>Если вы не можете подключиться к серверу, проверьте следующее:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Правильность введенного IP-адреса</li>
              <li>Соответствие версии вашего клиента Minecraft версии сервера</li>
              <li>Подключение к интернету</li>
              <li>Отключите VPN, если вы его используете</li>
            </ul>
            <p className="mt-2">
              Если проблема не решена, обратитесь в нашу службу поддержки через Discord.
            </p>
          </>
        ),
      },
      {
        question: "Как улучшить производительность игры на сервере?",
        answer: (
          <>
            <p>Для улучшения производительности рекомендуем:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Установить OptiFine или Sodium</li>
              <li>Уменьшить дальность прорисовки</li>
              <li>Отключить сложные графические эффекты</li>
              <li>Выделить больше оперативной памяти для Minecraft</li>
              <li>Закрыть ресурсоемкие программы перед запуском игры</li>
            </ul>
          </>
        ),
      },
      {
        question: "Поддерживает ли сервер моды?",
        answer:
          "Наш сервер работает на ванильном ядре с плагинами, поэтому большинство модов, изменяющих игровой процесс, не будут работать. Однако клиентские моды, улучшающие производительность (OptiFine, Sodium) и косметические моды (шейдеры), полностью совместимы с нашим сервером.",
      },
      {
        question: "Как часто происходят технические работы?",
        answer:
          "Плановые технические работы проводятся примерно раз в месяц и обычно занимают 2-4 часа. Мы всегда заранее объявляем о них в нашем Discord и на сайте. Экстренные технические работы могут проводиться без предупреждения в случае серьезных проблем.",
      },
    ],
    rules: [
      {
        question: "Какие основные правила сервера?",
        answer: (
          <>
            <p>Основные правила нашего сервера:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Уважайте всех игроков и администрацию</li>
              <li>Запрещено использование читов и эксплойтов</li>
              <li>Запрещен гриферинг (разрушение чужих построек)</li>
              <li>Запрещен спам и флуд в чате</li>
              <li>Запрещена реклама других серверов</li>
            </ul>
            <p className="mt-2">
              Полный список правил доступен на нашем сайте в разделе "Правила".
            </p>
          </>
        ),
      },
      {
        question: "Что будет, если я нарушу правила?",
        answer: (
          <>
            <p>
              Наказания за нарушение правил зависят от тяжести нарушения и
              истории нарушений игрока:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Предупреждение</li>
              <li>Временный мут (запрет на использование чата)</li>
              <li>Временный бан (запрет на вход на сервер)</li>
              <li>Постоянный бан (в случае серьезных или повторных нарушений)</li>
            </ul>
            <p className="mt-2">
              Администрация оставляет за собой право выбирать наказание в
              зависимости от ситуации.
            </p>
          </>
        ),
      },
      {
        question: "Можно ли обжаловать бан?",
        answer:
          "Да, вы можете обжаловать бан, подав апелляцию на нашем форуме или в Discord. В апелляции необходимо указать ваш игровой ник, причину бана и объяснение ситуации. Каждая апелляция рассматривается индивидуально.",
      },
      {
        question: "Разрешено ли использование твинков?",
        answer: (
          <>
            <p>
              Использование альтернативных аккаунтов (альтов) разрешено, но с
              некоторыми ограничениями:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Запрещено использовать альты для обхода бана</li>
              <li>
                Запрещено использовать альты для получения дополнительных
                преимуществ в экономике
              </li>
              <li>
                Запрещено использовать альты для голосования за сервер несколько
                раз
              </li>
            </ul>
            <p className="mt-2">
              Нарушение этих правил может привести к бану всех ваших аккаунтов.
            </p>
          </>
        ),
      },
      {
        question: "Как сообщить о нарушении правил другим игроком?",
        answer: (
          <>
            <p>Если вы стали свидетелем нарушения правил, вы можете:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Использовать команду /report в игре</li>
              <li>Связаться с модератором или администратором в игре</li>
              <li>Создать тикет в нашем Discord</li>
              <li>Отправить сообщение на почту support@foxiland.ru</li>
            </ul>
            <p className="mt-2">
              Пожалуйста, предоставьте доказательства нарушения (скриншоты,
              видео), если это возможно.
            </p>
          </>
        ),
      },
    ],
    payment: [
      {
        question: "Какие способы оплаты вы принимаете?",
        answer: (
          <>
            <p>Мы принимаем различные способы оплаты:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Банковские карты (Visa, MasterCard)</li>
              <li>PayPal</li>
              <li>WebMoney</li>
              <li>QIWI</li>
              <li>ЮMoney (бывшие Яндекс.Деньги)</li>
              <li>Мобильные платежи</li>
            </ul>
          </>
        ),
      },
      {
        question: "Как быстро я получу купленные привилегии?",
        answer:
          "Все покупки обрабатываются автоматически. Вы получите свои привилегии и предметы сразу после успешной оплаты. В редких случаях может потребоваться до 15 минут для активации. Если привилегии не были выданы в течение часа, пожалуйста, свяжитесь с нашей службой поддержки.",
      },
      {
        question: "Возможен ли возврат средств?",
        answer:
          "Мы не предоставляем возврат средств за цифровые товары после их активации в соответствии с нашей политикой и законодательством. Исключения могут быть сделаны в случае технических проблем, когда купленные привилегии не были активированы. В таких случаях, пожалуйста, свяжитесь с нашей службой поддержки в течение 24 часов после покупки.",
      },
      {
        question: "Безопасны ли платежи на вашем сайте?",
        answer:
          "Да, все платежи на нашем сайте полностью безопасны. Мы используем защищенное SSL-соединение и не храним данные ваших банковских карт. Все транзакции обрабатываются через надежные платежные системы, соответствующие международным стандартам безопасности.",
      },
      {
        question: "Что делать, если я не получил то, что купил?",
        answer: (
          <>
            <p>Если вы не получили купленные привилегии или предметы, пожалуйста:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>
                Убедитесь, что платеж был успешно завершен (проверьте электронную
                почту на наличие подтверждения)
              </li>
              <li>Перезайдите на сервер</li>
              <li>Подождите 15-30 минут (иногда требуется время для обработки)</li>
            </ul>
            <p className="mt-2">
              Если проблема не решена, свяжитесь с нашей службой поддержки через
              Discord или по электронной почте support@foxiland.ru, предоставив
              доказательство оплаты и ваш игровой ник.
            </p>
          </>
        ),
      },
    ],
    community: [
      {
        question: "Как связаться с администрацией сервера?",
        answer: (
          <>
            <p>Связаться с администрацией сервера можно несколькими способами:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Через Discord-сервер (рекомендуемый способ)</li>
              <li>Используя команду /helpop [сообщение] в игре</li>
              <li>По электронной почте admin@foxiland.ru</li>
              <li>Через форму обратной связи на сайте</li>
            </ul>
            <p className="mt-2">Администрация обычно отвечает в течение 24 часов.</p>
          </>
        ),
      },
      {
        question: "Как принять участие в событиях сервера?",
        answer: (
          <>
            <p>
              Информация о предстоящих событиях публикуется в нашем Discord, на
              сайте и в игре. Чтобы не пропустить события:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Подпишитесь на оповещения в Discord</li>
              <li>Регулярно проверяйте раздел "Новости" на сайте</li>
              <li>Обращайте внимание на объявления в игровом чате</li>
            </ul>
            <p className="mt-2">
              Для участия в большинстве событий достаточно быть онлайн в указанное
              время и следовать инструкциям организаторов.
            </p>
          </>
        ),
      },
      {
        question: "Как стать частью команды сервера?",
        answer: (
          <>
            <p>Мы периодически набираем новых членов в команду сервера. Чтобы подать заявку:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>
                Ознакомьтесь с требованиями к кандидатам на нашем сайте в разделе
                "Команда"
              </li>
              <li>Заполните форму заявки, указав свой опыт и мотивацию</li>
              <li>Пройдите собеседование с администрацией</li>
            </ul>
            <p className="mt-2">
              Мы ищем активных, ответственных и опытных игроков, которые хотят
              помочь развивать наше сообщество.
            </p>
          </>
        ),
      },
      {
        question: "Где можно найти других игроков для совместной игры?",
        answer: (
          <>
            <p>Найти других игроков для совместной игры можно:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>В Discord-сервере в канале #поиск-команды</li>
              <li>В игровом чате, используя команду /g (глобальный чат)</li>
              <li>На форуме в разделе "Поиск команды"</li>
              <li>Присоединившись к клану</li>
            </ul>
            <p className="mt-2">
              Также на сервере регулярно проводятся групповые активности, где
              можно познакомиться с другими игроками.
            </p>
          </>
        ),
      },
      {
        question: "Как предложить идею для улучшения сервера?",
        answer: (
          <>
            <p>Мы всегда открыты для предложений по улучшению сервера. Вы можете предложить свою идею:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>В Discord-сервере в канале #предложения</li>
              <li>На форуме в разделе "Предложения"</li>
              <li>Через форму обратной связи на сайте</li>
            </ul>
            <p className="mt-2">
              Лучшие идеи обсуждаются командой и могут быть реализованы в будущих
              обновлениях сервера.
            </p>
          </>
        ),
      },
    ],
  };

  // Функция для фильтрации вопросов
  const filterFAQs = (category) => {
    if (!searchTerm) return faqData[category];
    return faqData[category].filter(
      (faq) =>
        faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (typeof faq.answer === "string" &&
          faq.answer.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  };

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background z-10" />
          <div className="relative h-[300px] w-full overflow-hidden">
            <Image
              src="/placeholder.svg?height=600&width=1920"
              alt="FAQ"
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="container relative z-20 -mt-20 flex flex-col items-center text-center">
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
              Часто задаваемые вопросы
            </h1>
            <p className="mt-4 max-w-[700px] text-lg text-muted-foreground md:text-xl">
              Ответы на популярные вопросы о нашем сервере
            </p>
          </div>
        </section>

        {/* Search */}
        <section className="container py-8">
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Поиск по вопросам..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded-lg border border-input bg-background py-3 pl-10 pr-4 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>
          </div>
        </section>

        {/* FAQ Categories */}
        <section className="container py-8">
          <Tabs defaultValue="general" className="w-full">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 h-auto">
              <TabsTrigger
                value="general"
                className="py-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                <HelpCircle
                  className={`h-4 w-4 mr-2 ${
                    // Подсвечиваем иконку активной вкладки
                    searchTerm === "general"
                      ? "text-primary-foreground"
                      : "text-muted-foreground"
                  }`}
                />
                Общие
              </TabsTrigger>
              <TabsTrigger
                value="technical"
                className="py-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                <Server
                  className={`h-4 w-4 mr-2 ${
                    searchTerm === "technical"
                      ? "text-primary-foreground"
                      : "text-muted-foreground"
                  }`}
                />
                Технические
              </TabsTrigger>
              <TabsTrigger
                value="rules"
                className="py-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                <ShieldCheck
                  className={`h-4 w-4 mr-2 ${
                    searchTerm === "rules"
                      ? "text-primary-foreground"
                      : "text-muted-foreground"
                  }`}
                />
                Правила
              </TabsTrigger>
              <TabsTrigger
                value="payment"
                className="py-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                <CreditCard
                  className={`h-4 w-4 mr-2 ${
                    searchTerm === "payment"
                      ? "text-primary-foreground"
                      : "text-muted-foreground"
                  }`}
                />
                Оплата
              </TabsTrigger>
              <TabsTrigger
                value="community"
                className="py-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                <Users
                  className={`h-4 w-4 mr-2 ${
                    searchTerm === "community"
                      ? "text-primary-foreground"
                      : "text-muted-foreground"
                  }`}
                />
                Сообщество
              </TabsTrigger>
            </TabsList>

            {/* General Tab */}
            <AnimatePresence mode="wait">
              <TabsContent value="general" className="pt-6">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="max-w-3xl mx-auto space-y-4"
                >
                  {filterFAQs("general").length > 0 ? (
                    <Accordion type="single" collapsible className="w-full">
                      {filterFAQs("general").map((faq, index) => (
                        <AccordionItem key={index} value={`general-${index}`}>
                          <AccordionTrigger>{faq.question}</AccordionTrigger>
                          <AccordionContent>{faq.answer}</AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  ) : (
                    <p className="text-center text-muted-foreground">
                      Вопросы не найдены. Попробуйте изменить запрос.
                    </p>
                  )}
                </motion.div>
              </TabsContent>
            </AnimatePresence>

            {/* Technical Tab */}
            <AnimatePresence mode="wait">
              <TabsContent value="technical" className="pt-6">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="max-w-3xl mx-auto space-y-4"
                >
                  {filterFAQs("technical").length > 0 ? (
                    <Accordion type="single" collapsible className="w-full">
                      {filterFAQs("technical").map((faq, index) => (
                        <AccordionItem key={index} value={`technical-${index}`}>
                          <AccordionTrigger>{faq.question}</AccordionTrigger>
                          <AccordionContent>{faq.answer}</AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  ) : (
                    <p className="text-center text-muted-foreground">
                      Вопросы не найдены. Попробуйте изменить запрос.
                    </p>
                  )}
                </motion.div>
              </TabsContent>
            </AnimatePresence>

            {/* Rules Tab */}
            <AnimatePresence mode="wait">
              <TabsContent value="rules" className="pt-6">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="max-w-3xl mx-auto space-y-4"
                >
                  {filterFAQs("rules").length > 0 ? (
                    <Accordion type="single" collapsible className="w-full">
                      {filterFAQs("rules").map((faq, index) => (
                        <AccordionItem key={index} value={`rules-${index}`}>
                          <AccordionTrigger>{faq.question}</AccordionTrigger>
                          <AccordionContent>{faq.answer}</AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  ) : (
                    <p className="text-center text-muted-foreground">
                      Вопросы не найдены. Попробуйте изменить запрос.
                    </p>
                  )}
                </motion.div>
              </TabsContent>
            </AnimatePresence>

            {/* Payment Tab */}
            <AnimatePresence mode="wait">
              <TabsContent value="payment" className="pt-6">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="max-w-3xl mx-auto space-y-4"
                >
                  {filterFAQs("payment").length > 0 ? (
                    <Accordion type="single" collapsible className="w-full">
                      {filterFAQs("payment").map((faq, index) => (
                        <AccordionItem key={index} value={`payment-${index}`}>
                          <AccordionTrigger>{faq.question}</AccordionTrigger>
                          <AccordionContent>{faq.answer}</AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  ) : (
                    <p className="text-center text-muted-foreground">
                      Вопросы не найдены. Попробуйте изменить запрос.
                    </p>
                  )}
                </motion.div>
              </TabsContent>
            </AnimatePresence>

            {/* Community Tab */}
            <AnimatePresence mode="wait">
              <TabsContent value="community" className="pt-6">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="max-w-3xl mx-auto space-y-4"
                >
                  {filterFAQs("community").length > 0 ? (
                    <Accordion type="single" collapsible className="w-full">
                      {filterFAQs("community").map((faq, index) => (
                        <AccordionItem key={index} value={`community-${index}`}>
                          <AccordionTrigger>{faq.question}</AccordionTrigger>
                          <AccordionContent>{faq.answer}</AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  ) : (
                    <p className="text-center text-muted-foreground">
                      Вопросы не найдены. Попробуйте изменить запрос.
                    </p>
                  )}
                </motion.div>
              </TabsContent>
            </AnimatePresence>
          </Tabs>
        </section>

        {/* Still Have Questions */}
        <section className="bg-muted py-16">
          <div className="container flex flex-col items-center text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
              Остались вопросы?
            </h2>
            <p className="max-w-[600px] text-muted-foreground mb-8">
              Если вы не нашли ответ на свой вопрос, свяжитесь с нашей службой
              поддержки. Мы всегда готовы помочь!
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" asChild>
                <Link href="https://discord.gg/KpQgkdUkgF">
                  <Discord className="h-5 w-5 mr-2" />
                  Присоединиться к Discord
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/contact">
                  <HelpCircle className="h-5 w-5 mr-2" />
                  Связаться с поддержкой
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Related Links */}
        <section className="container py-12">
          <h2 className="text-2xl font-bold tracking-tight mb-6">
            Полезные ссылки
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Правила сервера</CardTitle>
                <CardDescription>
                  Подробные правила поведения на сервере
                </CardDescription>
              </CardHeader>
              <CardFooter>
                <Button variant="ghost" className="w-full justify-between" asChild>
                  <Link href="/#rules">
                    Перейти
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Как присоединиться</CardTitle>
                <CardDescription>
                  Пошаговая инструкция для новых игроков
                </CardDescription>
              </CardHeader>
              <CardFooter>
                <Button variant="ghost" className="w-full justify-between" asChild>
                  <Link href="/#how-to-join">
                    Перейти
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Магазин</CardTitle>
                <CardDescription>
                  Привилегии и предметы для поддержки сервера
                </CardDescription>
              </CardHeader>
              <CardFooter>
                <Button variant="ghost" className="w-full justify-between" asChild>
                  <Link href="/store">
                    Перейти
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </section>
      </main>
    </div>
  );
}