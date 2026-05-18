import React from 'react';
import { useAppContext } from '../../context';
import { Card, Input, Select, Stat } from '../ui';
import { useCalculations } from '../../useCalculations';

export function Producao() {
  const { state, updateState } = useAppContext();
  const {
    faturamentoInternoPorMotoBasica,
    custoHoraSecaPorMotoBasica,
    comissaoPorMotoBasica,
    custoTotalPorMotoBasica,
    lucroLojaPorMotoBasica,
    estruturaConsumidaMontagemBasica,
    diferencaAbsorvidaBasica,

    faturamentoInternoPorMotoIntermediaria,
    custoHoraSecaPorMotoIntermediaria,
    comissaoPorMotoIntermediaria,
    custoTotalPorMotoIntermediaria,
    lucroLojaPorMotoIntermediaria,
    estruturaConsumidaMontagemIntermediaria,
    diferencaAbsorvidaIntermediaria,

    faturamentoInternoPorMotoAvancada,
    custoHoraSecaPorMotoAvancada,
    comissaoPorMotoAvancada,
    custoTotalPorMotoAvancada,
    lucroLojaPorMotoAvancada,
    estruturaConsumidaMontagemAvancada,
    diferencaAbsorvidaAvancada,

    totalMotosMontadas,
    totalHorasConsumidasMontagem,
    valorAgregadoTotal,
    estruturaConsumidaMontagemTotal,
    diferencaAbsorvidaTotal,
    faturamentoRevisoes,
    faturamentoMontagens,
    valorHora
  } = useCalculations();

  const formatCurrency = (val: number) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);

  const renderMontagemResults = (
    qtdStr: string | number,
    margemStr: string | number,
    tempoStr: string | number,
    faturamentoInterno: number, 
    custoHoraSeca: number, 
    comissao: number, 
    custoTotal: number, 
    lucro: number
  ) => {
    const qtd = Number(qtdStr) || 0;
    const margem = Number(margemStr) || 0;
    const tempoMedio = Number(tempoStr) || 0;

    const tempoTotal = tempoMedio * qtd;
    const estruturaTotal = custoHoraSeca * qtd;
    const comissaoTotal = comissao * qtd;
    const custoTotalLojaTotal = custoTotal * qtd;
    const lucroTotal = lucro * qtd;
    const faturamentoTotal = faturamentoInterno * qtd;

    return (
      <div className="mt-5 pt-4">
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-slate-100 text-slate-400">
              <th className="text-left font-medium pb-2">Resumo</th>
              <th className="text-right font-medium pb-2 w-20">Por Moto</th>
              <th className="text-right font-medium pb-2 w-24">Total</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            <tr>
              <td className="py-2 text-slate-500 font-medium">Tempo por moto</td>
              <td className="py-2 text-right font-bold text-slate-700">{tempoMedio}h</td>
              <td className="py-2 text-right font-bold text-slate-700">{tempoTotal}h</td>
            </tr>
            <tr>
              <td className="py-2 text-slate-500 font-medium">Custo de Estrutura</td>
              <td className="py-2 text-right font-bold text-slate-700">{formatCurrency(custoHoraSeca)}</td>
              <td className="py-2 text-right font-bold text-slate-700">{formatCurrency(estruturaTotal)}</td>
            </tr>
            <tr>
              <td className="py-2 text-slate-500 font-medium">Comissão do Mecânico</td>
              <td className="py-2 text-right font-bold text-slate-700">{formatCurrency(comissao)}</td>
              <td className="py-2 text-right font-bold text-slate-700">{formatCurrency(comissaoTotal)}</td>
            </tr>
            <tr className="bg-slate-50/50">
              <td className="py-2 text-slate-700 font-bold rounded-l px-1">Custo Total da Loja</td>
              <td className="py-2 text-right font-bold text-slate-900">{formatCurrency(custoTotal)}</td>
              <td className="py-2 text-right font-bold text-slate-900 rounded-r px-1">{formatCurrency(custoTotalLojaTotal)}</td>
            </tr>
            <tr>
              <td className="py-2 text-sky-600 font-bold px-1">Lucro da Loja ({margem}%)</td>
              <td className="py-2 text-right font-bold text-sky-600">{formatCurrency(lucro)}</td>
              <td className="py-2 text-right font-bold text-sky-600 px-1">{formatCurrency(lucroTotal)}</td>
            </tr>
            <tr className="border-t-2 border-slate-100">
              <td className="py-3 text-emerald-700 font-bold leading-tight px-1">Faturamento<br/><span className="text-[10px] text-emerald-600/70 uppercase tracking-wider">(Preço a cobrar)</span></td>
              <td className="py-3 text-right font-bold text-emerald-600 text-sm align-top">{formatCurrency(faturamentoInterno)}</td>
              <td className="py-3 text-right font-bold text-emerald-600 text-sm align-top px-1">{formatCurrency(faturamentoTotal)}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="pb-24 pt-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-6 px-2">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 mb-1">Produção</h1>
        <p className="text-slate-500 text-sm">Controle de montagens e revisões.</p>
      </div>

      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4 px-1">
          <div className="w-1.5 h-6 bg-indigo-600 rounded-full"></div>
          <h2 className="text-xl font-bold tracking-tight text-slate-900">Montagem de Motos</h2>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="flex flex-col h-full !mb-0 border-t-4 border-t-sky-400">
            <h3 className="text-lg font-bold mb-1 text-slate-900">Montagem Básica</h3>
            <p className="text-xs text-slate-500 font-medium mb-5">Motos simples, baixa complexidade e montagem rápida.</p>
            
            <div className="flex-1 space-y-4">
              <Input label="Quantidade Motos" value={state.qtdMotosBasica} onChange={(v) => updateState('qtdMotosBasica', v)} />
              <Input label="Tempo por Moto (Hrs)" value={state.tempoMedioMontagemBasica} onChange={(v) => updateState('tempoMedioMontagemBasica', v)} />
              <Input label="Comissão por Moto" prefix="R$" value={state.comissaoMontagemBasica} onChange={(v) => updateState('comissaoMontagemBasica', v)} />
            </div>

            {renderMontagemResults(
              state.qtdMotosBasica,
              state.lucroDesejadoMontagem,
              state.tempoMedioMontagemBasica,
              faturamentoInternoPorMotoBasica, 
              custoHoraSecaPorMotoBasica, 
              comissaoPorMotoBasica, 
              custoTotalPorMotoBasica, 
              lucroLojaPorMotoBasica
            )}
          </Card>

          <Card className="flex flex-col h-full !mb-0 border-t-4 border-t-indigo-500">
            <h3 className="text-lg font-bold mb-1 text-slate-900">Montagem Intermediária</h3>
            <p className="text-xs text-slate-500 font-medium mb-5">Motos com maior tempo operacional e ajustes intermediários.</p>
            
            <div className="flex-1 space-y-4">
              <Input label="Quantidade Motos" value={state.qtdMotosIntermediaria} onChange={(v) => updateState('qtdMotosIntermediaria', v)} />
              <Input label="Tempo por Moto (Hrs)" value={state.tempoMedioMontagemIntermediaria} onChange={(v) => updateState('tempoMedioMontagemIntermediaria', v)} />
              <Input label="Comissão por Moto" prefix="R$" value={state.comissaoMontagemIntermediaria} onChange={(v) => updateState('comissaoMontagemIntermediaria', v)} />
            </div>

            {renderMontagemResults(
              state.qtdMotosIntermediaria,
              state.lucroDesejadoMontagem,
              state.tempoMedioMontagemIntermediaria,
              faturamentoInternoPorMotoIntermediaria, 
              custoHoraSecaPorMotoIntermediaria, 
              comissaoPorMotoIntermediaria, 
              custoTotalPorMotoIntermediaria, 
              lucroLojaPorMotoIntermediaria
            )}
          </Card>

          <Card className="flex flex-col h-full !mb-0 border-t-4 border-t-violet-600">
            <h3 className="text-lg font-bold mb-1 text-slate-900">Montagem Avançada</h3>
            <p className="text-xs text-slate-500 font-medium mb-5">Motos de maior complexidade técnica e maior consumo da oficina.</p>
            
            <div className="flex-1 space-y-4">
              <Input label="Quantidade Motos" value={state.qtdMotosAvancada} onChange={(v) => updateState('qtdMotosAvancada', v)} />
              <Input label="Tempo por Moto (Hrs)" value={state.tempoMedioMontagemAvancada} onChange={(v) => updateState('tempoMedioMontagemAvancada', v)} />
              <Input label="Comissão por Moto" prefix="R$" value={state.comissaoMontagemAvancada} onChange={(v) => updateState('comissaoMontagemAvancada', v)} />
            </div>

            {renderMontagemResults(
              state.qtdMotosAvancada,
              state.lucroDesejadoMontagem,
              state.tempoMedioMontagemAvancada,
              faturamentoInternoPorMotoAvancada, 
              custoHoraSecaPorMotoAvancada, 
              comissaoPorMotoAvancada, 
              custoTotalPorMotoAvancada, 
              lucroLojaPorMotoAvancada
            )}
          </Card>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col h-full">
          <Card className="bg-slate-900 text-white shadow-xl shadow-slate-200 !mb-0 h-full flex flex-col justify-center">
            <h3 className="text-sm font-bold text-slate-300 uppercase tracking-widest mb-6 flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
              Resumo da Produção
            </h3>
            
            <div className="grid grid-cols-2 gap-6 mb-6">
              <div>
                <p className="text-slate-400 text-xs font-bold uppercase mb-1">Motos Montadas</p>
                <p className="text-3xl font-bold text-white">{totalMotosMontadas}</p>
              </div>
              <div>
                <p className="text-slate-400 text-xs font-bold uppercase mb-1">Horas Rentáveis</p>
                <p className="text-3xl font-bold text-indigo-400">{totalHorasConsumidasMontagem}h</p>
              </div>
            </div>

            <div className="space-y-4 pt-4 border-t border-slate-700/50">
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-300 font-medium">Receita de Montagens (Pagas p/ Vendas)</span>
                <span className="font-bold text-white">{formatCurrency(faturamentoMontagens)}</span>
              </div>
              
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-300 font-medium">Estrutura Consumida Total</span>
                  <span className="font-bold text-white">{formatCurrency(estruturaConsumidaMontagemTotal)}</span>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  ⚠️ <span className="font-bold text-slate-300">O que é Estrutura Consumida:</span> É a somatória do custo fixo de pátio (aluguel, luz, ferramentas) proporcional ao tempo que as motos ocuparam a oficina. Como o valor gasto de estrutura foi {formatCurrency(estruturaConsumidaMontagemTotal)} e a loja pagou {formatCurrency(faturamentoMontagens)}, a Diferença Absorvida {Math.abs(diferencaAbsorvidaTotal) < 0.01 ? 'zerou (R$ 0,00)' : `zerou (${formatCurrency(Math.abs(diferencaAbsorvidaTotal))})`}, provando que o setor de vendas cobriu todas as despesas de espaço e tempo da oficina.
                </p>
              </div>

              <div className="flex justify-between items-center pt-3 border-t border-slate-700/50">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Diferença Total Absorvida</span>
                <span className={`text-base font-bold text-white`}>
                  {formatCurrency(Math.abs(diferencaAbsorvidaTotal))}
                </span>
              </div>
              
              <div className="pt-4 mt-2 border-t border-slate-700/30">
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  <span className="font-bold text-slate-300">💡 Como a receita de montagens é calculada:</span><br/>
                  <span className="font-mono text-[10px] text-slate-300 bg-slate-800/50 px-1 py-0.5 rounded mt-1 mb-1 inline-block">
                    Receita = Horas Ocupadas × Valor da Hora Técnica Seca
                  </span><br/>
                  O sistema pega o tempo real que os mecânicos gastaram nas {totalMotosMontadas} motos ({totalHorasConsumidasMontagem}h) e multiplica pelo custo seco da hora da oficina ({formatCurrency(valorHora)}). Este valor representa o repasse exato de custos de estrutura e mão de obra operada no pátio, garantindo que a loja remunere a oficina sem gerar falso lucro sobre o estoque de motos novas.
                </p>
              </div>
            </div>
          </Card>
        </div>

        <div className="flex flex-col h-full">
          <Card className="!mb-0 h-full border-t-4 border-t-pink-500">
            <h2 className="text-xl font-bold mb-5 text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
              <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              Revisões (Manual do Proprietário)
            </h2>
            <div className="space-y-6">
              
              <div>
                <h3 className="text-sm font-bold text-slate-800 mb-2">Revisão Básica (ex: 1.000 km)</h3>
                <div className="grid grid-cols-2 gap-4">
                  <Input label="Qtd. Revisões Mês" value={state.qtdRevisoesBasica} onChange={(v) => updateState('qtdRevisoesBasica', v)} />
                  <Input label="Tempo Padrão (Hrs)" value={state.tempoMedioRevisaoBasica} onChange={(v) => updateState('tempoMedioRevisaoBasica', v)} />
                </div>
              </div>

              <div>
                <h3 className="text-sm font-bold text-slate-800 mb-2">Revisão Intermediária (ex: 4.000 a 8.000 km)</h3>
                <div className="grid grid-cols-2 gap-4">
                  <Input label="Qtd. Revisões Mês" value={state.qtdRevisoesIntermediaria} onChange={(v) => updateState('qtdRevisoesIntermediaria', v)} />
                  <Input label="Tempo Padrão (Hrs)" value={state.tempoMedioRevisaoIntermediaria} onChange={(v) => updateState('tempoMedioRevisaoIntermediaria', v)} />
                </div>
              </div>

              <div>
                <h3 className="text-sm font-bold text-slate-800 mb-2">Revisão Avançada/Geral (ex: 12.000+ km)</h3>
                <div className="grid grid-cols-2 gap-4">
                  <Input label="Qtd. Revisões Mês" value={state.qtdRevisoesAvancada} onChange={(v) => updateState('qtdRevisoesAvancada', v)} />
                  <Input label="Tempo Padrão (Hrs)" value={state.tempoMedioRevisaoAvancada} onChange={(v) => updateState('tempoMedioRevisaoAvancada', v)} />
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <h3 className="text-sm font-bold text-slate-800 mb-2">Comissões (por revisão)</h3>
                <div className="grid grid-cols-2 gap-4">
                  <Input label="Comissão Mecânico" prefix="R$" value={state.comissaoMecanico} onChange={(v) => updateState('comissaoMecanico', v)} />
                  <Input label="Comissão Admin" prefix="R$" value={state.comissaoAuxiliar} onChange={(v) => updateState('comissaoAuxiliar', v)} />
                </div>
              </div>
              
              <div className="mt-5 pt-5 border-t border-slate-100 space-y-3">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-500 font-bold uppercase">Faturamento Estimado (R$)</span>
                  <span className="font-bold text-emerald-600 text-lg">{formatCurrency(faturamentoRevisoes)}</span>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
