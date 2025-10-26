using System.Net.Http.Json;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Azure.Functions.Worker.Http;
using Microsoft.Extensions.Logging;
using MongoDB.Driver;
using MongoDB.Bson;
using System.Text.Json.Serialization;

namespace ProcessTransactionFunction
{
    public class Transaction
    {
        [JsonPropertyName("portfolio_id")] public string PortfolioId { get; set; }
        [JsonPropertyName("user_id")] public string UserId { get; set; }
        [JsonPropertyName("symbol")] public string Symbol { get; set; }
        [JsonPropertyName("quantity")] public double Quantity { get; set; }
        [JsonPropertyName("price_paid")] public double PricePaid { get; set; }
        [JsonPropertyName("transaction_date")] public DateTime TransactionDate { get; set; }
    }

    public class ProcessTransaction
    {
        private readonly ILogger _logger;
        private readonly HttpClient _httpClient;

        public ProcessTransaction(ILoggerFactory loggerFactory)
        {
            _logger = loggerFactory.CreateLogger<ProcessTransaction>();
            _httpClient = new HttpClient();
        }

        [Function("ProcessTransaction")]
        public async Task<HttpResponseData> Run([HttpTrigger(AuthorizationLevel.Function, "post")] HttpRequestData req)
        {
            try
            {
                var transaction = await req.ReadFromJsonAsync<Transaction>();

                if (transaction == null)
                {
                    var badRequest = req.CreateResponse(System.Net.HttpStatusCode.BadRequest);
                    await badRequest.WriteStringAsync("Invalid transaction data.");
                    return badRequest;
                }

                // 1️⃣ Buscar cotação atual
                double currentPrice = await GetCurrentPrice(transaction.Symbol);

                // 2️⃣ Calcular lucro/prejuízo
                double currentValue = transaction.Quantity * currentPrice;
                double investedValue = transaction.Quantity * transaction.PricePaid;
                double profitLoss = currentValue - investedValue;
                double profitLossPercent = (profitLoss / investedValue) * 100;

                // 3️⃣ Montar documento
                var transactionDoc = new BsonDocument
                {
                    { "portfolio_id", transaction.PortfolioId },
                    { "user_id", transaction.UserId },
                    { "symbol", transaction.Symbol },
                    { "quantity", transaction.Quantity },
                    { "price_paid", transaction.PricePaid },
                    { "current_price", currentPrice },
                    { "current_value", currentValue },
                    { "profit_loss", profitLoss },
                    { "profit_loss_percent", profitLossPercent },
                    { "transaction_date", transaction.TransactionDate },
                    { "processed_at", DateTime.UtcNow }
                };

                // 4️⃣ Salvar no MongoDB
                var mongoUri = Environment.GetEnvironmentVariable("MONGODB_URI");
                var client = new MongoClient(mongoUri);
                var db = client.GetDatabase("whale");
                var collection = db.GetCollection<BsonDocument>("transactions");

                await collection.InsertOneAsync(transactionDoc);

                _logger.LogInformation($"Transação salva: {transactionDoc["_id"]}");

                var response = req.CreateResponse(System.Net.HttpStatusCode.OK);
                await response.WriteStringAsync($"Transação salva com sucesso. ID: {transactionDoc["_id"]}");
                return response;
            }
            catch (Exception ex)
            {
                _logger.LogError($"Erro ao processar transação: {ex.Message}");
                var errorResponse = req.CreateResponse(System.Net.HttpStatusCode.InternalServerError);
                await errorResponse.WriteStringAsync($"Erro: {ex.Message}");
                return errorResponse;
            }
        }

        private async Task<double> GetCurrentPrice(string symbol)
        {
            var response = await _httpClient.GetFromJsonAsync<BinanceResponse>(
                $"https://api.binance.com/api/v3/ticker/price?symbol={symbol}USDT");

            return response != null ? double.Parse(response.Price) : 0.0;
        }

        private class BinanceResponse
        {
            [JsonPropertyName("price")]
            public string Price { get; set; }
        }
    }
}