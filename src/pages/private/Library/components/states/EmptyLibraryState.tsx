import styles from './css/EmptyLibraryState.module.css'

export const EmptyLibraryState = () => {
    return (
        <div className={styles.emptyState}>
            <h2>Your Library is Empty</h2>
            <p>Start by adding some games to your collection!</p>
        </div>
    )
}