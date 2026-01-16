"use client"

import { useState, useEffect, useRef } from "react"
import { Pencil, Camera } from "lucide-react"

import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"

export default function Profile() {
  const [isEdit, setIsEdit] = useState(false)
  const [user, setUser] = useState(null)
  const fileRef = useRef(null)

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"))
    setUser(storedUser)
  }, [])

  if (!user) return null

  const handleChange = (key, value) => {
    setUser(prev => ({ ...prev, [key]: value }))
  }


  const handleImageChange = (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onloadend = () => {
      setUser(prev => ({
        ...prev,
        resim: reader.result, 
      }))
    }
    reader.readAsDataURL(file)
  }

  const handleUpdate = () => {
    localStorage.setItem("user", JSON.stringify(user))
    setIsEdit(false)
  }

  return (
    <Card className="relative h-auto w-[320px] p-6 shadow-sm">
      <h4 className="text-xl font-semibold text-gray-600">Profil</h4>

      <button
        onClick={() => setIsEdit(!isEdit)}
        className="absolute top-4 right-4 text-muted-foreground hover:text-primary"
      >
        <Pencil size={18} />
      </button>

      <CardContent className="flex flex-col items-center gap-6 px-0 pt-6">


        <div
          className="relative group cursor-pointer"
          onClick={() => isEdit && fileRef.current.click()}
        >
          <img
            src={user.resim || "/avatar.png"}
            width="100"
            height="100"
            className="rounded-full object-cover"
          />

          {isEdit && (
            <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
              <Camera className="text-white" />
            </div>
          )}

          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            hidden
            onChange={handleImageChange}
          />
        </div>


        <div className="w-full space-y-4">
          <Input
            value={user.name}
            disabled={!isEdit}
            onChange={(e) => handleChange("name", e.target.value)}
            placeholder="Ad Soyad"
            className={isEdit ? "border-primary" : ""}
          />

          <Input
            value={user.email}
            disabled={!isEdit}
            onChange={(e) => handleChange("email", e.target.value)}
            placeholder="Email"
            className={isEdit ? "border-primary" : ""}
          />

          <Input
            value={user.tel}
            disabled={!isEdit}
            onChange={(e) => handleChange("tel", e.target.value)}
            placeholder="Telefon"
            className={isEdit ? "border-primary" : ""}
          />

          <Textarea
            value={user.adres}
            disabled={!isEdit}
            onChange={(e) => handleChange("adres", e.target.value)}
            placeholder="Adres"
            className={`resize-none ${isEdit ? "border-primary" : ""}`}
          />
        </div>

        {isEdit && (
          <Button className="w-full mt-2" onClick={handleUpdate}>
            Güncelle
          </Button>
        )}
      </CardContent>
    </Card>
  )
}
