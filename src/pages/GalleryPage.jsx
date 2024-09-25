import NavHeader from "../components/common/NavHeader";
import Gallery from "../components/Gallery";

import useAuthStore from "../stores/useAuthStore";

import { GalleryPageContainer } from "../style/GalleryPageStyle";

const GalleryPage = () => {
  const { userData } = useAuthStore();

  return (
    <GalleryPageContainer>
      <NavHeader />
      <Gallery data={userData} />
    </GalleryPageContainer>
  );
};

export default GalleryPage;
