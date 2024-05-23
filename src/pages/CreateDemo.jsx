import { useState } from 'react';
import { Box, Button, Container, FormControl, FormLabel, Input, VStack, Heading } from '@chakra-ui/react';
import { supabase } from '../supabaseClient';
import { useParams } from 'react-router-dom';

const CreateDemo = () => {
  const { eventId } = useParams();
  const [demoName, setDemoName] = useState('');
  const [demoDescription, setDemoDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase
      .from('demos')
      .insert([{ name: demoName, description: demoDescription, event_id: eventId }]);

    if (error) {
      console.error('Error creating demo:', error);
    } else {
      console.log('Demo created successfully:', data);
      setDemoName('');
      setDemoDescription('');
    }
  };

  return (
    <Container centerContent>
      <Box p={4} borderWidth={1} borderRadius="lg" width="100%" maxWidth="500px">
        <Heading mb={4}>Create New Demo</Heading>
        <form onSubmit={handleSubmit}>
          <VStack spacing={4}>
            <FormControl id="demo-name" isRequired>
              <FormLabel>Demo Name</FormLabel>
              <Input
                type="text"
                value={demoName}
                onChange={(e) => setDemoName(e.target.value)}
              />
            </FormControl>
            <FormControl id="demo-description" isRequired>
              <FormLabel>Demo Description</FormLabel>
              <Input
                type="text"
                value={demoDescription}
                onChange={(e) => setDemoDescription(e.target.value)}
              />
            </FormControl>
            <Button type="submit" colorScheme="blue" width="full">
              Create Demo
            </Button>
          </VStack>
        </form>
      </Box>
    </Container>
  );
};

export default CreateDemo;