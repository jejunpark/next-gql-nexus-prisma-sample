import { useState } from "react";
import { Importance } from "@prisma/client";
import classNames from "classnames/bind";
import styles from "./CreateToDo.module.css";
import { MdOutlineKeyboardArrowUp } from "react-icons/md";
import { toDoCreateMutation } from "../queries/ToDo";
import { queryClient } from "../react-query";
import { useMutation } from "react-query";

const cx = classNames.bind(styles);

interface Form {
  title: string;
  importance: Importance;
}

interface Props {
  onClose: () => void;
}

export default function CreateToDo({ onClose }: Props) {
  const [form, setForm] = useState<Form>({
    title: "",
    importance: Importance.LOW,
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleChangeImportance(isNext: boolean) {
    if (isNext) {
      setForm({
        ...form,
        importance:
          Object.values(Importance)[
            (Object.values(Importance).length +
              Object.values(Importance).indexOf(form.importance) +
              1) %
              Object.values(Importance).length
          ],
      });
    } else {
      setForm({
        ...form,
        importance:
          Object.values(Importance)[
            (Object.values(Importance).length +
              Object.values(Importance).indexOf(form.importance) -
              1) %
              Object.values(Importance).length
          ],
      });
    }
  }

  const { mutate: createToDoItem } = useMutation(toDoCreateMutation, {
    onSuccess: async () => {
      await queryClient.refetchQueries(["ToDoItems"]);
      await queryClient.refetchQueries(["ToDoItemsCount"]);
      onClose();
    },
    onError: () => {
      alert("에러가 발생했습니다.");
    },
  });

  return (
    <div
      className={cx("content")}
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <h3 className={cx("title")}>Add New To Do</h3>
      <div className={cx("input-area")}>
        <input
          type="text"
          name="title"
          onChange={handleChange}
          placeholder="Add New To Do"
        />
        <div className={cx("importance", form?.importance)}>
          <label>{form?.importance}</label>
          <div className={cx("handler-wrapper")}>
            <MdOutlineKeyboardArrowUp
              className={cx("handler")}
              onClick={() => {
                handleChangeImportance(true);
              }}
            />
            <MdOutlineKeyboardArrowUp
              className={cx("handler", "reverse")}
              onClick={() => {
                handleChangeImportance(false);
              }}
            />
          </div>
        </div>
      </div>
      <div className={cx("btn-area")}>
        <button
          className={cx("btn")}
          onClick={() => {
            onClose();
          }}
        >
          Cancel
        </button>
        <button
          className={cx("btn", "primary")}
          disabled={!form.title}
          onClick={() => {
            createToDoItem(form);
          }}
        >
          Add
        </button>
      </div>
    </div>
  );
}
