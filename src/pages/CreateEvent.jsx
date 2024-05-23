import { useState } from 'react';
import { Box, Button, Container, FormControl, FormLabel, Input, VStack, Heading } from '@chakra-ui/react';
import { supabase } from '../supabaseClient';

const CreateEvent = () => {
  const [eventName, setEventName] = useState('');
  const [eventDate, setEventDate] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase
      .from('events')
      .insert([{ name: eventName, date: eventDate }]);

    if (error) {
      console.error('Error creating event:', error);
    } else {
      console.log('Event created successfully:', data);
      setEventName('');
      setEventDate('');
    }
  };

  return (
    <Container centerContent>
      <Box p={4} borderWidth={1} borderRadius="lg" width="100%" maxWidth="500px">
        <Heading mb={4}>Create New Event</Heading>
        <form onSubmit={handleSubmit}>
          <VStack spacing={4}>
            <FormControl id="event-name" isRequired>
              <FormLabel>Event Name</FormLabel>
              <Input
                type="text"
                value={eventName}
                onChange={(e) => setEventName(e.target.value)}
              />
            </FormControl>
            <FormControl id="event-date" isRequired>
              <FormLabel>Event Date</FormLabel>
              <Input
                type="date"
                value={eventDate}
                onChange={(e) => setEventDate(e.target.value)}
              />
            </FormControl>
            <Button type="submit" colorScheme="blue" width="full">
              Create Event
            </Button>
          </VStack>
        </form>
      </Box>
    </Container>
  );
};

export default CreateEvent;