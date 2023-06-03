import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios, { AxiosError } from 'axios'
import { useAppSelector } from '../../redux/hooks'

const useAddTask = (title: string) => {
    //Hooks
    const queryClient = useQueryClient()
    const token = useAppSelector((state) => state.auth.token)

    //Mutations
    const { mutateAsync: addTask } = useMutation(['add'], {
        mutationFn: async () => {
            try {
                await axios.post(
                    `http://localhost:24288/api/Tasks`,
                    {
                        title: title,
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                )

                queryClient.invalidateQueries({ queryKey: ['tasks'] })
            } catch (error) {
                const errors = error as AxiosError

                if (errors?.response?.status === 401) {
                    throw new Error(
                        'You are not authenticated - please refresh the page and try logging in again.'
                    )
                }

                throw new Error('An unknown error has occured')
            }
        },
    })

    return [addTask] as const
}

export default useAddTask
