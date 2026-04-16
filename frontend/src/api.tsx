import axios from "axios";
import { CompanyBalanceSheet, CompanyCashFlow, CompanyCompData, CompanyIncomeStatement, CompanyKeyMetrics, CompanyProfile, CompanySearch, CompanyTenK } from "./company";

interface SearchResponse {
  data: CompanySearch[];
}

export const searchCompanies = async (query: string) => {
  try {
    const response = await axios.get<SearchResponse>(
      `http://localhost:5195/api/stock/search?query=${query}`
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
    const response = await axios.get(
      `http://localhost:5195/api/stock/profile/${query}`
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

export const getKeyMetrics = async (query: string) => {
  try {
    const response = await axios.get(
      `http://localhost:5195/api/stock/metrics/${query}`
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

export const getIncomeStatement = async (query: string) => {
  try {
    const response = await axios.get(
      `http://localhost:5195/api/stock/income-statement/${query}`
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

export const getBalanceSheet = async (query: string) => {
  try {
    const response = await axios.get(
      `http://localhost:5195/api/stock/balance-sheet/${query}`
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

export const getCashFlowStatement = async (query: string) => {
  try {
    const response = await axios.get(
      `http://localhost:5195/api/stock/cash-flow/${query}`
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

export const getCompData = async (query: string) => {
  try {
    const response = await axios.get(
      `http://localhost:5195/api/stock/peers/${query}`
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

export const getTenK = async (query: string) => {
  try {
    const data = await axios.get(
      `http://localhost:5195/api/stock/tenk/${query}`
    );
    return data;
  } catch (error: any) {
    console.log("error message: ", error.message);
  }
};

// Portfolio API functions
export const getUserPortfolio = async (token: string) => {
  try {
    const response = await axios.get(
      `http://localhost:5195/api/portfolio`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    return response;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.log("Portfolio fetch error:", error.message);
    } else {
      console.log("Unexpected error:", error);
    }
    throw error;
  }
};

export const addPortfolio = async (symbol: string, token: string) => {
  try {
    const response = await axios.post(
      `http://localhost:5195/api/portfolio?symbol=${symbol}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    return response;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.log("Add portfolio error:", error.message);
    } else {
      console.log("Unexpected error:", error);
    }
    throw error;
  }
};

export const deletePortfolio = async (symbol: string, token: string) => {
  try {
    const response = await axios.delete(
      `http://localhost:5195/api/portfolio?symbol=${symbol}`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    return response;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.log("Delete portfolio error:", error.message);
    } else {
      console.log("Unexpected error:", error);
    }
    throw error;
  }
};