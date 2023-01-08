import { Box, Button, Flex, Link, Text, useBoolean } from '@chakra-ui/react';
import { useState } from 'react';
import CustomCard from '~/component/CustomCard';
import { DASHBOARD_TYPE_CASHFLOW, DASHBOARD_TYPE_COST_DISCOUNT, DASHBOARD_TYPE_COST_OPERATION, DASHBOARD_TYPE_CURRENT_BALANCE, DASHBOARD_TYPE_PROFIT, DASHBOARD_TYPE_REMAINING_DEBT, IData } from '~/constant';

export default function DashboardContainer(props: any) {
  const data = {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [
      {
        label: '# of Votes',
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <Flex
      flexDirection="column"
      justifyContent="flex-start"
      alignItems="space-between"
      backgroundColor="gray.100"
      textAlign="center"
      width="100%"
    >
      <Text align="center" mt="4">
        <b>LAPORAN KEUANGAN</b>
      </Text>
      <Text fontSize="s" textColor="grey" mb='2'>
        Periode Januari 2023
      </Text>

      <CustomCard dashboardType={DASHBOARD_TYPE_PROFIT} dataLabaRugi={props.dataLabaRugi}/>
      <CustomCard dashboardType={DASHBOARD_TYPE_COST_OPERATION} dataLabaRugi={props.dataLabaRugi}/>
      <CustomCard dashboardType={DASHBOARD_TYPE_COST_DISCOUNT} dataLabaRugi={props.dataLabaRugi} />
      
      {/* <CustomCard dashboardType={DASHBOARD_TYPE_CURRENT_BALANCE}/> */}

      <Link borderRadius="10" backgroundColor="blue.500" py="2" color="white" m="4" colorScheme='blue' href='/detailReport'>Lihat Detail Laporan Keuangan</Link>
    </Flex>
  );
}
