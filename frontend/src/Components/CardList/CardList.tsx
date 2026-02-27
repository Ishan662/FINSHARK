import React, { JSX } from 'react'
import Card from '../Card/Card'
import { CompanySearch } from '../../company'
import { v7 as uuidv7 } from 'uuid'

interface Props {
  searchResults: CompanySearch[];
}

const CardList: React.FC<Props> = ({searchResults}: Props): JSX.Element => {
  return( <>
  {searchResults.length > 0 ? ( 
    searchResults.map((result) => {
      return <Card id={result.symbol} key={uuidv7()} searchResult={result}/>
    })
  ): (
    <h1>No results</h1>
  )}
  </>);
}

export default CardList
