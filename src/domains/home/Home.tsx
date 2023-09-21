import { useState } from "react";
import UploadImage from "../../components/file-upload/UploadImage";
import { useAppState } from "../../context/AppContext";
import Toast from "../../components/toast/Toast";
import { auth } from "../../firebase";
import { useAuth } from "../../context/AuthContext";
import LazyLoad from "react-lazy-load";

export interface ImageState {
  name: string;
  url: string;
}

const Home = () => {
  const authObject = useAuth();
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

  const handleLogout = async () => {
    if (authObject?.currentUser) {
      await auth.signOut();
      localStorage.removeItem("currentUser");
    }
  };

  return (
    <>
      <header className="p-6 flex sm:justify-between items-center flex-col sm:flex-row">
        <h1 className="text-[#191717] text-[24px]">Responsive Image Gallery</h1>

        <button className="border rounded-lg p-4" onClick={handleLogout}>
          Sign Out
        </button>
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
              <LazyLoad height={300}>
                <img
                  src={image.url}
                  alt="uploaded Image"
                  className="w-full h-[300px] overflow-hidden border rounded-lg"
                  loading="lazy"
                />
              </LazyLoad>

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
