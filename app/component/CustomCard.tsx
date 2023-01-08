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
import { DASHBOARD_TYPE_CASHFLOW, DASHBOARD_TYPE_COST_DISCOUNT, DASHBOARD_TYPE_COST_OPERATION, DASHBOARD_TYPE_CURRENT_BALANCE, DASHBOARD_TYPE_PROFIT, DASHBOARD_TYPE_REMAINING_DEBT, IData } from '~/constant';

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

  const getValueByLabel = (label: string) => {
    let value = props.dataLabaRugi.filter((item: IData) => item.label == label)[0]["value"]
    return value
  }

  const getDetailsByLabel = (label: string) => {
    let value = props.dataLabaRugi.filter((item: IData) => item.label == label)
    console.log(value)
    return value
  }


  const getFormattedText = (value: number) => {
    return `Rp ${new Intl.NumberFormat('en-DE').format(value)}`
  }

  const getProfitPercentage = () => {
    return getValueByLabel("Laba Usaha")/getValueByLabel("Pendapatan Bersih") * 100
  }

  let dataExplanation : string = ""

  switch(props.dashboardType) {
    case DASHBOARD_TYPE_PROFIT:
      dataExplanation = "(Pendapatan Bersih -  Jumlah HPP & Beban Operasional)"
      break;
    case DASHBOARD_TYPE_CURRENT_BALANCE:
      dataExplanation = "(Jumlah Uang Yang Dimiliki)"
      break;
    case DASHBOARD_TYPE_COST_DISCOUNT:
      dataExplanation = "(Jumlah Diskon vs Pendapatan vs Profit)"
      break;
    case DASHBOARD_TYPE_COST_OPERATION:
      dataExplanation = "(Operasional yang berkaitan langsung dengan produksi)"
      break;   
  }

  let operationCostDataLabel: Array<string> = [] 

 
  let operationCostDataValue: Array<number> = [] 

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
      <Text mt="-1" mb="1" fontSize="xs">
        {dataExplanation}
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
    
      {props.dashboardType === DASHBOARD_TYPE_PROFIT ?
      <>
      <Text fontSize="xl" mb="2" >
        <b>{getFormattedText(getValueByLabel("Laba Usaha"))}</b>
      </Text>
      <Flex
        justifyContent="center"
        mb="4"
      >
        <Box textAlign="center" borderLeftRadius={5} backgroundColor="gray.100" flex="1">
          <Text fontSize="xs" mt="1">
            Pendapatan Bersih
          </Text>
          <Text mb="2">
            <b>{getFormattedText(getValueByLabel("Pendapatan Bersih"))}</b>
          </Text>
       </Box>
       <Box borderRightRadius={5} textAlign="center" backgroundColor="red.100" flex="1" >
          <Text fontSize="xs" mt="1">
            Beban Operasional + HPP
          </Text>
          <Text>
            <b>{getFormattedText(getValueByLabel("Harga Pokok Penjualan")/100 + getValueByLabel("Beban") )}</b>
          </Text>
        </Box>
      </Flex> 
      </>: <></> }

      {props.dashboardType == DASHBOARD_TYPE_PROFIT ?
        <Box fontSize="sm">
          <Text fontSize="sm" mb="2" >
            <b>Rasio profit dari pendapatan bersih</b>
          </Text>
        
          <Flex justifyContent="space-between">
            <Box backgroundColor="blue.500" width="4" height="4" mr="1" mb="1"></Box>
            <Flex justifyContent="space-between" flex={1}>
              <Text>
                {`Profit (${getProfitPercentage().toFixed(2)}%)`} 
              </Text> 
            </Flex>
          </Flex>
          <Flex justifyContent="space-between">
            <Box backgroundColor="red" width="4" height="4" mr="1" mb="1"></Box>
            <Flex justifyContent="space-between" flex={1}>
              <Text>
              {`Beban Operasional dan HPP (${(100 - getProfitPercentage()).toFixed(2)}%)`} 
              </Text> 
            </Flex>
          </Flex>
          
          <Progress position="static" value={getProfitPercentage()} backgroundColor="red" height="25px" mt="3" mb="1" borderLeftRadius={5} borderRightRadius={5}/>   
          <Box width="full" height="2" backgroundColor="gray.400"></Box>
          <Text fontSize="xs" mb="2" align="center">
            Total Pendapatan Bersih
          </Text>
          
        </Box>
      :<></>}
      
      {props.dashboardType === DASHBOARD_TYPE_COST_DISCOUNT ?
      <>
        <Text fontSize="lg">
          <b>{getFormattedText(getValueByLabel("Diskon Penjualan"))}</b>
        </Text>
        <Text fontSize="sm" my={4} align="center">
          <b>Diskon Terhadap Laba dan Pendapatan</b>
        </Text>
        {props.dataLabaRugi == undefined ? <Text>Loading...</Text>
        : <Bar
          data={
            {
              labels: ['Jumlah Uang dalam Rupiah'],
              datasets: [
                {
                  label: 'Diskon Penjualan',
                  data: [getValueByLabel("Diskon Penjualan")],
                  backgroundColor: [
                    'rgba(54, 162, 235, 0.2)',
                  ],
                  borderColor: [
                    'rgba(54, 162, 235, 1)',
                  ],
                  borderWidth: 1,
                },
                {
                  label: 'Laba/Rugi',
                  data: [getValueByLabel("Laba Usaha")],
                  backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                  ],
                  borderColor: [
                    'rgba(255, 99, 132, 1)',
                  ],
                  borderWidth: 1,
                },
                
                {
                  label: 'Pendapatan Kotor',
                  data: [getValueByLabel("Pendapatan Kotor")],
                  backgroundColor: [
                    'rgba(0, 99, 132, 0.2)',
                  ],
                  borderColor: [
                    'rgba(0, 99, 132, 1)',
                  ],
                  borderWidth: 1,
                },
                
              ],
            }
          }
          options={options}
          height="300"
        /> }
      </>
    : <></> }

      {props.dashboardType === DASHBOARD_TYPE_COST_OPERATION ?
      <Box>
        <Text fontSize="xl" mb="2">
          <b>{getFormattedText(getValueByLabel("Beban"))}</b>
        </Text>
        <Pie
          data={
            {
              labels: operationCostDataLabel,
              datasets: [
                {
                  label: '# Total Operational Cost',
                  data: operationCostDataValue,
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
            }
          }
          options={options}
        /> 
        <Text></Text>
        <Box mx="4">
          {props.dataLabaRugi == undefined ? <></> 
          : getDetailsByLabel("Beban")[0].details.map((item: any) => {
            operationCostDataLabel.push(item.label)
            operationCostDataValue.push(item.value)
            return <Flex justifyContent="space-between">
              <Text>
                {item.label}
              </Text> 
              <Text>
                {getFormattedText(item.value)}
              </Text> 
            </Flex> 
            }
            )
          }
         
        </Box>
      </Box>
      : <></> }      
    </Box>
  );
}
