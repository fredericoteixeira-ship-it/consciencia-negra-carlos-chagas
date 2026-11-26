/**
 * Gráficos Oficiais — Chart.js 4.4.1
 * Paleta Oficial: Laranja (#EC7D46), Vinho (#8D1D1C), Vermelho (#AD2823), Amarelo (#F3CC71), Verde (#40583E)
 * Fonte Única e Oficial: dados.json / window.DADOS_SITE
 */

document.addEventListener('DOMContentLoaded', async () => {
  // Carrega ou valida os dados da fonte única
  const dados = await (typeof obterDadosSite === 'function' ? obterDadosSite() : window.DADOS_SITE);

  if (!dados) {
    console.error('Dados estatísticos não encontrados para os gráficos.');
    return;
  }

  // Paleta oficial harmonizada com o tema escuro quente (#0E0A09)
  const PALETA = {
    laranja: '#EC7D46',
    laranjaAlphaLight: 'rgba(236, 125, 70, 0.18)',
    laranjaAlphaStrong: 'rgba(236, 125, 70, 0.45)',
    vinho: '#8D1D1C',
    vinhoAlpha: 'rgba(141, 29, 28, 0.4)',
    vermelho: '#AD2823',
    amarelo: '#F3CC71',
    amareloAlpha: 'rgba(243, 204, 113, 0.25)',
    verde: '#40583E',
    gridLines: 'rgba(245, 237, 227, 0.08)',
    textMuted: '#8E857C',
    textLight: '#F5EDE3'
  };

  // Configurações globais padrão do Chart.js
  Chart.defaults.color = PALETA.textMuted;
  Chart.defaults.font.family = "'Jost', system-ui, sans-serif";
  Chart.defaults.plugins.tooltip.backgroundColor = 'rgba(14, 10, 9, 0.95)';
  Chart.defaults.plugins.tooltip.titleColor = PALETA.amarelo;
  Chart.defaults.plugins.tooltip.bodyColor = '#FFFFFF';
  Chart.defaults.plugins.tooltip.borderColor = 'rgba(236, 125, 70, 0.35)';
  Chart.defaults.plugins.tooltip.borderWidth = 1;
  Chart.defaults.plugins.tooltip.padding = 10;
  Chart.defaults.plugins.tooltip.cornerRadius = 6;

  // -------------------------------------------------------------
  // Gráfico 1: Linha — Série Histórica Nacional 2014–2024
  // -------------------------------------------------------------
  const ctxSerie = document.getElementById('chart-serie-historica');
  if (ctxSerie && dados.serie_historica_nacional) {
    const sh = dados.serie_historica_nacional;
    new Chart(ctxSerie, {
      type: 'line',
      data: {
        labels: sh.anos,
        datasets: [
          {
            label: 'Mulheres Negras (taxa por 100 mil)',
            data: sh.mulheres_negras,
            borderColor: PALETA.laranja,
            backgroundColor: PALETA.laranjaAlphaLight,
            borderWidth: 3,
            fill: true,
            tension: 0.32,
            pointBackgroundColor: PALETA.laranja,
            pointBorderColor: '#FFFFFF',
            pointRadius: 4,
            pointHoverRadius: 7
          },
          {
            label: 'Mulheres Não Negras (taxa por 100 mil)',
            data: sh.mulheres_nao_negras,
            borderColor: PALETA.amarelo,
            backgroundColor: 'transparent',
            borderWidth: 2.5,
            borderDash: [5, 5],
            fill: false,
            tension: 0.32,
            pointBackgroundColor: PALETA.amarelo,
            pointBorderColor: '#0E0A09',
            pointRadius: 4,
            pointHoverRadius: 7
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'top',
            labels: {
              color: PALETA.textLight,
              usePointStyle: true,
              padding: 16,
              font: { size: 12, weight: '600' }
            }
          },
          tooltip: {
            callbacks: {
              label: function(ctx) {
                return `${ctx.dataset.label}: ${ctx.parsed.y.toFixed(1).replace('.', ',')} por 100 mil`;
              }
            }
          }
        },
        scales: {
          x: {
            grid: { color: PALETA.gridLines },
            ticks: { color: PALETA.textMuted }
          },
          y: {
            min: 0,
            max: 7,
            grid: { color: PALETA.gridLines },
            ticks: {
              color: PALETA.textMuted,
              callback: function(v) { return v.toFixed(1).replace('.', ','); }
            },
            title: {
              display: true,
              text: 'Taxa por 100 mil mulheres',
              color: PALETA.textMuted
            }
          }
        }
      }
    });
  }

  // -------------------------------------------------------------
  // Gráfico 2: Barras — Comparação em 2024 (4,0 x 2,4 por 100 mil)
  // -------------------------------------------------------------
  const ctxComp = document.getElementById('chart-comparacao-2024');
  if (ctxComp && dados.homicidios_2024) {
    const hom = dados.homicidios_2024;
    new Chart(ctxComp, {
      type: 'bar',
      data: {
        labels: ['Mulheres Negras', 'Mulheres Não Negras'],
        datasets: [{
          label: 'Taxa por 100 mil mulheres em 2024',
          data: [hom.taxa_negras_por_100mil, hom.taxa_nao_negras_por_100mil],
          backgroundColor: [
            PALETA.laranja,
            PALETA.amarelo
          ],
          borderColor: [
            '#F29263',
            '#FFE599'
          ],
          borderWidth: 1.5,
          borderRadius: 8,
          barPercentage: 0.55
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: function(ctx) {
                return `Taxa: ${ctx.parsed.y.toFixed(1).replace('.', ',')} por 100 mil`;
              }
            }
          }
        },
        scales: {
          x: {
            grid: { display: false },
            ticks: {
              color: PALETA.textLight,
              font: { weight: '700', size: 12 }
            }
          },
          y: {
            min: 0,
            max: 5,
            grid: { color: PALETA.gridLines },
            ticks: {
              color: PALETA.textMuted,
              callback: function(v) { return v.toFixed(1).replace('.', ','); }
            },
            title: {
              display: true,
              text: 'Taxa por 100 mil',
              color: PALETA.textMuted
            }
          }
        }
      }
    });
  }

  // -------------------------------------------------------------
  // Gráfico 3: Área / Linha — Minas Gerais 2014–2024
  // -------------------------------------------------------------
  const ctxMG = document.getElementById('chart-minas-gerais');
  if (ctxMG && dados.minas_gerais) {
    const mg = dados.minas_gerais;
    new Chart(ctxMG, {
      type: 'line',
      data: {
        labels: mg.anos,
        datasets: [{
          label: 'MG: Taxa por 100 mil mulheres negras',
          data: mg.taxa,
          borderColor: PALETA.amarelo,
          backgroundColor: PALETA.laranjaAlphaLight,
          borderWidth: 3,
          fill: true,
          tension: 0.35,
          pointBackgroundColor: PALETA.amarelo,
          pointBorderColor: '#0E0A09',
          pointRadius: 4,
          pointHoverRadius: 7
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'top',
            labels: {
              color: PALETA.textLight,
              usePointStyle: true,
              font: { weight: '600' }
            }
          },
          tooltip: {
            callbacks: {
              label: function(ctx) {
                return `Taxa em MG: ${ctx.parsed.y.toFixed(1).replace('.', ',')} por 100 mil`;
              }
            }
          }
        },
        scales: {
          x: {
            grid: { color: PALETA.gridLines },
            ticks: { color: PALETA.textMuted }
          },
          y: {
            min: 0,
            max: 6,
            grid: { color: PALETA.gridLines },
            ticks: {
              color: PALETA.textMuted,
              callback: function(v) { return v.toFixed(1).replace('.', ','); }
            },
            title: {
              display: true,
              text: 'Taxa por 100 mil',
              color: PALETA.textMuted
            }
          }
        }
      }
    });
  }

  // -------------------------------------------------------------
  // Gráfico 4: Barras Horizontais — Feminicídio 2024
  // -------------------------------------------------------------
  const ctxFem = document.getElementById('chart-feminicidio');
  if (ctxFem && dados.feminicidio_2024) {
    const fem = dados.feminicidio_2024;
    new Chart(ctxFem, {
      type: 'bar',
      data: {
        labels: [
          'Vítimas negras',
          'Idade de 18 a 44 anos',
          'Mortas dentro de casa',
          'Assassinadas por homens',
          'Companheiro ou ex-companheiro'
        ],
        datasets: [{
          label: 'Proporção (%)',
          data: [
            fem.vitimas_negras_pct,
            fem.idade_18_44_pct,
            fem.mortas_em_casa_pct,
            fem.assassinadas_por_homens_pct,
            fem.mortas_por_companheiro_ou_ex_pct_aprox
          ],
          backgroundColor: [
            PALETA.laranja,
            '#E26830',
            PALETA.vermelho,
            PALETA.vinho,
            PALETA.amarelo
          ],
          borderRadius: 6,
          barPercentage: 0.65
        }]
      },
      options: {
        indexAxis: 'y',
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: function(ctx) {
                if (ctx.dataIndex === 4) {
                  return `Proporção: ${ctx.parsed.x}% (equivalente a 8 em cada 10)`;
                }
                return `Proporção: ${ctx.parsed.x.toFixed(1).replace('.', ',')}%`;
              }
            }
          }
        },
        scales: {
          x: {
            min: 0,
            max: 100,
            grid: { color: PALETA.gridLines },
            ticks: {
              color: PALETA.textMuted,
              callback: function(v) { return v + '%'; }
            }
          },
          y: {
            grid: { display: false },
            ticks: {
              color: PALETA.textLight,
              font: { weight: '600', size: 11 }
            }
          }
        }
      }
    });
  }

  // -------------------------------------------------------------
  // Gráfico 5: Barras Horizontais — Pesquisa DataSenado
  // -------------------------------------------------------------
  const ctxSenado = document.getElementById('chart-datasenado');
  if (ctxSenado && dados.violencia_domestica_datasenado) {
    const ds = dados.violencia_domestica_datasenado;
    new Chart(ctxSenado, {
      type: 'bar',
      data: {
        labels: [
          'Sem renda ou renda insuficiente',
          'Conviviam com o agressor (sem renda)',
          'Buscaram saúde (violência grave)',
          'Negras entre notificações ao SUS (2022)',
          'Negras entre assassinadas (pesquisa)'
        ],
        datasets: [{
          label: 'Percentual (%)',
          data: [
            ds.sem_renda_ou_renda_insuficiente_pct,
            ds.conviviam_com_agressor_entre_sem_renda_pct,
            ds.violencia_grave_que_buscaram_saude_pct,
            ds.negras_entre_notificadas_ao_sus_2022_pct,
            ds.negras_entre_assassinadas_segundo_pesquisa_pct
          ],
          backgroundColor: [
            PALETA.laranja,
            PALETA.vermelho,
            PALETA.verde,
            PALETA.amarelo,
            '#D32F2F'
          ],
          borderRadius: 6,
          barPercentage: 0.65
        }]
      },
      options: {
        indexAxis: 'y',
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: function(ctx) {
                return `Percentual: ${ctx.parsed.x}%`;
              }
            }
          }
        },
        scales: {
          x: {
            min: 0,
            max: 100,
            grid: { color: PALETA.gridLines },
            ticks: {
              color: PALETA.textMuted,
              callback: function(v) { return v + '%'; }
            }
          },
          y: {
            grid: { display: false },
            ticks: {
              color: PALETA.textLight,
              font: { weight: '600', size: 11 }
            }
          }
        }
      }
    });
  }

  // -------------------------------------------------------------
  // Gráfico 6: Barras Horizontais — Violência Sexual 2024
  // -------------------------------------------------------------
  const ctxSex = document.getElementById('chart-violencia-sexual');
  if (ctxSex && dados.violencia_sexual_2024) {
    const vs = dados.violencia_sexual_2024;
    new Chart(ctxSex, {
      type: 'bar',
      data: {
        labels: [
          'Vítimas do sexo feminino',
          'Vítimas negras',
          'Casos dentro de casa',
          'Vítimas vulneráveis'
        ],
        datasets: [{
          label: 'Percentual (%)',
          data: [
            vs.vitimas_sexo_feminino_pct,
            vs.vitimas_negras_pct,
            vs.casos_dentro_de_casa_pct,
            vs.vitimas_vulneraveis_pct
          ],
          backgroundColor: [
            PALETA.amarelo,
            PALETA.laranja,
            PALETA.vermelho,
            '#8D1D1C'
          ],
          borderRadius: 6,
          barPercentage: 0.65
        }]
      },
      options: {
        indexAxis: 'y',
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: function(ctx) {
                return `Proporção: ${ctx.parsed.x.toFixed(1).replace('.', ',')}%`;
              }
            }
          }
        },
        scales: {
          x: {
            min: 0,
            max: 100,
            grid: { color: PALETA.gridLines },
            ticks: {
              color: PALETA.textMuted,
              callback: function(v) { return v + '%'; }
            }
          },
          y: {
            grid: { display: false },
            ticks: {
              color: PALETA.textLight,
              font: { weight: '600', size: 11 }
            }
          }
        }
      }
    });
  }
});
