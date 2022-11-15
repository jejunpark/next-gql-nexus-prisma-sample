import styles from "../../styles/Home.module.css";
import classNames from "classnames/bind";
import { useQuery } from "react-query";
import { toDoItemsQuery } from "../client/queries/ToDo";
import { useEffect } from "react";
import Content from "../client/components/Content";

const cx = classNames.bind(styles);

export default function Home() {
  return (
    <div className={cx("container")}>
      <Content />
    </div>
  );
}
