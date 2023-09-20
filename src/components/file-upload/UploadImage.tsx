import { useRef, useState } from "react";
import { useAppState } from "../../context/AppContext";

const UploadImage = () => {
  const { state, dispatch } = useAppState();
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const onDivClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const onFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    const isImageDuplicated = state.images?.find(
      (image) => image.name === file?.name
    );

    if (isImageDuplicated) {
      if (inputRef.current) {
        inputRef.current.value = "";
      }
      dispatch({ type: "IMAGE_ERROR" });
    } else {
      const newImages = {
        name: file?.name as string,
        url: URL.createObjectURL(file as File),
      };

      dispatch({ type: "UPLOAD_IMAGE", payload: newImages });
      if (inputRef.current) {
        inputRef.current.value = "";
      }
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
    e.dataTransfer.dropEffect = "copy";
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];

    const newImages = {
      name: file?.name as string,
      url: URL.createObjectURL(file as File),
    };

    dispatch({ type: "UPLOAD_IMAGE", payload: newImages });
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  return (
    <div
      className="w-full h-full"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onDragLeave={handleDragLeave}
    >
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        onChange={onFileSelect}
      />
      <div className="w-full px-4 h-full flex justify-center items-center text-[#191717] bg-[#F1EFEF] border-dashed border border-[#191717] rounded-lg">
        {isDragging ? (
          <span>Drop image Here</span>
        ) : (
          <div className="flex flex-col">
            <p>Add your images to the list</p>
            <p>
              Drag and drop image here or
              <span
                className="ml-2 text-[#7D7C7C] hover:text-[#191717]"
                role="button"
                onClick={onDivClick}
              >
                Browse
              </span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadImage;
