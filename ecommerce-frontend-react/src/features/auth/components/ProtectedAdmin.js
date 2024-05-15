import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { selectLoggedInUser } from "../authSlice";
import { selectUserInfo } from "../../user/userSlice";

const ProtectedAdmin = ({ children }) => {
  const user = useSelector(selectLoggedInUser);
  const userInfo = useSelector(selectUserInfo);

  // console.log(userInfo);

  if (!user) {
    return <Navigate to="/login" replace={true} />;
  }
  if (userInfo && userInfo?.role !== "admin") {
    return <Navigate to="/" replace={true} />;
  }

  return children;
};

export default ProtectedAdmin;
