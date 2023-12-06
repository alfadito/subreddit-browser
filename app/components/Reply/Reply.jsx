import Markdown from "react-markdown";
import styles from "./Reply.module.scss";
import { useState } from "react";
import classNames from "classnames";
import { useDispatch, useSelector } from "../../../lib/redux";
import { selectVote } from "../../../lib/redux/slices/vote/selectors";
import { voteSlice } from "../../../lib/redux/slices/vote/voteSlice";
import { countifier, epochTime } from "../../../utility";

export const Reply = ({ comment, replies }) => {
  const { id, author, body, ups, created } = comment?.data || {};
  const dispatch = useDispatch();
  const vote = useSelector(selectVote(id)) || 0;
  const [isOpen, setIsOpen] = useState(true);
  
  const handleUpvote = () => {
    dispatch(
      voteSlice.actions.vote({
        id,
        value: vote === 1 ? 0 : 1,
      })
    );
  };

  const handleDownvote = () => {
    dispatch(
      voteSlice.actions.vote({
        id,
        value: vote === -1 ? 0 : -1,
      })
    );
  };

  return (
    <div className={styles.comment}>
      <div className={styles.author}>
        {!isOpen && (
          <span
            className={styles.expandBtn}
            onClick={() => {
              setIsOpen(true);
            }}
          >
            ⤡
          </span>
        )}
        <span className={styles.name}>{author}</span>
        •
        <span className={styles.created}>
          {epochTime(created)}
        </span>
      </div>
      {isOpen && (
        <div className={styles.expandable}>
          <div
            className={styles.expandLine}
            onClick={() => {
              setIsOpen(false);
            }}
          >
            <div className={styles.line}></div>
          </div>
          <div>
            <div className={styles.text}>
              <Markdown>{body}</Markdown>
            </div>
            <div className={styles.upvotes}>
              <div
                className={classNames(styles.voteBtn, {
                  [styles.active]: vote === 1,
                })}
                onClick={handleUpvote}
              >
                ▲
              </div>
              <div>{countifier(ups + vote)}</div>
              <div
                className={classNames(styles.voteBtn, {
                  [styles.active]: vote === -1,
                })}
                onClick={handleDownvote}
              >
                ▼
              </div>
            </div>
            <div className={styles.replies}>
              <div>{replies}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
