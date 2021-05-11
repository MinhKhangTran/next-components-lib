import React from "react";
import { Box, Flex, Heading, Spacer } from "@chakra-ui/react";
import Navbar from "./Navbar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box my={9} w="90%" mx="auto">
      <Flex align="center">
        <Heading mb={8} textAlign="center" color="red.600" fontFamily="mono">
          Components Lib
        </Heading>
        <Spacer />
        <Navbar />
      </Flex>
      {children}
    </Box>
  );
};

export default Layout;
