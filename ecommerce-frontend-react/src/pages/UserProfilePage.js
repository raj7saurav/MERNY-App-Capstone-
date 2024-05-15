import Navbar from "../features/navbar/Navbar";
import UserProfile from "../features/user/components/UserProfile";

const UserProfilePage = () => {
  return (
    <Navbar>
      <h1 className="text-xl">My Profile</h1>
      <UserProfile />
    </Navbar>
  );
};

export default UserProfilePage;
