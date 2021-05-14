import Component from "@/components/Component";
import { IData } from "@/utils/Fauna";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { Box, Text } from "@chakra-ui/layout";
import { Spinner } from "@chakra-ui/spinner";
import Head from "next/head";
import useSWR from "swr";

const MyComponentsPage = () => {
  const { data, error } = useSWR("/api/myComponents");

  if (!error && !data) {
    return <Spinner />;
  }
  return (
    <>
      <Head>
        <title>Components Lib | Meine Components</title>
        <meta
          name="description"
          content="a simple and small app to save components"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box my={8}>
        {!error &&
          data &&
          data.map((component: IData) => {
            return <Component key={component.id} component={component} />;
          })}
        {!data ||
          (data.length === 0 && <Text>Es gibt keine Components 🥲</Text>)}
      </Box>
    </>
  );
};

export default MyComponentsPage;
export const getServerSideProps = withPageAuthRequired();
