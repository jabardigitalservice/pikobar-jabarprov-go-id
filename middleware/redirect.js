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
}
