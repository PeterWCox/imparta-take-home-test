import { useEffect } from 'react'
import useTasks from '../hooks/tasks/useTasks'
import { Task } from '../models/Task'
import { useAppDispatch, useAppSelector } from '../redux/hooks'
import { setToken } from '../redux/slices/authSlice'
import { TokenRepository_Cookie } from '../repositories/TokenRepository'
import { PleaseLogin } from './PleaseLogin/PleaseLogin'
import { TaskColumn as StatusColumn } from './TaskColumn/TaskColumn'
import styles from './TaskListApp.module.css'

export const TaskListApp = () => {
    //Redux
    const dispatch = useAppDispatch()
    const { selectedTaskList } = useAppSelector((state) => state.taskList)

    //Effects
    useEffect(() => {
        //On init - Try and get cached token
        const tokenDetails = new TokenRepository_Cookie().getToken()
        if (!tokenDetails) {
            return
        }

        dispatch(setToken(tokenDetails))
    }, [])

    //Queries
    const [tasks] = useTasks()

    return (
        <>
            <div className={styles.wrapper}>
                <div className={styles.container}>
                    {/* Tasks */}
                    <div className={styles.tasks}>
                        {/* Header */}
                        <div className={styles.header}></div>

                        <PleaseLogin />

                        {selectedTaskList ? (
                            <div className={styles.statusLists}>
                                <StatusColumn
                                    status={0}
                                    tasks={
                                        tasks?.filter(
                                            (t: Task) => t.status === 0
                                        ) ?? []
                                    }
                                    title={'Pending'}
                                />
                                <StatusColumn
                                    status={1}
                                    tasks={
                                        tasks?.filter(
                                            (t: Task) => t.status === 1
                                        ) ?? []
                                    }
                                    title={'In Progress'}
                                />
                                <StatusColumn
                                    status={2}
                                    tasks={
                                        tasks?.filter(
                                            (t: Task) => t.status === 2
                                        ) ?? []
                                    }
                                    title={'Completed'}
                                />
                            </div>
                        ) : null}
                    </div>
                </div>
            </div>
        </>
    )
}
