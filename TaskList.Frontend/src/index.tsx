import { initializeIcons } from '@fluentui/react/lib/Icons'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { QueryParamProvider } from 'use-query-params'
import { ReactRouter6Adapter } from 'use-query-params/adapters/react-router-6'
import { TaskListApp } from './components/TaskListApp'
import './index.css'
import { store } from './redux/store'

//Initialize FluentUI icons
initializeIcons()

const element = document.getElementById('root') as HTMLElement
const root = ReactDOM.createRoot(element)
const queryClient = new QueryClient()

root.render(
    <Provider store={store}>
        <BrowserRouter>
            <QueryParamProvider adapter={ReactRouter6Adapter}>
                <QueryClientProvider client={queryClient}>
                    <Routes>
                        <Route
                            path="/"
                            element={
                                <main>
                                    <TaskListApp />
                                </main>
                            }
                        />
                    </Routes>
                </QueryClientProvider>
            </QueryParamProvider>
        </BrowserRouter>
    </Provider>
)
