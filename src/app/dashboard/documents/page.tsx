import { signOut } from "@/server/auth";

import { Button } from "@chakra-ui/react";
import { api } from "@/trpc/server";

export default async function Dashboard() {
  const document = await api.document.getDocuments({});

  return (
    <>
      {JSON.stringify(document, null, 2)}
      <Button
        bg="teal.400"
        size="lg"
        px="8"
        mt="8"
        onClick={async () => {
          "use server";
          await signOut();
        }}
      >
        Salir
      </Button>
    </>
  );
}
