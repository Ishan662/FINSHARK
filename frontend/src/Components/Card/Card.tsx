import React, { JSX } from 'react'
import './Card.css';
import { CompanySearch } from '../../company';

interface Props {
  id: string;
  searchResult: CompanySearch;
}
const Card : React.FC<Props> = ({id, searchResult}: Props) : JSX.Element => {
  return (
    <div className='card'>
       <img alt="company logo"/>
       <div className='details'>
        <h2>{searchResult.name} {searchResult.symbol}</h2>
        <h2>{searchResult.currency}</h2>
        <p className='info'>
          {searchResult.exchangeShortName} - {searchResult.stockExchange}
        </p>

       </div>
    </div>
  )
}

export default Card
