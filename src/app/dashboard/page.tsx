import { auth, signOut } from "@/server/auth";
import { redirect } from "next/navigation";
import { Button } from "@chakra-ui/react";

export default async function Dashboard() {
  const session = await auth();
  if (!session) redirect("/");

  return (
    <>
      <h1>Bienvenido, {session.user.email}</h1>;
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
