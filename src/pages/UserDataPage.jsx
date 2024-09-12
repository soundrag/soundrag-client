import NavBar from "../components/common/NavBar";
import Gallery from "../components/Gallery";
import MessageView from "../components/MessageView";

const UserDataPage = ({ data = [] }) => {
  return (
    <>
      <NavBar />
      {data.length > 0 ? (
        <Gallery data={data} />
      ) : (
        <MessageView message="Empty" />
      )}
    </>
  );
};

export default UserDataPage;
