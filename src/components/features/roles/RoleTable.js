"use client";

import { toast } from "sonner";
import DataTable from "@/components/common/DataTable";
import PageContainer from "@/components/common/PageContainer";
import StatusBadge from "@/components/common/StatusBadge";
import { actionsColumn, copyAction, selectColumn } from "@/components/common/columns";
import UserCreateSheet from "@/components/features/users/UserCreateSheet";
import { userColumns as col } from "@/components/features/users/userColumns";
import { ROLES, ROLE_BADGES } from "@/constants/roles";
import usersData from "@/data/users";
import useList from "@/hooks/useList";

const members = usersData.filter((user) => user.role === ROLES.USER);

const roleColumn = {
  accessorKey: "role",
  header: "Rol",
  cell: ({ row }) => <StatusBadge status={row.getValue("role")} map={ROLE_BADGES} />,
};

export default function RoleTable() {
  const { items: users, add, update, remove } = useList(members);

  const handleRoleUpdate = (id) => {
    update(id, { role: ROLES.TEST });
    toast.success("Güncellendi");
  };

  const columns = [
    selectColumn,
    { accessorKey: "id", header: "Role No" },
    col.avatar,
    col.name,
    col.email,
    roleColumn,
    actionsColumn((user) => [
      copyAction(user.email, "Email Kopyala"),
      { label: "Güncelle", onClick: () => handleRoleUpdate(user.id) },
      { label: "Sil", tone: "danger", onClick: () => remove(user.id) },
    ]),
  ];

  return (
    <PageContainer className="space-y-0">
      <DataTable
        title="Roller Listesi"
        searchPlaceholder="Role No ile filtrele"
        data={users.toReversed()}
        columns={columns}
        toolbarActions={<UserCreateSheet onCreate={add} />}
      />
    </PageContainer>
  );
}
