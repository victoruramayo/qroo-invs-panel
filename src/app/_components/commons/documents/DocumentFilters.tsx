// En @/app/_components/documents/DocumentFilters.tsx
import { Search } from "@mui/icons-material";
import {
  FormControl,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import type { Psychologist } from "@prisma/client";
import type { DocumentType } from "@/app/_components/commons/menu";
import { useSession } from "next-auth/react";
import { Role } from "@/app/_components/model/user";

export interface FilterState {
  psychologistId: string;
  dictamenType: DocumentType;
  folioSearch: string;
  victimSearch: string;
  mpSearch: string;
}

interface DocumentFiltersProps {
  filters: FilterState;
  onFilterChange: (key: keyof FilterState, value: string) => void;
  psychologists: Psychologist[];
  documentsTypes: { label: string; value: string }[];
}

export default function DocumentFilters({
  filters,
  onFilterChange,
  psychologists,
  documentsTypes,
}: DocumentFiltersProps) {
  const { data: session } = useSession();
  return (
    <Grid container spacing={2} sx={{ mb: 4 }}>
      {/* Selector de Psicólogo */}
      {session?.user.role === Role.ADMIN && (
        <Grid size={{ xs: 12, md: 6, lg: 4 }}>
          <FormControl fullWidth>
            <InputLabel id="psychologist-select-label">Psicólogo</InputLabel>
            <Select
              labelId="psychologist-select-label"
              id="psychologist-select"
              value={filters.psychologistId}
              label="Selecciona psicólogo"
              onChange={(e) => onFilterChange("psychologistId", e.target.value)}
            >
              <MenuItem value="0">Todos</MenuItem>
              {psychologists.map((psicol) => (
                <MenuItem key={psicol.id} value={psicol.id}>
                  {psicol.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      )}

      {/* Selector de Tipo de Dictamen */}
      <Grid size={{ xs: 12, md: 6, lg: 4 }}>
        <FormControl fullWidth>
          <InputLabel id="dictamen-type-select-label">
            Tipo de dictamen
          </InputLabel>
          <Select
            labelId="dictamen-type-select-label"
            id="dictamen-type-select"
            value={filters.dictamenType}
            label="Tipo de dictamen"
            onChange={(e) => onFilterChange("dictamenType", e.target.value)}
          >
            <MenuItem value="N/A">Todos</MenuItem>
            {documentsTypes.map((type) => (
              <MenuItem key={type.value} value={type.value}>
                {type.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>

      {/* Búsqueda por Folio */}
      <Grid size={{ xs: 12, md: 6, lg: 4 }}>
        <FormControl fullWidth>
          <TextField
            fullWidth
            label="Buscar por folio"
            variant="outlined"
            value={filters.folioSearch}
            onChange={(e) => onFilterChange("folioSearch", e.target.value)}
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

      {/* Búsqueda por Víctima */}
      <Grid size={{ xs: 12, md: 6, lg: 4 }}>
        <FormControl fullWidth>
          <TextField
            fullWidth
            label="Buscar por víctima"
            variant="outlined"
            value={filters.victimSearch}
            onChange={(e) => onFilterChange("victimSearch", e.target.value)}
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

      {/* Búsqueda por MP */}
      <Grid size={{ xs: 12, md: 6, lg: 4 }}>
        <FormControl fullWidth>
          <TextField
            fullWidth
            label="Buscar por MP"
            variant="outlined"
            value={filters.mpSearch}
            onChange={(e) => onFilterChange("mpSearch", e.target.value)}
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
  );
}
