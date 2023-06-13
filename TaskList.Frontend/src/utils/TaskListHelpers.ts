export class TaskListHelpers {
    public static isValidUrl = (url: string) => {
        try {
            new URL(url)
            return true
        } catch (error) {
            return false
        }
    }
}
