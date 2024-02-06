import { sentryCreateBrowserRouter } from '~/configs/sentry.config.ts'
import About from '~/components/About'
import Home from '~/components/Home'
import Page404 from '~/components/Page404'

const App = () => {
  return sentryCreateBrowserRouter([
    {
      path: '/',
      element: <Home />
    },
    {
      path: '/about',
      element: <About />
    },
    {
      path: '*',
      element: <Page404 />
    }
  ])
}

export default App
