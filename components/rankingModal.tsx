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
  VStack,
  Text,
  Table,
  TableCaption,
  Thead,
  Tr,
  Th,
  Td,
  Tbody
} from "@chakra-ui/react";
const ReputationTable = (props: any) => {
  const { isOpen, onToggle } = useDisclosure();
  const { data, onConfirm, caption } = props;
  return (
    <>
      <Button
        onClick={() => {
          onConfirm();
          onToggle();
        }}
        disabled={isOpen}
      >
        Show Reputation
      </Button>
      <Fade in={isOpen}>
        {data ? (
          <Table variant="simple">
            <TableCaption>{caption}</TableCaption>
            <Thead>
              <Tr>
                <Th>Account</Th>
                <Th>Trust Count</Th>
                <Th>Mistrust Count</Th>
              </Tr>
            </Thead>
            <Tbody>
              {data.map((item: any) => {
                return (
                  <Tr>
                    <Td>{item.key}</Td>
                    <Td>{item.value.trustCount}</Td>
                    <Td>{item.value.mistrustCount}</Td>
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        ) : (
          <Box ml="3">
            <Text fontWeight="bold">No records found</Text>
          </Box>
        )}
      </Fade>
    </>
  );
};

const RankingModal = (props: any) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { state, setState, onConfirm, caption, buttonText, icon } = props;
  return (
    <>
      <Box px={4}>
        <Button
          variant={"outline"}
          colorScheme={"teal"}
          size={"sm"}
          mr={4}
          leftIcon={icon}
          onClick={onOpen}
        >
          {buttonText}
        </Button>
      </Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Get Account Reputation</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <VStack spacing={6}>
              <FormControl>
                <FormLabel>Limit Filter</FormLabel>
                <Input
                  placeholder="Number of accounts to display"
                  value={state.top}
                  onChange={(event) => {
                    setState({ ...state, top: event.target.value });
                  }}
                />
              </FormControl>
              <ReputationTable
                data={state.rankingData}
                onConfirm={onConfirm}
                caption={caption}
              ></ReputationTable>
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

export default RankingModal;
