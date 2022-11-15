import styles from "./Content.module.css";
import classNames from "classnames/bind";
import { useQuery } from "react-query";
import { useEffect } from "react";
import { toDoItemsCountQuery, toDoItemsQuery } from "../queries/ToDo";
import ToDoItem from "./ToDoItem";

const cx = classNames.bind(styles);

export default function Content() {
  const variables = {
    isDone: null,
    importance: null,
    skip: 0,
    take: 4,
  };
  const { data, isLoading, isSuccess } = useQuery(
    ["ToDoItems", variables],
    () => toDoItemsQuery(variables)
  );
  const {
    data: countData,
    isLoading: countIsLoading,
    isSuccess: counstIsSuccess,
  } = useQuery(["ToDoItemsCount"], () => toDoItemsCountQuery());

  return (
    <div className={cx("content")}>
      <header className={cx("header")}>
        <h1 className={cx("title")}>To Do List 🗒</h1>
        <div className={cx("summary")}>
          {!countIsLoading &&
            counstIsSuccess &&
            `${countData?.ToDoItemsCountQuery?.done} of ${countData?.ToDoItemsCountQuery?.total} done`}
        </div>
      </header>
      <div className={cx("to-do-item-list")}>
        {!isLoading &&
          isSuccess &&
          data.ToDoItemsQuery.map((item, i) => {
            return <ToDoItem key={i} {...{ item }} />;
          })}
      </div>
    </div>
  );
}
