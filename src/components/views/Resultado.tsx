import React, { useState } from 'react';
import { useCalculations } from '../../useCalculations';
import { Card } from '../ui';
import { useAppContext } from '../../context';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, ChevronUp, AlertCircle, CheckCircle2, AlertTriangle, Info, Clock, Users, Wrench, Store } from 'lucide-react';

export function Resultado() {
  const { state, updateState } = useAppContext();
  const {
    valorHora,
    valorHoraVenda,
    horasVendaveis,
    horasDisponiveis,
    totalComissoes,
    totalHorasExtras,
    custoDaOficina,
    diferencaAbsorvidaTotal: diferencaAbsorvida,
    faturamentoMontagens,
    faturamentoInternoPorMotoBasica,
    faturamentoInternoPorMotoIntermediaria,
    faturamentoInternoPorMotoAvancada,
    custoTotalPorMotoBasica,
    custoTotalPorMotoIntermediaria,
    custoTotalPorMotoAvancada,
  } = useCalculations();

  const [showTechnicalDetails, setShowTechnicalDetails] = useState(false);

  const valorMinutoVenda = valorHoraVenda / 60;
  
  // Ocupação logic
  const ocupacaoPct = horasDisponiveis > 0 ? Math.round((horasVendaveis / horasDisponiveis) * 100) : 0;
  const ocupacaoStatus = ocupacaoPct >= 80 ? 'success' : ocupacaoPct >= 50 ? 'warning' : 'danger';
  const ocupacaoColor = ocupacaoStatus === 'success' ? 'bg-emerald-500' : ocupacaoStatus === 'warning' ? 'bg-amber-500' : 'bg-rose-500';

  const formatCurrency = (val: number) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);

  // Alertas Inteligentes (Diagnóstico Modernizado)
  const getAlertas = () => {
    const list = [];
    
    // Preço da Hora
    if (valorHoraVenda > 250) {
      list.push({ title: "Hora Técnica Alta", desc: "Atenção: valor premium. Verifique se o mercado da sua região absorve este valor sem perda de volume de O.S.", type: 'warning', icon: AlertTriangle, color: 'text-amber-700', bg: 'bg-amber-50', border: 'border-amber-200' });
    } else if (valorHoraVenda < 80) {
      list.push({ title: "Hora Técnica Baixa", desc: "Possível desvlorização. O valor de venda está próximo de um custo de oficina não-autorizada.", type: 'danger', icon: AlertCircle, color: 'text-rose-700', bg: 'bg-rose-50', border: 'border-rose-200' });
    } else {
      list.push({ title: "Hora Técnica Equilibrada", desc: "Valor de hora saudável e coerente com concessionárias e oficinas de alto padrão.", type: 'success', icon: CheckCircle2, color: 'text-emerald-700', bg: 'bg-emerald-50', border: 'border-emerald-200' });
    }

    // Saúde da Montagem
    if (diferencaAbsorvida < -100) {
      list.push({ title: "Déficit na Montagem", desc: "A receita gerada pelas montagens não está pagando a porção da estrutura consumida por elas.", type: 'danger', icon: AlertCircle, color: 'text-rose-700', bg: 'bg-rose-50', border: 'border-rose-200' });
    } else if (diferencaAbsorvida > 100) {
      list.push({ title: "Lucratividade na Montagem", desc: "Boa gestão! As montagens estão gerando caixa extra e ajudando a pagar os custos da filial.", type: 'success', icon: CheckCircle2, color: 'text-emerald-700', bg: 'bg-emerald-50', border: 'border-emerald-200' });
    }

    // Alerta de Escala / Horas extras
    if (totalHorasExtras > 0.10 * custoDaOficina) {
      list.push({ title: "Excesso de Horas Extras", desc: "Gasto elevado detectado. Dependendo da demanda, pode ser mais barato contratar um novo mecânico.", type: 'warning', icon: AlertTriangle, color: 'text-amber-700', bg: 'bg-amber-50', border: 'border-amber-200' });
    } else if (totalHorasExtras === 0) {
      list.push({ title: "Horas Extras Zeradas", desc: "Jornada da equipe controlada e sob orçamento.", type: 'info', icon: Info, color: 'text-blue-700', bg: 'bg-blue-50', border: 'border-blue-200' });
    }

    return list;
  };

  const alertas = getAlertas();

  return (
    <div className="pb-24 pt-6 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-7xl mx-auto">
      {/* HEADER */}
      <div className="mb-6 px-2 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-slate-900 mb-1">O Que Cobrar</h1>
          <p className="text-slate-500 font-medium">Os valores base que você deve repassar aos clientes e à loja.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* COLUNA ESQUERDA (Blobs 1 e 2) */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          
          {/* BLOCO 1 - Resumo Principal */}
          <div className="bg-slate-900 rounded-3xl p-8 relative overflow-hidden shadow-xl shadow-slate-900/10 border border-slate-800 flex flex-col justify-between">
            {/* BG pattern */}
            <svg className="absolute right-[-40px] top-[-40px] w-64 h-64 text-slate-800 opacity-50" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L2 22h20L12 2zm0 4.5l6.5 13h-13L12 6.5z"/></svg>

            <div className="relative z-10 flex flex-col gap-8 h-full">
              {/* Cliente */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span className="text-slate-300 font-bold uppercase tracking-widest text-xs">Cobrar do Cliente (Hora Técnica)</span>
                </div>
                <div className="text-5xl md:text-6xl font-black tracking-tight text-emerald-400 mb-3">
                  {formatCurrency(valorHoraVenda)} <span className="text-2xl text-slate-400 font-bold tracking-normal">/hora</span>
                </div>
                <div className="flex gap-4">
                  <div className="bg-slate-800/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-700/50">
                    <span className="text-slate-400 text-[10px] uppercase tracking-wider font-bold block mb-0.5">Lucro Alvo</span>
                    <span className="text-sm font-bold text-slate-100">{state.lucroDesejado}%</span>
                  </div>
                  <div className="bg-slate-800/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-700/50">
                    <span className="text-slate-400 text-[10px] uppercase tracking-wider font-bold block mb-0.5">Valor / min.</span>
                    <span className="text-sm font-bold text-slate-200">{formatCurrency(valorMinutoVenda)}</span>
                  </div>
                </div>
              </div>

              {/* Loja e Montagens */}
              <div className="pt-8 border-t border-slate-700/50">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse"></span>
                    <span className="text-slate-300 font-bold uppercase tracking-widest text-xs">Precificação de Montagens (Por Moto)</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">Margem da Loja:</span>
                    <div className="relative">
                      <input 
                        type="number" 
                        value={state.lucroDesejadoMontagem} 
                        onChange={(e) => updateState('lucroDesejadoMontagem', e.target.value)}
                        className="w-20 bg-slate-800/80 border border-slate-600 rounded-lg py-1.5 px-3 text-sm font-bold text-white text-center focus:outline-none focus:border-indigo-500"
                        min="0"
                      />
                      <span className="absolute right-2 top-1.5 text-slate-400 text-sm font-bold">%</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  
                  {/* Básica */}
                  <div className="bg-indigo-900/30 backdrop-blur-md p-4 rounded-xl border border-indigo-500/20 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="md:w-1/4">
                      <span className="text-indigo-300 text-sm font-black uppercase tracking-wider block">Básica</span>
                    </div>
                    <div className="flex-1 grid grid-cols-3 gap-2 text-center md:text-left">
                      <div>
                        <span className="text-[10px] text-slate-400 uppercase tracking-wider font-bold block mb-1">Repassar a Oficina</span>
                        <span className="text-sm font-bold text-slate-200">{formatCurrency(custoTotalPorMotoBasica)}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-emerald-400/80 uppercase tracking-wider font-bold block mb-1">Lucro Loja</span>
                        <span className="text-sm font-bold text-emerald-400">+{formatCurrency(faturamentoInternoPorMotoBasica - custoTotalPorMotoBasica)}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-indigo-300 uppercase tracking-wider font-bold block mb-1">Cobrar do Cliente</span>
                        <span className="text-sm font-bold text-white">{formatCurrency(faturamentoInternoPorMotoBasica)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Intermediária */}
                  <div className="bg-indigo-900/30 backdrop-blur-md p-4 rounded-xl border border-indigo-500/20 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="md:w-1/4">
                      <span className="text-indigo-300 text-sm font-black uppercase tracking-wider block">Intermediária</span>
                    </div>
                    <div className="flex-1 grid grid-cols-3 gap-2 text-center md:text-left">
                      <div>
                        <span className="text-[10px] text-slate-400 uppercase tracking-wider font-bold block mb-1">Repassar a Oficina</span>
                        <span className="text-sm font-bold text-slate-200">{formatCurrency(custoTotalPorMotoIntermediaria)}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-emerald-400/80 uppercase tracking-wider font-bold block mb-1">Lucro Loja</span>
                        <span className="text-sm font-bold text-emerald-400">+{formatCurrency(faturamentoInternoPorMotoIntermediaria - custoTotalPorMotoIntermediaria)}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-indigo-300 uppercase tracking-wider font-bold block mb-1">Cobrar do Cliente</span>
                        <span className="text-sm font-bold text-white">{formatCurrency(faturamentoInternoPorMotoIntermediaria)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Avançada */}
                  <div className="bg-indigo-900/30 backdrop-blur-md p-4 rounded-xl border border-indigo-500/20 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="md:w-1/4">
                      <span className="text-indigo-300 text-sm font-black uppercase tracking-wider block">Avançada</span>
                    </div>
                    <div className="flex-1 grid grid-cols-3 gap-2 text-center md:text-left">
                      <div>
                        <span className="text-[10px] text-slate-400 uppercase tracking-wider font-bold block mb-1">Repassar a Oficina</span>
                        <span className="text-sm font-bold text-slate-200">{formatCurrency(custoTotalPorMotoAvancada)}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-emerald-400/80 uppercase tracking-wider font-bold block mb-1">Lucro Loja</span>
                        <span className="text-sm font-bold text-emerald-400">+{formatCurrency(faturamentoInternoPorMotoAvancada - custoTotalPorMotoAvancada)}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-indigo-300 uppercase tracking-wider font-bold block mb-1">Cobrar do Cliente</span>
                        <span className="text-sm font-bold text-white">{formatCurrency(faturamentoInternoPorMotoAvancada)}</span>
                      </div>
                    </div>
                  </div>

                </div>

                <div className="mt-6 flex items-start gap-2 text-xs font-medium text-slate-400 bg-slate-800/50 p-3 rounded-lg border border-slate-700/50">
                  <Info className="w-4 h-4 shrink-0 text-slate-500" /> 
                  <p>O <strong>Repasse a Oficina</strong> é o custo real consumido pelo tempo de montagem. O valor a <strong>Cobrar do Cliente</strong> embute a margem de {state.lucroDesejadoMontagem}% que fica inteiramente como lucro para a Loja.</p>
                </div>
              </div>
            </div>
          </div>

          {/* BLOCO 2 - Tabela Rápida de Serviços */}
          <Card className="!mb-0 flex flex-col p-6 shadow-sm border-slate-200">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest mb-6">Tabela Rápida de Precificação</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="flex flex-col p-4 bg-slate-50 rounded-xl border border-slate-100 hover:border-emerald-100 hover:bg-white transition-colors group">
                <span className="text-slate-400 font-bold text-xs uppercase mb-1 flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> 30 min</span>
                <span className="text-lg md:text-xl font-bold text-slate-800 group-hover:text-emerald-600 transition-colors">{formatCurrency(valorHoraVenda * 0.5)}</span>
              </div>
              <div className="flex flex-col p-4 bg-emerald-50/50 rounded-xl border border-emerald-100 relative group">
                <div className="absolute -top-2.5 right-3 bg-emerald-500 text-white text-[9px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full">Base</div>
                <span className="text-emerald-600 font-bold text-xs uppercase mb-1 flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> 1 hora</span>
                <span className="text-lg md:text-xl font-bold text-emerald-900">{formatCurrency(valorHoraVenda)}</span>
              </div>
              <div className="flex flex-col p-4 bg-slate-50 rounded-xl border border-slate-100 hover:border-emerald-100 hover:bg-white transition-colors group">
                <span className="text-slate-400 font-bold text-xs uppercase mb-1 flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> 2 horas</span>
                <span className="text-lg md:text-xl font-bold text-slate-800 group-hover:text-emerald-600 transition-colors">{formatCurrency(valorHoraVenda * 2)}</span>
              </div>
              <div className="flex flex-col p-4 bg-slate-50 rounded-xl border border-slate-100 hover:border-emerald-100 hover:bg-white transition-colors group">
                <span className="text-slate-400 font-bold text-xs uppercase mb-1 flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> 4 horas</span>
                <span className="text-lg md:text-xl font-bold text-slate-800 group-hover:text-emerald-600 transition-colors">{formatCurrency(valorHoraVenda * 4)}</span>
              </div>
            </div>
          </Card>
        </div>

        {/* COLUNA DIREITA (Blobs 3 e 4) */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          
          {/* BLOCO 3 - Despesas Principais */}
          <Card className="!mb-0 flex flex-col p-6 shadow-sm border-slate-200">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest mb-6">Custos Operacionais e Equipe</h3>
            
            <div className="space-y-6">
              {/* Ocupação */}
              <div>
                <div className="flex justify-between items-end mb-2">
                  <div className="flex items-center gap-2">
                    <Wrench className="w-4 h-4 text-slate-400" />
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-widest leading-none">Ocupação Produtiva</p>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${ocupacaoStatus === 'success' ? 'bg-emerald-100 text-emerald-700' : ocupacaoStatus === 'warning' ? 'bg-amber-100 text-amber-700' : 'bg-rose-100 text-rose-700'}`}>
                    {horasVendaveis}h úteis de {horasDisponiveis}h
                  </span>
                </div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-lg font-bold text-slate-900">{ocupacaoPct}% <span className="text-sm text-slate-500 font-medium ml-1">alocado</span></span>
                </div>
                <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className={`h-full ${ocupacaoColor} rounded-full transition-all duration-1000 ease-out`} style={{ width: `${Math.min(100, ocupacaoPct)}%` }}></div>
                </div>
              </div>

              <hr className="border-slate-100" />

              {/* Dual Stats */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <Users className="w-3.5 h-3.5 text-slate-400" />
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest leading-none">Comissões a Pagar</p>
                  </div>
                  <span className="text-lg font-bold text-slate-800 block leading-none">{formatCurrency(totalComissoes)}</span>
                </div>
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest leading-none">Horas Extras a Pagar</p>
                  </div>
                  <span className="text-lg font-bold text-slate-800 block leading-none">{formatCurrency(totalHorasExtras)}</span>
                </div>
              </div>

            </div>
          </Card>

          {/* BLOCO 4 - Alertas Inteligentes */}
          <div className="flex flex-col gap-3">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest mb-1 px-1 mt-2">Alertas do Sistema</h3>
            {alertas.map((alerta, i) => {
              const Icon = alerta.icon;
              return (
                <div key={i} className={`p-4 rounded-xl border ${alerta.bg} ${alerta.border} flex items-start gap-3 transition-opacity hover:opacity-90`}>
                  <div className={`mt-0.5 ${alerta.color} shrink-0`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className={`text-sm font-bold mb-0.5 ${alerta.color} leading-tight`}>{alerta.title}</h4>
                    <p className={`text-xs ${alerta.color} opacity-80 leading-relaxed font-medium`}>{alerta.desc}</p>
                  </div>
                </div>
              )
            })}
          </div>

        </div>
      </div>

      {/* DETALHAMENTO EXPANSÍVEL (Tirando texto chato da view principal) */}
      <div className="mt-12 flex flex-col items-center border-t border-slate-200 pt-8 pb-4">
        <button 
          onClick={() => setShowTechnicalDetails(!showTechnicalDetails)}
          className="flex items-center gap-2 px-6 py-2.5 bg-white border border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700 rounded-full font-bold text-xs tracking-wider uppercase transition-all shadow-sm active:scale-95"
        >
          <Info className="w-4 h-4 text-indigo-500" />
          {showTechnicalDetails ? 'Ocultar Engenharia de Preços' : 'Visualizar Engenharia de Preços'}
          {showTechnicalDetails ? <ChevronUp className="w-4 h-4 ml-1 opacity-50" /> : <ChevronDown className="w-4 h-4 ml-1 opacity-50" />}
        </button>

        <AnimatePresence>
          {showTechnicalDetails && (
            <motion.div
              initial={{ height: 0, opacity: 0, y: -10 }}
              animate={{ height: 'auto', opacity: 1, y: 0 }}
              exit={{ height: 0, opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="w-full mt-6 overflow-hidden max-w-4xl"
            >
              <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm text-sm space-y-6">
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <h4 className="font-bold text-slate-900 border-b border-slate-100 pb-2">Como é formada a Hora Técnica?</h4>
                    <p className="text-slate-600 leading-relaxed">
                      O sistema calcula o <span className="font-bold text-slate-800">Custo Total Rateado</span> da oficina (Salários, Encargos, Horas Extras, Menos Descontos) e divide pelas <span className="font-bold text-slate-800">Horas Rentáveis Ociosas</span> (Horas Totais menos Garantia e Improdutivos).
                    </p>
                    <p className="text-slate-600 leading-relaxed">
                      Sobre esse custo "seco", aplica-se a margem de <span className="font-bold text-indigo-600">{state.lucroDesejado}%</span> de lucro desejada. Este cálculo automático garante que clientes pagantes cubram os "ralos" de prejuízo (garantias e improdutividade) mantendo a loja no azul.
                    </p>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="bg-indigo-50 p-4 rounded-xl border border-indigo-100">
                      <h5 className="font-bold text-indigo-900 mb-1 text-xs uppercase tracking-wider">Hora Interna / Montagem: {formatCurrency(valorHora)}</h5>
                      <p className="text-indigo-800 text-xs">Utilizada estritamente para que o setor de Vendas da loja pague a estrutura da oficina pela montagem das motos. Não possui "lucro de rua", cobrando apenas o custo exato para manter o preço das motos competitivo em vitrine.</p>
                    </div>
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                      <h5 className="font-bold text-slate-800 mb-1 text-xs uppercase tracking-wider">Valor de Venda (Cliente): {formatCurrency(valorHoraVenda)}</h5>
                      <p className="text-slate-600 text-xs">O valor exposto aos clientes no balcão de serviços, blindado contra as ineficiências operacionais e garantindo o lucro pré-definido ao final do mês.</p>
                    </div>
                  </div>
                </div>

              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

    </div>
  );
}

