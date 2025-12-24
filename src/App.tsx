import {
  ChevronFirstIcon,
  ChevronLastIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  Columns3,
  Funnel,
  ListFilterIcon,
  Plus,
  Trash2,
} from "lucide-react";
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
import { Button } from "./components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./components/ui/select";
import { Label } from "./components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./components/ui/table";
import { Checkbox } from "./components/ui/checkbox";
import { Badge } from "./components/ui/badge";

export function App() {
  return (
    <main className="mx-auto grid h-full max-w-5xl grid-rows-[32px_1fr_32px] gap-6 px-4 py-6 lg:px-0">
      <div className="flex justify-between">
        <div className="flex gap-2">
          <InputGroup>
            <InputGroupInput
              type="text"
              placeholder="Search by name or email"
            />
            <InputGroupAddon>
              <ListFilterIcon />
            </InputGroupAddon>
          </InputGroup>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant={"secondary"}>
                <Funnel className="stroke-muted-foreground" />
                <span>Status</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Filter Status</DropdownMenuLabel>
              <DropdownMenuCheckboxItem checked>All</DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem>Active</DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem>Inactive</DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant={"secondary"}>
                <Columns3 className="stroke-muted-foreground" />
                <span>View</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
              <DropdownMenuCheckboxItem checked>
                First name
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem checked>
                Last name
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem checked>Email</DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem checked>
                Contact
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem checked>
                Country
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="flex gap-2">
          <Button variant={"secondary"}>
            <Trash2 className="stroke-muted-foreground" />
            <span>Delete</span>
          </Button>

          <Button variant={"secondary"}>
            <Plus className="stroke-muted-foreground" />
            <span>Add user</span>
          </Button>
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50">
            <TableHead>
              <Checkbox />
            </TableHead>
            <TableHead>First name</TableHead>
            <TableHead>Last name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Country</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>
              <Checkbox />
            </TableCell>
            <TableCell>Edwin</TableCell>
            <TableCell>Martinson</TableCell>
            <TableCell>edwinotumartinson@outlook.com</TableCell>
            <TableCell>0242430112</TableCell>
            <TableCell> 🇬🇭 Ghana</TableCell>
            <TableCell>
              {/*<Badge className="bg-muted-foreground/60 text-primary-foreground">
                Inactive
              </Badge>*/}
              <Badge className="">Active</Badge>
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell>
              <Checkbox />
            </TableCell>
            <TableCell>Kelcy</TableCell>
            <TableCell>Martinson</TableCell>
            <TableCell>kelcymart@outlook.com</TableCell>
            <TableCell>0233445566</TableCell>
            <TableCell> 🇬🇭 Ghana</TableCell>
            <TableCell>
              <Badge className="bg-muted-foreground/60 text-primary-foreground">
                Inactive
              </Badge>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>

      <div className="flex justify-between">
        <Label className="flex items-center gap-2">
          <span className="text-sm font-semibold">Rows per page</span>

          <Select defaultValue="1">
            <SelectTrigger>
              <SelectValue placeholder="Count" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">1</SelectItem>
              <SelectItem value="2">2</SelectItem>
              <SelectItem value="3">3</SelectItem>
              <SelectItem value="4">4</SelectItem>
              <SelectItem value="5">5</SelectItem>
            </SelectContent>
          </Select>
        </Label>

        <div className="flex items-center gap-3">
          <p>
            Page 1 <span className="text-muted-foreground">of</span> 5
          </p>
          <div className="flex">
            <Button variant={"secondary"} size={"icon"}>
              <ChevronFirstIcon />
            </Button>
            <Button variant={"secondary"} size={"icon"}>
              <ChevronLeftIcon />
            </Button>
            <Button variant={"secondary"} size={"icon"}>
              <ChevronRightIcon />
            </Button>
            <Button variant={"secondary"} size={"icon"}>
              <ChevronLastIcon />
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}

export default App;
