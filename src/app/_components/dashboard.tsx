"use client";
import { type Session } from "next-auth";
import React, { ReactNode, useState } from "react";
import {
  Box,
  Button,
  Flex,
  HStack,
  IconButton,
  List,
  Presence,
  Text,
  useBreakpointValue,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import {
  DrawerBackdrop,
  DrawerBody,
  DrawerCloseTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerRoot,
  DrawerTitle,
} from "@/components/ui/drawer";
import {
  MenuContent,
  MenuItem as MMenuItem,
  MenuRoot,
  MenuTrigger,
} from "@/components/ui/menu";
import { MdMenu, MdOutlineArrowDropDown } from "react-icons/md";
import { MenuItem, menuItems } from "@/app/model/menu";
import { useRouter } from "next/navigation";
import { Avatar } from "@/components/ui/avatar";
import { signOut } from "next-auth/react";

// Barra lateral
const Sidebar = ({
  open,
  menu,
  setActiveItem,
  activateItemIndex,
}: {
  open: boolean;
  menu: MenuItem[];
  setActiveItem: (index: number, to: string) => void;
  activateItemIndex: number;
}) => (
  <Presence
    present={open}
    animationName={{
      _open: "slide-from-left-full",
      _closed: "slide-to-left-full",
    }}
    animationDuration="moderate"
  >
    <Box
      w="250px"
      h="100vh"
      display={{ base: "none", md: "block" }} // Ocultar en dispositivos pequeños
    >
      <Text
        fontSize="xl"
        fontWeight="bold"
        mb={4}
        textAlign="center"
        pt={8}
        pb={4}
      >
        Panel
      </Text>
      <VStack flex={1}>
        <List.Root w="full">
          {menu.map((item, index) => (
            <List.Item key={index}>
              <IconButton
                aria-label={item.label}
                borderRadius="0"
                w="full"
                onClick={() => setActiveItem(index, item.to)}
                bg={activateItemIndex == index && "gray.600"}
                _hover={{
                  backgroundColor: "gray.600",
                }}
              >
                <Box flex={1} pl={4}>
                  {!!item.icon && item.icon({})}
                </Box>

                <Text flex={4} textAlign="start">
                  {item.label}
                </Text>
              </IconButton>
            </List.Item>
          ))}
        </List.Root>
      </VStack>
    </Box>
  </Presence>
);

const MobileSidebar = ({
  isOpen,
  onClose,
  menu,
  setActiveItem,
  activateItemIndex,
}: {
  isOpen: boolean;
  onClose: (isOpen: boolean) => void;
  menu: MenuItem[];
  setActiveItem: (index: number, to: string) => void;
  activateItemIndex: number;
}) => (
  <DrawerRoot
    open={isOpen}
    onOpenChange={(e) => onClose(e.open)}
    size="xs"
    placement="start"
  >
    <DrawerBackdrop />
    <DrawerContent>
      <DrawerHeader>
        <DrawerTitle>
          <Text textStyle="3xl" fontWeight="bold">
            Panel
          </Text>
        </DrawerTitle>
      </DrawerHeader>
      <DrawerBody px="0">
        <List.Root w="full">
          {menu.map((item, index) => (
            <List.Item key={index}>
              <IconButton
                aria-label={item.label}
                borderRadius="0"
                w="full"
                onClick={() => {
                  setActiveItem(index, item.to);
                  onClose(false);
                }}
                bg={activateItemIndex == index && "gray.600"}
                _hover={{
                  backgroundColor: "gray.600",
                }}
              >
                <Text pl="4" flex={1} textAlign="start">
                  {item.label}
                </Text>
              </IconButton>
            </List.Item>
          ))}
        </List.Root>
      </DrawerBody>
      <DrawerCloseTrigger />
    </DrawerContent>
  </DrawerRoot>
);

export default function DashBoardLayout({
  session,
  children,
}: {
  session: Session;
  children: ReactNode;
}) {
  const { open: isMobileSidebarOpen, onClose, onToggle } = useDisclosure();
  const isMobile = useBreakpointValue({ base: true, md: false });
  const [activeItem, setActiveItem] = useState<number>(0); // Para saber qué elemento está activo
  const router = useRouter();
  const colorPalette = ["red", "blue", "green", "yellow", "purple", "orange"];

  const handleItemClick = (item: number, to: string) => {
    setActiveItem(item); // Actualizar el estado cuando se hace clic en un ítem
    router.push(`/dashboard${to}`);
  };
  const pickPalette = (name: string) => {
    const index = name.charCodeAt(0) % colorPalette.length;
    return colorPalette[index];
  };
  const closeUser = async (menuOption: { value: string }) => {
    console.log("lorecibi", menuOption);
    await signOut();
  };
  return (
    <Flex direction="row" minH="100vh" bg="gray.900">
      {/* Barra lateral móvil */}
      {isMobile && (
        <MobileSidebar
          isOpen={isMobileSidebarOpen}
          onClose={onClose}
          menu={menuItems}
          setActiveItem={handleItemClick}
          activateItemIndex={activeItem}
        />
      )}

      {/* Barra lateral estática para pantallas grandes */}
      {!isMobile && (
        <Sidebar
          open={isMobileSidebarOpen}
          menu={menuItems}
          setActiveItem={handleItemClick}
          activateItemIndex={activeItem}
        />
      )}

      {/* Contenido principal */}
      <Box flex="1" bg="gray.500" color="white">
        <HStack justify="space-between" mb={6} bg="gray.900" p={4}>
          <IconButton
            onClick={onToggle}
            color="white"
            aria-label="Open Sidebar"
          >
            <MdMenu />
          </IconButton>

          <Text fontSize="2xl" fontWeight="bold">
            Dashboard
          </Text>
          <MenuRoot
            positioning={{ placement: "bottom-start" }}
            onSelect={closeUser}
          >
            <MenuTrigger asChild>
              <Button>
                <Avatar
                  name={session.user.name ?? ""}
                  colorPalette={pickPalette(session.user.name ?? "")}
                />

                {!isMobile && (
                  <>
                    <VStack px="4" alignItems="start">
                      <Text>{session.user.name}</Text>
                      <Text>{session.user.email}</Text>
                    </VStack>
                    <MdOutlineArrowDropDown />
                  </>
                )}
              </Button>
            </MenuTrigger>
            <MenuContent minW="full">
              <MMenuItem value="exit">Cerrar sesón</MMenuItem>
            </MenuContent>
          </MenuRoot>
        </HStack>
        <Box p={6}>{children}</Box>
      </Box>
    </Flex>
  );
}
