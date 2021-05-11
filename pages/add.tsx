import ComponentForm from "@/components/ComponentForm";
import { Box, Button } from "@chakra-ui/react";
import Link from "next/link";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";

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

export const getServerSideProps = withPageAuthRequired();
