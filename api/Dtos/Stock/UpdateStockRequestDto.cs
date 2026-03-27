using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace api.Dtos.Stock
{
    public class UpdateStockRequestDto
    {
        [Required]
        [MaxLength(10, ErrorMessage ="symbol cannot be over 10 characters")]
        public string Symbol {get; set; } = string.Empty;
        [Required]
        [MaxLength(10, ErrorMessage ="Company Name cannot be over 10 characters")]
        public string CompanyName { get; set; } = string.Empty;
        [Required]
        [Range(1,10000000)]
        public decimal Purchase { get; set; }

        public decimal LastDiv { get; set; }

        public string Industry { get; set; } = string.Empty;

        public long MarketCap {get; set; }
    }
}