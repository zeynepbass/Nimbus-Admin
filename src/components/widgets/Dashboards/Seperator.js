import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export function SeparatorDemo({ data }) {
  return (
    <div className="space-y-4 overflow-y-auto max-h-100 ">
      <h6 className="font-bold ">EN ÇOK SATAN ÜRÜNLER</h6>
      {data.map((item, index) => (
        <div
          key={item.productId ?? index}
          className="flex items-center gap-4 rounded-xl border p-4 hover:shadow-sm transition"
        >
        
          <Avatar className="h-10 w-10 bg-gray-600">
            <AvatarFallback className="text-xs font-semibold">
              {item.name?.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>


          <div className="flex-1 space-y-1">
            <h4 className="text-sm font-semibold">{item.name}</h4>



            <Separator />

            <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-1">
                <span className="text-muted-foreground">ID:</span>
                <span className="font-semibold">{item.productId}</span>
              </div>         
              <Separator orientation="vertical"  />
              <div className="flex items-center gap-1">
                <span className="text-muted-foreground">Adet:</span>
                <span className="font-semibold">{item.totalQuantity}</span>
              </div>

              <Separator orientation="vertical" />

              <div className="flex items-center gap-1">
                <span className="text-muted-foreground">Ciro:</span>
                <span className="font-semibold text-[#6C120B]">
                  ₺{item.totalRevenue}
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
