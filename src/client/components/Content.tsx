import styles from "./Content.module.css";
import { useRouter } from "next/router";
import classNames from "classnames/bind";
import { useQuery } from "react-query";
import { useEffect, useState } from "react";
import { toDoItemsCountQuery, toDoItemsQuery } from "../queries/ToDo";
import { Importance } from "@prisma/client";
import ToDoItem from "./ToDoItem";
import useQueryString from "../utils/hooks/useQueryStringHandler";
import { IoIosAdd } from "react-icons/io";
import Modal from "./common/Modal";
import CreateToDo from "./CreateToDo";
import PagiNation from "./common/Pagination";

const cx = classNames.bind(styles);

const completionTabItems = [
  { label: "All", value: null },
  { label: "Done", value: true },
  { label: "Remain", value: false },
];

const PAGE_SIZE = 5;

const importanceTabItems = [
  { label: "All", value: null },
  ...Object.values(Importance).map((importance) => ({
    label: importance
      .toLowerCase()
      .replace(/^[a-z]/, (char) => char.toUpperCase()),
    value: importance,
  })),
];

export default function Content() {
  const { query, isReady } = useRouter();
  const [createToDoModalOpen, setCreateToDoModalOpen] = useState(false);
  const isDone =
    query?.isDone === "true" ? true : query?.isDone === "false" ? false : null;
  const importance =
    !query?.importance ||
    Object.values(Importance).find(
      (importance) => importance === query?.importance
    ) === undefined
      ? null
      : (query?.importance as Importance);
  const page = query?.page ? parseInt(query?.page as string) : 1;

  const variables = {
    isDone: isDone,
    importance: importance,
    skip: (page - 1) * PAGE_SIZE,
    take: PAGE_SIZE,
  };

  const { queryStringHandler } = useQueryString();

  const { data, isLoading, isSuccess } = useQuery(
    ["ToDoItems", variables],
    () => toDoItemsQuery(variables),
    { retry: 2, enabled: isReady }
  );
  const maxPage = data?.ToDoItemsQuery?._count
    ? Math.ceil(data.ToDoItemsQuery._count / PAGE_SIZE)
    : 1;
  const {
    data: countData,
    isLoading: countIsLoading,
    isSuccess: counstIsSuccess,
  } = useQuery(["ToDoItemsCount"], () => toDoItemsCountQuery(), {
    retry: 2,
    enabled: isReady,
  });

  function setPage(newPage: number) {
    queryStringHandler([{ keyName: "page", value: newPage.toString() }]);
  }

  return (
    <div className={cx("content")}>
      <header className={cx("header")}>
        <div className={cx("main-info")}>
          <div className={cx("title-area")}>
            <h1 className={cx("title")}>To Do List 🗒</h1>
            <div
              className={
                !countIsLoading && counstIsSuccess
                  ? cx("summary")
                  : cx("summary", "loading")
              }
            >
              {!countIsLoading && counstIsSuccess ? (
                `${countData?.ToDoItemsCountQuery?.done} of ${countData?.ToDoItemsCountQuery?.total} done`
              ) : (
                <>
                  {"Loading..".split("").map((char, i) => {
                    return (
                      <span key={i} style={{ animationDelay: `${i * 0.1}s` }}>
                        {char}
                      </span>
                    );
                  })}
                </>
              )}
            </div>
          </div>
          <button
            className={cx("add-to-do-btn")}
            onClick={() => {
              setCreateToDoModalOpen(true);
            }}
          >
            <IoIosAdd className={cx("icon")} />
          </button>
        </div>

        <div className={cx("completion-tap")}>
          {completionTabItems.map((item, i) => {
            return (
              <button
                key={i}
                className={
                  item.value === isDone
                    ? cx("completion-tap-item", "selected")
                    : cx("completion-tap-item")
                }
                onClick={() => {
                  queryStringHandler([
                    { keyName: "isDone", value: item.value?.toString() },
                    { keyName: "page", value: "1" },
                  ]);
                }}
              >
                {item.label}
              </button>
            );
          })}
        </div>
        <div className={cx("importance-tap")}>
          {importanceTabItems.map((item, i) => {
            return (
              <button
                key={i}
                className={
                  item.value?.toString() === importance
                    ? cx("importance-tap-item", "selected")
                    : cx("importance-tap-item")
                }
                onClick={() => {
                  queryStringHandler([
                    { keyName: "importance", value: item.value?.toString() },
                    { keyName: "page", value: "1" },
                  ]);
                }}
              >
                {item.label}
              </button>
            );
          })}
          <button
            className={cx("handler")}
            style={{
              left: `calc((100% - 10px) / 4 * ${importanceTabItems.findIndex(
                (e) => e.value === importance
              )} + 5px)`,
            }}
          />
        </div>
      </header>
      <div className={cx("main-content")}>
        <div className={cx("to-do-item-list")}>
          {!isLoading && isSuccess
            ? data.ToDoItemsQuery.items.map((item, i) => {
                return <ToDoItem key={i} {...{ item }} />;
              })
            : Array.from({ length: 10 }).map((_, i) => {
                return <ToDoItem key={i} {...{ item: null }} />;
              })}
        </div>
        <PagiNation {...{ page, maxPage, setPage }} />
      </div>

      {createToDoModalOpen && (
        <Modal
          onClose={() => {
            setCreateToDoModalOpen(false);
          }}
        >
          <CreateToDo
            onClose={() => {
              setCreateToDoModalOpen(false);
            }}
          />
        </Modal>
      )}
    </div>
  );
}
