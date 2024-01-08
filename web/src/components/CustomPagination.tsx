import React, { useEffect, useState } from 'react';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';

export const EmptyPageButton = () => <span className="px-2 py-1">...</span>

export const PageButton: React.FC<{
  page: number | string,
  isActive: boolean,
  onClick: any
}> = ({ page, isActive, onClick }) => {
  return (
    <PaginationItem className={isActive ? 'active' : ''}>
      <PaginationLink
        onClick={onClick}
      >
        {page}
      </PaginationLink>
    </PaginationItem>
  )
}

const CustomPagination: React.FC<{
  totalResults: number;
  resultsPerPage: number;
  onChange: (x: number) => void;
  label?: string
  activePage: number;
}> = (props) => {
  const { activePage, totalResults, resultsPerPage = 10, onChange: setActivePage } = props
  const [pages, setPages] = useState<(number | string)[]>([])

  const TOTAL_PAGES = Math.ceil(totalResults / resultsPerPage)
  const FIRST_PAGE = 1
  const LAST_PAGE = TOTAL_PAGES
  const MAX_VISIBLE_PAGES = 7

  function handlePreviousClick() {
    setActivePage(activePage - 1)
  }

  function handleNextClick() {
    setActivePage(activePage + 1)
  }

  useEffect(() => {
    // [1], 2, 3, 4, 5, ..., 12 case #1
    // 1, [2], 3, 4, 5, ..., 12
    // 1, 2, [3], 4, 5, ..., 12
    // 1, 2, 3, [4], 5, ..., 12
    // 1, ..., 4, [5], 6, ..., 12 case #2
    // 1, ..., 5, [6], 7, ..., 12
    // 1, ..., 6, [7], 8, ..., 12
    // 1, ..., 7, [8], 9, ..., 12
    // 1, ..., 8, [9], 10, 11, 12 case #3
    // 1, ..., 8, 9, [10], 11, 12
    // 1, ..., 8, 9, 10, [11], 12
    // 1, ..., 8, 9, 10, 11, [12]
    // [1], 2, 3, 4, 5, ..., 8
    // always show first and last
    // max of 7 pages shown (incl. [...])
    if (TOTAL_PAGES <= MAX_VISIBLE_PAGES) {
      setPages(Array.from({ length: TOTAL_PAGES }).map((_, i) => i + 1))
    } else if (activePage < 5) {
      // #1 active page < 5 -> show first 5
      setPages([1, 2, 3, 4, 5, '...', TOTAL_PAGES])
    } else if (activePage >= 5 && activePage < TOTAL_PAGES - 3) {
      // #2 active page >= 5 && < TOTAL_PAGES - 3
      setPages([1, '...', activePage - 1, activePage, activePage + 1, '...', TOTAL_PAGES])
    } else {
      // #3 active page >= TOTAL_PAGES - 3 -> show last
      setPages([
        1,
        '...',
        TOTAL_PAGES - 4,
        TOTAL_PAGES - 3,
        TOTAL_PAGES - 2,
        TOTAL_PAGES - 1,
        TOTAL_PAGES,
      ])
    }
  }, [activePage, TOTAL_PAGES])

  return (
    <Pagination
      className="pagination mb-0"
      listClassName="mb-0"
    >
      <PaginationItem className={activePage === FIRST_PAGE ? "disabled" : ''}>
        <PaginationLink
          onClick={activePage === FIRST_PAGE ? undefined : handlePreviousClick}
          tabIndex={-1}
        >
          <i className="fas fa-angle-left" />
          <span className="sr-only">Previous</span>
        </PaginationLink>
      </PaginationItem>
      {pages.map((p, i) => (
        <li key={p.toString() + i}>
          {p === '...' ? (
            <EmptyPageButton />
          ) : (
            <PageButton
              page={p}
              isActive={p === activePage}
              onClick={() => setActivePage(+p)}
            />
          )}
        </li>
      ))}
      <PaginationItem className={activePage === LAST_PAGE ? 'disabled' : ''}>
        <PaginationLink
          onClick={activePage === LAST_PAGE ? undefined : handleNextClick}
        >
          <i className="fas fa-angle-right" />
          <span className="sr-only">Next</span>
        </PaginationLink>
      </PaginationItem>
    </Pagination>
  )
}

export default CustomPagination
