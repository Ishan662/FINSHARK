import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { CompanyProfile } from '../../../company';
import { getCompanyProfile } from '../../../api';
import CompanyDashboard from '../../CompanyDashboard/CompanyDashboard';
import Tile from '../../Tile/Tile';
import CompFinder from '../../CompFinder/CompFinder';

interface Props{}

const CompanyPage = (props: Props) => {
    let { ticker } = useParams();
    const [company, setCompany] = useState<CompanyProfile>();
    const [error, setError] = useState<string>("");

    useEffect(() => {
        const getProfileInit = async () => {
            try {
                console.log("Full URL:", window.location.pathname);
                console.log("useParams ticker:", ticker);
                console.log("API Key exists:", !!process.env.REACT_APP_API_KEY);
                
                if (!ticker) {
                    setError("Ticker not found in URL params. Make sure you're navigating from search results.");
                    return;
                }
                
                const result = await getCompanyProfile(ticker);
                console.log("Company profile response:", result);
                setCompany(result?.data[0])
            } catch (err: any) {
                console.error("Error fetching company profile:", err);
                setError(err.message || "Failed to fetch company data");
            }
        }
        getProfileInit();
    }, [ticker])
  return (
    <>
        {error ? (
            <div className="text-red-500 p-4"><h1>Error: {error}</h1></div>
        ) : company ? (
            <div className="w-full">

          <CompanyDashboard ticker={ticker!}>
            <Tile title="Company Name" subTitle={company.companyName}></Tile>
            <Tile title="Price" subTitle={company.price.toString()}></Tile>
            <Tile title="Sector" subTitle={company.sector}></Tile>
            <CompFinder ticker={company.symbol}
            
          </CompanyDashboard>

        </div>
        ): (
            <div>Loading...</div>
        )}
    </>
  )
}

export default CompanyPage
