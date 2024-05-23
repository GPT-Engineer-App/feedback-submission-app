import { useEffect, useState } from 'react';
import { Box, Button, Container, Heading, List, ListItem, Text, VStack } from '@chakra-ui/react';
import { supabase } from '../supabaseClient';
import { Link } from 'react-router-dom';

const EventList = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const { data, error } = await supabase
        .from('events')
        .select('*');

      if (error) {
        console.error('Error fetching events:', error);
      } else {
        setEvents(data);
      }
    };

    fetchEvents();
  }, []);

  const handleDelete = async (id) => {
    const { error } = await supabase
      .from('events')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting event:', error);
    } else {
      setEvents(events.filter(event => event.id !== id));
    }
  };

  return (
    <Container centerContent>
      <Box p={4} borderWidth={1} borderRadius="lg" width="100%" maxWidth="600px">
        <Heading mb={4}>Event List</Heading>
        <List spacing={3}>
          {events.map(event => (
            <ListItem key={event.id} borderWidth={1} borderRadius="lg" p={4}>
              <VStack align="start">
                <Text fontSize="xl">{event.name}</Text>
                <Text>{new Date(event.date).toLocaleDateString()}</Text>
                <Button as={Link} to={`/events/${event.id}/demos`} colorScheme="teal" size="sm">
                  Manage Demos
                </Button>
                <Button colorScheme="red" size="sm" onClick={() => handleDelete(event.id)}>
                  Delete
                </Button>
              </VStack>
            </ListItem>
          ))}
        </List>
      </Box>
    </Container>
  );
};

export default EventList;