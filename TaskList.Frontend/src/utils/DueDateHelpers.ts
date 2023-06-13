import * as dayjs from 'dayjs'

export interface DueDateButtonProps {
    color: string
    text: string
}

export class DueDateHelpers {
    public static RED = '#de383b'
    public static BLUE = 'rgb(0, 120, 212)'
    public static GRAY = 'rgb(50, 49, 48)'

    public static getDueDateButtonProps(
        dueDate: Date | null | undefined,
        now: Date = new Date()
    ): DueDateButtonProps {
        //If no due date
        if (!dueDate) {
            return {
                color: DueDateHelpers.GRAY,
                text: 'Add due date',
            }
        }

        const daysBeforeToday = dayjs(now).diff(dueDate, 'day')
        console.log(daysBeforeToday)

        if (daysBeforeToday > 2) {
            return {
                color: DueDateHelpers.RED,
                text: `Due ${dayjs(dueDate).format('ddd D MMM')}`,
            }
        }

        if (daysBeforeToday == 1) {
            return {
                color: DueDateHelpers.RED,
                text: `Due yesterday`,
            }
        }

        if (daysBeforeToday === 0) {
            return {
                color: DueDateHelpers.BLUE,
                text: 'Due today',
            }
        }
        if (daysBeforeToday === -1) {
            return {
                color: DueDateHelpers.BLUE,
                text: 'Due tomorrow',
            }
        }

        return {
            color: DueDateHelpers.BLUE,
            //Use DayJS to give date in form of 'Due Mon 19 Jun'
            text: `Due ${dayjs(dueDate).format('ddd D MMM')}`,
        }
    }
}
