import { Box, Flex, Text } from '@chakra-ui/react';

export default function DashboardContainer() {
  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      height="calc(100vh - 50px)"
    >
      <Text>
        Hello World, <br /> <b>Do your magic here,</b>{' '}
      </Text>
    </Flex>
  );
}
