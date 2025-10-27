using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.ComponentModel.DataAnnotations;

namespace portfolio_service.Models
{
    public class Transaction
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }

        [Required]
        [BsonRepresentation(BsonType.ObjectId)]
        public string PortfolioId { get; set; } = string.Empty;

        [Required]
        public string UserId { get; set; } = string.Empty;

        [Required]
        [StringLength(10)]
        public string Symbol { get; set; } = string.Empty;

        [Required]
        [Range(0, double.MaxValue)]
        public decimal Quantity { get; set; }

        [Required]
        [Range(0, double.MaxValue)]
        public decimal PricePaid { get; set; }

        [BsonDateTimeOptions(Kind = DateTimeKind.Utc)]
        public DateTime Date { get; set; } = DateTime.UtcNow;

        [Required]
        public TransactionType TransactionType { get; set; } = TransactionType.Buy;

        [StringLength(500)]
        public string? Notes { get; set; }

        [BsonDateTimeOptions(Kind = DateTimeKind.Utc)]
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        [BsonDateTimeOptions(Kind = DateTimeKind.Utc)]
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    }

    public enum TransactionType
    {
        Buy,
        Sell
    }

    public class TransactionDto
    {
        public string? Id { get; set; }
        public string PortfolioId { get; set; } = string.Empty;
        public string UserId { get; set; } = string.Empty;
        public string Symbol { get; set; } = string.Empty;
        public decimal Quantity { get; set; }
        public decimal PricePaid { get; set; }
        public DateTime Date { get; set; }
        public TransactionType TransactionType { get; set; }
        public string? Notes { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
    }

    public class CreateTransactionRequest
    {
        [Required]
        public string PortfolioId { get; set; } = string.Empty;

        [Required]
        public string UserId { get; set; } = string.Empty;

        [Required]
        [StringLength(10)]
        public string Symbol { get; set; } = string.Empty;

        [Required]
        [Range(0, double.MaxValue)]
        public decimal Quantity { get; set; }

        [Required]
        [Range(0, double.MaxValue)]
        public decimal PricePaid { get; set; }

        public DateTime? Date { get; set; }

        [Required]
        public TransactionType TransactionType { get; set; } = TransactionType.Buy;

        [StringLength(500)]
        public string? Notes { get; set; }
    }

    public class UpdateTransactionRequest
    {
        [StringLength(10)]
        public string? Symbol { get; set; }

        [Range(0, double.MaxValue)]
        public decimal? Quantity { get; set; }

        [Range(0, double.MaxValue)]
        public decimal? PricePaid { get; set; }

        public DateTime? Date { get; set; }

        public TransactionType? TransactionType { get; set; }

        [StringLength(500)]
        public string? Notes { get; set; }
    }
}
