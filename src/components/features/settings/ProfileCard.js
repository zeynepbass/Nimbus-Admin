"use client";

import { useEffect, useRef, useState } from "react";
import { Camera, Pencil } from "lucide-react";
import { toast } from "sonner";
import TextField from "@/components/common/TextField";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getCurrentUser, saveUser } from "@/lib/auth";

export default function ProfileCard() {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const fileRef = useRef(null);

  useEffect(() => {
    setUser(getCurrentUser());
  }, []);

  if (!user) return null;

  const handleChange = (key, value) => setUser((prev) => ({ ...prev, [key]: value }));

  const handleImageChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => handleChange("resim", reader.result);
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    saveUser(user);
    setIsEditing(false);
    toast.success("Profil güncellendi");
  };

  const fieldClass = isEditing ? "[&_input]:border-primary [&_textarea]:border-primary" : "";

  return (
    <Card className="relative h-auto w-[320px] p-6 shadow-sm">
      <h4 className="text-xl font-semibold text-gray-600">Profil</h4>

      <button
        onClick={() => setIsEditing(!isEditing)}
        className="absolute top-4 right-4 text-muted-foreground hover:text-primary"
      >
        <Pencil size={18} />
      </button>

      <CardContent className="flex flex-col items-center gap-6 px-0 pt-6">
        <div
          className="relative group cursor-pointer"
          onClick={() => isEditing && fileRef.current.click()}
        >
          <img
            src={user.resim || "/avatar.png"}
            alt={user.name}
            width="100"
            height="100"
            className="rounded-full object-cover"
          />

          {isEditing && (
            <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
              <Camera className="text-white" />
            </div>
          )}

          <input ref={fileRef} type="file" accept="image/*" hidden onChange={handleImageChange} />
        </div>

        <fieldset disabled={!isEditing} className="w-full space-y-4">
          <TextField
            placeholder="Ad Soyad"
            value={user.name}
            onChange={(value) => handleChange("name", value)}
            className={fieldClass}
          />
          <TextField
            placeholder="Email"
            value={user.email}
            onChange={(value) => handleChange("email", value)}
            className={fieldClass}
          />
          <TextField
            placeholder="Telefon"
            value={user.tel}
            onChange={(value) => handleChange("tel", value)}
            className={fieldClass}
          />
          <TextField
            placeholder="Adres"
            multiline
            value={user.adres}
            onChange={(value) => handleChange("adres", value)}
            className={`[&_textarea]:resize-none ${fieldClass}`}
          />
        </fieldset>

        {isEditing && (
          <Button className="w-full mt-2" onClick={handleSave}>
            Güncelle
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
