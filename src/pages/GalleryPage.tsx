import NavHeader from "../components/common/NavHeader";
import Gallery from "../components/Gallery";

import { GalleryPageContainer } from "../style/GalleryPageStyle";

const GalleryPage = () => {
  return (
    <GalleryPageContainer>
      <NavHeader />
      <Gallery />
    </GalleryPageContainer>
  );
};

export default GalleryPage;
