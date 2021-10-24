import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Button,
  Box,
  useDisclosure,
  Fade,
  Stack,
  Badge,
  VStack,
  Text,
} from "@chakra-ui/react";
import { QuestionOutlineIcon } from "@chakra-ui/icons";
import React from "react";
const ReputationContent = (props: any) => {
  const { isOpen, onToggle } = useDisclosure();
  const { reputationCount, onConfirm } = props;
  return (
    <>
      <Button
        onClick={() => {
          onConfirm();
          console.log("inside", reputationCount);
          onToggle();
        }}
        disabled={isOpen}
      >
        Show Reputation
      </Button>
      <Fade in={isOpen}>
        {reputationCount.exists ? (
          <Stack direction="row">
            <Badge variant="solid" colorScheme="green">
              Trust: {reputationCount.trustCount}
            </Badge>
            <Badge variant="solid" colorScheme="red">
              Mistrust: {reputationCount.mistrustCount}
            </Badge>
          </Stack>
        ) : (
          <Box ml="3">
            <Text fontWeight="bold">No records found</Text>
          </Box>
        )}
      </Fade>
    </>
  );
};

const TrustReputationModal = (props: any) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { state, setState, onConfirm } = props;
  return (
    <>
      <Box px={4}>
        <Button
          variant={"outline"}
          colorScheme={"teal"}
          size={"sm"}
          mr={4}
          leftIcon={<QuestionOutlineIcon />}
          onClick={onOpen}
        >
          Get Trust Reputation
        </Button>
      </Box>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Get Account Reputation</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <VStack spacing={6}>
              <FormControl>
                <FormLabel>Near Account</FormLabel>
                <Input
                  placeholder="john.near"
                  value={state.accountId}
                  onChange={(event) => {
                    setState({ ...state, accountId: event.target.value });
                  }}
                />
              </FormControl>
              <ReputationContent
                reputationCount={state.reputationCount}
                onConfirm={onConfirm}
              ></ReputationContent>
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default TrustReputationModal;
