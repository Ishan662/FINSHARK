using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Models;

namespace api.Interfaces
{
    public interface IFMPService
    {
        Task<Stock> FindStockBySmbolAsync(string symbol);
        Task<string> SearchStocksAsync(string query);
        Task<string> GetCompanyProfileAsync(string symbol);
        Task<string> GetKeyMetricsAsync(string symbol);
        Task<string> GetIncomeStatementAsync(string symbol);
        Task<string> GetBalanceSheetAsync(string symbol);
        Task<string> GetCashFlowAsync(string symbol);
        Task<string> GetCompDataAsync(string symbol);
        Task<string> GetTenKAsync(string symbol);
    }
}