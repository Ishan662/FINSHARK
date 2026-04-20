import React, { ChangeEvent, SyntheticEvent, useEffect, useState } from 'react'
import { CompanySearch } from '../../../company';
import { searchCompanies } from '../../../api';
import Navbar from '../../Navbar/Navbar';
import Search from '../../Search/Search';
import ListPortfolio from '../../Portfolio/ListPortfolio/ListPortfolio';
import CardList from '../../CardList/CardList';
import { PortfolioGet } from '../../../Models/Portfolio';
import { PortfolioAddApi, PortfolioDeleteApi, PortfolioGetApi } from '../../../Services/PortFolioService';
import { toast } from 'react-toastify';

const SearchPage = () => {
  const [search, setSearch] = useState<string>("");
  const [searchResult, setSearchResult] = useState<CompanySearch[]>([]);
  const [serverError, setServerError] = useState<string>("");
  const [portfolioValues, setPortfolioValues] = useState<PortfolioGet[] | null>([]);

  const handleSearchChange = (e:ChangeEvent<HTMLInputElement, HTMLInputElement>) => {
      setSearch(e.target.value);
  };

  useEffect(() => {
    getPortfoio();
  }, []);

  const getPortfoio = () => {
    PortfolioGetApi()
    .then((res) => {
      if(res?.data){
        setPortfolioValues(res?.data);
      }
    }).catch((e) => {
      toast.warning("Could not get portfolio values..");
    })
  }

  const onPortfolioCreate = (e: any) => {
    e.preventDefault();
    PortfolioAddApi(e.target[0].value)
    .then((res) => {
      if(res?.status === 204){
        toast.success("Stock added to the portfolio!")
        getPortfoio();
      }
    }).catch((e) => {
      toast.warning("Could not create portfolio!")
    })
  }

  const onPortfolioDelete = (e:any) => {
    e.prventDefault();
    PortfolioDeleteApi(e.target[0].value)
    .then((res) => {
      if(res?.status ===200){
        toast.success("Stock deleted from portfolio!");
        getPortfoio();
      }
    })
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
          <ListPortfolio portfolioValues={portfolioValues!} onPortfolioDelete={onPortfolioDelete} />
          {serverError && <h1>{serverError}</h1>}
          <CardList searchResults={searchResult} onPortfolioCreate={onPortfolioCreate}/>
        </div>
        </>
  )
}

export default SearchPage
