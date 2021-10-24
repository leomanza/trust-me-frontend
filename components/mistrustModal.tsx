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
  useDisclosure
} from "@chakra-ui/react";
import { NotAllowedIcon } from "@chakra-ui/icons";
import React from "react";
const MistrustModal = (props: any) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {state, setState, onConfirm} = props;
  return (
    <>
      <Box  px={4}>
        <Button
          variant={"outline"}
          colorScheme={"teal"}
          size={"sm"}
          mr={4}
          leftIcon={<NotAllowedIcon />}
          onClick={onOpen}
        >
          Mistrust account
        </Button>
      </Box>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Mistrust Near Account</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
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
            <FormControl mt={4}>
              <FormLabel>Comment</FormLabel>
              <Input
                placeholder="Comment"
                value={state.comment}
                onChange={(event) => {
                  setState({ ...state, comment: event.target.value });
                }}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Related Transaction</FormLabel>
              <Input
                placeholder="Tx Id"
                value={state.relatedTx}
                onChange={(event) => {
                  setState({ ...state, relatedTx: event.target.value });
                }}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
             variant={"outline"}
             colorScheme={"teal"}
              mr={3}
              onClick={() => {
                onConfirm();
                onClose();
              }}
            >
              Confirm
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default MistrustModal;
