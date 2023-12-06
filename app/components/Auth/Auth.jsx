"use client";

import { useEffect } from "react";

import { useDispatch, useSelector } from "../../../lib/redux";
import {
  selectAuthExpiry,
  selectAuthStatus,
  selectAuthToken,
} from "../../../lib/redux/slices/auth/selectors";
import { authenticateAsync } from "../../../lib/redux/slices/auth/thunks";
import { Loader } from "../Loader/Loader";
import { ErrorMessage } from "../ErrorMessage/ErrorMessage";

export const Auth = () => {
  const dispatch = useDispatch();
  const token = useSelector(selectAuthToken);
  const expiresAt = useSelector(selectAuthExpiry);
  const status = useSelector(selectAuthStatus);
  useEffect(() => {
    if (!token || Date.now() >= expiresAt) {
      dispatch(authenticateAsync());
    }
  }, [token, expiresAt]);
  return (
    <>
      {status === "loading" && (
          <Loader label={"authenticating"}/>
      )}
      {status === "failed" && (
        <ErrorMessage
          message={"Authentication Failed."}
          action={() => {
            dispatch(authenticateAsync());
          }}
        />
      )}
    </>
  );
};
