import { sortableHeader } from "@/components/common/columns";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

export const userColumns = {
  avatar: {
    accessorKey: "resim",
    header: sortableHeader("Resim"),
    cell: ({ row }) => (
      <div className="flex items-center justify-center gap-3">
        <Avatar className="h-8 w-8">
          <AvatarImage src={row.original.resim} />
        </Avatar>
      </div>
    ),
  },
  name: {
    accessorKey: "name",
    header: "Ad Soyad",
    cell: ({ row }) => <span>{row.getValue("name")}</span>,
  },
  email: {
    accessorKey: "email",
    header: sortableHeader("Email"),
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground">{row.getValue("email")}</span>
    ),
  },
};
