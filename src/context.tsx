import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { AppState } from './types';

const initialState: AppState = {
  rateioOficina: 100,
  aluguel: 1500,
  energia: 300,
  agua: 100,
  internet: 120,
  outrosCustosFixos: 500,
  qtdMecanicos: 2,
  salarioMecanico: 2500,
  encargosMecanico: 40,
  salarioAuxiliar: 1800,
  encargosAuxiliar: 40,
  insumos: 800,
  qtdHorasExtrasMecanico: 0,
  adicionalHorasExtrasMecanico: 50,
  qtdHorasExtrasAuxiliar: 0,
  adicionalHorasExtrasAuxiliar: 50,
  lucroDesejado: 20,
  lucroDesejadoMontagem: 50,
  valorPorMontagemBasica: 100,
  qtdMotosBasica: 5,
  tempoMedioMontagemBasica: 1,
  comissaoMontagemBasica: 0,
  valorPorMontagemIntermediaria: 150,
  qtdMotosIntermediaria: 3,
  tempoMedioMontagemIntermediaria: 2,
  comissaoMontagemIntermediaria: 0,
  valorPorMontagemAvancada: 250,
  qtdMotosAvancada: 2,
  tempoMedioMontagemAvancada: 4,
  comissaoMontagemAvancada: 0,
  comissaoMecanico: 50,
  comissaoAuxiliar: 10,
  qtdRevisoesBasica: 15,
  tempoMedioRevisaoBasica: 1,
  qtdRevisoesIntermediaria: 10,
  tempoMedioRevisaoIntermediaria: 2,
  qtdRevisoesAvancada: 5,
  tempoMedioRevisaoAvancada: 4,
  horasPorMecanico: 176,
  horasGarantia: 10,
  horasImprodutivas: 20,
};

const LOCAL_STORAGE_KEY = 'oficina_shineray_app_state';

const getInitialState = (): AppState => {
  try {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
      return { ...initialState, ...JSON.parse(saved) };
    }
  } catch (error) {
    console.error('Failed to load state from local storage:', error);
  }
  return initialState;
};

type AppContextType = {
  state: AppState;
  updateState: (key: keyof AppState, value: string | number) => void;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AppState>(getInitialState);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state));
    } catch (error) {
      console.error('Failed to save state to local storage:', error);
    }
  }, [state]);

  const updateState = (key: keyof AppState, value: string | number) => {
    setState((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <AppContext.Provider value={{ state, updateState }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}
