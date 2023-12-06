"use client"

import classNames from "classnames"
import styles from "./ThreadItem.module.scss"
import { useDispatch, useSelector } from "../../../lib/redux"
import { voteSlice } from "../../../lib/redux/slices/vote/voteSlice"
import { selectVote } from "../../../lib/redux/slices/vote/selectors"
import { countifier, epochTime } from "../../../utility"

export const ThreadItem = ({id, mode, title, author, created, num_comments, ups}) => {
  const dispatch = useDispatch();
  const vote = useSelector(selectVote(id)) || 0;

  const handleUpvote = (e) => {
    e.stopPropagation();
    e.preventDefault();
    dispatch(voteSlice.actions.vote({
      id, value: vote === 1 ? 0 : 1
    }))
  }

  const handleDownvote = (e) => {
    e.stopPropagation();
    e.preventDefault();
    dispatch(voteSlice.actions.vote({
      id, value: vote === -1 ? 0 : -1
    }))
  }

  return <div className={classNames(styles.container, styles[mode])}>
    <div className={styles.upvotes}>
      <div className={classNames(styles.voteBtn, {[styles.active]: vote === 1})} onClick={handleUpvote}>▲</div>
      <div>{countifier(ups + vote)}</div>
      <div className={classNames(styles.voteBtn, {[styles.active]: vote === -1})} onClick={handleDownvote}>▼</div>
    </div>
    <div className={styles.author}>Posted by <span className={styles.name}>{author}</span>•<span className={styles.created}>{epochTime(created)}</span></div>
    <h2 className={styles.title}>{title}</h2>
    <div className={styles.comments}>{countifier(num_comments)}</div>
  </div>
}