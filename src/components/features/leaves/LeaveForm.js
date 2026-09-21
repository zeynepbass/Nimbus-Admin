import { Button } from "@/components/ui/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Label } from "@/components/ui/label";

const SELECT_STYLE =
  "w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500";

const LEAVE_TYPES = ["Yıllık İzin", "Mazeret İzni", "Rapor"];

function LabeledInput({ label, ...props }) {
  return (
    <InputGroup>
      <InputGroupInput {...props} />
      <InputGroupAddon>
        <Label className="pr-2">{label}</Label>
      </InputGroupAddon>
    </InputGroup>
  );
}

export default function LeaveForm({ values, onChange, onSave }) {
  const bind = (name) => ({
    value: values[name],
    onChange: (event) => onChange({ ...values, [name]: event.target.value }),
  });

  return (
    <div className="w-full max-w-md">
      <div className="rounded-xl border bg-white shadow-sm p-6 space-y-6">
        <div className="flex items-center gap-2 border-b pb-3">
          <h2 className="text-lg font-semibold">Personel İzin Güncelle</h2>
        </div>

        <LabeledInput label="Ad Soyad" placeholder="Ad Soyad" {...bind("fullName")} />
        <LabeledInput label="Departman" placeholder="Departman" {...bind("department")} />

        <div className="grid grid-cols-2 gap-4">
          <LabeledInput label="Başlangıç" type="date" {...bind("from")} />
          <LabeledInput label="Bitiş" type="date" {...bind("to")} />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <Label>İzin Türü</Label>
            <select className={SELECT_STYLE} {...bind("type")}>
              {LEAVE_TYPES.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1">
            <Label>Durum</Label>
            <select className={SELECT_STYLE} {...bind("status")}>
              <option value="active">Aktif</option>
              <option value="passive">Pasif</option>
            </select>
          </div>
        </div>

        <div className="flex justify-center">
          <Button onClick={onSave} className="w-1/2">
            Güncelle
          </Button>
        </div>
      </div>
    </div>
  );
}
