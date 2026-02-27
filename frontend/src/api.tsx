import axios from "axios"
import { CompanySearch } from "./company";

interface searchResponse {
    data: CompanySearch[];
}

export const searchCompanies = async (query: string) => {
    try {
        const data = await axios.get<searchResponse>(
            `https://financialmodelingprep.com/api/v3/search?query=${query}&limit=10&exchange=NASDAQ&apikey=${process.env.REACT_APP_API_KEY}`
        ); 
        return data;
    }catch (error: unknown){
        if(axios.isAxiosError(error)){
            console.log("error massage: ", error.message);
            return error.message;
        }else{
            console.log('unexpected error: ', error);
            return 'An unexpected error occured..';
        }
    }
}