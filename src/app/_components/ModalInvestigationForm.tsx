"use client";

import {
  Box,
  Button,
  createListCollection,
  HStack,
  IconButton,
  Input,
  Text,
} from "@chakra-ui/react";
import { Controller, useForm } from "react-hook-form";
import { api } from "@/trpc/react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { DocumentType } from "@/app/model/menu";
import {
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogRoot,
  DialogTitle,
} from "@/components/ui/dialog";
import { Field } from "@/components/ui/field";
import { Psicologist } from "@/app/model/psicologist";
import {
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from "@/components/ui/select";
import { useRef } from "react";
import DatePicker from "react-datepicker";
import { InputGroup } from "@/components/ui/input-group";
import { MdDateRange, MdDelete } from "react-icons/md";
import { toaster } from "@/components/ui/toaster";

export default function InvestigationForm({
  isOpen,
  onToogle,
  psycologists,
}: {
  isOpen: boolean;
  onToogle: () => void;
  psycologists: Psicologist[];
}) {
  const investigationSchema = z.object({
    folio: z.string().min(3, "El folio debe tener al menos 3 caracteres"),
    victimName: z.string().min(3, "El nombre de la víctima es obligatorio"),
    requestingMP: z.string().min(3, "El MP solicitante es obligatorio"),
    crime: z.string().min(3, "El delito es obligatorio"),
    unit: z.string().min(3, "La unidad es obligatoria"),
    psychologistId: z
      .string({ message: "Selecciona un psicólogo" })
      .min(1, "Selecciona un psicólogo")
      .transform(Number),
    documentType: z
      .enum([DocumentType.DICTAMEN, DocumentType.INFORME])
      .optional(),
    receivedAt: z.date(),
    deliveredAt: z.date().optional(),
  });
  type FormData = z.infer<typeof investigationSchema>;
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    control,
  } = useForm({
    resolver: zodResolver(investigationSchema),
    defaultValues: {
      folio: "",
      victimName: "",
      requestingMP: "",
      crime: "",
      unit: "",
      psychologistId: 0,
      receivedAt: new Date(),
      deliveredAt: undefined as Date | undefined,
    },
  });
  const collectionpPsi = createListCollection({
    items: psycologists.map((p) => ({
      label: `${p.name} ${p.last_name}`,
      value: p.id,
    })),
  });
  const contentRef = useRef<HTMLDivElement>(null);

  const utils = api.useUtils();
  const createInvestigation = api.document.create.useMutation({
    onSuccess: async () => {
      // Refrescar la lista
      await utils.document.getDocuments.invalidate({});
      onToogle();
      reset();
      toaster.create({
        description: "Carpeta creada",
        type: "success",
      });
    },
    onError: (error) => {
      if (error.data?.code === "BAD_REQUEST") {
        toaster.create({
          description: error.message,
          type: "warning",
        });
        return;
      }
      toaster.create({
        description: "Ocurrió un error inesperado.",
        type: "error",
      });
    },
  });

  const onSubmit = (data: FormData) => {
    createInvestigation.mutate(data);
  };

  return (
    <DialogRoot open={isOpen} onOpenChange={(e) => onToogle()}>
      <DialogContent bg="gray.600" ref={contentRef}>
        <DialogCloseTrigger />
        <DialogHeader>
          <DialogTitle fontWeight="bold" color="teal">
            Crear nueva carpeta de investigacion
          </DialogTitle>
        </DialogHeader>

        <DialogBody>
          <DialogDescription fontWeight="bold" color="white" mb={4}>
            Rellena los campos para registrar la carpeta
          </DialogDescription>
          <Field
            label="Folio"
            required
            invalid={!!errors.folio}
            errorText={errors.folio?.message}
          >
            <Input {...register("folio")} type="number" />
          </Field>

          <Field
            label="Nombre de la Víctima"
            required
            mt="2"
            invalid={!!errors.victimName}
            errorText={errors.victimName?.message}
          >
            <Input {...register("victimName")} />
          </Field>

          <Field
            label="MP Solicitante"
            required
            mt="2"
            invalid={!!errors.requestingMP}
            errorText={errors.requestingMP?.message}
          >
            <Input {...register("requestingMP")} />
          </Field>

          <Field
            label="Delito"
            required
            mt="2"
            invalid={!!errors.crime}
            errorText={errors.crime?.message}
          >
            <Input {...register("crime")} />
          </Field>

          <Field
            label="Unidad"
            required
            mt="2"
            invalid={!!errors.unit}
            errorText={errors.unit?.message}
          >
            <Input {...register("unit")} />
          </Field>

          <Field
            label="Psicolo asignado"
            required
            mt="2"
            invalid={!!errors.psychologistId}
            errorText={errors.psychologistId?.message}
          >
            <SelectRoot
              collection={collectionpPsi}
              bg="gray.600"
              color="white"
              variant="outline"
              positioning={{ placement: "bottom", flip: false }}
              {...register("psychologistId")}
            >
              <SelectTrigger>
                <SelectValueText
                  fontSize="sm"
                  placeholder="Selecciona Psicologo"
                  color="white"
                />
              </SelectTrigger>
              <SelectContent portalRef={contentRef}>
                {collectionpPsi.items.map((psi) => (
                  <SelectItem item={psi} key={psi.value}>
                    {psi.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </SelectRoot>
          </Field>

          <Field
            label="Fecha de recepción"
            required
            mt="2"
            invalid={!!errors.receivedAt}
            errorText={errors.receivedAt?.message}
          >
            <Controller
              name="receivedAt"
              control={control}
              rules={{ required: "La fecha es obligatoria" }}
              render={({ field }) => (
                <InputGroup
                  color="white"
                  w="full"
                  endElement={<MdDateRange color="white" />}
                >
                  <DatePicker
                    {...field}
                    selected={field.value}
                    value={field.value.toLocaleDateString()}
                    onChange={(date: Date | null) => field.onChange(date)}
                    wrapperClassName="w-full"
                    customInput={<Input />}
                  />
                </InputGroup>
              )}
            />
          </Field>

          <Field
            label="Fecha de Entrega"
            mt="2"
            invalid={!!errors.deliveredAt}
            errorText={errors.deliveredAt?.message}
          >
            <Controller
              name="deliveredAt"
              control={control}
              rules={{ required: "La fecha es obligatoria" }}
              render={({ field }) => (
                <InputGroup
                  color="white"
                  w="full"
                  endElement={
                    <HStack>
                      {!!field.value && (
                        <IconButton
                          colorPalette="red"
                          size="xs"
                          variant="ghost"
                          onClick={() => field.onChange(undefined)}
                        >
                          <MdDelete />
                        </IconButton>
                      )}
                      <MdDateRange color="white" />
                    </HStack>
                  }
                >
                  <DatePicker
                    {...field}
                    selected={field.value}
                    value={field.value?.toLocaleDateString()}
                    onChange={(date: Date | null) => field.onChange(date)}
                    wrapperClassName="w-full"
                    customInput={<Input />}
                  />
                </InputGroup>
              )}
            />
          </Field>

          <Button onClick={handleSubmit(onSubmit)} colorPalette="teal" mt={4}>
            Guardar
          </Button>
        </DialogBody>
      </DialogContent>
    </DialogRoot>
  );
}
