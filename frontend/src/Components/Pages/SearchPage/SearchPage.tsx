import React, { ChangeEvent, SyntheticEvent, useState } from 'react'
import { CompanySearch } from '../../../company';
import { searchCompanies } from '../../../api';
import Navbar from '../../Navbar/Navbar';
import Search from '../../Search/Search';
import ListPortfolio from '../../Portfolio/ListPortfolio/ListPortfolio';
import CardList from '../../CardList/CardList';

const SearchPage = () => {
      const [search, setSearch] = useState<string>("");
  const [searchResult, setSearchResult] = useState<CompanySearch[]>([]);
  const [serverError, setServerError] = useState<string>("");
  const [portfolioValues, setPortfolioValues] = useState<string[]>([]);

    const handleSearchChange = (e:ChangeEvent<HTMLInputElement, HTMLInputElement>) => {
        setSearch(e.target.value);
    };

    const onPortfolioCreate = (e: any) => {
      e.preventDefault();
      const exists = portfolioValues.find((value) => value === e.target[0].value);
      if (exists) return;
      const updatedPortfolio = [...portfolioValues, e.target[0].value];
      setPortfolioValues(updatedPortfolio )
      console.log(e);
    }

    const onPortfolioDelete = (e:any) => {
      e.prventDefault();
      const removed = portfolioValues.filter((value) => {
        return value !==e.target[0].value;
      });
      setPortfolioValues(removed);
    }
    //onclick
    const onSearchSubmit = async (e: SyntheticEvent  ) => {
      e.preventDefault();
      try {
        console.log("Searching for:", search);
        const result = await searchCompanies(search);
        console.log("Search result:", result);
        if(typeof result === "string"){
          setServerError(result);
        } else if(Array.isArray(result.data)){
          setSearchResult(result.data);
          console.log("Search results set:", result.data);
        }
      } catch (err: any) {
        console.error("Search error:", err);
        setServerError(err.message || "Failed to search companies");
      }
    };
  return (
    <>
        <div className="App">
          <Search onSearchSubmit={onSearchSubmit} search={search} handleSearchChange={handleSearchChange} />
          <ListPortfolio portfolioValues={portfolioValues} onPortfolioDelete={onPortfolioDelete} />
          {serverError && <h1>{serverError}</h1>}
          <CardList searchResults={searchResult} onPortfolioCreate={onPortfolioCreate}/>
        </div>
        </>
  )
}

export default SearchPage
