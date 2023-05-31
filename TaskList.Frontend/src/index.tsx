import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import './index.css'
import { initializeIcons } from '@fluentui/react/lib/Icons'
import { TaskListApp } from './components/TaskListApp'
import { store } from './redux/store'

//Initialize FluentUI icons
initializeIcons(/* optional base url */)

const element = document.getElementById('root') as HTMLElement
const root = ReactDOM.createRoot(element)

root.render(
    <Provider store={store}>
        <main>
            <TaskListApp />
        </main>
    </Provider>
)
