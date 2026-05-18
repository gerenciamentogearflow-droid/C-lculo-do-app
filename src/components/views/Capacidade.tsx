import React from 'react';
import { useAppContext } from '../../context';
import { Card, Input, Stat } from '../ui';
import { useCalculations } from '../../useCalculations';

export function Capacidade() {
  const { state, updateState } = useAppContext();
  const { horasDisponiveis, horasVendaveis } = useCalculations();

  return (
    <div className="pb-24 pt-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-6 px-2">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 mb-1">Capacidade</h1>
        <p className="text-slate-500 text-sm">Tempo disponível e horas produtivas.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
        <div className="flex flex-col">
          <Card className="bg-indigo-700 text-white shadow-xl shadow-indigo-200">
            <div className="flex justify-between items-center relative z-10">
              <Stat label="Horas Disponíveis Mês" value={`${horasDisponiveis}h`} highlight />
            </div>
          </Card>

          <Card className="border-t-4 border-t-cyan-500">
            <h2 className="text-xl font-bold mb-4 text-slate-900">Capacidade Operacional mensal</h2>
            <div className="grid grid-cols-2 gap-4 mb-2">
              <Input label="Mecânicos da filial" value={state.qtdMecanicos} onChange={(v) => updateState('qtdMecanicos', v)} />
              <Input label="Horas por Mecânico" value={state.horasPorMecanico} onChange={(v) => updateState('horasPorMecanico', v)} />
            </div>
            <p className="text-xs text-slate-500 mt-2 px-1">
              O sistema multiplicará automaticamente (Ex: {state.qtdMecanicos} mecânico(s) x {state.horasPorMecanico}h = {Number(state.qtdMecanicos) * Number(state.horasPorMecanico)} horas totais da filial).
            </p>
          </Card>
        </div>

        <div className="flex flex-col">
          <Card className="bg-emerald-600 text-white shadow-xl shadow-emerald-200">
            <div className="flex justify-between items-center">
              <Stat label="Horas Rentáveis Mês" value={`${horasVendaveis}h`} highlight />
            </div>
            <p className="text-emerald-100 font-medium text-xs mt-2 border-t border-emerald-500 pt-4">
              Horas reais disponíveis para faturamento após descontar perdas.
            </p>
          </Card>

          <Card className="border-t-4 border-t-fuchsia-500">
            <h2 className="text-xl font-bold mb-4 text-slate-900">Horas Consumidas (Perdas)</h2>
            <Input label="Destinadas à Garantia" value={state.horasGarantia} onChange={(v) => updateState('horasGarantia', v)} />
            <Input label="Horas Improdutivas" value={state.horasImprodutivas} onChange={(v) => updateState('horasImprodutivas', v)} />
          </Card>
        </div>
      </div>
    </div>
  );
}
