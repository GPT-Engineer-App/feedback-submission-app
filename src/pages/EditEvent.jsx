import { useState, useEffect } from "react";
import { Container, Heading, Input, Button, VStack, useToast } from "@chakra-ui/react";
import { supabase } from "../supabaseClient";
import { useParams, useNavigate } from "react-router-dom";

const EditEvent = () => {
  const { eventId } = useParams();
  const [eventName, setEventName] = useState("");
  const [eventDate, setEventDate] = useState("");
  const toast = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    fetchEvent();
  }, []);

  const fetchEvent = async () => {
    const { data, error } = await supabase.from("events").select("*").eq("id", eventId).single();

    if (error) {
      toast({
        title: "Error fetching event.",
        description: error.message,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    } else {
      setEventName(data.name);
      setEventDate(data.date);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { error } = await supabase
      .from("events")
      .update({ name: eventName, date: eventDate })
      .eq("id", eventId);

    if (error) {
      toast({
        title: "Error updating event.",
        description: error.message,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Event updated.",
        description: "Your event has been updated successfully.",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
      navigate("/events");
    }
  };

  return (
    <Container centerContent>
      <VStack spacing={4} mt={10}>
        <Heading>Edit Event</Heading>
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
          Update Event
        </Button>
      </VStack>
    </Container>
  );
};

export default EditEvent;