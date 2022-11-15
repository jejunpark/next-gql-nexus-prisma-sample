import { NexusGenObjects } from "@root/src/shared/generated/nexus-typegen";
import { useMutation } from "react-query";

import { BsCheck } from "react-icons/bs";
import styles from "./ToDoItem.module.css";
import classNames from "classnames/bind";
import { toDoUpdateMutation } from "../queries/ToDo";
import { queryClient } from "../react-query";
import { checkListUpdateMutation } from "../queries/CheckList";
const cx = classNames.bind(styles);

interface Props {
  item: NexusGenObjects["ToDo"];
}

export default function ToDoItem(props: Props) {
  const { mutate: updateToDoItem } = useMutation(toDoUpdateMutation, {
    onSuccess: () => {
      queryClient.refetchQueries(["ToDoItems"]);
      queryClient.refetchQueries(["ToDoItemsCount"]);
    },
    onError: () => {
      alert("에러가 발생했습니다.");
    },
  });

  const { mutate: updateCheckList } = useMutation(checkListUpdateMutation, {
    onSuccess: () => {
      queryClient.refetchQueries(["ToDoItems"]);
      queryClient.refetchQueries(["ToDoItemsCount"]);
    },
    onError: () => {
      alert("에러가 발생했습니다.");
    },
  });

  return (
    <div
      className={
        props.item.isDone ? cx("to-do-item", "done") : cx("to-do-item")
      }
    >
      <div className={cx("header")}>
        <div
          className={cx("check-box")}
          onClick={() => {
            updateToDoItem({
              id: props.item.id,
              isDone: !props.item.isDone,
            });
          }}
        >
          {props.item.isDone && <BsCheck className={cx("checked-icon")} />}
        </div>
        <div className={cx("title")}>{props.item.title}</div>
        <div className={cx("importance", props.item.importance)}>
          {props.item.importance}
        </div>
      </div>
      <div className={cx("check-list")}>
        {props.item.checkLists.map((checklist, i) => {
          return (
            <div
              key={i}
              className={
                checklist.isCompleted
                  ? cx("check-list-item", "completed")
                  : cx("check-list-item")
              }
              onClick={() => {
                updateCheckList({
                  id: checklist.id,
                  isCompleted: !checklist.isCompleted,
                });
              }}
            >
              {checklist.title}
            </div>
          );
        })}
      </div>
    </div>
  );
}
