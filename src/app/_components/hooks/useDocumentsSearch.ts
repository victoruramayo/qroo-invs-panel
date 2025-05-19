import { useMemo, useState } from "react";
import { useDebounce } from "use-debounce";
import { keepPreviousData } from "@tanstack/react-query";
import { api } from "@/trpc/react";
import { DocumentType } from "@/app/_components/commons/menu";
import { type FilterState } from "@/app/_components/commons/documents/DocumentFilters";

export const dictamenTypes = [
  { label: "Dictamen", value: DocumentType.DICTAMEN },
  { label: "Informe", value: DocumentType.INFORME },
];

export function useDocumentsSearch() {
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

  const handleFilterChange = (key: keyof FilterState, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const documentsMapperRow = useMemo(() => {
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

  return {
    // Estado
    documentsMapperRow,
    isLoading,
    filters,
    documentTypes: dictamenTypes,

    // Funciones
    handleFilterChange,
  };
}
