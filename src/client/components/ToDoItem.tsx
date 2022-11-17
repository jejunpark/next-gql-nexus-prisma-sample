import { NexusGenObjects } from "@root/src/shared/generated/nexus-typegen";
import { useMutation } from "react-query";
import { BsCheck } from "react-icons/bs";
import { IoMdClose, IoIosAdd } from "react-icons/io";
import { useState } from "react";
import styles from "./ToDoItem.module.css";
import classNames from "classnames/bind";
import { toDoDeleteMutation, toDoUpdateMutation } from "../queries/ToDo";
import { queryClient } from "../react-query";
import {
  checkListCreateMutation,
  checkListDeleteMutation,
  checkListUpdateMutation,
} from "../queries/CheckList";
const cx = classNames.bind(styles);

interface Props {
  item: NexusGenObjects["ToDo"] | null;
}

export default function ToDoItem(props: Props) {
  const [form, setForm] = useState({
    title: "",
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function resetForm() {
    setForm({
      title: "",
    });
  }

  const { mutate: updateToDoItem } = useMutation(toDoUpdateMutation, {
    onSuccess: () => {
      queryClient.refetchQueries(["ToDoItems"]);
      queryClient.refetchQueries(["ToDoItemsCount"]);
    },
    onError: () => {
      alert("에러가 발생했습니다.");
    },
  });

  const { mutate: deleteToDoItem } = useMutation(toDoDeleteMutation, {
    onSuccess: () => {
      queryClient.refetchQueries(["ToDoItems"]);
      queryClient.refetchQueries(["ToDoItemsCount"]);
    },
    onError: () => {
      alert("에러가 발생했습니다.");
    },
  });

  const { mutate: createCheckList } = useMutation(checkListCreateMutation, {
    onSuccess: () => {
      queryClient.refetchQueries(["ToDoItems"]);
      queryClient.refetchQueries(["ToDoItemsCount"]);
      resetForm();
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

  const { mutate: deleteCheckList } = useMutation(checkListDeleteMutation, {
    onSuccess: () => {
      queryClient.refetchQueries(["ToDoItems"]);
      queryClient.refetchQueries(["ToDoItemsCount"]);
    },
    onError: () => {
      alert("에러가 발생했습니다.");
    },
  });

  return props.item ? (
    <div
      className={
        props.item.isDone ? cx("to-do-item", "done") : cx("to-do-item")
      }
    >
      <div className={cx("header")}>
        <div className={cx("content")}>
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
        <button
          className={cx("delete-btn")}
          onClick={() => {
            deleteToDoItem({ id: props.item.id });
          }}
        >
          삭제
        </button>
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
            >
              <div
                className={cx("content")}
                onClick={() => {
                  updateCheckList({
                    id: checklist.id,
                    isCompleted: !checklist.isCompleted,
                  });
                }}
              >
                {checklist.title}
              </div>
              <button
                className={cx("del-btn")}
                onClick={(e) => {
                  e.stopPropagation();
                  deleteCheckList({ id: checklist.id });
                }}
              >
                <IoMdClose />
              </button>
            </div>
          );
        })}
        <div className={cx("add-check-list-area")}>
          <input
            type="text"
            value={form.title}
            onChange={handleChange}
            name="title"
            placeholder="add check list"
          />
          <button
            className={cx("add-btn")}
            onClick={() => {
              createCheckList({ title: form.title, toDoId: props.item.id });
            }}
            disabled={!form.title}
          >
            <IoIosAdd />
          </button>
        </div>
      </div>
    </div>
  ) : (
    <div className={cx("to-do-item", "loading")} />
  );
}
