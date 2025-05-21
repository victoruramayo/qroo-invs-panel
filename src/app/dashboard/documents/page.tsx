"use client";

import {
  Box,
  Button,
  CircularProgress,
  Paper,
  Typography,
} from "@mui/material";
import { Add } from "@mui/icons-material";
import { DataGrid } from "@mui/x-data-grid";
import { getColumns } from "@/app/_components/commons/documents/Columns";
import DocumentFilters from "@/app/_components/commons/documents/DocumentFilters";
import InvestigationForm from "@/app/_components/commons/documents/InvestigationForm";
import { useDocumentsSearch } from "@/app/_components/hooks/useDocumentsSearch";
import { api } from "@/trpc/react";
import { useMemo, useState } from "react";
import { useScreenSize } from "@/app/_components/hooks/useScreenSize";
import { useSession } from "next-auth/react";
import { Role } from "@/app/_components/model/user";
import { is } from "date-fns/locale";

export default function Documents() {
  const {
    // Estado
    documentsMapperRow,
    isLoading,
    filters,
    // Datos
    documentTypes,
    // Funciones
    handleFilterChange,
  } = useDocumentsSearch();
  const { data: psychologists } = api.psychologists.getPsychologists.useQuery();
  const { isLarge } = useScreenSize();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const { data: session } = useSession();
  const isAdmin = useMemo(
    () => session?.user.role === Role.ADMIN,
    [session?.user],
  );

  const toggleModal = () => {
    setIsOpenModal(!isOpenModal);
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
        onClick={toggleModal}
      >
        Agregar Nuevo
      </Button>

      <DocumentFilters
        filters={filters}
        onFilterChange={handleFilterChange}
        psychologists={psychologists ?? []}
        documentsTypes={documentTypes}
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
              rows={documentsMapperRow}
              columns={getColumns(!isLarge, isAdmin)}
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
        psycologists={psychologists ?? []}
        isOpen={isOpenModal}
        typeDocuments={documentTypes}
        onToggle={toggleModal}
        isAdmin={isAdmin}
      />
    </>
  );
}
