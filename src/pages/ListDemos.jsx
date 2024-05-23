import { useEffect, useState } from "react";
import { Container, Heading, VStack, Text, Button, HStack, useToast } from "@chakra-ui/react";
import { supabase } from "../supabaseClient";
import { useParams, useNavigate } from "react-router-dom";

const ListDemos = () => {
  const { eventId } = useParams();
  const [demos, setDemos] = useState([]);
  const toast = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    fetchDemos();
  }, []);

  const fetchDemos = async () => {
    const { data, error } = await supabase.from("demos").select("*").eq("event_id", eventId);

    if (error) {
      toast({
        title: "Error fetching demos.",
        description: error.message,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    } else {
      setDemos(data);
    }
  };

  const handleDelete = async (id) => {
    const { error } = await supabase.from("demos").delete().eq("id", id);

    if (error) {
      toast({
        title: "Error deleting demo.",
        description: error.message,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Demo deleted.",
        description: "The demo has been deleted successfully.",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
      fetchDemos();
    }
  };

  return (
    <Container centerContent>
      <VStack spacing={4} mt={10}>
        <Heading>All Demos</Heading>
        {demos.map((demo) => (
          <HStack key={demo.id} spacing={4}>
            <Text>{demo.name}</Text>
            <Text>{demo.description}</Text>
            <Button onClick={() => navigate(`/edit-demo/${demo.id}`)} colorScheme="yellow">
              Edit
            </Button>
            <Button onClick={() => handleDelete(demo.id)} colorScheme="red">
              Delete
            </Button>
          </HStack>
        ))}
      </VStack>
    </Container>
  );
};

export default ListDemos;