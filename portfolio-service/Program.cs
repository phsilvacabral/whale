using portfolio_service.Repositories;
using portfolio_service.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new() { Title = "Portfolio Service API", Version = "v1" });
});

// MongoDB
builder.Services.AddScoped<IMongoService, MongoService>();

// Repositories
builder.Services.AddScoped<IPortfolioRepository, PortfolioRepository>();
builder.Services.AddScoped<ITransactionRepository, TransactionRepository>();

// Services
builder.Services.AddScoped<IPortfolioService, PortfolioService>();
builder.Services.AddScoped<ITransactionService, TransactionService>();

// CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowAll");
app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();

// Root endpoint - API information
app.MapGet("/", () => new
{
    message = "💼 Whale Portfolio Service API",
    version = "1.0.0",
    description = "Microserviço de gerenciamento de portfolios e transações",
    endpoints = new
    {
        health = "/health",
        documentation = "/swagger",
        portfolio = "/api/Portfolio",
        transactions = "/api/Transaction"
    },
    timestamp = DateTime.UtcNow,
    status = "OK"
});

// Health check
app.MapGet("/health", () => new { 
    status = "OK", 
    timestamp = DateTime.UtcNow,
    service = "portfolio-service-dotnet"
});

app.Run();
