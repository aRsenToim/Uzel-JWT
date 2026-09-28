import { createRoot } from 'react-dom/client'
import "./App.scss"
import { BrowserRouter } from 'react-router-dom'
import AppRoutes from './Route/AppRoutes'
import { Provider } from 'react-redux'
import { store } from './AppStore'


createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Provider store={store}>
      <AppRoutes />
    </Provider>
  </BrowserRouter>
)
