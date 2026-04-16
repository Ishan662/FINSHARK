using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Dtos.Stock;
using api.Helpers;
using api.Interfaces;
using api.Mappers;
using api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace api.Controllers
{
    [Route("api/stock")]
    [ApiController]
    public class StockController : ControllerBase
    {
        private readonly ApplicationDBContext _context;
        private readonly IStockRepository _stockRepo;
        private readonly IFMPService _fmpService;
        public StockController(ApplicationDBContext context, IStockRepository stockRepo, IFMPService fmpService)
        {
            _stockRepo = stockRepo;
            _context = context;
            _fmpService = fmpService;
        }
        [HttpGet]

        public async Task<IActionResult> getAll([FromQuery] QueryObject query)
        {
            var stocks = await _stockRepo.GetAllAsync(query);
            var stockDto = stocks.Select(s => s.ToStockDto()).ToList();

            return Ok(stockDto);
        }

        [HttpGet("search")]
        [AllowAnonymous]
        public async Task<IActionResult> Search([FromQuery] string query)
        {
            if (string.IsNullOrWhiteSpace(query))
            {
                return BadRequest("Search query cannot be empty");
            }

            var result = await _fmpService.SearchStocksAsync(query);
            
            if (result == null)
            {
                return NotFound("No stocks found");
            }

            return Ok(result);
        }

        [HttpGet("profile/{symbol}")]
        [AllowAnonymous]
        public async Task<IActionResult> GetProfile([FromRoute] string symbol)
        {
            if (string.IsNullOrWhiteSpace(symbol))
            {
                return BadRequest("Symbol cannot be empty");
            }

            var result = await _fmpService.GetCompanyProfileAsync(symbol);
            
            if (result == null)
            {
                return NotFound("Company profile not found");
            }

            return Ok(result);
        }

        [HttpGet("metrics/{symbol}")]
        [AllowAnonymous]
        public async Task<IActionResult> GetMetrics([FromRoute] string symbol)
        {
            if (string.IsNullOrWhiteSpace(symbol))
            {
                return BadRequest("Symbol cannot be empty");
            }

            var result = await _fmpService.GetKeyMetricsAsync(symbol);
            
            if (result == null)
            {
                return NotFound("Metrics not found");
            }

            return Ok(result);
        }

        [HttpGet("income-statement/{symbol}")]
        [AllowAnonymous]
        public async Task<IActionResult> GetIncomeStatement([FromRoute] string symbol)
        {
            if (string.IsNullOrWhiteSpace(symbol))
            {
                return BadRequest("Symbol cannot be empty");
            }

            var result = await _fmpService.GetIncomeStatementAsync(symbol);
            
            if (result == null)
            {
                return NotFound("Income statement not found");
            }

            return Ok(result);
        }

        [HttpGet("balance-sheet/{symbol}")]
        [AllowAnonymous]
        public async Task<IActionResult> GetBalanceSheet([FromRoute] string symbol)
        {
            if (string.IsNullOrWhiteSpace(symbol))
            {
                return BadRequest("Symbol cannot be empty");
            }

            var result = await _fmpService.GetBalanceSheetAsync(symbol);
            
            if (result == null)
            {
                return NotFound("Balance sheet not found");
            }

            return Ok(result);
        }

        [HttpGet("cash-flow/{symbol}")]
        [AllowAnonymous]
        public async Task<IActionResult> GetCashFlow([FromRoute] string symbol)
        {
            if (string.IsNullOrWhiteSpace(symbol))
            {
                return BadRequest("Symbol cannot be empty");
            }

            var result = await _fmpService.GetCashFlowAsync(symbol);
            
            if (result == null)
            {
                return NotFound("Cash flow not found");
            }

            return Ok(result);
        }

        [HttpGet("peers/{symbol}")]
        [AllowAnonymous]
        public async Task<IActionResult> GetPeers([FromRoute] string symbol)
        {
            if (string.IsNullOrWhiteSpace(symbol))
            {
                return BadRequest("Symbol cannot be empty");
            }

            var result = await _fmpService.GetCompDataAsync(symbol);
            
            if (result == null)
            {
                return NotFound("Peers not found");
            }

            return Ok(result);
        }

        [HttpGet("tenk/{symbol}")]
        [AllowAnonymous]
        public async Task<IActionResult> GetTenK([FromRoute] string symbol)
        {
            if (string.IsNullOrWhiteSpace(symbol))
            {
                return BadRequest("Symbol cannot be empty");
            }

            var result = await _fmpService.GetTenKAsync(symbol);
            
            if (result == null)
            {
                return NotFound("10-K filings not found");
            }

            return Ok(result);
        }

        [HttpGet("{id:int}")]
        public async Task<IActionResult> getById([FromRoute] int id)
        {
            var stock = await _stockRepo.GetByIdAsync(id);

            if(stock == null)
            {
                return NotFound();
            }

            return Ok(stock);
            
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateStockRequestDto stockDto)
        {
            var stockModel = stockDto.ToStockFromCreateDto();
            await _stockRepo.CreateAsync(stockModel);
            return CreatedAtAction(nameof(getById), new{id = stockModel.Id}, stockModel.ToStockDto());
        }

        [HttpPut]
        [Route("{id:int}")]

        public async Task<IActionResult> Update([FromRoute] int id, [FromBody] UpdateStockRequestDto updateDto)
        {
            var stockModel =await _stockRepo.UpdateAsync(id, updateDto);
            
            if(stockModel == null)
            {
                return NotFound();
            }

            return Ok(stockModel.ToStockDto());
        }

        [HttpDelete]
        [Route("{id:int}")]

        public async Task<IActionResult> Delete([FromRoute] int id)
        {
            var stockModel =await _stockRepo.DeleteAsync(id);

            if(stockModel == null)
            {
                return NotFound();
            }

            return NoContent();
        }
    }

}