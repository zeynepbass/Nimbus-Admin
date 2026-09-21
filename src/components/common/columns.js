import { Checkbox } from "@/components/ui/checkbox";
import RowActions from "@/components/common/RowActions";
import SortableHeader from "@/components/common/SortableHeader";

export const sortableHeader = (title) =>
  function Header({ column }) {
    return <SortableHeader column={column} title={title} />;
  };

export const selectColumn = {
  id: "select",
  header: ({ table }) => (
    <Checkbox
      checked={
        table.getIsAllPageRowsSelected() ||
        (table.getIsSomePageRowsSelected() && "indeterminate")
      }
      onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
    />
  ),
  cell: ({ row }) => (
    <Checkbox
      checked={row.getIsSelected()}
      onCheckedChange={(value) => row.toggleSelected(!!value)}
    />
  ),
  enableSorting: false,
};

export const actionsColumn = (getActions, label) => ({
  id: "actions",
  cell: ({ row }) => <RowActions label={label} actions={getActions(row.original)} />,
});

export const copyAction = (value, label = "No Kopyala") => ({
  label,
  onClick: () => navigator.clipboard.writeText(value),
});

export const centered = (accessorKey, header) => ({
  accessorKey,
  header,
  cell: ({ row }) => (
    <div className="text-center font-semibold">{row.getValue(accessorKey)}</div>
  ),
});
