import { useState } from "react";
import UploadImage from "../../components/file-upload/UploadImage";
import { useAppState } from "../../context/AppContext";
import Toast from "../../components/toast/Toast";

export interface ImageState {
  name: string;
  url: string;
}

const Home = () => {
  const { state, dispatch } = useAppState();
  const [dragItemIndex, setDragItemIndex] = useState<number | null>(null);
  const [dragOverItemIndex, setDragOverItemIndex] = useState<number | null>(
    null
  );

  const handleDragOver = (
    e: React.DragEvent<HTMLDivElement>,
    index: number
  ) => {
    e.preventDefault();
    setDragOverItemIndex(index);
  };

  const handleDrop = () => {
    const newImages = [...state.images];
    const dragItem = newImages.splice(dragItemIndex as number, 1);
    const dropItem = newImages.splice((dragOverItemIndex as number) - 1, 1);
    newImages.splice((dragOverItemIndex as number) - 1, 0, ...dragItem);
    newImages.splice(dragItemIndex as number, 0, ...dropItem);

    dispatch({ type: "CHANGE_ORDER", payload: newImages as ImageState[] });
  };

  const handleDragStart = (index: number) => {
    setDragItemIndex(index);
  };

  const handleDragEnter = (index: number) => {
    setDragOverItemIndex(index);
  };

  const handleDragLeave = () => {
    setDragOverItemIndex(null);
  };

  const handleDragEnd = () => {
    setDragItemIndex(null);
    setDragOverItemIndex(null);
  };

  return (
    <>
      <header className="p-6">
        <h1 className="text-[#191717]">Responsive Image Gallery</h1>
      </header>

      {state.imageError && (
        <Toast onClose={() => dispatch({ type: "CLEAR_ERROR" })} />
      )}

      <main className="p-6">
        <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-6">
          {state.images.map((image, index) => (
            <div
              className={`w-full border rounded-lg flex flex-col gap-6 p-4 cursor-pointer ${
                dragItemIndex === index && "border-[#618264] opacity-20"
              } ${dragOverItemIndex === index && "border-[#191717] border-2"}`}
              key={image.name}
              draggable
              onDragStart={() => handleDragStart(index)}
              onDragEnter={() => handleDragEnter(index)}
              onDragLeave={handleDragLeave}
              onDragOver={(e) => handleDragOver(e, index)}
              onDragEnd={handleDragEnd}
              onDrop={handleDrop}
            >
              <img
                src={image.url}
                alt="uploaded Image"
                className="w-full h-[300px] overflow-hidden border rounded-lg"
                loading="lazy"
              />
              <p className="font-bold">{image.name}</p>
            </div>
          ))}
          <div className="w-full h-[400px]">
            <UploadImage />
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
