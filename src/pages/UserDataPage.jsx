import NavHeader from "../components/common/NavHeader";
import Gallery from "../components/Gallery";
import MessageView from "../components/MessageView";

const UserDataPage = ({ data = [] }) => {
  return (
    <>
      <NavHeader />
      {data.length > 0 ? (
        <Gallery data={data} />
      ) : (
        <MessageView message="Empty" />
      )}
    </>
  );
};

export default UserDataPage;
