import { Text } from '@fluentui/react'
import { useEffect } from 'react'
import useTasks from '../hooks/tasks/useTasks'
import useUser from '../hooks/user/useUser'
import { Task } from '../models/Task'
import { useAppDispatch, useAppSelector } from '../redux/hooks'
import { setToken } from '../redux/slices/authSlice'
import { RootState } from '../redux/store'
import { TokenRepository_Cookie } from '../repositories/TokenRepository'
import { NotLoggedIn } from './NotLoggedIn/NotLoggedIn'
import { TaskColumn as StatusColumn } from './TaskColumn/TaskColumn'
import styles from './TaskListApp.module.css'

export const TaskListApp = () => {
    //Redux
    const dispatch = useAppDispatch()
    const { user } = useAppSelector((state: RootState) => state.auth)

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
    const [isUserLoading] = useUser()

    return (
        <>
            <div className={styles.wrapper}>
                <div className={styles.container}>
                    {/* Tasks */}
                    <div className={styles.tasks}>
                        {/* Header */}
                        <div className={styles.header}>
                            {/* Tasks List Name */}
                            {user ? (
                                <Text variant="xLargePlus">My Tasks</Text>
                            ) : null}

                            {/* Tasks List Name */}
                            {!user && !isUserLoading ? (
                                <Text variant="xLargePlus">
                                    You need to login to use this app
                                </Text>
                            ) : null}
                        </div>

                        {user ? (
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

                        {!user && !isUserLoading ? <NotLoggedIn /> : null}
                    </div>
                </div>
            </div>
        </>
    )
}
