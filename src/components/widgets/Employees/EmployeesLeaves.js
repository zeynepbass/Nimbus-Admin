import {
    Avatar,
    AvatarFallback,
    AvatarImage,
  } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { useRouter } from "next/navigation";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,

    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu";
  export default function AvatarDemo({initialEmployees}) {
const router=useRouter();
    const today = new Date();

    const filteredData = initialEmployees.filter(emp =>
      emp.leaveDates.some(leave => {
        const fromDate = new Date(leave.from);
        return (
          fromDate.getFullYear() === today.getFullYear() &&
          fromDate.getMonth() === today.getMonth() &&
          fromDate.getDate() === today.getDate()
        );
      })
    );
    
  
    
    
    return (
      <div className="flex justify-between items-center gap-12">

        <div className="*:data-[slot=avatar]:ring-background flex -space-x-2 *:data-[slot=avatar]:ring-2 ">
            {filteredData.map((item)=>{
                return(
                    <div key={item.id}>
         
                    <Avatar>
                    <AvatarImage src={item.avatar} alt={item.name} />
                    <AvatarFallback>{item.avatar}</AvatarFallback>

                  </Avatar>
             

                  </div>
                )
            })}
    
  
        </div>
        <DropdownMenu >
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="h-8 w-8 p-0 ">
                <MoreHorizontal />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
      

              <DropdownMenuItem
                onClick={() => router.push("/humanresources/employees")}
              >
                Personel Listesini Gör
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => router.push("/humanresources/leaves")}>
             İzinleri Gör
              </DropdownMenuItem>
        
            </DropdownMenuContent>
          </DropdownMenu>

      </div>
    )
  }
  