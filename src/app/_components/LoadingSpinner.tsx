import { Spinner, Text, VStack } from "@chakra-ui/react";

export default function LoadingSpinner() {
  return (
    <VStack colorPalette="teal">
      <Spinner color="colorPalette.600" />
      <Text color="colorPalette.600">Loading...</Text>
    </VStack>
  );
}
