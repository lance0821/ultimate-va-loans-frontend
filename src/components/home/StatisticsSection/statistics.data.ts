export interface Statistic {
  id: string
  value: number
  label: string
  prefix?: string
  suffix?: string
  decimals?: number
}

export const statistics: Statistic[] = [
  {
    id: 'loans-closed',
    value: 50000,
    label: 'VA Loans Closed',
    suffix: '+'
  },
  {
    id: 'customer-rating',
    value: 4.8,
    label: 'Customer Rating',
    suffix: '/5',
    decimals: 1
  },
  {
    id: 'years-business',
    value: 15,
    label: 'Years in Business',
    suffix: '+'
  },
  {
    id: 'closing-time',
    value: 21,
    label: 'Day Average Close',
    suffix: ' days'
  }
]