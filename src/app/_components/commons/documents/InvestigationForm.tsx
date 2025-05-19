"use client";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { DocumentType } from "@/app/_components/commons/menu";
import { z } from "zod";
import { api } from "@/trpc/react";
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
  useTheme,
} from "@mui/material";
import { useMediaQuery } from "@mui/system";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";

export default function InvestigationForm({
  isOpen,
  onToggle,
  psycologists,
  typeDocuments,
}: {
  isOpen: boolean;
  onToggle: () => void;
  psycologists: Psicologist[];
  typeDocuments: { label: string; value: string }[];
}) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const investigationSchema = z.object({
    folio: z.string().min(3, "El folio debe tener al menos 3 caracteres"),
    folderNumber: z
      .string()
      .min(3, "El folio debe tener al menos 3 caracteres"),
    victimName: z.string().min(3, "El nombre de la víctima es obligatorio"),
    requestingMP: z.string().min(3, "El MP solicitante es obligatorio"),
    crime: z.string().min(3, "El delito es obligatorio"),
    unit: z.string().min(3, "La unidad es obligatoria"),
    psychologistId: z.coerce
      .number({ message: "Selecciona un psicólogo" })
      .min(1),
    documentType: z.enum([DocumentType.DICTAMEN, DocumentType.INFORME], {
      message: "Debes seleccionar un tipo de documento",
    }),
    receivedAt: z.preprocess(
      (value) => (dayjs.isDayjs(value) ? value.toDate() : undefined),
      z.date(),
    ),
    deliveredAt: z.preprocess(
      (value) => (dayjs.isDayjs(value) ? value.toDate() : undefined),
      z.date().optional(),
    ),
  });

  type FormData = z.infer<typeof investigationSchema>;

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
    getValues,
  } = useForm({
    resolver: zodResolver(investigationSchema),
    defaultValues: {
      folio: "",
      folderNumber: "",
      victimName: "",
      requestingMP: "",
      crime: "",
      unit: "",
      documentType: "",
      psychologistId: 0,
      receivedAt: dayjs() as unknown as Date,
      deliveredAt: undefined,
    } as unknown as FormData,
  });

  const utils = api.useUtils();
  const createInvestigation = api.document.create.useMutation({
    onSuccess: async () => {
      // Refrescar la lista
      await utils.document.getDocuments.invalidate({});
      onToggle();
      reset();
      // En lugar de toaster, usaremos snackbar o una notificación personalizada
      // Por ahora lo dejamos como console.log
      console.log("Carpeta creada");
    },
    onError: (error) => {
      if (error.data?.code === "BAD_REQUEST") {
        console.error(error.message);
        return;
      }
      console.error("Ocurrió un error inesperado.");
    },
  });

  const onSubmit = (data: FormData) => {
    createInvestigation.mutate(data);
  };

  const handleDateChange = () => {
    console.log("valoes");
    console.log(JSON.stringify(getValues()));
    //console.log(JSON.stringify(errors));
    return handleSubmit(onSubmit);
  };

  const handleClose = () => {
    reset();
    onToggle();
  };

  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      maxWidth="md"
      fullScreen={fullScreen}
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
          <MenuItem value="" disabled>
            Selecciona Psicólogo
          </MenuItem>
          {psycologists.map((psi) => (
            <MenuItem key={psi.id} value={psi.id}>
              {psi.name}
            </MenuItem>
          ))}
        </TextField>

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

        {/* Para la fecha de recepción */}
        <Controller
          name="receivedAt"
          control={control} // Necesitas añadir 'control' a tu desestructuración de useForm
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

        {/* Para la fecha de entrega (opcional) */}
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
        <Button onClick={handleClose} color="inherit">
          Cancelar
        </Button>
        <Button
          onClick={handleDateChange()}
          variant="contained"
          color="primary"
        >
          Guardar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
