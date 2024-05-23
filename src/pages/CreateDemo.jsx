import { useState } from "react";
import { Container, Heading, Input, Button, VStack, useToast } from "@chakra-ui/react";
import { supabase } from "../supabaseClient";
import { useParams } from "react-router-dom";

const CreateDemo = () => {
  const { eventId } = useParams();
  const [demoName, setDemoName] = useState("");
  const [demoDescription, setDemoDescription] = useState("");
  const toast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { data, error } = await supabase
      .from("demos")
      .insert([{ name: demoName, description: demoDescription, event_id: eventId }]);

    if (error) {
      toast({
        title: "Error creating demo.",
        description: error.message,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Demo created.",
        description: "Your demo has been created successfully.",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
      setDemoName("");
      setDemoDescription("");
    }
  };

  return (
    <Container centerContent>
      <VStack spacing={4} mt={10}>
        <Heading>Create New Demo</Heading>
        <Input
          placeholder="Demo Name"
          value={demoName}
          onChange={(e) => setDemoName(e.target.value)}
        />
        <Input
          placeholder="Demo Description"
          value={demoDescription}
          onChange={(e) => setDemoDescription(e.target.value)}
        />
        <Button onClick={handleSubmit} colorScheme="blue">
          Create Demo
        </Button>
      </VStack>
    </Container>
  );
};

export default CreateDemo;