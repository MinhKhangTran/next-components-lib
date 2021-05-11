import { IData } from "@/utils/Fauna";
import { Box, Heading, Button, Text, Flex } from "@chakra-ui/react";
import { useState } from "react";
import { useUser } from "@auth0/nextjs-auth0";
import Link from "next/link";

const Component = ({ component }: { component: IData }) => {
  const [copyText, setCopyText] = useState("Kopieren 😄");
  const { user } = useUser();

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
      <Heading mt={4} color="red.400" as="h3" fontSize="xl">
        Code
      </Heading>

      <pre
        style={{
          whiteSpace: "pre-wrap",
          background: "#E2E8F0",
          borderRadius: "12px",
          marginTop: "8px",
          padding: "24px",
        }}
      >
        <Flex justify="flex-end">
          <Button mb={4} display="block" colorScheme="red" onClick={copyCode}>
            {copyText}
          </Button>
        </Flex>
        {component.data.code}
      </pre>
      {user && user.sub === component.data.userId && (
        <Button colorScheme="red" mt={8}>
          <Link href={`/component/${component.id}`}>Bearbeiten</Link>
        </Button>
      )}
    </Box>
  );
};

export default Component;
