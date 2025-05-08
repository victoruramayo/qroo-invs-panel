"use client";

import { Delete, Edit } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { Box } from "@mui/system";
import { type GridColDef, type GridRenderCellParams } from "@mui/x-data-grid";

// Cambia flex por width fijo en TODAS las columnas
export const columns: GridColDef[] = [
  { field: "id", headerName: "Folio", width: 120 },
  { field: "victim", headerName: "Víctima", width: 180 },
  { field: "mp", headerName: "MP", width: 150 },
  { field: "psychologist", headerName: "Psicólogo", width: 180 },
  { field: "crime", headerName: "Crimen", width: 180 },
  { field: "reception", headerName: "Recepción", width: 150 },
  { field: "delivery", headerName: "Entrega", width: 150 },
  {
    field: "actions",
    headerName: "Opciones",
    sortable: false,
    filterable: false,
    width: 120,
    renderCell: (params: GridRenderCellParams) => (
      <Box display="flex" justifyContent="center" alignItems="center">
        <IconButton
          size="small"
          color="secondary"
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