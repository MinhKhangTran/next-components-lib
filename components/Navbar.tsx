import { useUser } from "@auth0/nextjs-auth0";
import { Box, Flex, Text } from "@chakra-ui/react";
import Link from "next/link";

const Navbar = () => {
  const { user, isLoading } = useUser();
  // console.log(user);

  return (
    <Box mb={8}>
      {!isLoading && !user && (
        <Link href="/api/auth/login">
          <a className="text-red-100 hover:underline">Login</a>
        </Link>
      )}
      {!isLoading && user && (
        <Flex align="center">
          <Text color="red.400" mr={8}>
            Hi {user.nickname} 😬
          </Text>
          <Box mr={8}>
            <Link href="/myComponents">Meine Components</Link>
          </Box>

          <Link href="/api/auth/logout">Logout</Link>
        </Flex>
      )}
    </Box>
  );
};

export default Navbar;
