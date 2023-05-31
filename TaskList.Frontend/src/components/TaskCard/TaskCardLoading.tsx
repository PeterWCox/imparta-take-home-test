import { Shimmer, ShimmerElementType } from '@fluentui/react'

const shimmerWithElementFirstRow = [{ type: ShimmerElementType.line }]

export const TaskCardLoading = () => {
    return <Shimmer height={90} shimmerElements={shimmerWithElementFirstRow} />
}
