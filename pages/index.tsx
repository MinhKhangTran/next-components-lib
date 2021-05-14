import { Box, Button, Spinner } from "@chakra-ui/react";
import Head from "next/head";
import useSWR from "swr";
import { IData } from "@/utils/Fauna";
import Component from "@/components/Component";
import Link from "next/link";
import { useUser } from "@auth0/nextjs-auth0";

export default function Home() {
  const { data, error, mutate } = useSWR("/api/read-components");
  // console.log(data);

  if (!error && !data) {
    return <Spinner />;
  }
  return (
    <>
      <Head>
        <title>Components Lib | Homepage</title>
        <meta
          name="description"
          content="a simple and small app to save components"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box>
        <Button colorScheme="red">
          <Link href="/add">Neue Component einfügen</Link>
        </Button>
        <Box my={8}>
          {!error &&
            data &&
            data.map((component: IData) => {
              return <Component key={component.id} component={component} />;
            })}
        </Box>
      </Box>
    </>
  );
}
