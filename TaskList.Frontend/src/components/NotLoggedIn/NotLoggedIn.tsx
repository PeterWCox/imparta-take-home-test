import { Text } from '@fluentui/react'
import styles from './NotLoggedIn.module.css'

export const NotLoggedIn = () => {
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                margin: '0 auto',
                alignItems: 'center',
            }}
        >
            <Text variant="superLarge" block>
                You must be logged in to view this page
            </Text>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="800px"
                height="800px"
                viewBox="0 0 2050 2050"
            >
                <title />

                <g data-name="Layer 1" id="Layer_1">
                    <rect
                        className={styles.cls1}
                        height="2040"
                        width="2040"
                        x="5"
                        y="5"
                    />
                </g>

                <g data-name="Layer 3" id="Layer_3">
                    <circle
                        className={styles.cls2}
                        cx="1025"
                        cy="1025"
                        r="613.7"
                    />

                    <path
                        className={styles.cls3}
                        d="M1068.5,1551.8c-339,0-613.7-274.8-613.7-613.7a613.5,613.5,0,0,1,44.4-229.8A610.7,610.7,0,0,0,411.3,1025c0,338.9,274.8,613.7,613.7,613.7,257.7,0,478.3-158.8,569.2-383.9C1486.8,1432.8,1291.5,1551.8,1068.5,1551.8Z"
                    />

                    <path
                        className={styles.cls4}
                        d="M1025,411.3A610.4,610.4,0,0,0,659.9,531.7a706.9,706.9,0,0,1,453.2-18.9,27.8,27.8,0,0,0-3.3,5.1c-18.2,33.9,18.9,89.1,82.7,123.3s130.4,34.6,148.6.8a38.6,38.6,0,0,0,3.7-10.5c165.2,128,271.9,328.1,272.9,553.1a613.3,613.3,0,0,0,21-159.6C1638.7,686.1,1363.9,411.3,1025,411.3Z"
                    />

                    <ellipse
                        className={styles.cls4}
                        cx="1339.4"
                        cy="698.8"
                        rx="30.8"
                        ry="52.8"
                        transform="translate(396.9 1879.5) rotate(-79)"
                    />

                    <ellipse
                        className={styles.cls4}
                        cx="1235.1"
                        cy="718.7"
                        rx="17.2"
                        ry="25"
                        transform="translate(-4.9 1429) rotate(-60)"
                    />

                    <ellipse
                        className={styles.cls5}
                        cx="773.9"
                        cy="896.3"
                        rx="94.9"
                        ry="60.2"
                        transform="translate(-155.1 1630.7) rotate(-87.5)"
                    />

                    <circle
                        className={styles.cls1}
                        cx="803.6"
                        cy="857.7"
                        r="16.6"
                    />

                    <ellipse
                        className={styles.cls5}
                        cx="1276.1"
                        cy="896.3"
                        rx="60.2"
                        ry="94.9"
                        transform="translate(-37.7 56.1) rotate(-2.5)"
                    />

                    <circle
                        className={styles.cls1}
                        cx="1296.4"
                        cy="857.7"
                        r="16.6"
                    />

                    <path
                        className={styles.cls5}
                        d="M855.6,1175a70.8,70.8,0,1,0,0,141.6h338.8a70.8,70.8,0,1,0,0-141.6Z"
                    />
                </g>
            </svg>
        </div>
    )
}
