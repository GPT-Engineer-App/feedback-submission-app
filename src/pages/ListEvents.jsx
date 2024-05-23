import { useEffect, useState } from "react";
import { Container, Heading, VStack, Text, Button, HStack, useToast } from "@chakra-ui/react";
import { supabase } from "../supabaseClient";
import { useNavigate } from "react-router-dom";

const ListEvents = () => {
  const [events, setEvents] = useState([]);
  const toast = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    const { data, error } = await supabase.from("events").select("*");

    if (error) {
      toast({
        title: "Error fetching events.",
        description: error.message,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    } else {
      setEvents(data);
    }
  };

  const handleDelete = async (id) => {
    const { error } = await supabase.from("events").delete().eq("id", id);

    if (error) {
      toast({
        title: "Error deleting event.",
        description: error.message,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Event deleted.",
        description: "The event has been deleted successfully.",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
      fetchEvents();
    }
  };

  return (
    <Container centerContent>
      <VStack spacing={4} mt={10}>
        <Heading>All Events</Heading>
        {events.map((event) => (
          <HStack key={event.id} spacing={4}>
            <Text>{event.name}</Text>
            <Text>{event.date}</Text>
            <Button onClick={() => navigate(`/edit-event/${event.id}`)} colorScheme="yellow">
              Edit
            </Button>
            <Button onClick={() => handleDelete(event.id)} colorScheme="red">
              Delete
            </Button>
            <Button onClick={() => navigate(`/event/${event.id}/demos`)} colorScheme="blue">
              View Demos
            </Button>
          </HStack>
        ))}
      </VStack>
    </Container>
  );
};

export default ListEvents;