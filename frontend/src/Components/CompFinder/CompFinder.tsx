import React, { useEffect, useState } from 'react'
import { CompanyCompData } from '../../company';
import { getCompData } from '../../api';
import CompFinderItem from './CompFinderItem/CompFinderItem';

type Props = {
    ticker : string;
}

const CompFinder = ({ticker} : Props) => {
const [companyData, setCompanyData] = useState<CompanyCompData>();
useEffect(() => {
    const getComps = async() => {
        try {
            const value = await getCompData(ticker);
            setCompanyData(value?.data[0])
        } catch (error) {
            console.error('Error fetching company data:', error);
            setCompanyData(undefined);
        }
    }
    getComps();
    }, [ticker]);

  return (
    <div className='inline-flex rounded-md shadow-sm m-4'>
      {(companyData?.peersList || []).map((ticker) => {
        return <CompFinderItem ticker={ticker}/>
      })}
    </div>
  )
}

export default CompFinder
