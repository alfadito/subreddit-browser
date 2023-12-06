"use client";

import { useEffect, useRef, useState } from "react";
import classNames from "classnames";
import Link from "next/link";

import { useSelector } from "../../../lib/redux";
import { selectAuthToken } from "../../../lib/redux/slices/auth/selectors";
import { SUBREDDIT_NAME } from "../../../const/const";
import { ThreadItem } from "../ThreadItem/ThreadItem";

import styles from "./ThreadList.module.scss";
import { Loader } from "../Loader/Loader";
import { ErrorMessage } from "../ErrorMessage/ErrorMessage";

const filters = ["hot", "new", "top"];
const displays = ["card", "classic", "compact"];

export const ThreadList = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [filter, setFilter] = useState(filters[0]);
  const [display, setDisplay] = useState(displays[0]);
  const [nextPage, setNextPage] = useState("");
  const token = useSelector(selectAuthToken);
  const observerTarget = useRef(null);

  const getThreads = (after) => {
    if (!after) setData([]);
    setError(false);
    setLoading(true);

    const afterParam = after ? `?after=${after}` : "";
    const url = `https://oauth.reddit.com/r/${SUBREDDIT_NAME}/${filter}${afterParam}`;

    fetch(url, {
      headers: {
        Authorization: `bearer ${token}`,
      },
    })
      .then((res) => {
        res.json().then((resData) => {
          setLoading(false);
          setData([...(after ? data : []), ...resData.data.children]);
          setNextPage(resData.data.after);
        });
      })
      .catch((e) => {
        console.error(e);
        setError(true);
        setLoading(false);
      });
  };

  // To observe element for infinite scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          token && nextPage && getThreads(nextPage);
        }
      },
      { threshold: 1 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current);
      }
    };
  }, [token, filter, nextPage, observerTarget]);

  useEffect(() => {
    token && getThreads();
  }, [token, filter]);

  const header = (
    <div className={styles.header}>
      <div className={styles.filterContainer}>
        {filters.map((item) => {
          return (
            <div
              key={item}
              className={classNames(styles.filterOption, {
                [styles.active]: filter === item,
              })}
              onClick={() => {
                setFilter(item);
              }}
            >
              {item}
            </div>
          );
        })}
      </div>
      <div className={styles.displayContainer}>
        {displays.map((item) => {
          return (
            <div
              key={item}
              className={classNames(styles.displayOption, {
                [styles.active]: display === item,
              })}
              onClick={() => {
                setDisplay(item);
              }}
            >
              {item}
            </div>
          );
        })}
      </div>
    </div>
  );

  return (
    <div className={classNames(styles.container, styles[display])}>
      {header}
      {data.length > 0 && (
        <>
          <ul className={classNames(styles.ulist, styles[display])}>
            {data?.map((thread) => {
              const td = thread.data;
              return (
                <li className={styles.litem} key={td.id}>
                  <Link href={`/thread/${td.id}`}>
                    <ThreadItem
                      id={td.id}
                      mode={display}
                      title={td.title}
                      author={td.author}
                      created={td.created}
                      num_comments={td.num_comments}
                      ups={td.ups}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>
          <div className={styles.loader} ref={observerTarget}></div>
        </>
      )}
      {!loading && error && (
        <ErrorMessage
          message={"Unable to fetch thread list."}
          action={() => {
            getThreads(nextPage);
          }}
        />
      )}
      {loading && <Loader />}
    </div>
  );
};
