"use client";

import { Controller } from "react-hook-form";
import { type Psicologist } from "@/app/_components/model/psicologist";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { useCreateInvestigationForm } from "@/app/_components/hooks/useCreateDocumentForm";
import { useScreenSize } from "@/app/_components/hooks/useScreenSize";

interface InvestigationFormProps {
  isOpen: boolean;
  onToggle: () => void;
  psycologists: Psicologist[];
  typeDocuments: { label: string; value: string }[];
  isAdmin: boolean;
}

export default function InvestigationForm({
  isOpen,
  onToggle,
  psycologists,
  typeDocuments,
  isAdmin,
}: InvestigationFormProps) {
  const {
    // State
    errors,
    isCreating,

    // Form controllers
    register,
    control,

    // Actions
    handleFormSubmit,
    handleClose,
  } = useCreateInvestigationForm({ onToggle });
  const { isMedium } = useScreenSize();

  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      maxWidth="md"
      fullScreen={isMedium}
    >
      <DialogTitle
        sx={{
          fontWeight: "bold",
          color: "primary.main",
          bgcolor: "background.paper",
        }}
      >
        Crear nueva carpeta de investigación
      </DialogTitle>

      <DialogContent sx={{ bgcolor: "background.paper", p: 3 }}>
        <Typography variant="subtitle1" sx={{ mb: 3 }}>
          Rellena los campos para registrar la carpeta
        </Typography>

        <Box component="form" sx={{ mt: 1 }}>
          <TextField
            {...register("folio")}
            label="Folio"
            type="number"
            required
            fullWidth
            margin="normal"
            error={!!errors.folio}
            helperText={errors.folio?.message}
            size="small"
          />

          <TextField
            {...register("folderNumber")}
            label="Número de carpeta"
            required
            fullWidth
            margin="normal"
            error={!!errors.folderNumber}
            helperText={errors.folderNumber?.message}
            size="small"
          />

          <TextField
            {...register("victimName")}
            label="Nombre de la Víctima"
            required
            fullWidth
            margin="normal"
            error={!!errors.victimName}
            helperText={errors.victimName?.message}
            size="small"
          />

          <TextField
            {...register("requestingMP")}
            label="MP Solicitante"
            required
            fullWidth
            margin="normal"
            error={!!errors.requestingMP}
            helperText={errors.requestingMP?.message}
            size="small"
          />

          <TextField
            {...register("crime")}
            label="Delito"
            required
            fullWidth
            margin="normal"
            error={!!errors.crime}
            helperText={errors.crime?.message}
            size="small"
          />

          <TextField
            {...register("unit")}
            label="Unidad"
            required
            fullWidth
            margin="normal"
            error={!!errors.unit}
            helperText={errors.unit?.message}
            size="small"
          />
        </Box>

        {isAdmin && (
          <TextField
            {...register("psychologistId")}
            select
            label="Psicólogo asignado"
            required
            fullWidth
            margin="normal"
            error={!!errors.psychologistId}
            helperText={errors.psychologistId?.message}
            size="small"
          >
            <MenuItem value={0} disabled>
              Selecciona Psicólogo
            </MenuItem>
            {psycologists.map((psi) => (
              <MenuItem key={psi.id} value={psi.id}>
                {psi.name}
              </MenuItem>
            ))}
          </TextField>
        )}

        <TextField
          {...register("documentType")}
          select
          label="Tipo de Documento"
          required
          fullWidth
          margin="normal"
          error={!!errors.documentType}
          helperText={errors.documentType?.message}
          size="small"
        >
          <MenuItem value="" disabled>
            Selecciona Tipo de Documento
          </MenuItem>
          {typeDocuments.map((doc) => (
            <MenuItem key={doc.value} value={doc.value}>
              {doc.label}
            </MenuItem>
          ))}
        </TextField>

        {/* Fecha de recepción */}
        <Controller
          name="receivedAt"
          control={control}
          render={({ field }) => (
            <DatePicker
              label="Fecha de recepción"
              value={field.value ? dayjs(field.value) : null}
              onChange={field.onChange}
              slotProps={{
                textField: {
                  fullWidth: true,
                  margin: "normal",
                  size: "small",
                  required: true,
                  error: !!errors.receivedAt,
                  helperText: errors.receivedAt?.message,
                },
              }}
              views={["year", "month", "day"]}
            />
          )}
        />

        {/* Fecha de entrega (opcional) */}
        <Controller
          name="deliveredAt"
          control={control}
          render={({ field }) => (
            <DatePicker
              label="Fecha de entrega"
              value={field.value ? dayjs(field.value) : null}
              onChange={field.onChange}
              slotProps={{
                textField: {
                  fullWidth: true,
                  margin: "normal",
                  size: "small",
                  error: !!errors.deliveredAt,
                  helperText: errors.deliveredAt?.message,
                },
              }}
              views={["year", "month", "day"]}
            />
          )}
        />
      </DialogContent>

      <DialogActions sx={{ p: 2, bgcolor: "background.paper" }}>
        <Button onClick={handleClose} color="inherit" disabled={isCreating}>
          Cancelar
        </Button>
        <Button
          onClick={handleFormSubmit}
          variant="contained"
          color="primary"
          disabled={isCreating}
        >
          {isCreating ? "Guardando..." : "Guardar"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
