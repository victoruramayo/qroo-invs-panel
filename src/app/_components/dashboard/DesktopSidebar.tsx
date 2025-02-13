// Barra lateral
import { MenuItem } from "@/app/model/menu";
import { Box, IconButton, Presence, Text, VStack } from "@chakra-ui/react";

export default function DesktopSidebar({
  open,
  menu,
  setActiveItem,
  activateItemIndex,
}: {
  open: boolean;
  menu: MenuItem[];
  setActiveItem: (index: number, to: string) => void;
  activateItemIndex: number;
}) {
  return (
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
        bg={"gray.800"}
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
        <VStack gap="0">
          {menu.map((item, index) => (
            <IconButton
              key={index}
              aria-label={item.label}
              borderRadius="0"
              variant="solid"
              color="white"
              bg={activateItemIndex == index ? "teal.800" : "teal.600"}
              _hover={{
                backgroundColor: "teal.800",
              }}
              w="full"
              onClick={() => setActiveItem(index, item.to)}
              colorPalette="gray"
            >
              <Box flex={1} pl={4}>
                {!!item.icon && item.icon({})}
              </Box>

              <Text flex={4} textAlign="start">
                {item.label}
              </Text>
            </IconButton>
          ))}
        </VStack>
      </Box>
    </Presence>
  );
}
