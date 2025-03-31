// app/team/page.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import { teamMembers, TeamMember } from "@/lib/teamMembers";
import { Search, ChevronLeft, ChevronRight, DiscIcon, Github, Send } from "lucide-react"; // Исправлен импорт

// Схема валидации формы
const applicationSchema = zod.object({
  name: zod.string().min(2, "Имя должно содержать минимум 2 символа"),
  email: zod.string().email("Введите корректный email"),
  discord: zod.string().min(2, "Укажите ваш Discord"),
  role: zod.string().min(1, "Выберите роль"),
  experience: zod.string().min(10, "Опишите ваш опыт (минимум 10 символов)"),
});

type ApplicationFormData = zod.infer<typeof applicationSchema>;

const roleColors: { [key: string]: string } = {
  "Технический администратор": "bg-blue-600",
  "PR-менеджер": "bg-green-600",
  "Помощник тех. админа": "bg-blue-400",
  "Event-менеджмент": "bg-purple-600",
  "Поддержка игроков": "bg-teal-600",
};

export default function TeamPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [currentFeatured, setCurrentFeatured] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { handleSubmit, control, reset, formState: { errors } } = useForm<ApplicationFormData>({
    resolver: zodResolver(applicationSchema),
    defaultValues: { name: "", email: "", discord: "", role: "", experience: "" },
  });

  // Фильтрация участников
	const filteredMembers = teamMembers.filter((member) => {
	  const matchesSearch =
		member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
		member.nickname.toLowerCase().includes(searchQuery.toLowerCase()) ||
		member.role.toLowerCase().includes(searchQuery.toLowerCase());
	  const matchesRole = roleFilter === "all" || !roleFilter || member.role === roleFilter; // Обновлено
	  return matchesSearch && matchesRole;
	});

  const roles = Array.from(new Set(teamMembers.map((m) => m.role)));

  // Автопрокрутка Featured Member
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFeatured((prev) => (prev + 1) % teamMembers.length);
    }, 5000); // Смена каждые 5 секунд
    return () => clearInterval(interval);
  }, []);

  const onSubmit = async (data: ApplicationFormData) => {
    setIsSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Симуляция запроса
      toast({ title: "Заявка отправлена!", description: "Мы свяжемся с вами скоро." });
      reset();
    } catch (error) {
      toast({ title: "Ошибка", description: "Не удалось отправить заявку.", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen">
      {/* Hero Section с каруселью */}
      <section className="relative h-[400px] w-full overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentFeatured}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0"
          >
            <Image
              src={teamMembers[currentFeatured].image || "/placeholder.svg"}
              alt={teamMembers[currentFeatured].name}
              fill
              className="object-cover brightness-50"
            />
            <div className="absolute inset-0 flex items-center justify-center text-center text-white">
              <div>
                <h1 className="text-4xl font-bold sm:text-5xl md:text-6xl">
                  {teamMembers[currentFeatured].name}
                </h1>
                <p className="mt-2 text-lg md:text-xl">{teamMembers[currentFeatured].role}</p>
                <Button variant="secondary" className="mt-4" asChild>
                  <Link href={`/team/${teamMembers[currentFeatured].id}`}>Подробнее</Link>
                </Button>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
        <Button
          variant="ghost"
          size="icon"
          className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white"
          onClick={() => setCurrentFeatured((prev) => (prev - 1 + teamMembers.length) % teamMembers.length)}
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white"
          onClick={() => setCurrentFeatured((prev) => (prev + 1) % teamMembers.length)}
        >
          <ChevronRight className="h-6 w-6" />
        </Button>
      </section>

      {/* Фильтры */}
	<section className="container py-8">
	  <motion.div
		initial={{ opacity: 0, y: 20 }}
		animate={{ opacity: 1, y: 0 }}
		transition={{ duration: 0.5 }}
		className="flex flex-col sm:flex-row gap-4 items-center justify-center"
	  >
		<div className="relative w-full sm:w-64">
		  <Input
			placeholder="Поиск..."
			value={searchQuery}
			onChange={(e) => setSearchQuery(e.target.value)}
			className="pl-10"
		  />
		  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
		</div>
		<Select onValueChange={setRoleFilter} value={roleFilter}>
		  <SelectTrigger className="w-full sm:w-48">
			<SelectValue placeholder="Все роли" />
		  </SelectTrigger>
		  <SelectContent>
			<SelectItem value="all">Все роли</SelectItem> {/* Изменено с "" на "all" */}
			{roles.map((role) => (
			  <SelectItem key={role} value={role}>
				{role}
			  </SelectItem>
			))}
		  </SelectContent>
		</Select>
	  </motion.div>
	</section>

      {/* Team Grid */}
      <section className="container py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredMembers.map((member) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              whileHover={{ scale: 1.05 }}
            >
              <Card className="overflow-hidden">
                <div className="relative h-48">
                  <Image src={member.image || "/placeholder.svg"} alt={member.name} fill className="object-cover" />
                </div>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">{member.name}</CardTitle>
                  <Badge className={`${roleColors[member.role] || "bg-gray-600"} text-white text-xs`}>
                    {member.role}
                  </Badge>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-sm text-muted-foreground">{member.description}</p>
                  <Button variant="link" size="sm" className="mt-2 p-0" asChild>
                    <Link href={`/team/${member.id}`}>Подробнее</Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Join Team */}
      <section className="container py-12 bg-muted rounded-lg">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight mb-4">Присоединяйтесь к нам</h2>
          <p className="max-w-2xl mx-auto text-muted-foreground mb-6">
            Мы ищем увлечённых людей, готовых развивать MTI-World. Подайте заявку и станьте частью команды!
          </p>
          <Dialog>
            <DialogTrigger asChild>
              <Button size="lg">Подать заявку</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Заявка в команду</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                  <Label htmlFor="name">Имя</Label>
                  <Controller
                    name="name"
                    control={control}
                    render={({ field }) => <Input id="name" {...field} />}
                  />
                  {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Controller
                    name="email"
                    control={control}
                    render={({ field }) => <Input id="email" type="email" {...field} />}
                  />
                  {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                </div>
                <div>
                  <Label htmlFor="discord">Discord</Label>
                  <Controller
                    name="discord"
                    control={control}
                    render={({ field }) => <Input id="discord" {...field} />}
                  />
                  {errors.discord && <p className="text-red-500 text-sm">{errors.discord.message}</p>}
                </div>
                <div>
                  <Label htmlFor="role">Роль</Label>
                  <Controller
                    name="role"
                    control={control}
                    render={({ field }) => (
                      <Select onValueChange={field.onChange} value={field.value}>
                        <SelectTrigger>
                          <SelectValue placeholder="Выберите роль" />
                        </SelectTrigger>
                        <SelectContent>
                          {roles.map((role) => (
                            <SelectItem key={role} value={role}>
                              {role}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors.role && <p className="text-red-500 text-sm">{errors.role.message}</p>}
                </div>
                <div>
                  <Label htmlFor="experience">Опыт</Label>
                  <Controller
                    name="experience"
                    control={control}
                    render={({ field }) => <Input id="experience" {...field} />}
                  />
                  {errors.experience && <p className="text-red-500 text-sm">{errors.experience.message}</p>}
                </div>
                <DialogFooter>
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Отправка..." : "Отправить"}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </section>

      {/* Сообщество */}
      <section className="container py-12 text-center">
        <h2 className="text-3xl font-bold mb-4">Наше сообщество</h2>
        <div className="flex justify-center gap-4">
          <Button variant="outline" asChild>
            <Link href="https://discord.gg/mtiworld" target="_blank">
              <DiscIcon className="h-5 w-5 mr-2" /> Discord {/* Исправлено на DiscIcon */}
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="https://t.me/mtiworld" target="_blank">
              <Send className="h-5 w-5 mr-2" /> Telegram
            </Link>
          </Button>
        </div>
      </section>
    </main>
  );
}