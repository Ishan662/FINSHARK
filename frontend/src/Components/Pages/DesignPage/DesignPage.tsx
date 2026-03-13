import React from 'react'
import Table from '../../Table/Table'
import { testIncomeStatementData } from '../../Table/TestData'

type Props = {}

const configs = [
  {
    label: "Year",
    render: (company: any) => company.acceptedDate,
  },
  {
    label: "Cost Of Revenue",
    render: (company: any) => company.costOfRevenue,
  }
]

const DesignPage = (props: Props) => {
  return (
    <>
      <h1>Finshark Design Page</h1>
      <h2>This is finhark's design page.</h2>
      <Table config={configs} data={testIncomeStatementData}/>
    </>
  )
}

export default DesignPage