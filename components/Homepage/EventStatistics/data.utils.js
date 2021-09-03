/* eslint-disable camelcase, quote-props */
/**
 * Transform data shape, in compliance with EventStatistics top grid data shape.
 * @See './data.example.js'
 * @param {Object} jabar - XHR 'response.data' from corresponding jabar data API
 * @param {Object} national - XHR 'response.data' from corresponding national data API
 */
export function transformToTopStatisticsData (jabar, national) {
  const dataJabar = Array.isArray(jabar)
    ? jabar[0]
    : {}
  const dataNational = !!national && typeof national === 'object'
    ? national
    : {}

  return [
    {
      dark: true,
      title: 'Total Terkonfirmasi',
      className: 'evt-stat--blue-gradient',
      default: {
        'Jawa Barat': dataJabar?.confirmation_total,
        'Indonesia': dataNational?.update?.total?.jumlah_positif
      }
    },
    {
      title: 'Dirawat',
      color: '#FFB900',
      default: {
        'Jawa Barat': dataJabar?.confirmation_diisolasi,
        'Indonesia': dataNational?.update?.total?.jumlah_dirawat
      }
    },
    {
      title: 'Sembuh',
      color: '#069550',
      default: {
        'Jawa Barat': dataJabar?.confirmation_selesai,
        'Indonesia': dataNational?.update?.total?.jumlah_sembuh
      }
    },
    {
      title: 'Meninggal',
      color: '#E53935',
      default: {
        'Jawa Barat': dataJabar?.confirmation_meninggal,
        'Indonesia': dataNational?.update?.total?.jumlah_meninggal
      }
    }]
}

/**
 * Transform data shape, in compliance with EventStatistics bottom grid data shape.
 * @See './data.example.js'
 * @param {Object} dataJabar - XHR 'response.data' from corresponding jabar data API
 */
export function transformToBottomStatisticsData (jabar) {
  const dataJabar = Array.isArray(jabar)
    ? jabar[0]
    : {}
  return [
    {
      title: 'Kontak Erat',
      default: {
        'Total Kontak Erat': dataJabar?.closecontact_total
      },
      grid: {
        'Dirawat': dataJabar?.closecontact_dikarantina,
        'Discarded': {
          value: dataJabar?.closecontact_discarded,
          color: '#757575'
        }
      }
    },
    {
      title: 'Suspek',
      default: {
        'Total Suspek': dataJabar?.suspect_total
      },
      grid: {
        'Dirawat': dataJabar?.suspect_diisolasi,
        'Discarded': {
          value: dataJabar?.suspect_discarded,
          color: '#757575'
        }
      }
    },
    {
      title: 'Probabel',
      default: {
        'Total Probabel': dataJabar?.probable_total
      },
      grid: {
        'Dirawat': dataJabar?.probable_diisolasi,
        'Selesai': {
          value: dataJabar?.probable_discarded,
          color: '#757575'
        },
        'Meninggal': {
          value: dataJabar?.probable_meninggal,
          color: '#E53935'
        }
      }
    }
  ]
}

/* eslint-enable quote-props, camelcase */
