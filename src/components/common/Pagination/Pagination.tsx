import { FC, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import { MdChevronLeft, MdChevronRight, MdOutlineMoreHoriz } from 'react-icons/md';
import styles from './Pagination.module.scss';

interface PaginationProps {
  total: number;
  count: number;
}

const Pagination: FC<PaginationProps> = ({ total, count }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = useMemo(() => Number(searchParams.get('page')) || 1, [searchParams]);

  const pageCount = useMemo(() => Math.ceil(total / count), [total, count]);

  const onPageChange = (e: { selected: number }) => {
    const page = e.selected + 1;
    setSearchParams((prev) => {
      const params = new URLSearchParams({
        ...Object.fromEntries(prev.entries()),
        page: page.toString(),
      });
      if (page === 1) params.delete('page');
      return params;
    });
  };

  return (
    <ReactPaginate
      className={styles.pagination}
      pageClassName={styles.page}
      nextClassName={styles.next}
      previousClassName={styles.prev}
      activeClassName={styles.active}
      disabledClassName={styles.disabled}
      breakLabel={<MdOutlineMoreHoriz />}
      nextLabel={<MdChevronRight />}
      previousLabel={<MdChevronLeft />}
      initialPage={page - 1}
      pageCount={pageCount}
      renderOnZeroPageCount={() => null}
      onPageChange={onPageChange}
    />
  );
};

export default Pagination;
