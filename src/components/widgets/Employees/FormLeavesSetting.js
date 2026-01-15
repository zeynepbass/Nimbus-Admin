import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";

export default function FormLeaves({
  selectedUser,
  formLeaves,
  setFormLeaves,
  handleSaveUser,
}) {
  if (!selectedUser) return null;

  return (
    <div className="w-full max-w-md">
      <div className="rounded-xl border bg-white shadow-sm p-6 space-y-6">
        <div className="flex items-center gap-2 border-b pb-3">
          <h2 className="text-lg font-semibold">Personel İzin Güncelle</h2>
        </div>

        <InputGroup>
          <InputGroupInput
            value={formLeaves.fullName}
            onChange={(e) =>
              setFormLeaves({ ...formLeaves, fullName: e.target.value })
            }
            placeholder="Ad Soyad"
          />
          <InputGroupAddon>
            <Label className="pr-2">Ad Soyad</Label>
          </InputGroupAddon>
        </InputGroup>

        <InputGroup>
          <InputGroupInput
            value={formLeaves.department}
            onChange={(e) =>
              setFormLeaves({ ...formLeaves, department: e.target.value })
            }
            placeholder="Departman"
          />
          <InputGroupAddon>
            <Label className="pr-2">Departman</Label>
          </InputGroupAddon>
        </InputGroup>

        <div className="grid grid-cols-2 gap-4">
          <InputGroup>
            <InputGroupInput
              type="date"
              value={formLeaves.from}
              onChange={(e) =>
                setFormLeaves({ ...formLeaves, from: e.target.value })
              }
            />
            <InputGroupAddon>
              <Label className="pr-2">Başlangıç</Label>
            </InputGroupAddon>
          </InputGroup>

          <InputGroup>
            <InputGroupInput
              type="date"
              value={formLeaves.to}
              onChange={(e) =>
                setFormLeaves({ ...formLeaves, to: e.target.value })
              }
            />
            <InputGroupAddon>
              <Label className="pr-2">Bitiş</Label>
            </InputGroupAddon>
          </InputGroup>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <Label>İzin Türü</Label>
            <select
              className="w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formLeaves.type}
              onChange={(e) =>
                setFormLeaves({ ...formLeaves, type: e.target.value })
              }
            >
              <option value="yillik">Yıllık İzin</option>
              <option value="mazeret">Mazeret</option>
              <option value="rapor">Rapor</option>
            </select>
          </div>

          <div className="space-y-1">
            <Label>Durum</Label>
            <select
              className="w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formLeaves.status}
              onChange={(e) =>
                setFormLeaves({ ...formLeaves, status: e.target.value })
              }
            >
              <option value="active">Aktif</option>
              <option value="passive">Pasif</option>
            </select>
          </div>
        </div>

        <div className="flex justify-center">
          <Button onClick={handleSaveUser} className="w-1/2">
            Güncelle
          </Button>
        </div>
      </div>
    </div>
  );
}
