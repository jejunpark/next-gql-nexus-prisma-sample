import { Dispatch, SetStateAction } from "react";

import classNames from "classnames/bind";
import styles from "./Pagination.module.css";
const cx = classNames.bind(styles);

interface Props {
  page: number;
  setPage: Dispatch<SetStateAction<number>> | ((page: number) => void);
  maxPage: number;
}

interface ItemProps {
  value: number;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
}

const MAX_NAVIGATOR_NUMBER = 5;

function PaginationItem({ value, page, setPage }: ItemProps) {
  return (
    <li onClick={() => setPage(value)}>
      <button
        className={
          page === value
            ? cx("page-nation-item", "active")
            : cx("page-nation-item")
        }
      >
        {value}
      </button>
    </li>
  );
}

export default function PagiNation({
  page,
  setPage,
  maxPage,
}: Props): JSX.Element {
  const pageList = Array.from({ length: maxPage }, (value, idx) => idx + 1);

  return (
    <div className={cx("page-nation")}>
      <ul className={cx("page-nation-list")}>
        {pageList?.length > 0 &&
          pageList.map((value, idx) => {
            if (page - 1 <= Math.floor((MAX_NAVIGATOR_NUMBER - 1) / 2)) {
              if (value <= page) {
                return (
                  <PaginationItem key={idx} {...{ value, page, setPage }} />
                );
              } else {
                if (maxPage - page <= (MAX_NAVIGATOR_NUMBER - 1) / 2) {
                  return (
                    <PaginationItem key={idx} {...{ value, page, setPage }} />
                  );
                } else {
                  if (value <= MAX_NAVIGATOR_NUMBER) {
                    return (
                      <PaginationItem key={idx} {...{ value, page, setPage }} />
                    );
                  }
                }
              }
            } else {
              if (value <= page) {
                if (
                  maxPage - page <=
                  Math.ceil((MAX_NAVIGATOR_NUMBER - 1) / 2)
                ) {
                  if (maxPage - MAX_NAVIGATOR_NUMBER + 1 <= value) {
                    return (
                      <PaginationItem key={idx} {...{ value, page, setPage }} />
                    );
                  }
                } else {
                  if (
                    page - Math.floor((MAX_NAVIGATOR_NUMBER - 1) / 2) <=
                    value
                  ) {
                    return (
                      <PaginationItem key={idx} {...{ value, page, setPage }} />
                    );
                  }
                }
              } else {
                if (
                  maxPage - page <=
                  Math.ceil((MAX_NAVIGATOR_NUMBER - 1) / 2)
                ) {
                  return (
                    <PaginationItem key={idx} {...{ value, page, setPage }} />
                  );
                } else {
                  if (
                    value <=
                    page + Math.ceil((MAX_NAVIGATOR_NUMBER - 1) / 2)
                  ) {
                    return (
                      <PaginationItem key={idx} {...{ value, page, setPage }} />
                    );
                  }
                }
              }
            }
          })}
      </ul>
    </div>
  );
}
