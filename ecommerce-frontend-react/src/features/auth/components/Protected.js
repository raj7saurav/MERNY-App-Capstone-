import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { selectLoggedInUser } from "../authSlice";

const Protected = ({ children }) => {
  const user = useSelector(selectLoggedInUser);
  // console.log(user);

  if (!user) {
    return <Navigate to="/login" replace={true} />;
  }
  return children;
};

export default Protected;
