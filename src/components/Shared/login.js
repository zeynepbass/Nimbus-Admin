"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authFormSetting, getCurrentUser } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { roles } from "@/helper/role";
import { saveLastLogin } from "@/helper/last-login"

export default function LoginPage() {
  const [email, setEmail] = useState("user@gmail.com");
  const [password, setPassword] = useState("123");
  const router = useRouter();

  const handleLogin = (e) => {
    e.preventDefault();

    const user = getCurrentUser();
    const userSetting = authFormSetting(email, password);

    if (!userSetting) return alert("Email veya şifre hatalı");

    router.replace(
   user.role === roles.ADMIN ? "/role" : "/dashboard/summary"
    );
    saveLastLogin()
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form
        onSubmit={handleLogin}
        className="
          w-full max-w-sm
       rounded-md
          border
          border-gray-200
          p-6
          space-y-4
        "
      >

        <h1 className="text-lg font-semibold text-[#102E46] text-center">
          ERP Sistem Girişi
        </h1>


        <div className="space-y-1">
          <Label htmlFor="email" className="text-xs text-gray-600">
            E-posta
          </Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="
              h-9
              rounded-sm
              border-gray-300
              text-sm
              focus-visible:ring-0
              focus:border-gray-500
            "
          />
        </div>


        <div className="space-y-1">
          <Label htmlFor="password" className="text-xs text-gray-600">
            Şifre
          </Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="
              h-9
              rounded-sm
              border-gray-300
              text-sm
              focus-visible:ring-0
              focus:border-gray-500
            "
          />
        </div>


        <Button
          type="submit"
          className="
            w-full
            h-9
            rounded-sm
            bg-[#102E46]
            hover:bg-[#DEE6F1]
            text-sm
            font-normal
          "
        >
          Giriş
        </Button>


        <p className="text-[11px] text-gray-400 text-center pt-2">
          Yetkisiz erişimler kayıt altına alınmaktadır
        </p>
      </form>
    </div>
  );
}
