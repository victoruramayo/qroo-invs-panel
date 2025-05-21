"use client";

import { Delete, Edit } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { Box } from "@mui/system";
import { type GridColDef, type GridRenderCellParams } from "@mui/x-data-grid";

// Definición de anchos por defecto para cada columna
const columnWidths = {
  id: 100,
  victim: 150,
  mp: 120,
  psychologist: 150,
  crime: 150,
  reception: 120,
  delivery: 120,
  actions: 120,
};

// Función que devuelve las columnas según el breakpoint
export const getColumns = (
  needsFullColumns: boolean,
  isAdmin: boolean,
): GridColDef[] => {
  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "Folio",
      ...(needsFullColumns ? { flex: 1 } : { width: columnWidths.id }),
    },
    {
      field: "victim",
      headerName: "Víctima",
      ...(needsFullColumns ? { flex: 1 } : { width: columnWidths.victim }),
    },
    {
      field: "mp",
      headerName: "MP",
      ...(needsFullColumns ? { flex: 1 } : { width: columnWidths.mp }),
    },
    {
      field: "psychologist",
      headerName: "Psicólogo",
      ...(needsFullColumns
        ? { flex: 1 }
        : { width: columnWidths.psychologist }),
    },
    {
      field: "crime",
      headerName: "Crimen",
      ...(needsFullColumns ? { flex: 1 } : { width: columnWidths.crime }),
    },
    {
      field: "reception",
      headerName: "Recepción",
      ...(needsFullColumns ? { flex: 1 } : { width: columnWidths.reception }),
    },
    {
      field: "delivery",
      headerName: "Entrega",
      ...(needsFullColumns ? { flex: 1 } : { width: columnWidths.delivery }),
    },
  ];
  if (isAdmin) {
    columns.push({
      field: "actions",
      headerName: "Opciones",
      sortable: false,
      filterable: false,
      ...(needsFullColumns ? { flex: 1 } : { width: columnWidths.actions }),
      renderCell: (params: GridRenderCellParams) => (
        <Box display="flex" justifyContent="center" alignItems="center">
          <IconButton
            size="small"
            color="info"
            sx={{
              mx: 1,
            }}
          >
            <Edit fontSize="small" />
          </IconButton>
          <IconButton
            size="small"
            color="error"
            sx={{
              mr: 1,
            }}
          >
            <Delete fontSize="small" />
          </IconButton>
        </Box>
      ),
    });
  }
  return columns;
};
