import React, { useEffect, useState } from 'react'
import { CompanyIncomeStatement } from '../../company';
import { formatLargeMonetaryNumber, formatRatio } from '../../Helpers/NumberFormatting';
import { useOutletContext } from 'react-router-dom';
import { getIncomeStatement } from '../../api';
import Table from '../Table/Table';

const configs = [
  {
    label: "Date",
    render: (company: CompanyIncomeStatement) => company.date,
  },
  {
    label: "Revenue",
    render: (company: CompanyIncomeStatement) =>
      formatLargeMonetaryNumber(company.revenue),
  },
  {
    label: "Cost Of Revenue",
    render: (company: CompanyIncomeStatement) =>
      formatLargeMonetaryNumber(company.costOfRevenue),
  },
  {
    label: "Depreciation",
    render: (company: CompanyIncomeStatement) =>
      formatLargeMonetaryNumber(company.depreciationAndAmortization),
  },
  {
    label: "Operating Income",
    render: (company: CompanyIncomeStatement) =>
      formatLargeMonetaryNumber(company.operatingIncome),
  },
  {
    label: "Income Before Taxes",
    render: (company: CompanyIncomeStatement) =>
      formatLargeMonetaryNumber(company.incomeBeforeTax),
  },
  {
    label: "Net Income",
    render: (company: CompanyIncomeStatement) =>
      formatLargeMonetaryNumber(company.netIncome),
  },
  {
    label: "Net Income Ratio",
    render: (company: CompanyIncomeStatement) =>
      formatRatio(company.netIncomeRatio),
  },
  {
    label: "Earnings Per Share",
    render: (company: CompanyIncomeStatement) => formatRatio(company.eps),
  },
  {
    label: "Earnings Per Diluted",
    render: (company: CompanyIncomeStatement) =>
      formatRatio(company.epsdiluted),
  },
  {
    label: "Gross Profit Ratio",
    render: (company: CompanyIncomeStatement) =>
      formatRatio(company.grossProfitRatio),
  },
  {
    label: "Opearting Income Ratio",
    render: (company: CompanyIncomeStatement) =>
      formatRatio(company.operatingIncomeRatio),
  },
  {
    label: "Income Before Taxes Ratio",
    render: (company: CompanyIncomeStatement) =>
      formatRatio(company.incomeBeforeTaxRatio),
  },
];

const IncomeStatement = () => {
  const ticker = useOutletContext<string>();
  const [incomeStatement, setIncomeStatement] = useState<CompanyIncomeStatement>();
  const [error, setError] = useState<string>("");
  useEffect(() => {
    const incomeStatementFetch = async () => {
      try {
        console.log("Fetching income statement for ticker:", ticker);
        const result = await getIncomeStatement(ticker);
        console.log("Income statement response:", result);
        if (!result?.data || result.data.length === 0) {
          setError("No data received from API");
        } else {
          setIncomeStatement(result?.data[0]);
        }
      } catch (err: any) {
        console.error("Error fetching income statement:", err);
        setError(err.message || "Failed to fetch data");
      }
    };
    incomeStatementFetch()
  }, [ticker])
  return (
    <> {error ? (
      <h1 className="text-red-500">Error: {error}</h1>
    ) : incomeStatement ? <><Table config={configs} data={incomeStatement}/>
    </> : <>Loading...</>}</>
  )
}

export default IncomeStatement
