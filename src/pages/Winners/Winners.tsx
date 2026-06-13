import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store';
import { fetchWinners, setWinnersPage, setSortField } from '../../store/winnersSlice';
import { SortField } from '../../types';
import CarSvg from '../../components/CarSvg/CarSvg';
import Pagination from '../../components/Pagination/Pagination';
import styles from './Winners.module.css';

const WINNERS_PER_PAGE = 10;

const Winners = () => {
  const dispatch = useAppDispatch();
  const { winners, totalCount, currentPage, sortField, sortOrder, loading } = useAppSelector(
    (s) => s.winners,
  );

  useEffect(() => {
    dispatch(fetchWinners({ page: currentPage, sort: sortField, order: sortOrder }));
  }, [dispatch, currentPage, sortField, sortOrder]);

  const handleSort = (field: SortField) => dispatch(setSortField(field));

  const handlePage = (page: number) => dispatch(setWinnersPage(page));

  const sortIcon = (field: SortField) => {
    if (sortField !== field) return null;
    return <span className={styles.sortIcon}>{sortOrder === 'ASC' ? '↑' : '↓'}</span>;
  };

  return (
    <div className={styles.winners}>
      <h1 className={styles.title}>Winners ({totalCount})</h1>

      {loading && <p className={styles.loading}>Loading...</p>}

      {!loading && winners.length === 0 && (
        <div className={styles.empty}>
          <span className={styles.emptyIcon}>🏆</span>
          <p>No winners yet. Start a race!</p>
        </div>
      )}

      {winners.length > 0 && (
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th className={styles.th}>№</th>
                <th className={styles.th}>Car</th>
                <th className={styles.th}>Name</th>
                <th
                  className={`${styles.th} ${styles.sortable}`}
                  onClick={() => handleSort('wins')}
                >
                  Wins {sortIcon('wins')}
                </th>
                <th
                  className={`${styles.th} ${styles.sortable}`}
                  onClick={() => handleSort('time')}
                >
                  Best Time (s) {sortIcon('time')}
                </th>
              </tr>
            </thead>
            <tbody>
              {winners.map((w, i) => (
                <tr key={w.id} className={styles.tr}>
                  <td className={styles.td}>{(currentPage - 1) * WINNERS_PER_PAGE + i + 1}</td>
                  <td className={styles.td}>
                    <CarSvg color={w.color} width={60} />
                  </td>
                  <td className={styles.td}>{w.name}</td>
                  <td className={styles.td}>{w.wins}</td>
                  <td className={styles.td}>{(w.time / 1000).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Pagination
        currentPage={currentPage}
        totalCount={totalCount}
        perPage={WINNERS_PER_PAGE}
        onPage={handlePage}
      />
    </div>
  );
};

export default Winners;
