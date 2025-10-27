import { TrendingUp, TrendingDown } from 'lucide-react';

export default function CryptoCard({ crypto }) {
  const isPositive = crypto.price_change_percentage_24h >= 0;
  
  return (
    <div className="crypto-card">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <img 
            src={crypto.image} 
            alt={crypto.name}
            className="w-8 h-8 rounded-full"
          />
          <div>
            <h3 className="font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>
              {crypto.symbol.toUpperCase()}
            </h3>
            <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
              {crypto.name}
            </p>
          </div>
        </div>
        
        <div className="text-right">
          <p className="font-bold text-sm" style={{ color: 'var(--text-primary)' }}>
            ${crypto.current_price.toLocaleString()}
          </p>
          <div className={`flex items-center gap-1 text-xs ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
            {isPositive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
            {Math.abs(crypto.price_change_percentage_24h).toFixed(2)}%
          </div>
        </div>
      </div>
      
      <div className="space-y-2">
        <div className="flex justify-between text-xs">
          <span style={{ color: 'var(--text-secondary)' }}>Market Cap:</span>
          <span style={{ color: 'var(--text-primary)' }}>
            ${(crypto.market_cap / 1e9).toFixed(2)}B
          </span>
        </div>
        
        <div className="flex justify-between text-xs">
          <span style={{ color: 'var(--text-secondary)' }}>Volume 24h:</span>
          <span style={{ color: 'var(--text-primary)' }}>
            ${(crypto.total_volume / 1e6).toFixed(2)}M
          </span>
        </div>
        
        <div className="flex justify-between text-xs">
          <span style={{ color: 'var(--text-secondary)' }}>Rank:</span>
          <span style={{ color: 'var(--accent-blue)' }}>
            #{crypto.market_cap_rank}
          </span>
        </div>
      </div>
    </div>
  );
}
