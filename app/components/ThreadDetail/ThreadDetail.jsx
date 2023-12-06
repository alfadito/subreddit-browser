"use client";

import { useDispatch, useSelector } from "../../../lib/redux";
import { selectAuthToken } from "../../../lib/redux/slices/auth/selectors";
import { SUBREDDIT_NAME } from "../../../const/const";
import { Fragment, useEffect, useState } from "react";
import { ThreadItem } from "../ThreadItem/ThreadItem";

import styles from "./ThreadDetail.module.scss";
import classNames from "classnames";
import Link from "next/link";
import Markdown from "react-markdown";
import { Reply } from "../Reply/Reply";
import { useRouter } from "next/navigation";
import { commentSlice } from "../../../lib/redux/slices/comment/commentSlice";

import { v4 as uuidv4 } from "uuid";
import { selectComment } from "../../../lib/redux/slices/comment/selectors";
import { ErrorMessage } from "../ErrorMessage/ErrorMessage";
import { Loader } from "../Loader/Loader";
import { countifier, epochTime } from "../../../utility";
import { voteSlice } from "../../../lib/redux/slices/vote/voteSlice";
import { selectVote } from "../../../lib/redux/slices/vote/selectors";

export const ThreadDetail = ({ id }) => {
  const dispatch = useDispatch();
  const inputtedComments = useSelector(selectComment(id)) || [];
  const vote = useSelector(selectVote(id)) || 0;
  const router = useRouter();
  const [content, setContent] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [commentInput, setCommentInput] = useState("");
  const token = useSelector(selectAuthToken);

  const getThreadDetail = () => {
    setError(false);
    setLoading(true);

    const url = `https://oauth.reddit.com/r/${SUBREDDIT_NAME}/comments/${id}`;

    fetch(url, {
      headers: {
        Authorization: `bearer ${token}`,
      },
    })
      .then((res) => {
        res.json().then((resData) => {
          setLoading(false);
          setContent(resData[0].data.children[0].data);
          setComments(resData[1].data.children);
        });
      })
      .catch((e) => {
        console.error(e);
        setError(true);
        setLoading(false);
      });
  };

  useEffect(() => {
    token && getThreadDetail();
  }, [token, id]);

  const renderComments = (comment) => {
    let replies;
    if (comment.data.replies?.data?.children.length > 0) {
      replies = comment.data.replies.data.children.map((reply) => {
        return <Fragment key={reply.data.id}>{renderComments(reply)}</Fragment>;
      });
    }
    return <Reply comment={comment} replies={replies} />;
  };

  const handleCommentInput = () => {
    dispatch(
      commentSlice.actions.comment({
        id,
        value: {
          data: {
            id: uuidv4(),
            author: "guest",
            body: commentInput,
            ups: 1,
            created: 0,
          },
        },
      })
    );
    setCommentInput("");
  };

  const handleUpvote = () => {
    dispatch(voteSlice.actions.vote({
      id, value: vote === 1 ? 0 : 1
    }))
  }

  const handleDownvote = () => {
    dispatch(voteSlice.actions.vote({
      id, value: vote === -1 ? 0 : -1
    }))
  }

  return (
    <>
      <div className={styles.headerContainer}>
        <div
          className={styles.back}
          onClick={() => {
            router.back();
          }}
        >
          ⇦ Back
        </div>
        {loading && <Loader type={"light"} />}
        {!loading && error && (
          <ErrorMessage
            message={"Unable to fetch thread detail."}
            action={getThreadDetail}
          />
        )}
        {!loading && content && (
          <div className={styles.header}>
            <div className={styles.upvotes}>
              <div
                className={classNames(styles.voteBtn, {
                  [styles.active]: vote === 1,
                })}
                onClick={handleUpvote}
              >
                ▲
              </div>
              <div>{countifier(content.ups + vote)}</div>
              <div
                className={classNames(styles.voteBtn, {
                  [styles.active]: vote === -1,
                })}
                onClick={handleDownvote}
              >
                ▼
              </div>
            </div>
            <h1>{content.title}</h1>
            <div className={styles.author}>
              Posted by <span className={styles.name}>{content.author}</span>•
              <span className={styles.created}>
                {epochTime(content.created)}
              </span>
            </div>
          </div>
        )}
      </div>
      {!loading && content && (
        <div className={styles.content}>
          <div className={styles.text}>
            <Markdown>{content.selftext}</Markdown>
          </div>
        </div>
      )}
      {!loading && comments && (
        <>
          <div className={styles.commentInput}>
            <textarea
              onChange={(e) => {
                setCommentInput(e.target.value);
              }}
              value={commentInput}
              rows={6}
            />
            <button
              onClick={() => {
                handleCommentInput();
              }}
            >
              Comment
            </button>
          </div>
          <div className={styles.replies}>
            {[...inputtedComments, ...comments].map((comment) => {
              return (
                <Fragment key={comment.data.id}>
                  {renderComments(comment)}
                </Fragment>
              );
            })}
          </div>
        </>
      )}
    </>
  );
};
