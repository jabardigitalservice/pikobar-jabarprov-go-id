export default function ({ redirect, route }) {
  // Redirect to /isoman when user access feature request vitamin
  const routeList = [
    {
      path: '/isoman/consultation-request',
      to: '/isoman'
    },
    {
      path: '/vitamin-request',
      to: '/isoman'
    },
    {
      path: '/consultation-request',
      to: '/isoman'
    },
    {
      path: '/tracking',
      to: '/isoman'
    },
    {
      path: '/oxygen',
      to: '/isoman'
    },
    {
      path: '/data',
      to: 'statistic'
    },
    {
      path: '/distribution-case',
      to: 'statistic'
    },
    {
      path: '/distribution-healthcare',
      to: 'healthcare'
    },
    {
      path: '/table-case',
      to: 'table-case'
    }
  ]

  routeList.forEach((el) => {
    if (route.path === el.path) {
      switch (el.to) {
        case 'table-case':
          return redirect(process.env.URL_TABLE_CASE)
        case 'healthcare':
          return redirect(process.env.URL_FASYANKES_TREATMENT)
        case 'statistic':
          return redirect(process.env.URL_STATISTIK)
        case '/isoman':
          return redirect(el.to)
      }
    }
  })
}
