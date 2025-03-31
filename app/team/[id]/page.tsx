"use client";

import Link from "next/link";
import Image from "next/image";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { teamMembers, TeamMember } from "@/lib/teamMembers";
import {
  Github,
  Twitter,
  DiscIcon as Discord,
  Mail,
  Globe,
  Calendar,
  MapPin,
  Briefcase,
  GraduationCap,
  ArrowLeft,
  ChevronDown,
  ChevronUp,
  Award,
  Code,
  PenTool,
  Users,
  Server,
  Trophy,
} from "lucide-react";

// Интерфейс данных сотрудника
interface TeamMember {
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
}

// Функция получения сотрудника по ID
const getTeamMember = (id: string) => {
  return teamMembers.find((member) => member.id === Number.parseInt(id)) || teamMembers[0];
};

// Компонент аккордеона
const AccordionSection: React.FC<{ title: string; children: React.ReactNode; isOpen: boolean; onToggle: () => void }> = ({
  title,
  children,
  isOpen,
  onToggle,
}) => (
  <div className="border-b">
    <button onClick={onToggle} className="flex w-full items-center justify-between p-4 text-left font-medium text-lg" aria-expanded={isOpen}>
      {title}
      {isOpen ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
    </button>
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden"
        >
          <div className="p-4">{children}</div>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

// Иконки для навыков
const skillIcons: { [key: string]: JSX.Element } = {
  Linux: <Server className="h-4 w-4 mr-2" />,
  Docker: <Server className="h-4 w-4 mr-2" />,
  MySQL: <Server className="h-4 w-4 mr-2" />,
  "Настройка плагинов": <Code className="h-4 w-4 mr-2" />,
  SMM: <Users className="h-4 w-4 mr-2" />,
  Копирайтинг: <PenTool className="h-4 w-4 mr-2" />,
  Мониторинг: <Server className="h-4 w-4 mr-2" />,
  Планирование: <Users className="h-4 w-4 mr-2" />,
  Коммуникация: <Users className="h-4 w-4 mr-2" />,
  Аналитика: <Users className="h-4 w-4 mr-2" />,
  "Техническая поддержка": <Server className="h-4 w-4 mr-2" />,
  Документация: <PenTool className="h-4 w-4 mr-2" />,
  "Minecraft troubleshooting": <Code className="h-4 w-4 mr-2" />,
};

// Цвета для ролей
const roleColors: { [key: string]: string } = {
  "Технический администратор": "bg-blue-500",
  "PR-менеджер": "bg-green-500",
  "Помощник тех. админа": "bg-blue-400",
  "Event-менеджмент": "bg-purple-500",
  "Поддержка игроков": "bg-teal-500",
};

export default function TeamMemberPage({ params }: { params: { id: string } }) {
  const resolvedParams = React.use(params); // Распаковываем params
  const member = getTeamMember(resolvedParams.id); // Теперь используем resolvedParams.id
  const [isAccordionOpen, setIsAccordionOpen] = React.useState<{ [key: string]: boolean }>({
    about: false,
    skills: false,
    achievements: false,
    projects: false,
  });

  return (
    <main>
      {/* Hero Section */}
      <section className="relative h-[300px] w-full overflow-hidden">
        <Image
          src="/backgrounds/minecraft-bg.jpg"
          alt={member.name}
          fill
          className="object-cover"
          priority
          sizes="100vw"
          onError={(e) => {
            (e.target as HTMLImageElement).src = "/placeholder.svg";
          }}
        />
        <div className="container relative z-20 -mt-20 flex flex-col items-center text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl"
          >
            {member.name}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-4 max-w-[700px] text-lg text-muted-foreground md:text-xl"
          >
            {member.role}
          </motion.p>
        </div>
      </section>

      {/* Back Button */}
      <section className="container py-6">
        <Button variant="outline" size="sm" asChild>
          <Link href="/team">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Назад к команде
          </Link>
        </Button>
      </section>

      {/* Member Profile */}
      <section className="container py-12 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <Card>
                <div className="relative h-[300px]">
                  <Image src={member.image || "/placeholder.svg"} alt={member.name} fill className="object-cover" />
                </div>
                <CardHeader>
                  <CardTitle>{member.name}</CardTitle>
                  <CardDescription className="text-primary font-medium">{member.nickname}</CardDescription>
                  <Badge className={`${roleColors[member.role] || "bg-gray-500"} text-white`}>{member.role}</Badge>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center text-sm">
                    <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>На сервере с {member.joinDate}</span>
                  </div>
                  {member.location && (
                    <div className="flex items-center text-sm">
                      <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>{member.location}</span>
                    </div>
                  )}
                  <div className="flex items-center text-sm">
                    <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                    <a href={`mailto:${member.email}`} className="hover:underline">
                      {member.email}
                    </a>
                  </div>
                  {member.website && (
                    <div className="flex items-center text-sm">
                      <Globe className="h-4 w-4 mr-2 text-muted-foreground" />
                      <a href={member.website} target="_blank" rel="noopener noreferrer" className="hover:underline">
                        Личный сайт
                      </a>
                    </div>
                  )}
                  {member.education && (
                    <div className="flex items-center text-sm">
                      <GraduationCap className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>{member.education}</span>
                    </div>
                  )}
                  {member.experience && (
                    <div className="flex items-center text-sm">
                      <Briefcase className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>{member.experience}</span>
                    </div>
                  )}
                </CardContent>
                <CardFooter>
                  <div className="flex gap-3 w-full justify-center">
                    {member.discord && (
                      <Link href={member.discord} className="text-muted-foreground hover:text-foreground" aria-label="Discord">
                        <Discord className="h-5 w-5" />
                      </Link>
                    )}
                    {member.twitter && (
                      <Link href={member.twitter} className="text-muted-foreground hover:text-foreground" aria-label="Twitter">
                        <Twitter className="h-5 w-5" />
                      </Link>
                    )}
                    {member.github && (
                      <Link href={member.github} className="text-muted-foreground hover:text-foreground" aria-label="GitHub">
                        <Github className="h-5 w-5" />
                      </Link>
                    )}
                  </div>
                </CardFooter>
              </Card>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div>
              <AccordionSection
                title="О сотруднике"
                isOpen={isAccordionOpen.about}
                onToggle={() => setIsAccordionOpen((prev) => ({ ...prev, about: !prev.about }))}
              >
                <p className="text-muted-foreground">{member.longDescription}</p>
              </AccordionSection>
              <AccordionSection
                title="Навыки"
                isOpen={isAccordionOpen.skills}
                onToggle={() => setIsAccordionOpen((prev) => ({ ...prev, skills: !prev.skills }))}
              >
                <div className="flex flex-wrap gap-2">
                  {member.skills.map((skill, index) => (
                    <Badge key={index} variant="secondary" className="text-sm flex items-center">
                      {skillIcons[skill] || <Code className="h-4 w-4 mr-2" />}
                      {skill}
                    </Badge>
                  ))}
                </div>
              </AccordionSection>
              <AccordionSection
                title="Достижения"
                isOpen={isAccordionOpen.achievements}
                onToggle={() => setIsAccordionOpen((prev) => ({ ...prev, achievements: !prev.achievements }))}
              >
                <ul className="space-y-2">
                  {member.achievements.map((achievement, index) => (
                    <li key={index} className="flex items-start">
                      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary mr-3 mt-0.5">
                        <Trophy className="h-4 w-4" />
                      </div>
                      <span>{achievement}</span>
                    </li>
                  ))}
                </ul>
              </AccordionSection>
              <AccordionSection
                title="Проекты"
                isOpen={isAccordionOpen.projects}
                onToggle={() => setIsAccordionOpen((prev) => ({ ...prev, projects: !prev.projects }))}
              >
                <div className="space-y-4">
                  {member.projects.map((project, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <h3 className="font-medium">{project.name}</h3>
                      <p className="text-sm text-muted-foreground mt-1">{project.description}</p>
                      <Button variant="link" size="sm" className="px-0 mt-2" asChild>
                        <Link href={project.link}>Подробнее</Link>
                      </Button>
                    </div>
                  ))}
                </div>
              </AccordionSection>
            </div>
          </div>
        </div>
      </section>

      <Separator />

      {/* Related Team Members */}
      <section className="container py-12 md:py-24">
        <div className="flex flex-col items-center text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Другие члены команды</h2>
          <p className="mt-4 max-w-[700px] text-lg text-muted-foreground">
            Познакомьтесь с другими участниками нашей команды
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {teamMembers
            .filter((m) => m.id !== member.id)
            .slice(0, 4)
            .map((relatedMember) => (
              <motion.div
                key={relatedMember.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                whileHover={{ scale: 1.03 }}
              >
                <Card className="overflow-hidden shadow-md">
                  <div className="relative h-[150px]">
                    <Image src={relatedMember.image || "/placeholder.svg"} alt={relatedMember.name} fill className="object-cover" />
                  </div>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>{relatedMember.name}</CardTitle>
                        <CardDescription className="text-primary font-medium">{relatedMember.nickname}</CardDescription>
                      </div>
                      <Badge className={`${roleColors[relatedMember.role] || "bg-gray-500"} text-white`}>
                        {relatedMember.role.split(" ")[0]}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">{relatedMember.description}</p>
                    <div className="text-xs text-muted-foreground">На сервере с {relatedMember.joinDate}</div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <div className="flex gap-2">
                      {relatedMember.discord && (
                        <Link href={relatedMember.discord} className="text-muted-foreground hover:text-foreground" aria-label="Discord">
                          <Discord className="h-5 w-5" />
                        </Link>
                      )}
                      {relatedMember.twitter && (
                        <Link href={relatedMember.twitter} className="text-muted-foreground hover:text-foreground" aria-label="Twitter">
                          <Twitter className="h-5 w-5" />
                        </Link>
                      )}
                      {relatedMember.github && (
                        <Link href={relatedMember.github} className="text-muted-foreground hover:text-foreground" aria-label="GitHub">
                          <Github className="h-5 w-5" />
                        </Link>
                      )}
                    </div>
                    <Button variant="ghost" size="sm" asChild>
                      <Link href={`/team/${relatedMember.id}`}>Профиль</Link>
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
        </div>
      </section>
    </main>
  );
}