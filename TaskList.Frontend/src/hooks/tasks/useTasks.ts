import { useQuery } from '@tanstack/react-query'
import axios, { AxiosError } from 'axios'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { RootState } from '../../redux/store'

const useTasks = () => {
    const { token } = useAppSelector((state: RootState) => state.auth)
    const dispatch = useAppDispatch()

    const { data: tasks } = useQuery({
        queryKey: ['tasks'],
        queryFn: async () => {
            try {
                const response = await axios.get(
                    `http://localhost:24288/api/Tasks`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                )

                return response.data
            } catch (error) {
                const errors = error as AxiosError
                console.log(errors)

                if (errors?.response?.status === 401) {
                    throw new Error('Invalid username or password')
                }

                throw new Error('An unknown error has occured')
            }
        },
        enabled: !!token,
    })

    return [tasks] as const
}

export default useTasks
