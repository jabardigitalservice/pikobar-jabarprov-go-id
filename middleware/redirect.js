export default function ({ redirect, route }) {
  // Redirect to /isoman when user access feature request vitamin
  if (route.path === '/isoman/consultation-request') {
    return redirect('/isoman')
  }

  if (route.path === '/vitamin-request') {
    return redirect('/isoman')
  }

  if (route.path === '/consultation-request') {
    return redirect('/isoman')
  }

  if (route.path === '/tracking') {
    return redirect('/isoman')
  }

  if (route.path === '/oxygen') {
    return redirect('/isoman')
  }

  if (route.path === '/data') {
    return redirect(process.env.URL_STATISTIK)
  }

  if (route.path === '/distribution-case') {
    return redirect(process.env.URL_STATISTIK)
  }

  if (route.path === '/distribution-healthcare') {
    return redirect(process.env.URL_FASYANKES_TREATMENT)
  }

  if (route.path === '/table-case') {
    return redirect(process.env.URL_TABLE_CASE)
  }
}
