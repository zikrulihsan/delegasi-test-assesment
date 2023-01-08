export const DASHBOARD_TYPE_CASHFLOW = "Aliran Kas"
export const DASHBOARD_TYPE_REMAINING_DEBT = "Hutang Piutang"
export const DASHBOARD_TYPE_PROFIT = "Profit"
export const DASHBOARD_TYPE_CURRENT_BALANCE = "Saldo di Tangan"
export const DASHBOARD_TYPE_COST_OPERATION = "Biaya Operasional"
export const DASHBOARD_TYPE_COST_DISCOUNT = "Diskon Penjualan"

export const LABA_RUGI_URL = "https://my-json-server.typicode.com/Delegasi-Tech/data-dummy/laporan_laba_rugi"
export const NERACA_URL = "https://my-json-server.typicode.com/Delegasi-Tech/data-dummy/laporan_neraca"

export interface IData {
    label: string
    details: Array<IDetailData>
    value: number
}
  
interface IDetailData  {
    label: string
    children?: Array<IDetailData>
    details?: Array<IDetailData>
    value: number
}

interface IChildrenData {
    label: string
    details: Array<IData>
    value: number
}

export const InitialData: Array<IData> = [
{
    label: "",
    details: [
    {
        label: "",
        children: [
        {
            label: "",
            details: [
            {
                label: "",
                details: [
                
                ],
                value: 0
            }
            ],
            value: 0
        }
        ],
        value: 0
    }
    ],
    value: 0
}
]
