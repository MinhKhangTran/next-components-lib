import { Box, Heading } from "@chakra-ui/react";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>Components Lib</title>
        <meta
          name="description"
          content="a simple and small app to save components"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box>
        <Heading fontFamily="mono">Components Lib</Heading>
      </Box>
    </>
  );
}
