"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { authFormSetting,getCurrentUser } from "@/lib/auth";
import { Button } from "@/components/ui/button";
 import { Input } from "@/components/ui/input";
  import { Label } from "@/components/ui/label";
  import { roles } from "@/helper/role";
// import { hasPermission, PERMISSIONS } from "@/helper/permissions";

export default function LoginPage() {
  const [email, setEmail] = useState("user@gmail.com");
  const [password, setPassword] = useState("123");
  const router = useRouter();

  const handleLogin = (e) => {
    e.preventDefault();
   const user = getCurrentUser();
    const userSetting = authFormSetting(email, password);
    if (!userSetting) return alert("Email veya şifre hatalı");
    if (user.role === roles.ADMIN) {
      router.replace("/panel");
    } else {
      router.replace("/dashboard");
    }
  };

  return (
    <form
      onSubmit={handleLogin}
      className="w-full max-w-sm space-y-4 bg-[rgb(243,243,243)] p-4 rounded-md"
    >
      {" "}
      <h1 className="text-[rgb(242,168,76)] text-center text-xl font-bold">
        Giriş Yap
      </h1>{" "}
      <div className="space-y-1">
        {" "}
        <Label htmlFor="email">Email</Label>{" "}
        <Input
          id="email"
          type="email"
          placeholder="mail@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />{" "}
      </div>{" "}
      <div className="space-y-1">
        {" "}
        <Label htmlFor="password">Şifre</Label>{" "}
        <Input
          id="password"
          type="password"
          placeholder="******"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />{" "}
      </div>{" "}
      <Button type="submit" className="w-full bg-[rgb(49,71,81)]">
        {" "}
        Giriş Yap{" "}
      </Button>{" "}
    </form>
  );
}
