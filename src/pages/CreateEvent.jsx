import { useState } from "react";
import { Container, Heading, Input, Button, VStack, useToast } from "@chakra-ui/react";
import { supabase } from "../supabaseClient";

const CreateEvent = () => {
  const [eventName, setEventName] = useState("");
  const [eventDate, setEventDate] = useState("");
  const toast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { data, error } = await supabase
      .from("events")
      .insert([{ name: eventName, date: eventDate }]);

    if (error) {
      toast({
        title: "Error creating event.",
        description: error.message,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Event created.",
        description: "Your event has been created successfully.",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
      setEventName("");
      setEventDate("");
    }
  };

  return (
    <Container centerContent>
      <VStack spacing={4} mt={10}>
        <Heading>Create New Event</Heading>
        <Input
          placeholder="Event Name"
          value={eventName}
          onChange={(e) => setEventName(e.target.value)}
        />
        <Input
          placeholder="Event Date"
          type="date"
          value={eventDate}
          onChange={(e) => setEventDate(e.target.value)}
        />
        <Button onClick={handleSubmit} colorScheme="blue">
          Create Event
        </Button>
      </VStack>
    </Container>
  );
};

export default CreateEvent;