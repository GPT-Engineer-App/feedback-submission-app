import { useState, useEffect } from "react";
import { Container, Heading, Input, Button, VStack, useToast } from "@chakra-ui/react";
import { supabase } from "../supabaseClient";
import { useParams, useNavigate } from "react-router-dom";

const EditDemo = () => {
  const { demoId } = useParams();
  const [demoName, setDemoName] = useState("");
  const [demoDescription, setDemoDescription] = useState("");
  const toast = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    fetchDemo();
  }, []);

  const fetchDemo = async () => {
    const { data, error } = await supabase.from("demos").select("*").eq("id", demoId).single();

    if (error) {
      toast({
        title: "Error fetching demo.",
        description: error.message,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    } else {
      setDemoName(data.name);
      setDemoDescription(data.description);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { error } = await supabase
      .from("demos")
      .update({ name: demoName, description: demoDescription })
      .eq("id", demoId);

    if (error) {
      toast({
        title: "Error updating demo.",
        description: error.message,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Demo updated.",
        description: "Your demo has been updated successfully.",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
      navigate(`/event/${data.event_id}/demos`);
    }
  };

  return (
    <Container centerContent>
      <VStack spacing={4} mt={10}>
        <Heading>Edit Demo</Heading>
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
          Update Demo
        </Button>
      </VStack>
    </Container>
  );
};

export default EditDemo;