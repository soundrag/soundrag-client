import Button from "../components/common/Button";

import {
  GalleryContainer,
  DataList,
  DataListRow,
  DataListCell,
} from "../style/GalleryStyle";

const Gallery = ({ data }) => {
  return (
    <GalleryContainer>
      <DataList>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <DataListRow key={item.id}>
              <DataListCell>{item.name}</DataListCell>
              <DataListCell>{item.description}</DataListCell>
              <DataListCell>{item.date}</DataListCell>
              <DataListCell className="button-container">
                <Button text="Detail" size="small" />
                <Button text="Del" size="small" />
              </DataListCell>
            </DataListRow>
          ))}
        </tbody>
      </DataList>
    </GalleryContainer>
  );
};

export default Gallery;
