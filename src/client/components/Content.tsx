import styles from "./Content.module.css";
import { useRouter } from "next/router";
import classNames from "classnames/bind";
import { useQuery } from "react-query";
import { useEffect, useState } from "react";
import { toDoItemsCountQuery, toDoItemsQuery } from "../queries/ToDo";
import { Importance } from "@prisma/client";
import ToDoItem from "./ToDoItem";
import useQueryString from "../utils/hooks/useQueryStringHandler";

const cx = classNames.bind(styles);

const completionTabItems = [
  { label: "All", value: "" },
  { label: "Done", value: true },
  { label: "Remain", value: false },
];

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
  const isDone =
    query?.isDone === "true" ? true : query?.isDone === "false" ? false : null;
  const importance =
    !query?.importance ||
    Object.values(Importance).find(
      (importance) => importance === query?.importance
    ) === undefined
      ? null
      : (query?.importance as Importance);

  const variables = {
    isDone: isDone,
    importance: importance,
    skip: null,
    take: null,
  };

  const { queryStringHandler } = useQueryString();

  const { data, isLoading, isSuccess } = useQuery(
    ["ToDoItems", variables],
    () => toDoItemsQuery(variables),
    { retry: 2, enabled: isReady }
  );
  const {
    data: countData,
    isLoading: countIsLoading,
    isSuccess: counstIsSuccess,
  } = useQuery(["ToDoItemsCount"], () => toDoItemsCountQuery(), {
    retry: 2,
    enabled: isReady,
  });

  return (
    <div className={cx("content")}>
      <header className={cx("header")}>
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
        <div className={cx("completion-tap")}>
          {completionTabItems.map((item, i) => {
            return (
              <button
                key={i}
                className={
                  item.value.toString() === query?.isDone
                    ? cx("completion-tap-item", "selected")
                    : cx("completion-tap-item")
                }
                onClick={() => {
                  queryStringHandler([
                    { keyName: "isDone", value: item.value.toString() },
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
      <div className={cx("to-do-item-list")}>
        {!isLoading && isSuccess
          ? data.ToDoItemsQuery.map((item, i) => {
              return <ToDoItem key={i} {...{ item }} />;
            })
          : Array.from({ length: 10 }).map((_, i) => {
              return <ToDoItem key={i} {...{ item: null }} />;
            })}
      </div>
    </div>
  );
}
