"use client";
import {
  Box,
  Button,
  Center,
  createListCollection,
  DataList,
  Flex,
  Heading,
  HStack,
  IconButton,
  Input,
  Spinner,
  Stack,
  Table,
  Text,
  useBreakpointValue,
  VStack,
} from "@chakra-ui/react";
import { MdAdd, MdDelete, MdEdit } from "react-icons/md";
import {
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from "@/components/ui/select";
import { api } from "@/trpc/react";
import { useEffect, useState } from "react";
import InvestigationForm from "@/app/_components/ModalInvestigationForm";

export default function DesignTokens() {
  const { data: psicols } = api.psychologists.getPsychologists.useQuery();
  const {
    data: documents,
    isLoading,
    error,
  } = api.document.getDocuments.useQuery({});
  const [collections, setCollection] = useState(
    createListCollection({
      items:
        psicols?.map((p) => ({
          label: `${p.name} ${p.last_name}`,
          value: p.id,
        })) ?? [],
    }),
  );
  const typeDocumentCollection = createListCollection({
    items: [
      {
        label: "Todos",
        value: "N/A",
      },
      {
        label: "Dictamen",
        value: "DICTAMEN",
      },
      {
        label: "Informe",
        value: "INFORME",
      },
    ],
  });
  const [open, setOpen] = useState(false);
  const alignValue = useBreakpointValue({
    base: "center",
    sm: "center",
    md: "start",
  });

  useEffect(() => {
    setCollection(
      createListCollection({
        items:
          psicols?.map((p) => ({
            label: `${p.name} ${p.last_name}`,
            value: p.id,
          })) ?? [],
      }),
    );
  }, [psicols]);

  const onOpenModal = () => {
    setOpen(true);
  };
  return (
    <Box bg="gray.800" color="white" p={8} borderRadius="md">
      {/* Header */}
      <VStack align={alignValue} py={8} w="full">
        <Heading textAlign="start" size="lg" fontWeight="bold">
          Carpetas de investigacion
        </Heading>

        <IconButton
          bg="teal.600"
          variant="solid"
          aria-label="Search database"
          _hover={{ backgroundColor: "teal.400" }}
          onClick={onOpenModal}
          color="white"
          px="4"
        >
          <MdAdd />
          <Text fontSize="sm" fontWeight="bold">
            Agregar Nuevo
          </Text>
        </IconButton>
      </VStack>

      <Flex
        mb={4}
        gap={8}
        w="full"
        pr="8"
        alignItems="center"
        justifyContent="center"
        direction="row" // Cambiar la dirección de las columnas en pantallas pequeñas
        wrap="wrap" //
      >
        <Box flex="1" flexBasis={{ base: "30%", lg: "18%" }}>
          <SelectRoot
            collection={typeDocumentCollection}
            bg="gray.800"
            color="white"
          >
            <SelectTrigger>
              <SelectValueText fontSize="sm" placeholder="Selecciona Tipo" />
            </SelectTrigger>
            <SelectContent>
              {typeDocumentCollection.items.map((psi) => (
                <SelectItem item={psi} key={psi.value}>
                  {psi.label}
                </SelectItem>
              ))}
            </SelectContent>
          </SelectRoot>
        </Box>
        <Box flex="1" flexBasis={{ base: "30%", lg: "18%" }}>
          <SelectRoot collection={collections} bg="gray.800" color="white">
            <SelectTrigger>
              <SelectValueText
                fontSize="sm"
                placeholder="Selecciona psicologo"
              />
            </SelectTrigger>
            <SelectContent>
              {collections.items.map((psi) => (
                <SelectItem item={psi} key={psi.value}>
                  {psi.label}
                </SelectItem>
              ))}
            </SelectContent>
          </SelectRoot>
        </Box>{" "}
        <Box flex="1" flexBasis={{ base: "30%", lg: "18%" }}>
          <Input
            my="1"
            px="4"
            placeholder="Por numero de folio"
            variant="subtle"
            bg="gray.600"
          />
        </Box>
        <Box flex="1" flexBasis={{ base: "30%", lg: "18%" }}>
          <Input
            my="1"
            px="4"
            placeholder="Por nombre de victima"
            variant="subtle"
            bg="gray.600"
          />
        </Box>
        <Box flex="1" flexBasis={{ base: "30%", lg: "18%" }}>
          <Input
            my="1"
            px="4"
            placeholder="Por MP"
            variant="subtle"
            bg="gray.600"
          />
        </Box>
      </Flex>

      {/* Data Table */}
      {isLoading ? (
        <VStack colorPalette="teal">
          <Spinner color="colorPalette.600" />
          <Text color="colorPalette.600">Loading...</Text>
        </VStack>
      ) : (
        <Box border="1px solid" borderColor="gray.700" borderRadius="md">
          <Table.ScrollArea borderWidth="1px" minW="3xs">
            <Table.Root size="sm">
              <Table.Header>
                <Table.Row bg="gray.700">
                  <Table.ColumnHeader color="white">Folio</Table.ColumnHeader>
                  <Table.ColumnHeader color="white">Victima</Table.ColumnHeader>
                  <Table.ColumnHeader color="white">MP</Table.ColumnHeader>
                  <Table.ColumnHeader color="white">
                    Psicologo
                  </Table.ColumnHeader>
                  <Table.ColumnHeader color="white">Crimen</Table.ColumnHeader>
                  <Table.ColumnHeader color="white">
                    Recepcion
                  </Table.ColumnHeader>
                  <Table.ColumnHeader color="white">Entrega</Table.ColumnHeader>
                  <Table.ColumnHeader color="white">
                    Opciones
                  </Table.ColumnHeader>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {documents?.map((document) => (
                  <Table.Row key={document.folio}>
                    <Table.Cell>{document.folio}</Table.Cell>
                    <Table.Cell>{document.victimName}</Table.Cell>
                    <Table.Cell>{document.requestingMP}</Table.Cell>
                    <Table.Cell>
                      {document.psychologist.name}{" "}
                      {document.psychologist.last_name}
                    </Table.Cell>
                    <Table.Cell>{document.crime}</Table.Cell>
                    <Table.Cell>
                      {document.receivedAt.toLocaleDateString()}
                    </Table.Cell>
                    <Table.Cell>
                      {document.deliveredAt?.toLocaleDateString() ?? "N/A"}
                    </Table.Cell>
                    <Table.Cell>
                      <IconButton
                        size="sm"
                        colorPalette="purple"
                        rounded="full"
                        mx={2}
                      >
                        <MdEdit />
                      </IconButton>
                      <IconButton
                        size="sm"
                        colorPalette="red"
                        rounded="full"
                        mx={2}
                      >
                        <MdDelete />
                      </IconButton>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table.Root>
          </Table.ScrollArea>
        </Box>
      )}
      <InvestigationForm
        isOpen={open}
        onToogle={() => setOpen((oldVal) => !oldVal)}
        psycologists={psicols ?? []}
      />
    </Box>
  );
}
