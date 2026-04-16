using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Stock;
using api.Interfaces;
using api.Mappers;
using api.Models;
using Newtonsoft.Json;

namespace api.Services
{
    public class FMPService : IFMPService
    {
        private HttpClient _httpClient;
        private IConfiguration _config;
        public FMPService(HttpClient httpClient, IConfiguration config)
        {
            _httpClient = httpClient;
            _config = config;
        }
        public async Task<Stock> FindStockBySmbolAsync(string symbol)
        {
            try
            {
                var result = await _httpClient.GetAsync($"https://financialmodelingprep.com/stable/profile?symbol={symbol}&apikey={_config["FMPKey"]}");
                if(result.IsSuccessStatusCode)
                {
                    var content = await result.Content.ReadAsStringAsync();
                    var tasks = JsonConvert.DeserializeObject<FMPStock[]>(content);
                    var stock = tasks[0];
                    if(stock != null)
                    {
                        return stock.ToStockFromFMP(); 
                    }
                    return null;
                }
                return null;
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return null;
                
            }
        }

        public async Task<string> SearchStocksAsync(string query)
        {
            try
            {
                var result = await _httpClient.GetAsync($"https://financialmodelingprep.com/stable/search-name?query={query}&apikey={_config["FMPKey"]}");
                if(result.IsSuccessStatusCode)
                {
                    var content = await result.Content.ReadAsStringAsync();
                    return content;
                }
                return null;
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return null;
            }
        }

        public async Task<string> GetCompanyProfileAsync(string symbol)
        {
            try
            {
                var result = await _httpClient.GetAsync($"https://financialmodelingprep.com/stable/profile?symbol={symbol}&apikey={_config["FMPKey"]}");
                if(result.IsSuccessStatusCode)
                {
                    var content = await result.Content.ReadAsStringAsync();
                    return content;
                }
                return null;
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return null;
            }
        }

        public async Task<string> GetKeyMetricsAsync(string symbol)
        {
            try
            {
                Console.WriteLine($"[FMPService] Fetching key metrics for symbol: {symbol}");
                var result = await _httpClient.GetAsync($"https://financialmodelingprep.com/stable/key-metrics-ttm?symbol={symbol}&limit=40&apikey={_config["FMPKey"]}");
                var content = await result.Content.ReadAsStringAsync();
                if(result.IsSuccessStatusCode)
                {
                    Console.WriteLine($"[FMPService] Key metrics retrieved successfully for {symbol}");
                    return content;
                }
                else
                {
                    Console.WriteLine($"[FMPService] FMP API Error (GetKeyMetrics): Status={result.StatusCode}, Symbol={symbol}");
                    Console.WriteLine($"[FMPService] Response: {content}");
                    if (result.StatusCode == System.Net.HttpStatusCode.Forbidden)
                    {
                        Console.WriteLine($"[FMPService] 403 Error - Forbidden. This endpoint requires a paid FMP subscription");
                    }
                    return null;
                }
            }
            catch (Exception e)
            {
                Console.WriteLine($"[FMPService] Exception in GetKeyMetricsAsync: {e.Message}");
                return null;
            }
        }
                return null;
            }
        }

        public async Task<string> GetIncomeStatementAsync(string symbol)
        {
            try
            {
                var result = await _httpClient.GetAsync($"https://financialmodelingprep.com/stable/income-statement?symbol={symbol}&limit=40&apikey={_config["FMPKey"]}");
                if(result.IsSuccessStatusCode)
                {
                    var content = await result.Content.ReadAsStringAsync();
                    return content;
                }
                return null;
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return null;
            }
        }

        public async Task<string> GetBalanceSheetAsync(string symbol)
        {
            try
            {
                var result = await _httpClient.GetAsync($"https://financialmodelingprep.com/stable/balance-sheet-statement?symbol={symbol}&limit=40&apikey={_config["FMPKey"]}");
                if(result.IsSuccessStatusCode)
                {
                    var content = await result.Content.ReadAsStringAsync();
                    return content;
                }
                return null;
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return null;
            }
        }

        public async Task<string> GetCashFlowAsync(string symbol)
        {
            try
            {
                var result = await _httpClient.GetAsync($"https://financialmodelingprep.com/stable/cash-flow-statement?symbol={symbol}&limit=40&apikey={_config["FMPKey"]}");
                if(result.IsSuccessStatusCode)
                {
                    var content = await result.Content.ReadAsStringAsync();
                    return content;
                }
                return null;
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return null;
            }
        }

        public async Task<string> GetCompDataAsync(string symbol)
        {
            try
            {
                var result = await _httpClient.GetAsync($"https://financialmodelingprep.com/stable/stock-peers?symbol={symbol}&apikey={_config["FMPKey"]}");
                var content = await result.Content.ReadAsStringAsync();
                if(result.IsSuccessStatusCode)
                {
                    return content;
                }
                else
                {
                    Console.WriteLine($"FMP API Error (GetCompData): {result.StatusCode} - {content}");
                    return null;
                }
            }
            catch (Exception e)
            {
                Console.WriteLine($"Exception in GetCompDataAsync: {e.Message}");
                return null;
            }
        }

        public async Task<string> GetTenKAsync(string symbol)
        {
            try
            {
                Console.WriteLine($"[FMPService] Fetching 10-K data for symbol: {symbol}");
                var result = await _httpClient.GetAsync($"https://financialmodelingprep.com/stable/sec-filings-search/symbol?symbol={symbol}&from=2020-01-01&to=2026-12-31&page=0&limit=10&apikey={_config["FMPKey"]}");
                var content = await result.Content.ReadAsStringAsync();
                if(result.IsSuccessStatusCode)
                {
                    Console.WriteLine($"[FMPService] 10-K data retrieved successfully for {symbol}");
                    return content;
                }
                else
                {
                    Console.WriteLine($"[FMPService] FMP API Error (GetTenK): Status={result.StatusCode}, Symbol={symbol}");
                    Console.WriteLine($"[FMPService] Response: {content}");
                    // Log more details about the error
                    if (result.StatusCode == System.Net.HttpStatusCode.NotFound)
                    {
                        Console.WriteLine($"[FMPService] 404 Error - Symbol '{symbol}' may not be found in FMP or endpoint not available");
                    }
                    else if (result.StatusCode == System.Net.HttpStatusCode.Forbidden)
                    {
                        Console.WriteLine($"[FMPService] 403 Error - Forbidden. API key may not have access to this endpoint (requires paid plan)");
                    }
                    else if (result.StatusCode == System.Net.HttpStatusCode.PaymentRequired)
                    {
                        Console.WriteLine($"[FMPService] 402 Error - Payment Required. This endpoint requires a paid FMP subscription");
                    }
                    return null;
                }
            }
            catch (Exception e)
            {
                Console.WriteLine($"[FMPService] Exception in GetTenKAsync: {e.Message}");
                return null;
            }
        }
    }
}