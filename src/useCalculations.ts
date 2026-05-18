import { useAppContext } from './context';

export function useCalculations() {
  const { state } = useAppContext();

  const num = (val: any) => {
    if (typeof val === 'string') {
      const parsed = parseFloat(val.replace(/\./g, '').replace(',', '.'));
      return isNaN(parsed) ? 0 : parsed;
    }
    return Number(val) || 0;
  };

  // ABA 1 - CUSTOS
  const totalCustosFixos = 
    num(state.aluguel) + num(state.energia) + num(state.agua) + num(state.internet) + num(state.outrosCustosFixos);

  const valorEncargosMecanicos = num(state.qtdMecanicos) * num(state.salarioMecanico) * (num(state.encargosMecanico) / 100);
  const custoMecanicos = 
    num(state.qtdMecanicos) * num(state.salarioMecanico) + valorEncargosMecanicos;

  const valorEncargosAuxiliar = num(state.salarioAuxiliar) * (num(state.encargosAuxiliar) / 100);
  const custoAuxiliar = 
    num(state.salarioAuxiliar) + valorEncargosAuxiliar;

  // Horas Extras
  const valorHoraBaseMecanico = num(state.salarioMecanico) / 220;
  const horaExtraMecanico = valorHoraBaseMecanico * (1 + num(state.adicionalHorasExtrasMecanico) / 100);
  const custoHorasExtrasMecanico = horaExtraMecanico * num(state.qtdHorasExtrasMecanico);

  const valorHoraBaseAuxiliar = num(state.salarioAuxiliar) / 220;
  const horaExtraAuxiliar = valorHoraBaseAuxiliar * (1 + num(state.adicionalHorasExtrasAuxiliar) / 100);
  const custoHorasExtrasAuxiliar = horaExtraAuxiliar * num(state.qtdHorasExtrasAuxiliar);

  const totalHorasExtras = custoHorasExtrasMecanico + custoHorasExtrasAuxiliar;

  const totalOutrosCustos = num(state.insumos);

  const totalQtdRevisoes = num(state.qtdRevisoesBasica) + num(state.qtdRevisoesIntermediaria) + num(state.qtdRevisoesAvancada);
  const custoRevisoes = (num(state.comissaoMecanico) + num(state.comissaoAuxiliar)) * totalQtdRevisoes;

  const custoTotal = totalCustosFixos + custoMecanicos + custoAuxiliar + totalOutrosCustos;
  const rateioOficinaDecimal = num(state.rateioOficina) / 100;
  const custoDaOficina = custoTotal * rateioOficinaDecimal;
  const lucroAbsoluto = custoDaOficina * (num(state.lucroDesejado) / 100);
  const custoDaOficinaComLucro = custoDaOficina + lucroAbsoluto;
  
  const custoTotalComLucro = custoTotal * (1 + num(state.lucroDesejado) / 100);

  // ABA 3 - CAPACIDADE
  const horasDisponiveis = num(state.qtdMecanicos) * num(state.horasPorMecanico);
  const horasVendaveis = Math.max(0, horasDisponiveis - num(state.horasGarantia) - num(state.horasImprodutivas));

  // ABA 4 - RESULTADO (Valores Ideais)
  // Hora Técnica baseada no custo rateado e escala de horas disponíveis
  const valorHora = horasDisponiveis > 0 ? custoDaOficina / horasDisponiveis : 0;
  const valorHoraVenda = horasVendaveis > 0 ? custoDaOficinaComLucro / horasVendaveis : 0;
  const valorMinuto = valorHora / 60;

  // ABA 2 - PRODUÇÃO
  // Básica
  const tempoMedioPorMotoBasica = num(state.tempoMedioMontagemBasica);
  const tempoTotalMontagemBasica = tempoMedioPorMotoBasica * num(state.qtdMotosBasica);
  
  const custoHoraSecaPorMotoBasica = valorHora * tempoMedioPorMotoBasica;
  const comissaoPorMotoBasica = num(state.comissaoMontagemBasica);
  const custoTotalPorMotoBasica = custoHoraSecaPorMotoBasica + comissaoPorMotoBasica;
  const lucroLojaPorMotoBasica = custoTotalPorMotoBasica * (num(state.lucroDesejadoMontagem) / 100);
  const faturamentoInternoPorMotoBasica = custoTotalPorMotoBasica + lucroLojaPorMotoBasica;
  
  const estruturaConsumidaMontagemBasica = valorHora * tempoTotalMontagemBasica;
  const receitaMontagemBasica = faturamentoInternoPorMotoBasica * num(state.qtdMotosBasica);
  const diferencaAbsorvidaBasica = receitaMontagemBasica - estruturaConsumidaMontagemBasica - (comissaoPorMotoBasica * num(state.qtdMotosBasica));

  // Intermediária
  const tempoMedioPorMotoIntermediaria = num(state.tempoMedioMontagemIntermediaria);
  const tempoTotalMontagemIntermediaria = tempoMedioPorMotoIntermediaria * num(state.qtdMotosIntermediaria);
  
  const custoHoraSecaPorMotoIntermediaria = valorHora * tempoMedioPorMotoIntermediaria;
  const comissaoPorMotoIntermediaria = num(state.comissaoMontagemIntermediaria);
  const custoTotalPorMotoIntermediaria = custoHoraSecaPorMotoIntermediaria + comissaoPorMotoIntermediaria;
  const lucroLojaPorMotoIntermediaria = custoTotalPorMotoIntermediaria * (num(state.lucroDesejadoMontagem) / 100);
  const faturamentoInternoPorMotoIntermediaria = custoTotalPorMotoIntermediaria + lucroLojaPorMotoIntermediaria;
  
  const estruturaConsumidaMontagemIntermediaria = valorHora * tempoTotalMontagemIntermediaria;
  const receitaMontagemIntermediaria = faturamentoInternoPorMotoIntermediaria * num(state.qtdMotosIntermediaria);
  const diferencaAbsorvidaIntermediaria = receitaMontagemIntermediaria - estruturaConsumidaMontagemIntermediaria - (comissaoPorMotoIntermediaria * num(state.qtdMotosIntermediaria));

  // Avançada
  const tempoMedioPorMotoAvancada = num(state.tempoMedioMontagemAvancada);
  const tempoTotalMontagemAvancada = tempoMedioPorMotoAvancada * num(state.qtdMotosAvancada);

  const custoHoraSecaPorMotoAvancada = valorHora * tempoMedioPorMotoAvancada;
  const comissaoPorMotoAvancada = num(state.comissaoMontagemAvancada);
  const custoTotalPorMotoAvancada = custoHoraSecaPorMotoAvancada + comissaoPorMotoAvancada;
  const lucroLojaPorMotoAvancada = custoTotalPorMotoAvancada * (num(state.lucroDesejadoMontagem) / 100);
  const faturamentoInternoPorMotoAvancada = custoTotalPorMotoAvancada + lucroLojaPorMotoAvancada;
  
  const estruturaConsumidaMontagemAvancada = valorHora * tempoTotalMontagemAvancada;
  const receitaMontagemAvancada = faturamentoInternoPorMotoAvancada * num(state.qtdMotosAvancada);
  const diferencaAbsorvidaAvancada = receitaMontagemAvancada - estruturaConsumidaMontagemAvancada - (comissaoPorMotoAvancada * num(state.qtdMotosAvancada));

  // Totais
  const totalMotosMontadas = num(state.qtdMotosBasica) + num(state.qtdMotosIntermediaria) + num(state.qtdMotosAvancada);
  const totalHorasConsumidasMontagem = tempoTotalMontagemBasica + tempoTotalMontagemIntermediaria + tempoTotalMontagemAvancada;
  
  const faturamentoRevisoesBasica = num(state.qtdRevisoesBasica) * num(state.tempoMedioRevisaoBasica) * valorHoraVenda;
  const faturamentoRevisoesIntermediaria = num(state.qtdRevisoesIntermediaria) * num(state.tempoMedioRevisaoIntermediaria) * valorHoraVenda;
  const faturamentoRevisoesAvancada = num(state.qtdRevisoesAvancada) * num(state.tempoMedioRevisaoAvancada) * valorHoraVenda;
  const faturamentoRevisoes = faturamentoRevisoesBasica + faturamentoRevisoesIntermediaria + faturamentoRevisoesAvancada;
  const faturamentoMontagens = receitaMontagemBasica + receitaMontagemIntermediaria + receitaMontagemAvancada;
  
  const valorAgregadoTotal = faturamentoMontagens + faturamentoRevisoes;
  const estruturaConsumidaMontagemTotal = estruturaConsumidaMontagemBasica + estruturaConsumidaMontagemIntermediaria + estruturaConsumidaMontagemAvancada;
  const diferencaAbsorvidaTotal = diferencaAbsorvidaBasica + diferencaAbsorvidaIntermediaria + diferencaAbsorvidaAvancada;
  
  const totalComissoesMontagem = (num(state.comissaoMontagemBasica) * num(state.qtdMotosBasica)) + 
                                 (num(state.comissaoMontagemIntermediaria) * num(state.qtdMotosIntermediaria)) + 
                                 (num(state.comissaoMontagemAvancada) * num(state.qtdMotosAvancada));
  
  const totalComissoes = totalComissoesMontagem + custoRevisoes;

  const lucroLiquidoReal = valorAgregadoTotal - custoDaOficina - totalHorasExtras;

  return {
    valorEncargosMecanicos,
    valorEncargosAuxiliar,
    custoHorasExtrasMecanico,
    custoHorasExtrasAuxiliar,
    totalHorasExtras,
    custoTotal,
    custoTotalComLucro,
    custoDaOficina,
    horasDisponiveis,
    horasVendaveis,
    valorHora,
    valorHoraVenda,
    valorMinuto,
    
    // Básica
    faturamentoInternoPorMotoBasica,
    custoHoraSecaPorMotoBasica,
    comissaoPorMotoBasica,
    custoTotalPorMotoBasica,
    lucroLojaPorMotoBasica,
    estruturaConsumidaMontagemBasica,
    diferencaAbsorvidaBasica,

    // Intermediária
    faturamentoInternoPorMotoIntermediaria,
    custoHoraSecaPorMotoIntermediaria,
    comissaoPorMotoIntermediaria,
    custoTotalPorMotoIntermediaria,
    lucroLojaPorMotoIntermediaria,
    estruturaConsumidaMontagemIntermediaria,
    diferencaAbsorvidaIntermediaria,

    // Avançada
    faturamentoInternoPorMotoAvancada,
    custoHoraSecaPorMotoAvancada,
    comissaoPorMotoAvancada,
    custoTotalPorMotoAvancada,
    lucroLojaPorMotoAvancada,
    estruturaConsumidaMontagemAvancada,
    diferencaAbsorvidaAvancada,

    // Totais Produção
    totalMotosMontadas,
    totalHorasConsumidasMontagem,
    valorAgregadoTotal,
    estruturaConsumidaMontagemTotal,
    diferencaAbsorvidaTotal,
    totalComissoes,
    lucroLiquidoReal,
    faturamentoRevisoes,
    faturamentoMontagens
  };
}
