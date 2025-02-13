import { Psychologist } from "@prisma/client";
import { createListCollection } from "@chakra-ui/react";

export const getPsychologistCollect = (psychologists?: Psychologist[]) => {
  if (!psychologists?.length) {
    return createListCollection({
      items: [],
    });
  }
  return createListCollection({
    items: psychologists.map((p) => ({
      label: `${p.name} ${p.last_name}`,
      value: p.id,
    })),
  });
};

export const getTypeDocumentCollect = (hasNoApply?: boolean) => {
  if (hasNoApply) {
    return createListCollection({
      items: [
        { label: "Todos", value: "N/A" },
        { label: "Dictamen", value: "DICTAMEN" },
        { label: "Informe", value: "INFORME" },
      ],
    });
  }

  return createListCollection({
    items: [
      { label: "Dictamen", value: "DICTAMEN" },
      { label: "Informe", value: "INFORME" },
    ],
  });
};
