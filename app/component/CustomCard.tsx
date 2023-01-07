import { Box, Flex, Text, extendTheme, Progress } from '@chakra-ui/react';
import { Bar, Doughnut, Line, Pie, Scatter } from 'react-chartjs-2';
import { 
    Chart as ChartJS, 
    ArcElement, 
    Tooltip, 
    Legend, 
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    BarElement
} from 'chart.js';
import { useEffect, useState } from 'react';
import { DASHBOARD_TYPE_CASHFLOW, DASHBOARD_TYPE_COST_OPERATION, DASHBOARD_TYPE_CURRENT_BALANCE, DASHBOARD_TYPE_PROFIT, DASHBOARD_TYPE_REMAINING_DEBT } from '~/constant';

ChartJS.register(ArcElement);
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
  );

export default function CustomCard(props: any) {
  
  const dataOperasional = {
    labels: ['Pengeluaran', 'Pemasukan', "pengeluaran2", "pemasukan2"],
    datasets: [
      {
        label: '# Total Cash Flow',
        data: [12000, 20000, 20000, 180000],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(209, 150, 132, 0.2)',
          'rgba(60, 102, 235, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(209, 99, 132, 1)',
          'rgba(60, 162, 235, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const data = {
      labels: ['Jumlah Uang dalam Rupiah'],
      datasets: [
        {
          label: 'Pemasukan',
          data: [27000000],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
          ],
          borderWidth: 1,
        },
        {
          label: 'Pengeluaran',
          data: [20000000],
          backgroundColor: [
            'rgba(54, 162, 235, 0.2)',
          ],
          borderColor: [
            'rgba(54, 162, 235, 1)',
          ],
          borderWidth: 1,
        },
        
      ],
    };
  
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom' as const,
      },
      title: {
        display: false,
      },
    },
  };


  return (
    <Box 
      borderRadius='md' 
      textAlign='start' 
      boxShadow="md" 
      m='2' 
      p='4'
      backgroundColor="white"
    >
      <Text mb="0.5">
        <b>{props.dashboardType}</b>
      </Text>

      {props.dashboardType === DASHBOARD_TYPE_CURRENT_BALANCE ?
          <Box fontSize="sm">
            <Text fontSize="xl">
              <b>Rp. 127.000.000</b>
            </Text>
            <Flex justifyContent="space-between" >
              <Text>
                BANK BRI
              </Text> 
              <Text>
                Rp. 127.000.000
              </Text> 
            </Flex>
            <Flex justifyContent="space-between">
              <Text>
                UANG DI TANGAN
              </Text> 
              <Text>
                Rp. 127.000.000
              </Text> 
            </Flex>
          </Box>
          : <></>}

      {props.dashboardType == DASHBOARD_TYPE_PROFIT ?
        <Box>
          <Text fontSize="xl">
              <b>Rp. 127.000.000</b>
          </Text>
          <Flex justifyContent="space-between">
              <Text>
                Pendapatan
              </Text> 
              <Text>
                Rp. 127.000.000
              </Text> 
          </Flex>
          <Flex justifyContent="space-between">
              <Text>
                Beban Operasional
              </Text> 
              <Text>
                Rp. 127.000.000
              </Text> 
          </Flex>
          
          <Progress position="static" value={40} backgroundColor="red" height="25px" my="2" borderLeftRadius={5} borderRightRadius={5}/>   
          <Flex>
            <Box backgroundColor="blue.500" width="4" height="4" mr="1" mb="1"></Box>
            <Text fontSize="xs">Pendapatan</Text>
          </Flex> 
          <Flex>
            <Box backgroundColor="red" width="4" height="4" mr="1"></Box>
            <Text fontSize="xs">Beban Operasional</Text>
          </Flex>
        </Box>
      :<></>}
    
      {props.dashboardType === DASHBOARD_TYPE_CASHFLOW ?
      <Flex
        justifyContent="center"
        mb="4"
      >
        <Box borderLeftRadius={5} textAlign="center" backgroundColor="red.100" flex="1" >
          <Text fontSize="sm" mt="1">
            Uang Keluar
          </Text>
          <Text>
            <b>Rp. 127.000.000</b>
          </Text>
        </Box>
        <Box textAlign="center" borderRightRadius={5} backgroundColor="blue.100" flex="1">
          <Text fontSize="sm" mt="1">
            Uang Masuk
          </Text>
          <Text mb="2">
            <b>Rp. 127.000.000</b>
          </Text>
       </Box>
      </Flex> : <></> }
      
      {props.dashboardType === DASHBOARD_TYPE_CASHFLOW ?
      <Bar
        data={data}
        options={options}
        height="200"
      /> : <></> }

      {props.dashboardType === DASHBOARD_TYPE_COST_OPERATION ?
      <Box>
        <Text fontSize="xl" mb="2">
          <b>Rp. 127.000.000</b>
        </Text>
        <Pie
          data={dataOperasional}
          options={options}
        /> 
        <Box mx="4">
          <Flex justifyContent="space-between">
            <Text>
              BANK MANDIRI
            </Text> 
            <Text>
              Rp. 127.000.000
            </Text> 
          </Flex>
          <Flex justifyContent="space-between">
            <Text>
              BANK BRI
            </Text> 
            <Text>
              Rp. 127.000.000
            </Text> 
          </Flex>
        </Box>
      </Box>
      : <></> }      
    </Box>
  );
}
