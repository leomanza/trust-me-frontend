import { useEffect, useState } from "react";
import { CONTRACT_ID, gas, getWallet, getContract } from "../lib/near";
import type { NextPage } from "next";
import Head from "next/head";
import Navbar from "../components/navbar";
import styles from "../styles/Home.module.css";
import {
  Heading,
  Box,
  Stack,
  VStack,
  Button,
  Badge,
  Spinner,
} from "@chakra-ui/react";
import { CheckCircleIcon, NotAllowedIcon, ViewIcon } from "@chakra-ui/icons";
import TrustModal from "../components/trustModal";
import MistrustModal from "../components/mistrustModal";
import TrustReputationModal from "../components/trustReputationModal";
const Home: NextPage = () => {
  const [loading, setLoading] = useState(true);
  const [wallet, setWallet] = useState();
  const [signInAccountId, setSignInAccountId] = useState("");
  const [state, setState] = useState({
    accountId: "",
    comment: "",
    relatedTx: "",
    reputationCount: {
      trustCount: 0,
      mistrustCount: 0,
      exists: false
    },
  });

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const tempWallet = await getWallet();
        setWallet(tempWallet);
        setSignInAccountId(tempWallet.getAccountId());
        setLoading(false);
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);

  const signIn = () => {
    setLoading(true);
    try {
      wallet.requestSignIn(CONTRACT_ID, "Trust-Me contract");
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  };

  const signOut = () => {
    setLoading(true);
    try {
      wallet.signOut();
      localStorage.removeItem("near-api-js:keystore:lean.testnet:testnet");
      clearFields();
      setSignInAccountId("");
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  };

  const clearFields = () => {
    setState({
      accountId: "",
      comment: "",
      relatedTx: "",
      reputationCount: {
        trustCount: 0,
        mistrustCount: 0,
        exists: false
      }
    });
  };

  const trustOnAccount = async () => {
    setLoading(true);
    try {
      const contract = await getContract(wallet);
      const result = await contract.confiar({
        accountId: state.accountId,
        comment: state.comment,
        relatedTx: state.relatedTx,
      });
      setState({
        ...state,
        reputationCount: {
          trustCount: result.trustCount,
          mistrustCount: result.mistrustCount,
          exists: true
        },
      });
      clearFields();
      console.log(result);
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  };
  const mistrustOnAccount = async () => {
    setLoading(true);
    try {
      const contract = await getContract(wallet);
      const result = await contract.desconfiar({
        accountId: state.accountId,
        comment: state.comment,
        relatedTx: state.relatedTx,
      });
      setState({
        ...state,
        reputationCount: {
          trustCount: result.trustCount,
          mistrustCount: result.mistrustCount,
          exists: true
        },
      });
      console.log(result);
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  };

  const getTrustLevel = async () => {
    setLoading(true);
    try {
      const contract = await getContract(wallet);
      const result: any = await contract.getConfianza({
        accountId: state.accountId,
      });
      setState({
        ...state,
        reputationCount:
          result !== null
            ? {
                trustCount: result.trustCount,
                mistrustCount: result.mistrustCount,
                exists: true
              }
            : {
              trustCount: 0,
              mistrustCount: 0,
              exists: false
            },
      });
      console.log(result);
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  };

  const getAccounstITrust = async () => {
    // TODO
  };

  const getAccountsTrustMe = async () => {
    // TODO
  };

  return (
    <div className={styles.container}>
      <Navbar
        account={signInAccountId}
        onSignIn={signIn}
        onSignOut={signOut}
      ></Navbar>
      <Head>
        <title>TrustMe</title>
        <meta
          name="description"
          content="Peer reputation management in decentralized p2p business applications"
        />
        <link rel="icon" href="/static/favicon.ico" />
      </Head>
      <main className={styles.main}>
        {loading && <Spinner />}
        <VStack spacing={6}>
          <Stack spacing={6}>
            <Heading color={"teal"} as="h1" size="4xl" isTruncated>
              TrustMe
            </Heading>
            <Heading color={"teal"} as="h4" size="md">
              Peer reputation management
            </Heading>
          </Stack>
          {signInAccountId && (
            <VStack spacing={6} align="stretch">
              <TrustModal
                state={state}
                setState={setState}
                onConfirm={trustOnAccount}
              ></TrustModal>
              <MistrustModal
                state={state}
                setState={setState}
                onConfirm={mistrustOnAccount}
              ></MistrustModal>
              <TrustReputationModal
                state={state}
                setState={setState}
                onConfirm={getTrustLevel}
              ></TrustReputationModal>
              <Box px={4}>
                <Button
                  variant={"outline"}
                  colorScheme={"teal"}
                  size={"sm"}
                  mr={4}
                  leftIcon={<ViewIcon />}
                  onClick={() => getAccounstITrust()}
                  disabled={true}
                >
                  Get Accounts I Trust
                  <Badge ml="1" colorScheme="green">
                    Nearing
                  </Badge>
                </Button>
              </Box>
              <Box px={4}>
                <Button
                  variant={"outline"}
                  colorScheme={"teal"}
                  size={"sm"}
                  mr={4}
                  leftIcon={<ViewIcon />}
                  onClick={() => getAccountsTrustMe()}
                  disabled={true}
                >
                  Get Accounts Trust Me
                  <Badge ml="1" colorScheme="green">
                    Nearing
                  </Badge>
                </Button>
              </Box>
            </VStack>
          )}
        </VStack>
      </main>
    </div>
  );
};

export default Home;
