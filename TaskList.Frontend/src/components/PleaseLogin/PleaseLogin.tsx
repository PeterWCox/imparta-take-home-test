import useUser from '../../hooks/user/useUser'

export const PleaseLogin = () => {
    const [user, isUserLoading] = useUser()
    console.log('user', user)
    console.log('isUserLoading', isUserLoading)

    if (!user) {
        return <img src="./Please_log_in_image.png" />
    }

    return null
}
