import React, { useEffect, useState } from 'react'
import { formatLargeMonetaryNumber } from '../../Helpers/NumberFormatting';
import { CompanyCashFlow } from '../../company';
import { useOutletContext } from 'react-router-dom';
import { getCashFlowStatement } from '../../api';
import Table from '../Table/Table';

type Props = {}

const config = [
  {
    label: "Date",
    render: (company: CompanyCashFlow) => company.date,
  },
  {
    label: "Operating Cashflow",
    render: (company: CompanyCashFlow) =>
      formatLargeMonetaryNumber(company.operatingCashFlow),
  },
  {
    label: "Investing Cashflow",
    render: (company: CompanyCashFlow) =>
      formatLargeMonetaryNumber(company.netCashUsedForInvestingActivites),
  },
  {
    label: "Financing Cashflow",
    render: (company: CompanyCashFlow) =>
      formatLargeMonetaryNumber(
        company.netCashUsedProvidedByFinancingActivities
      ),
  },
  {
    label: "Cash At End of Period",
    render: (company: CompanyCashFlow) =>
      formatLargeMonetaryNumber(company.cashAtEndOfPeriod),
  },
  {
    label: "CapEX",
    render: (company: CompanyCashFlow) =>
      formatLargeMonetaryNumber(company.capitalExpenditure),
  },
  {
    label: "Issuance Of Stock",
    render: (company: CompanyCashFlow) =>
      formatLargeMonetaryNumber(company.commonStockIssued),
  },
  {
    label: "Free Cash Flow",
    render: (company: CompanyCashFlow) =>
      formatLargeMonetaryNumber(company.freeCashFlow),
  },
];

const CashFlowStatement = (props : Props) => {
    const ticker = useOutletContext<string>();
    const [cashflowData, setCashflow] = useState<CompanyCashFlow>();
    const [error, setError] = useState<string>("");
    useEffect(() => {
        const fetchCashFlow = async() => {
            try {
                console.log("Fetching cash flow statement for ticker:", ticker);
                const result = await getCashFlowStatement(ticker!);
                console.log("Cash flow response:", result);
                if (!result?.data || result.data.length === 0) {
                    setError("No data received from API");
                } else {
                    setCashflow(result?.data[0]);
                }
            } catch (err: any) {
                console.error("Error fetching cash flow:", err);
                setError(err.message || "Failed to fetch data");
            }
        }
        fetchCashFlow();
    }, [ticker]);
  return <>
  { error ? (
    <h1 className="text-red-500">Error: {error}</h1>
  ) : cashflowData ? (
    <Table config={config} data={cashflowData} />
  ) : (
    <h1>Loading...</h1>
  )}
  </>
}

export default CashFlowStatement
