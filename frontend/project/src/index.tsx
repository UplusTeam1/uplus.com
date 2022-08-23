// React
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { BrowserRouter } from 'react-router-dom'
// Redux
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import rootReducer, { rootSaga } from './modules'
import { composeWithDevTools } from 'redux-devtools-extension'
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'
// React-Query
import { QueryClient, QueryClientProvider } from 'react-query'
// Styles & Theme
import './index.scss'
import { theme } from './theme'
import {
  StyledEngineProvider,
  ThemeProvider as MuiThemeProvider,
} from '@mui/material/styles'
import { ThemeProvider as StyledThemeProvider } from 'styled-components'

// Redux & Redux-Saga
const sagaMiddleware = createSagaMiddleware()

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(sagaMiddleware))
)
const persistor = persistStore(store)

sagaMiddleware.run(rootSaga)

// React-Query
const queryClient = new QueryClient()

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <QueryClientProvider client={queryClient}>
            <StyledEngineProvider injectFirst>
              <StyledThemeProvider theme={theme}>
                <MuiThemeProvider theme={theme}>
                  <App />
                </MuiThemeProvider>
              </StyledThemeProvider>
            </StyledEngineProvider>
          </QueryClientProvider>
        </PersistGate>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
