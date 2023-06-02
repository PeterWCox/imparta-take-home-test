import { initializeIcons } from '@fluentui/react/lib/Icons'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
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
        <QueryClientProvider client={queryClient}>
            <main>
                <TaskListApp />
            </main>
        </QueryClientProvider>
    </Provider>
)
