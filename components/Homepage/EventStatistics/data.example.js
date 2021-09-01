/* eslint-disable quote-props */
export const topStats = [
  {
    dark: true,
    title: 'Total Terkonfirmasi',
    className: 'evt-stat--blue-gradient',
    default: {
      'Jawa Barat': 175950,
      'Indonesia': 1223930
    }
  },
  {
    title: 'Dirawat',
    color: '#FFB900',
    default: {
      'Jawa Barat': 25016,
      'Indonesia': 158498
    }
  },
  {
    title: 'Sembuh',
    color: '#069550',
    default: {
      'Jawa Barat': 148816,
      'Indonesia': 1032065
    }
  },
  {
    title: 'Meninggal',
    color: '#E53935',
    default: {
      'Jawa Barat': 2118,
      'Indonesia': 33367
    }
  }
]
export const bottomStats = [
  {
    title: 'Kontak Erat',
    default: {
      'Total Kontak Erat': 256430
    },
    grid: {
      'Dirawat': 22587,
      'Discarded': {
        value: 233843,
        color: '#757575'
      }
    }
  },
  {
    title: 'Suspek',
    default: {
      'Total Suspek': 128900
    },
    grid: {
      'Dirawat': 6213,
      'Discarded': {
        value: 122687,
        color: '#757575'
      }
    }
  },
  {
    title: 'Probabel',
    default: {
      'Total Probabel': 3163
    },
    grid: {
      'Dirawat': 162,
      'Selesai': {
        value: 1693,
        color: '#757575'
      },
      'Meninggal': {
        value: 1308,
        color: '#E53935'
      }
    }
  }
]
/* eslint-enable quote-props */
