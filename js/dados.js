/**
 * Dados oficiais sobre mulheres negras, violência e desigualdade
 * Fonte única: dados.json (Ipea, FBSP, DataSenado)
 * E.E. Carlos Chagas - Lassance/MG - Projeto Consciência Negra
 */

const DADOS_SITE_FALLBACK = {
  "titulo": "Dados sobre mulheres negras, violência e desigualdade",
  "abrangencia": "Brasil | Indicadores nacionais",
  "nota_de_leitura": "\"Mulheres negras\" corresponde à soma de mulheres pretas e pardas nas estatísticas que utilizam a classificação racial do IBGE. Homicídio e feminicídio são indicadores diferentes; não comparar percentuais de bases distintas como se tivessem o mesmo denominador.",
  "homicidios_2024": {
    "mulheres_negras_vitimas": 2457,
    "proporcao_entre_vitimas_mulheres_pct": 67.5,
    "taxa_negras_por_100mil": 4.0,
    "taxa_nao_negras_por_100mil": 2.4,
    "diferenca_taxas": 1.6,
    "taxa_negras_maior_que_nao_negras_pct": 66.7,
    "variacao_2023_2024_pct": -9.1,
    "variacao_2014_2024_pct": -28.6
  },
  "serie_historica_nacional": {
    "unidade": "taxa de homicídios por 100 mil mulheres",
    "anos": [2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024],
    "mulheres_negras": [5.6, 5.3, 5.3, 5.7, 5.3, 4.2, 4.4, 4.4, 4.2, 4.4, 4.0],
    "mulheres_nao_negras": [3.3, 3.2, 3.1, 3.3, 2.9, 2.6, 2.5, 2.5, 2.6, 2.5, 2.4]
  },
  "feminicidio_2024": {
    "vitimas": 1492,
    "vitimas_negras_pct": 63.6,
    "idade_18_44_pct": 70.5,
    "mortas_por_companheiro_ou_ex": "8 em cada 10",
    "mortas_por_companheiro_ou_ex_pct_aprox": 80,
    "mortas_em_casa_pct": 64.3,
    "assassinadas_por_homens_pct": 97
  },
  "violencia_domestica_datasenado": {
    "participantes": 13977,
    "perfil_participantes": "mulheres negras com 16 anos ou mais",
    "sem_renda_ou_renda_insuficiente_pct": 66,
    "conviviam_com_agressor_entre_sem_renda_pct": 85,
    "violencia_grave_que_buscaram_saude_pct": 30,
    "negras_entre_notificadas_ao_sus_2022_pct": 55,
    "negras_entre_assassinadas_segundo_pesquisa_pct": 67
  },
  "violencia_sexual_2024": {
    "vitimas_registradas": 87545,
    "vitimas_sexo_feminino_pct": 87.7,
    "vitimas_negras_pct": 55.6,
    "casos_dentro_de_casa_pct": 65.7,
    "vitimas_vulneraveis_pct": 76.8
  },
  "minas_gerais": {
    "unidade": "taxa de homicídios por 100 mil mulheres negras",
    "anos": [2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024],
    "taxa": [4.5, 4.6, 4.0, 4.2, 3.8, 3.2, 2.6, 2.6, 2.7, 3.2, 2.8]
  },
  "fontes": [
    {
      "nome": "Atlas da Violência 2026 — Ipea e Fórum Brasileiro de Segurança Pública",
      "uso": "Homicídios, taxas por raça/cor e série histórica (2014–2024)",
      "url": "https://www.ipea.gov.br/portal/"
    },
    {
      "nome": "Anuário Brasileiro de Segurança Pública 2025 — Fórum Brasileiro de Segurança Pública",
      "uso": "Feminicídio e violência sexual registrados em 2024",
      "url": "https://forumseguranca.org.br/"
    },
    {
      "nome": "DataSenado (2024) — Pesquisa sobre violência doméstica contra mulheres negras",
      "uso": "Violência doméstica contra mulheres negras",
      "url": "https://www12.senado.leg.br/institucional/datasenado/publicacaodatasenado?id=pesquisa-datasenado-detalha-a-violencia-domestica-contra-mulheres-negras-desigualdades-e-desafios"
    }
  ]
};

// Exporta globalmente para compatibilidade direta
window.DADOS_SITE = DADOS_SITE_FALLBACK;

/**
 * Função utilitária para obter os dados atualizados (via fetch dados.json ou fallback)
 */
async function obterDadosSite() {
  try {
    const res = await fetch('dados.json');
    if (res.ok) {
      const json = await res.json();
      window.DADOS_SITE = json;
      return json;
    }
  } catch (e) {
    console.warn('Carregamento via fetch dados.json ignorado (usando fallback seguro do dados.js):', e);
  }
  return window.DADOS_SITE;
}
