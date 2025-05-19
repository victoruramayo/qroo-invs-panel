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
  actions: 120
};

// Función que devuelve las columnas según el breakpoint
export const getColumns = (isLargeScreen: boolean): GridColDef[] => {
  return [
    { 
      field: "id", 
      headerName: "Folio", 
      ...(isLargeScreen ? { flex: 1 } : { width: columnWidths.id }) 
    },
    { 
      field: "victim", 
      headerName: "Víctima", 
      ...(isLargeScreen ? { flex: 1 } : { width: columnWidths.victim }) 
    },
    { 
      field: "mp", 
      headerName: "MP", 
      ...(isLargeScreen ? { flex: 1 } : { width: columnWidths.mp }) 
    },
    { 
      field: "psychologist", 
      headerName: "Psicólogo", 
      ...(isLargeScreen ? { flex: 1 } : { width: columnWidths.psychologist }) 
    },
    { 
      field: "crime", 
      headerName: "Crimen", 
      ...(isLargeScreen ? { flex: 1 } : { width: columnWidths.crime }) 
    },
    { 
      field: "reception", 
      headerName: "Recepción", 
      ...(isLargeScreen ? { flex: 1 } : { width: columnWidths.reception }) 
    },
    { 
      field: "delivery", 
      headerName: "Entrega", 
      ...(isLargeScreen ? { flex: 1 } : { width: columnWidths.delivery }) 
    },
    {
      field: "actions",
      headerName: "Opciones",
      sortable: false,
      filterable: false,
      ...(isLargeScreen ? { flex: 1 } : { width: columnWidths.actions }),
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
    },
  ];
};
