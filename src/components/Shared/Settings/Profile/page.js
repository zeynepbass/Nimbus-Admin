"use client"

import { useState } from "react"
import { Pencil, Camera } from "lucide-react"

import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function Profile() {
  const [isEdit, setIsEdit] = useState(false)

  return (
    <Card className="relative min-h-screen w-[320px] p-6 shadow-sm">
      

      <button
        onClick={() => setIsEdit(!isEdit)}
        className="absolute top-4 right-4 text-muted-foreground hover:text-primary transition"
      >
        <Pencil size={18} />
      </button>

      <CardContent className="flex flex-col items-center gap-6 px-0 pt-6">
        

        <div className="relative group">
            <img src="https://w7.pngwing.com/pngs/531/936/png-transparent-gallery-picture-photo-image-photography-camera-3d-icon-thumbnail.png"  width="100" height="100"/>


          {isEdit && (
            <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition cursor-pointer">
              <Camera className="text-white" />
            </div>
          )}
        </div>


        <div className="w-full space-y-4">
          <Input
            placeholder="Ad Soyad"
            defaultValue="Zeynep Bacaksız"
            disabled={!isEdit}
            className={isEdit ? "border-primary" : ""}
          />

          <Input
            placeholder="Email"
            defaultValue="zeynepbas@example.com"
            disabled={!isEdit}
            className={isEdit ? "border-primary" : ""}
          />

          <Input
            placeholder="Telefon"
            defaultValue="+90 555 555 55 55"
            disabled={!isEdit}
            className={isEdit ? "border-primary" : ""}
          />

          <Textarea
            placeholder="Adres"
            defaultValue="sdfsdfsdfsdfsdfsdf"
            disabled={!isEdit}
            className={`resize-none ${isEdit ? "border-primary" : ""}`}
          />
        </div>


        {isEdit && (
          <Button className="w-full mt-2">
            Güncelle
          </Button>
        )}
      </CardContent>
    </Card>
  )
}
