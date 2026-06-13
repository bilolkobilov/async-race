import styles from './Pagination.module.css';

interface PaginationProps {
  currentPage: number;
  totalCount: number;
  perPage: number;
  onPage: (page: number) => void;
}

const Pagination = ({ currentPage, totalCount, perPage, onPage }: PaginationProps) => {
  const totalPages = Math.max(1, Math.ceil(totalCount / perPage));

  return (
    <div className={styles.pagination}>
      <button
        className={styles.btn}
        onClick={() => onPage(currentPage - 1)}
        disabled={currentPage <= 1}
        type="button"
      >
        ← Prev
      </button>
      <span className={styles.info}>
        Page {currentPage} / {totalPages}
      </span>
      <button
        className={styles.btn}
        onClick={() => onPage(currentPage + 1)}
        disabled={currentPage >= totalPages}
        type="button"
      >
        Next →
      </button>
    </div>
  );
};

export default Pagination;
