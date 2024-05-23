import { useEffect, useState } from 'react';
import { Box, Button, Container, Heading, List, ListItem, Text, VStack } from '@chakra-ui/react';
import { supabase } from '../supabaseClient';
import { useParams } from 'react-router-dom';

const DemoList = () => {
  const { eventId } = useParams();
  const [demos, setDemos] = useState([]);

  useEffect(() => {
    const fetchDemos = async () => {
      const { data, error } = await supabase
        .from('demos')
        .select('*')
        .eq('event_id', eventId);

      if (error) {
        console.error('Error fetching demos:', error);
      } else {
        setDemos(data);
      }
    };

    fetchDemos();
  }, [eventId]);

  const handleDelete = async (id) => {
    const { error } = await supabase
      .from('demos')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting demo:', error);
    } else {
      setDemos(demos.filter(demo => demo.id !== id));
    }
  };

  return (
    <Container centerContent>
      <Box p={4} borderWidth={1} borderRadius="lg" width="100%" maxWidth="600px">
        <Heading mb={4}>Demo List</Heading>
        <List spacing={3}>
          {demos.map(demo => (
            <ListItem key={demo.id} borderWidth={1} borderRadius="lg" p={4}>
              <VStack align="start">
                <Text fontSize="xl">{demo.name}</Text>
                <Text>{demo.description}</Text>
                <Button colorScheme="red" size="sm" onClick={() => handleDelete(demo.id)}>
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

export default DemoList;