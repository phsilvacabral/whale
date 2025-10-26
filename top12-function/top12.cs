using System.Net;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Azure.Functions.Worker.Http;
using Newtonsoft.Json;

public class CryptoFunction
{
    private static readonly HttpClient client = new HttpClient();

    [Function("GetTopCryptos")]
    public async Task<HttpResponseData> Run(
        [HttpTrigger(AuthorizationLevel.Function, "get", "post")] HttpRequestData req)
    {
        var lista = await GetTopCryptos();

        var response = req.CreateResponse(HttpStatusCode.OK);
        await response.WriteAsJsonAsync(lista);
        return response;
    }

    public static async Task<List<string?>> GetTopCryptos()
    {
        string url = "https://api.binance.com/api/v3/ticker/24hr";
        var response = await client.GetStringAsync(url);
        var dados = JsonConvert.DeserializeObject<List<dynamic>>(response);

        var lista = dados
            .Where(c => ((string?)c.symbol)?.EndsWith("USDT") == true)
            .OrderByDescending(c => decimal.TryParse((string?)c.quoteVolume, out var vol) ? vol : 0)
            .Take(12)
            .SelectMany(c => new string?[] {
                (string?)c.symbol,
                (string?)c.lastPrice
            })
            .ToList();

        return lista;
    }
}