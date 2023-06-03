import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios, { AxiosError } from 'axios'
import { useAppSelector } from '../../redux/hooks'

const useRemoveTask = (id: number) => {
    //Hooks
    const queryClient = useQueryClient()
    const token = useAppSelector((state) => state.auth.token)

    //Mutations
    const { mutateAsync: removeTask, error: removeTaskError } = useMutation(
        ['remove'],
        {
            mutationFn: async () => {
                try {
                    await axios.delete(
                        `http://localhost:24288/api/Tasks/${id}`,
                        {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        }
                    )
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
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ['tasks'] })
            },
        }
    )

    return [removeTask, removeTaskError] as const
}

export default useRemoveTask
