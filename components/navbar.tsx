import { ReactNode } from "react";
import {
  Box,
  Flex,
  HStack,
  Button,
  useDisclosure,
  useColorModeValue
} from "@chakra-ui/react";
import {
  UnlockIcon,
  LockIcon
} from "@chakra-ui/icons";
import Link from "next/link";
import { useEffect, useState } from "react";
import { CONTRACT_ID, gas, getWallet, getContract } from "../lib/near";

const NavLink = ({ children, path }: { children: ReactNode; path: string }) => (
  <Box
    px={2}
    py={1}
    rounded={"md"}
    _hover={{
      textDecoration: "none",
      bg: useColorModeValue("gray.200", "gray.700"),
    }}
  >
    <Link href={path}>{children}</Link>
  </Box>
);

export default function Navbar(props: any) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { account, onSignIn, onSignOut } = props;
  return (
    <>
      <Box  px={4}>
        <Flex h={16} alignItems={"right"}>
          {!account ? (
            <Flex alignItems={"right"}>
              <Button
                size={"sm"}
                mr={4}
                leftIcon={<UnlockIcon />}
                onClick={() => onSignIn()}
              >
                Connect NEAR Account
              </Button>
            </Flex>
          ) : (
            <HStack as={"nav"} spacing={4}>
              <Box pb={4}>
                <a
                  href={`https://explorer.testnet.near.org/accounts/${account}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  {account}
                </a>
              </Box>
              <Box pb={4}>
                <a
                  href={`https://explorer.testnet.near.org/accounts/${CONTRACT_ID}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  Contract
                </a>
              </Box>
              <Box pb={4}>
                <Button
                  variant={"outline"}
                  colorScheme={"teal"}
                  size={"sm"}
                  mr={4}
                  leftIcon={<LockIcon />}
                  onClick={() => onSignOut()}
                >
                  Sign Out
                </Button>
              </Box>
            </HStack>
          )}
        </Flex>
      </Box>
    </>
  );
}
