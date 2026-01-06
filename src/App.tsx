import { useState } from "react";
import { flag, name } from "country-emoji";
import {
  Activity,
  Calendar,
  ChevronDownIcon,
  ChevronFirstIcon,
  ChevronLastIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronUpIcon,
  CircleAlertIcon,
  Columns3,
  ListFilterIcon,
  Mail,
  MapPin,
  Phone,
  Plus,
  TrashIcon,
  UserRound,
} from "lucide-react";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type Column,
  type ColumnDef,
  type ColumnFiltersState,
  type PaginationState,
  type SortingState,
  type VisibilityState,
} from "@tanstack/react-table";

import type { User } from "./type";

import { cn } from "./lib/utils";
import { Label } from "./components/ui/label";
import { Badge } from "./components/ui/badge";
import { Button } from "./components/ui/button";
import { Checkbox } from "./components/ui/checkbox";
import { createRandomUsers } from "./utils/faker";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "./components/ui/input-group";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "./components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectLabel,
} from "./components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./components/ui/alert-dialog";

const defaultColumns: ColumnDef<User>[] = [
  {
    id: "select",
    enableHiding: false,
    enableSorting: false,
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
  },
  {
    accessorFn: (row) => `${row.firstName} ${row.lastName}`,
    id: "name",
    header: ({ header }) => (
      <div
        className={cn(
          "flex items-center justify-between",
          header.column.getCanSort() && "flex h-full cursor-pointer",
        )}
        onClick={header.column.getToggleSortingHandler()}
      >
        <div className="flex items-center gap-2">
          <UserRound className="size-4" />
          <span>Name</span>
        </div>

        {{
          asc: (
            <ChevronUpIcon
              aria-hidden="true"
              className="shrink-0 opacity-60"
              size={16}
            />
          ),
          desc: (
            <ChevronDownIcon
              aria-hidden="true"
              className="shrink-0 opacity-60"
              size={16}
            />
          ),
        }[header.column.getIsSorted() as string] ?? null}
      </div>
    ),
    cell: (info) => info.getValue(),
    filterFn: "includesString",
  },
  {
    accessorKey: "dob",
    header: () => (
      <div className="flex items-center gap-2">
        <Calendar className="size-4" />
        <span>Date Of Birth</span>
      </div>
    ),
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "email",
    header: () => (
      <div className="flex items-center gap-2">
        <Mail className="size-4" />
        <span>Email</span>
      </div>
    ),
    cell: (info) => info.getValue(),
    filterFn: "includesString",
  },
  {
    accessorKey: "phoneNo",
    header: () => (
      <div className="flex items-center gap-2">
        <Phone className="size-4" />
        <span>Phone</span>
      </div>
    ),
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "counrtyCode",
    id: "country",
    header: () => (
      <div className="flex items-center gap-2">
        <MapPin className="size-4" />
        <span>Country</span>
      </div>
    ),
    cell: (info) => (
      <p>
        {flag(info.getValue<string>())} {name(info.getValue<string>())}
      </p>
    ),
  },
  {
    accessorKey: "status",
    filterFn: "equalsString",
    header: () => (
      <div className="flex items-center gap-2">
        <Activity className="size-4" />
        <span>Status</span>
      </div>
    ),
    cell: ({ row }) => (
      <Badge
        className={cn(
          row.getValue("status") === "INACTIVE" &&
            "bg-muted-foreground/60 text-primary-foreground",
        )}
      >
        {row.getValue("status")}
      </Badge>
    ),
  },
];

export function App() {
  const [users, setUsers] = useState<User[]>(() => createRandomUsers(50));

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 20,
  });
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState<string>("");
  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    data: users,
    columns: defaultColumns,
    state: {
      columnVisibility,
      columnFilters,
      globalFilter,
      pagination,
      sorting,
    },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
  });

  const statusCol = table.getColumn("status");

  const handleDeleteRows = () => {
    const selectedRows = table.getSelectedRowModel().rows;
    const updatedData = users.filter(
      (item) =>
        !selectedRows.some((row) => row.original.userId === item.userId),
    );
    setUsers(updatedData);
    table.resetRowSelection();
  };

  return (
    <main className="mx-auto grid h-full max-w-7xl grid-rows-[32px_1fr_32px] gap-6 px-4 py-6 xl:px-0">
      <div className="flex justify-between">
        <div className="flex gap-2">
          <InputGroup>
            <InputGroupInput
              type="text"
              placeholder="Search by name or email"
              value={globalFilter}
              onChange={(e) => setGlobalFilter(e.target.value)}
            />
            <InputGroupAddon>
              <ListFilterIcon />
            </InputGroupAddon>
          </InputGroup>

          {statusCol && <StatusFilter column={statusCol} />}

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant={"secondary"}>
                <Columns3 className="stroke-muted-foreground" />
                <span>View</span>
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent>
              <DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
              {table.getAllLeafColumns().map((column) => (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  checked={column.getIsVisible()}
                  onCheckedChange={(value) => column.toggleVisibility(!!value)}
                  onSelect={(event) => event.preventDefault()}
                >
                  {column.id}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="flex gap-2">
          {table.getSelectedRowModel().rows.length > 0 && (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button className="ml-auto" variant="outline">
                  <TrashIcon
                    aria-hidden="true"
                    className="-ms-1 opacity-60"
                    size={16}
                  />
                  Delete
                  <span className="bg-background text-muted-foreground/70 -me-1 inline-flex h-5 max-h-full items-center rounded border px-1 font-[inherit] text-[0.625rem] font-medium">
                    {table.getSelectedRowModel().rows.length}
                  </span>
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <div className="flex flex-col gap-2 max-sm:items-center sm:flex-row sm:gap-4">
                  <div
                    aria-hidden="true"
                    className="flex size-9 shrink-0 items-center justify-center rounded-full border"
                  >
                    <CircleAlertIcon className="opacity-80" size={16} />
                  </div>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete{" "}
                      {table.getSelectedRowModel().rows.length} selected{" "}
                      {table.getSelectedRowModel().rows.length === 1
                        ? "row"
                        : "rows"}
                      .
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                </div>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleDeleteRows}>
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}

          <Button variant={"secondary"}>
            <Plus className="stroke-muted-foreground" />
            <span>Add user</span>
          </Button>
        </div>
      </div>

      <Table width={table.getTotalSize()}>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id} className="bg-muted/50">
              {headerGroup.headers.map((header) => (
                <TableHead
                  key={header.id}
                  style={{ width: `${header.getSize()}px` }}
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext(),
                  )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.map((row) => (
            <TableRow
              data-state={row.getIsSelected() && "selected"}
              key={row.id}
            >
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id} width={cell.column.getSize()}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="flex justify-between">
        <Label className="flex items-center gap-2">
          <span className="text-sm font-semibold">Rows per page</span>

          <Select
            defaultValue="10"
            value={table.getState().pagination.pageSize.toString()}
            onValueChange={(value) => table.setPageSize(Number(value))}
          >
            <SelectTrigger>
              <SelectValue placeholder="Count" />
            </SelectTrigger>
            <SelectContent>
              {[10, 20, 30, 40, 50].map((value) => (
                <SelectItem key={value} value={value.toString()}>
                  {value}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Label>

        <div className="flex items-center gap-3">
          <p>
            Page {table.getState().pagination.pageIndex + 1}
            <span className="text-muted-foreground"> of </span>
            {table.getPageCount().toLocaleString()}
          </p>
          <div className="flex">
            <Button
              variant={"secondary"}
              size={"icon"}
              onClick={() => table.firstPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <ChevronFirstIcon />
            </Button>
            <Button
              variant={"secondary"}
              size={"icon"}
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <ChevronLeftIcon />
            </Button>
            <Button
              variant={"secondary"}
              size={"icon"}
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              <ChevronRightIcon />
            </Button>
            <Button
              variant={"secondary"}
              size={"icon"}
              onClick={() => table.lastPage()}
              disabled={!table.getCanNextPage()}
            >
              <ChevronLastIcon />
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}

type StatusFilterProps = {
  column: Column<User, unknown>;
};

function StatusFilter({ column }: StatusFilterProps) {
  return (
    <Select
      value={(column.getFilterValue() as string) ?? "all"}
      onValueChange={(value) =>
        column.setFilterValue(value === "all" ? undefined : value)
      }
    >
      <SelectTrigger className="w-45">
        <SelectValue placeholder="Status" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Filter status</SelectLabel>
          <SelectItem value="all">All</SelectItem>
          <SelectItem value="ACTIVE">Active</SelectItem>
          <SelectItem value="INACTIVE">Inactive</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

export default App;
