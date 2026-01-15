import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building2, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";

export function SuppliersList({
  suppliers,
  rating,
  setRating,
  setEditingId,
  editingId,
  handleSave,
}) {
  const statusStyles = {
    active: "bg-green-100 text-green-700",
    paused: "bg-yellow-100 text-yellow-700",
  };

  return (
    <Card className="w-full bg-transparent shadow-none border-none">
      <CardHeader>
        <CardTitle className="font-bold">TEDARİKÇİLER</CardTitle>
      </CardHeader>

      <CardContent
        className="space-y-4 border-0
      "
      >
        {suppliers.map((supplier) => (
          <div
            key={supplier.id}
            className="flex items-center justify-between rounded-xl border p-4 hover:bg-muted/50 transition"
          >
            <div className="space-y-1 mr-auto">
              <div className="flex items-center gap-2">
                <Building2 className="h-4 w-4 text-muted-foreground" />
                <p className="text-base font-semibold">{supplier.name}</p>
              </div>

              <p className="text-sm text-muted-foreground">
                Firma No: {supplier.id}
              </p>

              <p className="text-sm">
                Yetkili:{" "}
                <span className="font-medium">{supplier.contact.person}</span>
              </p>
            </div>

            <div className="flex flex-col items-end gap-2">
              {handleSave &&     
                   <Button
                onClick={() => {
                  setEditingId(supplier.id);
                  setRating(supplier.rating);
                }}
              >
                <Pencil />
              </Button>}
     
              {editingId === supplier.id ? (
                <input
                  autoFocus
                  value={rating}
                  type="number"
                  onChange={(e) => setRating(e.target.value)}
                  onBlur={() => handleSave(supplier.id)}
                  className="bg-[#6c120b] text-white gap-1"
                />
              ) : (
                <Badge className="bg-[#6c120b] text-white gap-1">
                  ⭐ {supplier.rating}
                </Badge>
              )}

              <Badge className={statusStyles[supplier.status]}>
                {supplier.status}
              </Badge>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
