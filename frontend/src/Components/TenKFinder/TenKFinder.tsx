import React, { useEffect, useState } from 'react'
import { CompanyTenK } from '../../company';
import { getTenK } from '../../api';
import TenKFinderItem from './TenKFinderItem/TenKFinderItem';

type Props = {
    ticker: string;
}

const TenKFinder = ({ticker} : Props) => {
    const [companyData, setCompanyData] = useState<CompanyTenK[]>();
    const [error, setError] = useState<string>("");
    useEffect(()=> {
        const getTenKData = async () => {
            try {
                const value = await getTenK(ticker);
                if (value?.data && value.data.length > 0) {
                    setCompanyData(value?.data);
                    setError("");
                } else {
                    setError("No 10-K data available");
                }
            } catch (err: any) {
                console.error('Error fetching 10-K data:', err);
                setError("Failed to load 10-K filings");
            }
        }
        getTenKData();
    }, [ticker]);
  return (
    <div className='inline-flex rounded-md shadow-sm m-4'>
      {error ? (
        <p className="text-gray-500 text-sm p-2">
          {error}
          {error.includes("404") && " - Note: Some tickers may not be available on the free FMP plan. Try a US ticker (e.g., AAPL instead of APC.F)"}
        </p>
      ) : companyData ? (
        companyData?.slice(0,5).map((tenK) =>{
            return <TenKFinderItem tenK={tenK} key={tenK.symbol} />
        })
      ) : (
        <p className="text-gray-500 text-sm p-2">Loading 10-K filings...</p>
      )}
    </div>
  )
}

export default TenKFinder
