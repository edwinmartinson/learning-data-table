import { useMemo, useState } from "react";
import { name, flag } from "country-emoji";
import { AgGridReact } from "ag-grid-react";
import {
  type ColDef,
  AllCommunityModule,
  ModuleRegistry,
  themeQuartz,
} from "ag-grid-community";

import type { User } from "./type";
import { createRandomUsers } from "./utils/faker";

const myTheme = themeQuartz.withParams({
  backgroundColor: "#1f2836",
  browserColorScheme: "dark",
  chromeBackgroundColor: {
    ref: "foregroundColor",
    mix: 0.07,
    onto: "backgroundColor",
  },
  foregroundColor: "#FFF",
  headerFontSize: 14,
});

ModuleRegistry.registerModules([AllCommunityModule]);

export default function App() {
  const [users, setUsers] = useState<User[]>(() => createRandomUsers(50));

  const [colDef, setColDef] = useState<ColDef<User>[]>([
    { field: "firstName" },
    { field: "lastName" },
    { field: "dob", headerName: "Date of Birth" },
    { field: "email" },
    { field: "phoneNo", headerName: "Phone Number" },
    {
      field: "countryCode",
      headerName: "Country",
      valueFormatter: (params) => `${flag(params.value)} ${name(params.value)}`,
    },
    { field: "status" },
  ]);

  const defaultColDef = useMemo(
    () => ({
      filter: true,
    }),
    [],
  );

  return (
    <main className="mx-auto grid h-full max-w-7xl grid-rows-1 gap-6 px-4 py-6 xl:px-0">
      <AgGridReact
        theme={myTheme}
        rowData={users}
        columnDefs={colDef}
        defaultColDef={defaultColDef}
        pagination={true}
      />
    </main>
  );
}
