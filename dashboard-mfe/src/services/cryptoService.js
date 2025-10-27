// Serviço para buscar dados das criptomoedas da API real
export const fetchCryptoData = async () => {
  try {
    // Usar a API real do BFF que conecta com a Azure Function
    const BFF_URL = import.meta.env.VITE_BFF_URL || 'https://whale-bff.azurewebsites.net';
    console.log('🌐 Buscando dados da Azure BFF:', BFF_URL);
    
    const response = await fetch(`${BFF_URL}/api/crypto/top`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      timeout: 10000
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();

    if (!result.success || !result.data) {
      throw new Error('Resposta inválida da API');
    }

    console.log('✅ Dados recebidos da Azure:', result.data.length, 'criptomoedas');
    return result.data;
    
  } catch (error) {
    console.error('❌ Erro ao buscar dados da Azure:', error);
    console.log('🔄 Usando dados simulados como fallback...');
    
    // Fallback para dados simulados
    return getMockData();
  }
};

// Função auxiliar com dados simulados para fallback
const getMockData = () => {
  const mockData = [
    {
      id: 'bitcoin',
      name: 'Bitcoin',
      symbol: 'btc',
      current_price: 43250.50,
      market_cap_rank: 1,
      image: 'https://assets.coingecko.com/coins/images/1/large/bitcoin.png',
      market_cap: 850000000000,
      total_volume: 25000000000,
      price_change_percentage_24h: 2.5
    },
    {
      id: 'ethereum',
      name: 'Ethereum',
      symbol: 'eth',
      current_price: 2650.30,
      market_cap_rank: 2,
      image: 'https://assets.coingecko.com/coins/images/279/large/ethereum.png',
      market_cap: 320000000000,
      total_volume: 15000000000,
      price_change_percentage_24h: 1.8
    },
    {
      id: 'binancecoin',
      name: 'BNB',
      symbol: 'bnb',
      current_price: 315.20,
      market_cap_rank: 3,
      image: 'https://assets.coingecko.com/coins/images/825/large/bnb-icon2_2x.png',
      market_cap: 48000000000,
      total_volume: 1200000000,
      price_change_percentage_24h: -0.5
    },
    {
      id: 'solana',
      name: 'Solana',
      symbol: 'sol',
      current_price: 98.45,
      market_cap_rank: 4,
      image: 'https://assets.coingecko.com/coins/images/4128/large/solana.png',
      market_cap: 42000000000,
      total_volume: 2100000000,
      price_change_percentage_24h: 3.2
    },
    {
      id: 'cardano',
      name: 'Cardano',
      symbol: 'ada',
      current_price: 0.52,
      market_cap_rank: 5,
      image: 'https://assets.coingecko.com/coins/images/975/large/cardano.png',
      market_cap: 18000000000,
      total_volume: 450000000,
      price_change_percentage_24h: 1.1
    },
    {
      id: 'xrp',
      name: 'XRP',
      symbol: 'xrp',
      current_price: 0.62,
      market_cap_rank: 6,
      image: 'https://assets.coingecko.com/coins/images/44/large/xrp-symbol-white-128.png',
      market_cap: 35000000000,
      total_volume: 1800000000,
      price_change_percentage_24h: -1.2
    },
    {
      id: 'dogecoin',
      name: 'Dogecoin',
      symbol: 'doge',
      current_price: 0.08,
      market_cap_rank: 7,
      image: 'https://assets.coingecko.com/coins/images/5/large/dogecoin.png',
      market_cap: 12000000000,
      total_volume: 800000000,
      price_change_percentage_24h: 2.8
    },
    {
      id: 'polkadot',
      name: 'Polkadot',
      symbol: 'dot',
      current_price: 7.25,
      market_cap_rank: 8,
      image: 'https://assets.coingecko.com/coins/images/12171/large/polkadot.png',
      market_cap: 9000000000,
      total_volume: 350000000,
      price_change_percentage_24h: 0.7
    },
    {
      id: 'chainlink',
      name: 'Chainlink',
      symbol: 'link',
      current_price: 14.80,
      market_cap_rank: 9,
      image: 'https://assets.coingecko.com/coins/images/877/large/chainlink-new-logo.png',
      market_cap: 8000000000,
      total_volume: 420000000,
      price_change_percentage_24h: -0.3
    },
    {
      id: 'litecoin',
      name: 'Litecoin',
      symbol: 'ltc',
      current_price: 72.15,
      market_cap_rank: 10,
      image: 'https://assets.coingecko.com/coins/images/2/large/litecoin.png',
      market_cap: 5500000000,
      total_volume: 280000000,
      price_change_percentage_24h: 1.5
    },
    {
      id: 'bitcoin-cash',
      name: 'Bitcoin Cash',
      symbol: 'bch',
      current_price: 245.30,
      market_cap_rank: 11,
      image: 'https://assets.coingecko.com/coins/images/780/large/bitcoin-cash.png',
      market_cap: 4800000000,
      total_volume: 150000000,
      price_change_percentage_24h: 0.9
    },
    {
      id: 'stellar',
      name: 'Stellar',
      symbol: 'xlm',
      current_price: 0.12,
      market_cap_rank: 12,
      image: 'https://assets.coingecko.com/coins/images/100/large/Stellar_symbol_black_RGB.png',
      market_cap: 3500000000,
      total_volume: 120000000,
      price_change_percentage_24h: -0.8
    }
  ];
  
  // Adicionar variação de preço simulada
  return mockData.map(crypto => ({
    ...crypto,
    current_price: crypto.current_price * (1 + (Math.random() - 0.5) * 0.1),
    price_change_percentage_24h: (Math.random() - 0.5) * 10
  }));
};