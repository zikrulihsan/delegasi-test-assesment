import { CloseIcon } from '@chakra-ui/icons';
import { Box, Flex, IconButton, Link, Text, useBoolean } from '@chakra-ui/react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import CustomAppBar from '~/component/CustomAppBar';
import { InitialData, LABA_RUGI_URL, NERACA_URL } from '~/constant';

export default function DashboardContainer() {

  const [dataLabaRugi, setDataLabaRugi] = useState(InitialData)
  const [dataNeraca, setDataNeraca] = useState(InitialData)

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    await axios.get(LABA_RUGI_URL)
          .then(res => {
            setDataLabaRugi(res.data.details)
          })
    await axios.get(NERACA_URL)
          .then(res => {
            setDataNeraca(res.data.details)
          })
  }

  const [isProfit, setIsProfit] = useBoolean()

  return (
    <Flex
      flexDirection="column"
      justifyContent="flex-start"
      alignItems="space-between"
      backgroundColor="gray.100"
      textAlign="center"
      width="100%"
      pb='100'
    >
      <Box
        minWidth="375px"
        width={{ base: '100%', md: '380px' }}
        borderColor="gray.200"
        minHeight="200px"
        position="relative"
        bg="white"
      >
      <CustomAppBar/>
      <Box 
        pos="fixed"
        top={2}
        right={3}
      >
        <Link href='/'>
          <IconButton
              icon={(<CloseIcon w={4} h={4} />) }
              variant={'ghost'}
              aria-label={'Toggle Navigation'}
          />
        </Link>
      </Box>
      
      <Text align="center" mt="24">
        <b>LAPORAN KEUANGAN</b>
      </Text>
      
      <Text fontSize="s" textColor="grey" mb='2'>
        {dataNeraca.length == 1 ? "" :`Periode ${new Date(`${dataNeraca[0].month}`).toLocaleString('id-ID',{month:'long', year:'numeric'})}`}
      </Text>
      <Flex justifyContent="center" mb="4" borderWidth="1" dropShadow="lg" textColor="grey.100">
          <Text onClick={setIsProfit.toggle} as="button" padding="2" backgroundColor={isProfit ? "grey" : "white"} borderLeftRadius={10}>Neraca</Text>
          <Text onClick={setIsProfit.toggle} as="button" padding="2" backgroundColor={!isProfit ? "grey" : "white"} borderRightRadius={10}>Laba Rugi</Text>
      </Flex>

      {!isProfit ? dataNeraca.length == 1 ? <Text height="500">Loading...</Text> : 
          dataNeraca.map((category) => <Box>
          <Text>
            <b>{category.label.toUpperCase()}</b>
          </Text>
          
          {category.details.map((type) =>  
          <Box textAlign="left" mx="8" mb="4">
            <Text color="blue.600">
              <b>{type.label}</b>
            </Text>
            {type.children?.map((detail) => <>
              <Flex justifyContent="space-between" fontSize="sm" mt="1">
                <Text>
                  <b>{detail.label}</b>
                </Text>
                <Text>
                  {`Rp ${new Intl.NumberFormat('en-DE').format(detail.value)}`}
                </Text>
              </Flex> 
              {detail.details?.map((datum) => 
                <Flex ml="2" justifyContent="space-between" fontSize="sm">
                    <Text>
                      {datum.label}
                    </Text>
                    <Text>
                      {`Rp ${new Intl.NumberFormat('en-DE').format(datum.value)}`}
                    </Text>
                </Flex>
              )}
              </>
            )}
            {type.details?.map((detail) => 
              <>
              <Flex justifyContent="space-between" fontSize="sm">
                <Text>
                  <b>{detail.label}</b>
                </Text>
                <Text>
                <Text>
                  {`Rp ${new Intl.NumberFormat('en-DE').format(detail.value)}`}
                </Text>
                </Text>
              </Flex> 
              {detail.details?.map((datum) => 
                <Flex ml="2" justifyContent="space-between" fontSize="sm">
                    <Text>
                      {datum.label}
                    </Text>
                    <Text>
                      {`Rp ${new Intl.NumberFormat('en-DE').format(datum.value)}`}
                    </Text>
                </Flex>
              )}
              </>
            )}
                     
          </Box>)}        
        </Box>)
      : dataLabaRugi.length == 1 ? <Text height="500">Loading...</Text> : 
      dataLabaRugi.map((category) =>  <Box textAlign="left" mx="8" >
      <Flex justifyContent="space-between" fontSize="sm">
        <Text mt="1">
          <b>{category.label}</b>
        </Text>
        <Text>
          {`Rp ${new Intl.NumberFormat('en-DE').format(category.value)}`}
        </Text>
      </Flex>
      
      {category.details.map((type) =>  
        <Flex justifyContent="space-between" fontSize="sm">
          <Text ml="2">
            {type.label}
          </Text>
          <Text>
            {`Rp ${new Intl.NumberFormat('en-DE').format(type.value)}`}
          </Text>
        </Flex>
        )}    
      </Box>)}
      </Box>
    </Flex>) 
}
