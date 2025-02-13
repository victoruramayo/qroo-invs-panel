"use client";
import { type Session } from "next-auth";
import React, { type ReactNode, useState } from "react";
import { Box, Flex, useBreakpointValue, useDisclosure } from "@chakra-ui/react";
import { menuItems } from "@/app/model/menu";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import MobileSidebar from "@/app/_components/dashboard/MobileSidebar";
import DesktopSidebar from "@/app/_components/dashboard/DesktopSidebar";
import Header from "@/app/_components/dashboard/Header";

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

  const handleItemClick = (item: number, to: string) => {
    setActiveItem(item); // Actualizar el estado cuando se hace clic en un ítem
    router.push(`/dashboard${to}`);
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
        <DesktopSidebar
          open={isMobileSidebarOpen}
          menu={menuItems}
          setActiveItem={handleItemClick}
          activateItemIndex={activeItem}
        />
      )}

      {/* Contenido principal */}
      <Box flex="1" bg="gray.500" color="white">
        <Header
          onToggle={onToggle}
          signOut={signOut}
          isMobile={!!isMobile}
          user={session.user}
        />
        <Box p={6} minW="full">
          {children}
        </Box>
      </Box>
    </Flex>
  );
}
