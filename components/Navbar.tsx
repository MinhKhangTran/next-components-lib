import { useUser } from "@auth0/nextjs-auth0";
import { Avatar, Box, Flex, Spacer } from "@chakra-ui/react";
import Link from "next/link";

const Navbar = () => {
  const { user, isLoading } = useUser();
  console.log(user);

  return (
    <Box>
      {!isLoading && !user && (
        <Link href="/api/auth/login">
          <a className="text-red-100 hover:underline">Login</a>
        </Link>
      )}
      {!isLoading && user && (
        <Flex align="center">
          <Avatar mr={8} name={user.nickname}></Avatar>
          <Box mr={8}>
            <Link href="/mySnippets">Meine Components</Link>
          </Box>

          <Link href="/api/auth/logout">Logout</Link>
        </Flex>
      )}
    </Box>
  );
};

export default Navbar;
