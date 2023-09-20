import { useAppState } from "../../context/AppContext";
import Close from "../../assets/close.svg";

interface Props {
  onClose: () => void;
}

const Toast = ({ onClose }: Props) => {
  const { state } = useAppState();

  return (
    <div className="fixed bg-red-200 text-red-700 left-0 right-0 py-8 flex justify-center">
      <p className="text-lg">{state.imageErrorMessage}</p>
      <div className="absolute right-6 top-6 cursor-pointer" onClick={onClose}>
        <img src={Close} alt="Close Icon" />
      </div>
    </div>
  );
};

export default Toast;
