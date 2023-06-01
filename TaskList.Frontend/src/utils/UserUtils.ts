export class UserUtils {
    public static getInitials = (name: string): string => {
        let initials = name.match(/\b\w/g) || []
        return ((initials.shift() || '') + (initials.pop() || '')).toUpperCase()
    }
}
