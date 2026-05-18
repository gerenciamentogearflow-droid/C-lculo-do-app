export type AppState = {
  // Aba 1 - Custos
  rateioOficina: number | string;
  aluguel: number | string;
  energia: number | string;
  agua: number | string;
  internet: number | string;
  outrosCustosFixos: number | string;

  qtdMecanicos: number | string;
  salarioMecanico: number | string;
  encargosMecanico: number | string;

  salarioAuxiliar: number | string;
  encargosAuxiliar: number | string;

  insumos: number | string;

  qtdHorasExtrasMecanico: number | string;
  adicionalHorasExtrasMecanico: number | string;

  qtdHorasExtrasAuxiliar: number | string;
  adicionalHorasExtrasAuxiliar: number | string;

  lucroDesejado: number | string;
  lucroDesejadoMontagem: number | string;

  // Aba 2 - Producao
  valorPorMontagemBasica: number | string;
  qtdMotosBasica: number | string;
  tempoMedioMontagemBasica: number | string;
  comissaoMontagemBasica: number | string;

  valorPorMontagemIntermediaria: number | string;
  qtdMotosIntermediaria: number | string;
  tempoMedioMontagemIntermediaria: number | string;
  comissaoMontagemIntermediaria: number | string;

  valorPorMontagemAvancada: number | string;
  qtdMotosAvancada: number | string;
  tempoMedioMontagemAvancada: number | string;
  comissaoMontagemAvancada: number | string;

  comissaoMecanico: number | string;
  comissaoAuxiliar: number | string;
  qtdRevisoesBasica: number | string;
  tempoMedioRevisaoBasica: number | string;
  qtdRevisoesIntermediaria: number | string;
  tempoMedioRevisaoIntermediaria: number | string;
  qtdRevisoesAvancada: number | string;
  tempoMedioRevisaoAvancada: number | string;

  // Aba 3 - Capacidade
  horasPorMecanico: number | string;
  horasGarantia: number | string;
  horasImprodutivas: number | string;
};
