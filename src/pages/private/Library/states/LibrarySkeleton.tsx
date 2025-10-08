import styles from './css/LibrarySkeleton.module.css'

export const LibrarySkeleton = () => {
  return (
    <div className={styles.skeleton}>
      <div className={styles.skeletonHeader} />
      <div className={styles.skeletonContent}>
        <div className={styles.skeletonAside} />
        <div className={styles.skeletonGrid}>
          {[...Array(8)].map((_, i) => (
            <div key={i} className={styles.skeletonCard} />
          ))}
        </div>
      </div>
    </div>
  );
};
