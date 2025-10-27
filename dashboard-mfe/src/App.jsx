import { useState, useEffect } from 'react';
import { RefreshCw } from 'lucide-react';
import CryptoCard from './components/CryptoCard';
import { fetchCryptoData } from './services/cryptoService';

function App() {
  const [cryptos, setCryptos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdate, setLastUpdate] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadCryptoData();
    const interval = setInterval(loadCryptoData, 30000); // Atualizar a cada 30 segundos
    
    return () => clearInterval(interval);
  }, []);

  const loadCryptoData = async (isManualRefresh = false) => {
    try {
      if (isManualRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }
      setError(null);
      
      const cryptoData = await fetchCryptoData();
      setCryptos(cryptoData);
      setLastUpdate(new Date());
    } catch (err) {
      console.error('Erro ao carregar dados das criptomoedas:', err);
      setError(err.message || 'Erro ao carregar dados das criptomoedas');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--accent-blue)]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-4">
        <p className="text-red-400 text-center font-semibold">{error}</p>
        <button 
          onClick={loadCryptoData}
          className="px-4 py-2 bg-[var(--accent-blue)] text-white rounded-lg hover:opacity-80 transition-opacity"
        >
          Tentar Novamente
        </button>
      </div>
    );
  }

  return (
    <div className="p-4">
      {/* Cabeçalho com informações de atualização */}
      <div className="flex justify-between items-center mb-6">
        <div className="bg-black/50 rounded-lg p-4 backdrop-blur-sm">
          <h2 className="text-xl font-bold text-white drop-shadow-lg">
            Criptomoedas em Tempo Real
          </h2>
          {lastUpdate && (
            <p className="text-sm text-gray-200 drop-shadow-md">
              Última atualização: {lastUpdate.toLocaleTimeString('pt-BR')}
            </p>
          )}
        </div>
        
        <button
          onClick={() => loadCryptoData(true)}
          disabled={refreshing}
          className="flex items-center gap-2 px-4 py-2 bg-[var(--accent-blue)] text-white rounded-lg hover:opacity-80 transition-opacity disabled:opacity-50"
        >
          <RefreshCw 
            size={16} 
            className={refreshing ? 'animate-spin' : ''} 
          />
          {refreshing ? 'Atualizando...' : 'Atualizar'}
        </button>
      </div>

      {/* Grid de criptomoedas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {cryptos.map((crypto) => (
          <CryptoCard key={crypto.id} crypto={crypto} />
        ))}
      </div>
    </div>
  );
}

export default App;
