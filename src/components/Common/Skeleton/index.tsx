import styles from './styles.module.css';

interface SkeletonProps {
  variant?: 'list' | 'single';
  count?: number;
}

export default function Skeleton({ variant = 'list', count = 3 }: SkeletonProps) {
  if (variant === 'single') {
    return (
      <div className={styles.skeleton}>
        <div className={styles.header}></div>
        <div className={styles.content}>
          <div className={styles.line}></div>
          <div className={styles.line}></div>
          <div className={styles.line}></div>
          <div className={styles.line}></div>
          <div className={styles.line}></div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.skeleton}>
      <div className={styles.header}></div>
      <div className={styles.grid}>
        {Array.from({ length: count }).map((_, index) => (
          <div key={index} className={styles.card}>
            <div className={styles.image}></div>
            <div className={styles.content}>
              <div className={styles.title}></div>
              <div className={styles.meta}></div>
              <div className={styles.line}></div>
              <div className={styles.line}></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 