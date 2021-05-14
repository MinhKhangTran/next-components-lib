import ComponentForm from "@/components/ComponentForm";
import { Box, Button } from "@chakra-ui/react";
import Link from "next/link";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import Head from "next/head";

const AddPage = () => {
  return (
    <>
      <Head>
        <title>Components Lib | Hinzufügen</title>
        <meta
          name="description"
          content="a simple and small app to save components"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box>
        <Button colorScheme="red">
          <Link href="/">Zurück</Link>
        </Button>
        <ComponentForm />
      </Box>
    </>
  );
};

export default AddPage;

export const getServerSideProps = withPageAuthRequired();
