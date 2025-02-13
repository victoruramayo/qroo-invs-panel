import { Button, HStack, IconButton, Text, VStack } from "@chakra-ui/react";
import { MdMenu, MdOutlineArrowDropDown } from "react-icons/md";
import {
  MenuContent,
  MenuItem as MMenuItem,
  MenuRoot,
  MenuTrigger,
} from "@/components/ui/menu";
import { Avatar } from "@/components/ui/avatar";
import React from "react";
import { User } from "next-auth";

export default function Header({
  onToggle,
  signOut,
  isMobile,
  user
}: {
  onToggle: () => void;
  signOut: () => Promise<void>;
  isMobile: boolean;
  user: User;
}) {
  const colorPalette = ["red", "blue", "green", "yellow", "purple", "orange"];

  const pickPalette = (name: string) => {
    const index = name.charCodeAt(0) % colorPalette.length;
    return colorPalette[index];
  };


  return (
    <HStack justify="space-between" mb={6} bg="gray.800" p={4}>
      <IconButton onClick={onToggle} aria-label="Open Sidebar" variant="ghost">
        <MdMenu />
      </IconButton>

      <Text fontSize="2xl" fontWeight="bold">
        Dashboard
      </Text>
      <MenuRoot
        positioning={{ placement: "bottom-start" }}
        onSelect={signOut}
      >
        <MenuTrigger asChild>
          <Button bg="gray.800" color="white">
            <Avatar
              name={user.name ?? ""}
              colorPalette={pickPalette(user.name ?? "")}
            />

            {!isMobile && (
              <>
                <VStack px="4" alignItems="start">
                  <Text>{user.name}</Text>
                  <Text>{user.email}</Text>
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
  );
}
