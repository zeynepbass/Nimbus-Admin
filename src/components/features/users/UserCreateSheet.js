"use client";

import { toast } from "sonner";
import FormSheet from "@/components/common/FormSheet";
import TextField from "@/components/common/TextField";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { ROLES } from "@/constants/roles";
import useForm from "@/hooks/useForm";

const EMPTY_USER = {
  name: "",
  email: "",
  tel: "",
  adres: "",
  role: ROLES.USER,
  resim: null,
};

const randomAvatar = () =>
  `https://randomuser.me/api/portraits/men/${Math.floor(Math.random() * 90)}.jpg`;

export default function UserCreateSheet({ onCreate }) {
  const { values, setValue, reset } = useForm(EMPTY_USER);

  const handleImageChange = (event) => {
    const file = event.target.files?.[0];
    if (file) setValue("resim", file);
  };

  const handleSave = () => {
    if (!values.name || !values.email) {
      toast.error("Ad ve Email zorunlu");
      return false;
    }

    onCreate({
      id: crypto.randomUUID(),
      name: values.name,
      email: values.email,
      tel: values.tel,
      adres: values.adres,
      role: values.role,
      resim: values.resim ? URL.createObjectURL(values.resim) : randomAvatar(),
    });
    reset();
    toast.success("Eklendi");
  };

  return (
    <FormSheet
      title="Yeni Kullanıcı Ekle"
      description="Kullanıcı bilgilerini girin ve Kaydet'e tıklayın."
      onSave={handleSave}
    >
      <div className="grid grid-cols-1 gap-4 mt-4 p-4">
        <div className="flex flex-col items-center gap-3">
          <Avatar className="h-24 w-24">
            <AvatarImage src={values.resim ? URL.createObjectURL(values.resim) : undefined} />
            <AvatarFallback>{values.name?.charAt(0) || "?"}</AvatarFallback>
          </Avatar>
          <Input type="file" accept="image/*" onChange={handleImageChange} className="w-full" />
        </div>

        <TextField placeholder="Ad Soyad" value={values.name} onChange={(v) => setValue("name", v)} />
        <TextField placeholder="Email" value={values.email} onChange={(v) => setValue("email", v)} />
        <TextField placeholder="Telefon" value={values.tel} onChange={(v) => setValue("tel", v)} />
        <TextField
          placeholder="Adres"
          multiline
          value={values.adres}
          onChange={(v) => setValue("adres", v)}
          className="[&_textarea]:resize-none"
        />
      </div>
    </FormSheet>
  );
}
