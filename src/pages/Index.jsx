import { Container, Text, VStack, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4}>
        <Text fontSize="2xl">Welcome to Event Demo Management</Text>
        <Text>Manage your events and demos efficiently.</Text>
        <Button onClick={() => navigate("/create-event")} colorScheme="blue">
          Create Event
        </Button>
        <Button onClick={() => navigate("/events")} colorScheme="teal">
          View Events
        </Button>
      </VStack>
    </Container>
  );
};

export default Index;