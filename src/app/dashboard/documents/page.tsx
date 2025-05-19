"use client";

import { DataGrid } from "@mui/x-data-grid";
import { api } from "@/trpc/react";
import { useMemo, useState } from "react";
import { Box, useMediaQuery } from "@mui/system";
import { Button, CircularProgress, Paper, Typography } from "@mui/material";
import { Add } from "@mui/icons-material";
import { getColumns } from "@/app/_components/commons/documents/Columns";
import DocumentFilters, {
  type FilterState,
} from "@/app/_components/commons/documents/DocumentFilters";
import { useTheme } from "@mui/material/styles";
import { keepPreviousData } from "@tanstack/react-query";
import { useDebounce } from "use-debounce";
import InvestigationForm from "@/app/_components/commons/documents/InvestigationForm";
import { DocumentType } from "@/app/_components/commons/menu";

const dictamenTypes = [
  { label: "Dictamen", value: DocumentType.DICTAMEN },
  { label: "Informe", value: DocumentType.INFORME },
];

export default function Documents() {
  const { data: psicols } = api.psychologists.getPsychologists.useQuery();
  const [filters, setFilters] = useState<FilterState>({
    psychologistId: "0",
    dictamenType: DocumentType.NA,
    folioSearch: "",
    victimSearch: "",
    mpSearch: "",
  });

  const [debouncedVictimSearch] = useDebounce(filters.victimSearch, 500);
  const [debouncedMpSearch] = useDebounce(filters.mpSearch, 500);
  const [debouncedFolioSearch] = useDebounce(filters.folioSearch, 500);
  const [isOpenModal, setIsOpenModal] = useState(false);

  // Memoizar los parámetros de consulta
  const queryParams = useMemo(
    () => ({
      folio: debouncedFolioSearch,
      victimName: debouncedVictimSearch,
      requestingMP: debouncedMpSearch,
      psychologistId:
        filters.psychologistId !== "0"
          ? Number(filters.psychologistId)
          : undefined,
      documentType: filters.dictamenType,
    }),
    [
      debouncedFolioSearch,
      debouncedVictimSearch,
      debouncedMpSearch,
      filters.psychologistId,
      filters.dictamenType,
    ],
  );

  // Consulta usando los parámetros memorizados
  const { data: documents, isLoading } = api.document.getDocuments.useQuery(
    queryParams,
    { placeholderData: keepPreviousData },
  );

  const onOpenModal = () => {
    setIsOpenModal(true);
  };
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));

  const documentsColumns = useMemo(() => {
    console.log("deb");
    if (documents) {
      return documents.map((doc) => ({
        id: doc.id.toString(),
        victim: doc.victimName,
        psychologist: doc.psychologist.name,
        mp: doc.requestingMP,
        crime: doc.crime,
        reception: doc.createdAt.toLocaleDateString(),
        delivery: doc.deliveredAt?.toLocaleDateString() ?? "No entregado",
      }));
    }
    return [];
  }, [documents]);

  const handleFilterChange = (key: keyof FilterState, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

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
      <Button
        variant="contained"
        startIcon={<Add />}
        sx={{ my: 4 }}
        onClick={onOpenModal}
      >
        Agregar Nuevo
      </Button>

      <DocumentFilters
        filters={filters}
        onFilterChange={handleFilterChange}
        psychologists={psicols ?? []}
        documentsTypes={dictamenTypes}
      />

      {/* DataGrid */}
      {isLoading ? (
        <Box display="flex" justifyContent="center" alignItems="center">
          <CircularProgress />
        </Box>
      ) : (
        <Paper elevation={3} sx={{ overflowX: "auto" }}>
          <Box sx={{ width: "100%" }}>
            <DataGrid
              rows={documentsColumns}
              columns={getColumns(isLargeScreen)}
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
      )}
      <InvestigationForm
        psycologists={psicols ?? []}
        isOpen={isOpenModal}
        typeDocuments={dictamenTypes}
        onToggle={() => {
          setIsOpenModal(!isOpenModal);
        }}
      />
    </>
  );
}
