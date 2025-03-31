// app/store/PurchaseDialog.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { CreditCard } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

export default function PurchaseDialog({ product }) {
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handlePurchase = async () => {
    if (!nickname || !email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast({
        title: "Ошибка",
        description: "Пожалуйста, заполните все поля корректно.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      // Пример запроса к API (замените на реальный эндпоинт)
      const response = await fetch("/api/purchase", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId: product.id, nickname, email, paymentMethod }),
      });

      if (!response.ok) throw new Error("Ошибка оплаты");

      const data = await response.json();
      toast({
        title: "Успех",
        description: `Вы успешно приобрели ${product.name}!`,
      });
      // Если API возвращает URL оплаты, перенаправляем
      if (data.paymentUrl) {
        window.location.href = data.paymentUrl;
      } else {
        setNickname("");
        setEmail("");
      }
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось обработать покупку. Попробуйте снова.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!product) return null;

  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Покупка {product.name}</DialogTitle>
        <DialogDescription>
          Заполните данные для покупки привилегии {product.name} за {product.price}
        </DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <div className="grid gap-2">
          <Label htmlFor="nickname">Игровой ник</Label>
          <Input
            id="nickname"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            placeholder="Введите ваш игровой ник"
            disabled={isSubmitting}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Введите ваш email"
            disabled={isSubmitting}
          />
        </div>
        <div className="grid gap-2">
          <Label>Способ оплаты</Label>
          <RadioGroup
            defaultValue="card"
            onValueChange={setPaymentMethod}
            className="grid gap-3"
            disabled={isSubmitting}
          >
            <div className="flex items-center space-x-2 border rounded-md p-3">
              <RadioGroupItem value="card" id="card" />
              <Label htmlFor="card" className="flex-1 cursor-pointer">
                <div className="flex items-center justify-between">
                  <span>Банковская карта</span>
                  <div className="flex gap-1">
                    <div className="h-6 w-10 relative">
                      <Image src="/placeholder.svg?height=24&width=40" alt="Мир" fill className="object-contain" />
                    </div>
                    <div className="h-6 w-10 relative">
                      <Image src="/placeholder.svg?height=24&width=40" alt="Visa" fill className="object-contain" />
                    </div>
                    <div className="h-6 w-10 relative">
                      <Image src="/placeholder.svg?height=24&width=40" alt="Mastercard" fill className="object-contain" />
                    </div>
                  </div>
                </div>
              </Label>
            </div>
            <div className="flex items-center space-x-2 border rounded-md p-3">
              <RadioGroupItem value="yoomoney" id="yoomoney" />
              <Label htmlFor="yoomoney" className="flex-1 cursor-pointer">
                <div className="flex items-center justify-between">
                  <span>YooMoney</span>
                  <div className="h-6 w-16 relative">
                    <Image src="/placeholder.svg?height=24&width=64" alt="YooMoney" fill className="object-contain" />
                  </div>
                </div>
              </Label>
            </div>
          </RadioGroup>
        </div>
      </div>
      <DialogFooter>
        <Button type="button" onClick={handlePurchase} className="w-full" disabled={isSubmitting}>
          <CreditCard className="h-4 w-4 mr-2" />
          {isSubmitting ? "Обработка..." : `Оплатить ${product.price}`}
        </Button>
      </DialogFooter>
    </DialogContent>
  );
}