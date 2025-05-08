"use client";

import { DataGrid } from "@mui/x-data-grid";
import { api } from "@/trpc/react";
import { useEffect, useMemo, useState } from "react";
import { Box, Container, Grid } from "@mui/system";
import {
  Button,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { Add, Search } from "@mui/icons-material";
import { columns } from "@/app/_components/commons/documents/Columns";

export default function Documents() {
  const { data: psicols } = api.psychologists.getPsychologists.useQuery();
  const { data: documents, isLoading } = api.document.getDocuments.useQuery({});
  const dictamenTypes = [
    { label: "Todos", value: "N/A" },
    { label: "Dictamen", value: "DICTAMEN" },
    { label: "Informe", value: "INFORME" },
  ];

  const [selectedPsychologist, setSelectedPsychologist] = useState("0");
  const [selectedDictamenType, setSelectedDictamenType] = useState("N/A");
  const [folioSearch, setFolioSearch] = useState("");
  const [victimSearch, setVictimSearch] = useState("");
  const [mpSearch, setMpSearch] = useState("");
  const [documentsColumns, setDocumentsColumns] = useState([]);

  useEffect(() => {
    let isMounted = true;

    if (documents && isMounted) {
      const mappedDocs = documents.map((doc) => ({
        id: doc.id,
        victim: doc.victimName,
        psychologist: doc.psychologist.name,
        mp: doc.requestingMP,
        crime: doc.crime,
        reception: doc.createdAt.toLocaleDateString(),
        delivery: doc.deliveredAt?.toLocaleDateString() ?? "No entregado",
      }));
      setDocumentsColumns(mappedDocs);
    }

    return () => {
      isMounted = false;
    };
  }, [documents]);

  return (
    <>
      <Typography
        variant="h5"
        component="h1"
        gutterBottom
        sx={{ fontWeight: "bold" }}
      >
        Carpetas de investigación
      </Typography>
      <Button variant="contained" startIcon={<Add />} sx={{ my: 4 }}>
        Agregar Nuevo
      </Button>

      <Grid container spacing={2} sx={{ mb: 4 }}>
        {/* Psychologist Selector */}
        <Grid size={{ xs: 12, md: 6, lg: 4 }}>
          <FormControl fullWidth>
            <InputLabel id="psychologist-select-label">Psicólogo</InputLabel>
            <Select
              labelId="psychologist-select-label"
              id="psychologist-select"
              value={selectedPsychologist}
              label="Selecciona psicólogo"
              onChange={(e) => setSelectedPsychologist(e.target.value)}
            >
              <MenuItem value="0">Todos</MenuItem>
              {psicols?.map((psicol) => (
                <MenuItem key={psicol.id} value={psicol.id}>
                  {psicol.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid size={{ xs: 12, md: 6, lg: 4 }}>
          <FormControl fullWidth>
            <InputLabel id="dictamen-type-select-label">
              Tipo de dictamen
            </InputLabel>
            <Select
              labelId="dictamen-type-select-label"
              id="dictamen-type-select"
              value={selectedDictamenType}
              label="Tipo de dictamen"
              onChange={(e) => setSelectedDictamenType(e.target.value)}
            >
              {dictamenTypes.map((type) => (
                <MenuItem key={type.value} value={type.value}>
                  {type.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid size={{ xs: 12, md: 6, lg: 4 }}>
          <FormControl fullWidth>
            <TextField
              fullWidth
              label="Buscar por folio"
              variant="outlined"
              value={folioSearch}
              onChange={(e) => setFolioSearch(e.target.value)}
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <Search />
                    </InputAdornment>
                  ),
                },
              }}
            />
          </FormControl>
        </Grid>

        <Grid size={{ xs: 12, md: 6, lg: 4 }} offset={{ lg: 2 }}>
          <FormControl fullWidth>
            <TextField
              fullWidth
              label="Buscar por víctima"
              variant="outlined"
              value={victimSearch}
              onChange={(e) => setVictimSearch(e.target.value)}
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <Search />
                    </InputAdornment>
                  ),
                },
              }}
            />
          </FormControl>
        </Grid>

        <Grid size={{ xs: 12, md: 6, lg: 4 }} offset={{ md: 3, lg: 0 }}>
          <FormControl fullWidth>
            <TextField
              fullWidth
              label="Buscar por MP"
              variant="outlined"
              value={mpSearch}
              onChange={(e) => setMpSearch(e.target.value)}
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <Search />
                    </InputAdornment>
                  ),
                },
              }}
            />
          </FormControl>
        </Grid>
      </Grid>
      {/* DataGrid */}
      <Paper elevation={3} sx={{ overflowX: "auto" }}>
        <Box sx={{ width: "100%" }}>
          <DataGrid
            rows={documentsColumns}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { pageSize: 10, page: 0 },
              },
            }}
            pageSizeOptions={[10, 25, 50]}
            checkboxSelection={false}
            disableColumnMenu
            disableColumnSorting
            disableRowSelectionOnClick
          />
        </Box>
      </Paper>
    </>
  );
}
