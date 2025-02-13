import type { MenuItem } from "@/app/model/menu";
import {
  DrawerBackdrop,
  DrawerBody,
  DrawerCloseTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerRoot,
  DrawerTitle,
} from "@/components/ui/drawer";
import { IconButton, Text } from "@chakra-ui/react";
import React from "react";

export default function MobileSidebar({
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
}) {
  return (
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
          {menu.map((item, index) => (
            <IconButton
              key={index}
              aria-label={item.label}
              borderRadius="0"
              w="full"
              onClick={() => {
                setActiveItem(index, item.to);
                onClose(false);
              }}
              bg={activateItemIndex == index ? "teal.800" : "teal.600"}
              _hover={{
                backgroundColor: "gray.600",
              }}
            >
              <Text pl="4" flex={1} textAlign="start">
                {item.label}
              </Text>
            </IconButton>
          ))}
        </DrawerBody>
        <DrawerCloseTrigger />
      </DrawerContent>
    </DrawerRoot>
  );
}
