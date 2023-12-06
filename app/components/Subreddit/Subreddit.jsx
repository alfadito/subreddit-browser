"use client";

import { useSelector } from "../../../lib/redux";
import { selectAuthToken } from "../../../lib/redux/slices/auth/selectors";
import { SUBREDDIT_NAME } from "../../../const/const";

import styles from "./Subreddit.module.scss";
import { ThreadList } from "../ThreadList/ThreadList";
import { useEffect, useState } from "react";
import { Loader } from "../Loader/Loader";
import { ErrorMessage } from "../ErrorMessage/ErrorMessage";

export const Subreddit = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const token = useSelector(selectAuthToken);

  const getSubredditDetail = () => {
    setError(false);
    setLoading(true);
    fetch(`https://oauth.reddit.com/r/${SUBREDDIT_NAME}/about`, {
      headers: {
        Authorization: `bearer ${token}`,
      },
    })
      .then((res) => {
        res.json().then((resData) => {
          setLoading(false);
          setData(resData.data);
        });
      })
      .catch((e) => {
        console.error(e);
        setError(true);
        setLoading(false);
      });
  };

  useEffect(() => {
    token && getSubredditDetail();
  }, [token]);

  return (
    <>
      {loading && <Loader />}
      {!loading && error && (
        <ErrorMessage
          message={"Unable to fetch subreddit data."}
          action={getSubredditDetail}
        />
      )}
      {!loading && data && (
        <>
          <div
            className={styles.banner}
            style={{
              backgroundColor: data.banner_background_color,
              backgroundImage: `url(${data.banner_img})`,
              height: data.banner_size?.[1],
            }}
          />
          <div className={styles.header}>
            <h1 className={styles.title}>{data.title}</h1>
            <span className={styles.name}>{data.display_name_prefixed}</span>
          </div>
          <div className={styles.threads}>
            <ThreadList />
          </div>
        </>
      )}
    </>
  );
};
