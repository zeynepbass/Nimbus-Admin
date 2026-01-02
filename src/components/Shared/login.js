"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import users from "@/data/users.json";
// import { hasPermission, PERMISSIONS } from "@/helper/permissions";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  // const router = useRouter();

  const handleLogin = (e) => {
    e.preventDefault();

    const user = users.find(u => u.email === email);
    if (!user) {
      alert("Kullanıcı yok");
      return;
    }

    localStorage.setItem("user", user.email);
    // if (hasPermission(user.role, PERMISSIONS.PANEL_VIEW)) {
    //   router.replace("/panel");
    // } else {
    //   router.replace("/dashboard");
    // }
  };

  return (
    <form onSubmit={handleLogin}>
      <input
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="email"
      />
      <button>Login</button>
    </form>
  );
}
