import { IData } from "@/utils/Fauna";
import { Box, Code, Flex, Heading, Button, Text } from "@chakra-ui/react";
import { useState } from "react";
import { FaCopy } from "react-icons/fa";
const Component = ({ component }: { component: IData }) => {
  const [copyText, setCopyText] = useState("Kopieren 😄");

  const copyCode = async () => {
    await navigator.clipboard.writeText(component.data.code);
    setCopyText("Kopiert 😎");
    setTimeout(() => {
      setCopyText("Kopieren 😄");
    }, 1000);
  };
  return (
    <Box my={4} border="1px" p={4} borderRadius="lg" borderColor="red.200">
      <Heading color="red.500" fontFamily="mono">
        {component.data.name}
      </Heading>
      <Heading color="red.400" as="h3" fontSize="xl">
        Beschreibung
      </Heading>
      <Text color="red.300">{component.data.description}</Text>
      <Heading color="red.400" as="h3" fontSize="xl">
        Code
      </Heading>

      <Code p={2}>
        <Button mb={4} display="block" colorScheme="red" onClick={copyCode}>
          {copyText}
        </Button>
        {component.data.code}
      </Code>
    </Box>
  );
};

export default Component;
