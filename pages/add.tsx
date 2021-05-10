import ComponentForm from "@/components/ComponentForm";
import { Box, Button } from "@chakra-ui/react";
import Link from "next/link";

const AddPage = () => {
  return (
    <Box>
      <Button colorScheme="red">
        <Link href="/">Zurück</Link>
      </Button>
      <ComponentForm />
    </Box>
  );
};

export default AddPage;
