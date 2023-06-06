export class Constants {
    public static ApiUrl = (endpoint: string) => {
        const baseUrl = import.meta.env['VITE_API_BASE_URL']

        if (import.meta.env.DEV) {
            return `${baseUrl}/${endpoint}`
        }
        return `https://PROD/api/${endpoint}`
    }
}
