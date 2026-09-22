"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { setByPath, getByPath } from "@/helper/objectPath";
import { cn } from "@/lib/utils";

function EditForm({ data, groups, onSave, onCancel }) {
  const [values, setValues] = useState(data);

  const handleChange = (path, value) =>
    setValues((prev) => setByPath(prev, path, value));

  return (
    <>
      {groups.map(({ className, fields }, index) => (
        <div key={index} className={cn("text-sm", className)}>
          {fields.map(({ path, label, multiline }) => {
            const Field = multiline ? Textarea : Input;

            return (
              <div key={path} className="space-y-1">
                <Label className="text-gray-500">{label}</Label>
                <Field
                  value={getByPath(values, path) ?? ""}
                  onChange={(event) => handleChange(path, event.target.value)}
                />
              </div>
            );
          })}
        </div>
      ))}

      <div className="flex justify-end gap-2 pt-4">
        <Button variant="outline" onClick={onCancel}>
          İptal
        </Button>
        <Button
          className="bg-[#6C120B] text-white"
          onClick={() => onSave(values)}
        >
          Kaydet
        </Button>
      </div>
    </>
  );
}

export default function EditDialog({
  open,
  onOpenChange,
  title,
  description,
  data,
  groups,
  onSave,
  className,
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={className}>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        {data && (
          <EditForm
            data={data}
            groups={groups}
            onSave={(values) => {
              onSave(values);
              onOpenChange(false);
            }}
            onCancel={() => onOpenChange(false)}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
