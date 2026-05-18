import React from 'react';
import { useAppContext } from '../../context';
import { Card, Input, Stat, Select } from '../ui';
import { useCalculations } from '../../useCalculations';

export function Custos() {
  const { state, updateState } = useAppContext();
  const { 
    custoTotal, 
    custoDaOficina,
    custoHorasExtrasMecanico, 
    custoHorasExtrasAuxiliar,
    valorEncargosMecanicos,
    valorEncargosAuxiliar
  } = useCalculations();

  return (
    <div className="pb-24 pt-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-6 px-2">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 mb-1">Custos da Oficina</h1>
        <p className="text-slate-500 text-sm">Preencha os valores mensais da sua operação.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
        <Card className="border-t-4 border-t-blue-500">
          <h2 className="text-xl font-bold mb-4 text-slate-900">Custos Fixos</h2>
          <Input label="Aluguel" prefix="R$" value={state.aluguel} onChange={(v) => updateState('aluguel', v)} />
          <Input label="Energia elétrica" prefix="R$" value={state.energia} onChange={(v) => updateState('energia', v)} />
          <Input label="Água" prefix="R$" value={state.agua} onChange={(v) => updateState('agua', v)} />
          <Input label="Internet" prefix="R$" value={state.internet} onChange={(v) => updateState('internet', v)} />
          <Input label="Outros custos" prefix="R$" value={state.outrosCustosFixos} onChange={(v) => updateState('outrosCustosFixos', v)} />
        </Card>

        <div className="flex flex-col">
          <Card className="border-t-4 border-t-amber-500">
            <h2 className="text-xl font-bold mb-4 text-slate-900">Equipe - Mecânicos</h2>
            <div className="grid grid-cols-2 gap-4">
              <Input label="Quantidade" value={state.qtdMecanicos} onChange={(v) => updateState('qtdMecanicos', v)} />
              <Input label="Encargos (%)" suffix="%" value={state.encargosMecanico} onChange={(v) => updateState('encargosMecanico', v)} />
            </div>
            <Input label="Salário Base" prefix="R$" value={state.salarioMecanico} onChange={(v) => updateState('salarioMecanico', v)} />
            <div className="flex justify-between items-center p-3 bg-slate-50 border border-slate-200 rounded-xl mt-1">
              <span className="text-xs text-slate-500 font-bold uppercase block">Valor dos Encargos</span>
              <span className="text-indigo-600 font-bold text-sm leading-none">{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valorEncargosMecanicos)}</span>
            </div>
          </Card>

          <Card className="border-t-4 border-t-orange-500">
            <h2 className="text-xl font-bold mb-4 text-slate-900">Equipe - Administrativo</h2>
            <Input label="Salário Base" prefix="R$" value={state.salarioAuxiliar} onChange={(v) => updateState('salarioAuxiliar', v)} />
            <Input label="Encargos (%)" suffix="%" value={state.encargosAuxiliar} onChange={(v) => updateState('encargosAuxiliar', v)} />
            <div className="flex justify-between items-center p-3 bg-slate-50 border border-slate-200 rounded-xl mt-1">
              <span className="text-xs text-slate-500 font-bold uppercase block">Valor dos Encargos</span>
              <span className="text-indigo-600 font-bold text-sm leading-none">{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valorEncargosAuxiliar)}</span>
            </div>
          </Card>

          <Card className="border-t-4 border-t-rose-500">
            <h2 className="text-xl font-bold mb-4 text-slate-900">Horas Extras</h2>
            
            <div className="mb-6">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest mb-3">Mecânicos</h3>
              <div className="grid grid-cols-2 gap-4">
                <Input label="Quantidade (Horas)" value={state.qtdHorasExtrasMecanico} onChange={(v) => updateState('qtdHorasExtrasMecanico', v)} />
                <Input 
                  label="Adicional (%)" 
                  suffix="%"
                  value={state.adicionalHorasExtrasMecanico} 
                  onChange={(v) => updateState('adicionalHorasExtrasMecanico', v)}
                />
              </div>
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl mt-1">
                <span className="text-xs text-slate-500 font-bold uppercase block mb-1">Custo horas extras mecânicos</span>
                <span className="text-indigo-600 font-bold text-lg leading-none">{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(custoHorasExtrasMecanico)}</span>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest mb-3">Auxiliar Admin</h3>
              <div className="grid grid-cols-2 gap-4">
                <Input label="Quantidade (Horas)" value={state.qtdHorasExtrasAuxiliar} onChange={(v) => updateState('qtdHorasExtrasAuxiliar', v)} />
                <Input 
                  label="Adicional (%)" 
                  suffix="%"
                  value={state.adicionalHorasExtrasAuxiliar} 
                  onChange={(v) => updateState('adicionalHorasExtrasAuxiliar', v)}
                />
              </div>
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl mt-1">
                <span className="text-xs text-slate-500 font-bold uppercase block mb-1">Custo horas extras administrativo</span>
                <span className="text-indigo-600 font-bold text-lg leading-none">{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(custoHorasExtrasAuxiliar)}</span>
              </div>
            </div>
          </Card>

          <Card className="border-t-4 border-t-purple-500">
            <h2 className="text-xl font-bold mb-4 text-slate-900">Outros Custos</h2>
            <Input label="Insumos e ferramentas" prefix="R$" value={state.insumos} onChange={(v) => updateState('insumos', v)} />
          </Card>

          <Card className="flex flex-col border-t-4 border-t-teal-500">
            <div>
              <h2 className="text-xl font-bold mb-4 text-slate-900 border-b border-slate-100 pb-2 flex-grow-0 flex items-center gap-2">
                <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>
                Rateio da Oficina
              </h2>
              <div className="flex-1 mt-2 space-y-4">
                <Input label="% de Rateio da Oficina" suffix="%" value={state.rateioOficina} onChange={(v) => updateState('rateioOficina', v)} />
              </div>
            </div>
            <div className="mt-4 pt-4 bg-slate-50 border border-slate-100 p-4 rounded-xl flex items-start gap-3">
              <span className="text-indigo-500 mt-0.5 text-lg">⚖️</span>
              <p className="text-sm text-slate-600 font-medium">O rateio define quanto da estrutura a oficina paga (separação da loja de motos).</p>
            </div>
          </Card>

          <Card className="flex flex-col border-t-4 border-t-emerald-500">
            <div>
              <h2 className="text-xl font-bold mb-4 text-slate-900 border-b border-slate-100 pb-2 flex items-center gap-2">
                <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg>
                Planejamento de Lucro
              </h2>
              <div className="flex-1 mt-2 space-y-4">
                <Input label="Margem de Lucro Desejada" suffix="%" value={state.lucroDesejado} onChange={(v) => updateState('lucroDesejado', v)} />
              </div>
            </div>
            <div className="mt-4 pt-4 bg-slate-50 border border-slate-100 p-4 rounded-xl flex items-start gap-3">
              <span className="text-indigo-500 mt-0.5 text-lg">📈</span>
              <p className="text-sm text-slate-600 font-medium">Define a margem de lucro padrão, aplicada sobre o custo da estrutura da oficina, para formar o preço de venda da Hora Técnica dos serviços.</p>
            </div>
          </Card>
        </div>
      </div>

      <Card className="bg-indigo-700 text-white relative overflow-hidden shadow-xl shadow-indigo-200 mt-6 md:mt-2">
        <div className="relative z-10">
          <Stat 
            label="Custo da Oficina (Com Rateio)" 
            value={new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(custoDaOficina)} 
            highlight 
          />
          <div className="mt-4 pt-4 border-t border-indigo-600 flex justify-between items-center text-indigo-100 text-sm">
            <span>Custo Total (Sem Rateio):</span>
            <span className="font-bold">{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(custoTotal)}</span>
          </div>
        </div>
        <svg className="absolute right-[-20px] bottom-[-20px] w-48 h-48 opacity-10" fill="currentColor" viewBox="0 0 24 24"><path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
      </Card>
    </div>
  );
}
