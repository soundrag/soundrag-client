import NavHeader from "../components/common/NavHeader";
import Gallery from "../components/Gallery";

import useDataStore from "../stores/useDataStore";

import { GalleryPageContainer } from "../style/GalleryPageStyle";

const GalleryPage = () => {
  const { userData } = useDataStore();

  return (
    <GalleryPageContainer>
      <NavHeader />
      <Gallery data={userData} />
    </GalleryPageContainer>
  );
};

export default GalleryPage;
