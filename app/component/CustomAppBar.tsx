import { Box, Button, Flex, Image, Link, Stack, Text, useBoolean, useColorModeValue } from '@chakra-ui/react';
import { useState } from 'react';
import CustomCard from '~/component/CustomCard';
import { DASHBOARD_TYPE_CASHFLOW, DASHBOARD_TYPE_COST_OPERATION, DASHBOARD_TYPE_CURRENT_BALANCE, DASHBOARD_TYPE_PROFIT, DASHBOARD_TYPE_REMAINING_DEBT } from '~/constant';

export default function CustomAppBar() {

  return (
    <Flex
        bg={useColorModeValue('white', 'gray.800')}
        color={useColorModeValue('gray.600', 'white')}
        minH={'60px'}
        py={{ base: 2 }}
        position="fixed"
        px={{ base: 4 }}
        borderBottom={1}
        width={{ base: '100%', md: '380px' }}
        borderStyle={'solid'}
        justifyContent="center"
        alignItems="center"
        borderColor={useColorModeValue('gray.200', 'gray.900')}
        align={'center'}
        >
        <Image
            src={
            'https://uploads-ssl.webflow.com/62af9fefd2f730861971dce1/62afe5cb0139380cff95569e_logoMain.png'
            }
            height="30px"
        />
    </Flex>
  );
}
