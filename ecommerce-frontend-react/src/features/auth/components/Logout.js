import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectLoggedInUser, signOutAsync } from "../authSlice";
import { Navigate } from "react-router-dom";

const Logout = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);
  // const userChecked = useSelector(selectUserChecked);

  console.log(user);
  // console.log(userChecked);

  useEffect(() => {
    dispatch(signOutAsync());
  }, [dispatch]);

  // but useEffect runs after render, so we have to delay navigate part...
  return (
    <>
      {!user && <Navigate to="/login" replace={true} />};
    </>
  );
};

export default Logout;
