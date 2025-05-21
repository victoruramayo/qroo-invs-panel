import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { api } from "@/trpc/react";
import { DocumentType } from "@/app/_components/commons/menu";
import dayjs from "dayjs";
import { useSession } from "next-auth/react";

// Definición del esquema Zod
const investigationSchema = z.object({
  folio: z.string().min(3, "El folio debe tener al menos 3 caracteres"),
  folderNumber: z.string().min(3, "El folio debe tener al menos 3 caracteres"),
  victimName: z.string().min(3, "El nombre de la víctima es obligatorio"),
  requestingMP: z.string().min(3, "El MP solicitante es obligatorio"),
  crime: z.string().min(3, "El delito es obligatorio"),
  unit: z.string().min(3, "La unidad es obligatoria"),
  psychologistId: z.coerce
    .number({ message: "Selecciona un psicólogo" })
    .min(0),
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

export type FormData = z.infer<typeof investigationSchema>;

interface UseInvestigationFormProps {
  onToggle: () => void;
}

export function useCreateInvestigationForm({
  onToggle,
}: UseInvestigationFormProps) {
  // Form setup with react-hook-form
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(investigationSchema),
    defaultValues: {
      folio: "",
      folderNumber: "",
      victimName: "",
      requestingMP: "",
      crime: "",
      unit: "",
      documentType: DocumentType.DICTAMEN,
      psychologistId: 0,
      receivedAt: dayjs() as unknown as Date,
      deliveredAt: undefined,
    },
  });

  // API mutation setup
  const utils = api.useUtils();
  const createInvestigation = api.document.create.useMutation({
    onSuccess: async () => {
      await utils.document.getDocuments.invalidate({});
      onToggle();
      reset();
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

  // Form submission handler
  const onSubmit = (data: FormData) => {
    createInvestigation.mutate(data);
  };

  // Handle form submission
  const handleFormSubmit = handleSubmit(onSubmit);

  // Handle dialog close
  const handleClose = () => {
    reset();
    onToggle();
  };

  return {
    // State
    errors,
    isCreating: createInvestigation.isPending,

    // Form controllers
    register,
    control,

    // Actions
    handleFormSubmit,
    handleClose,
  };
}
