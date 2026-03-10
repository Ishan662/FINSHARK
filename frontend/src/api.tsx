import axios from "axios";
import { CompanyProfile, CompanySearch } from "./company";

interface SearchResponse {
  data: CompanySearch[];
}

export const searchCompanies = async (query: string) => {
  try {
    const response = await axios.get<SearchResponse>(
      `https://financialmodelingprep.com/api/v3/search?query=${query}&limit=10&exchange=NASDAQ&apikey=${process.env.REACT_APP_API_KEY}`
    );

    return response;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.log("Axios error message:", error.message);
    } else {
      console.log("Unexpected error:", error);
    }

    throw error;
  }
};

export const getCompanyProfile = async (query: string) => {
  try {
    const response = await axios.get<CompanyProfile[]>(
      `https://financialmodelingprep.com/api/v3/profile/${query}?apikey=${process.env.REACT_APP_API_KEY}`
    );

    return response;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.log("Axios error message:", error.message);
    } else {
      console.log("Unexpected error:", error);
    }

    throw error;
  }
};