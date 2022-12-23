import React, {useContext} from "react";
import { ModalContext } from "src/contexts/ModalContext";
import DoneIcon from "@mui/icons-material/Done";
import Button from "src/components/Buttons/Button";
import { useNavigate } from "react-router-dom";

interface SuccessModalProps {
  subtitle: string;
  description: string;
  buttonText?: string;
  buttonLink?: string;
}

const SuccessModal: React.FC<SuccessModalProps> = ({
  subtitle,
  description,
  buttonText,
  buttonLink,
}) => {
  const navigate = useNavigate();
  const { setModal } = useContext(ModalContext);

  return (
    <div className="flex h-84 justify-center items-center flex-col pt-10 pb-20 px-10">
      <div className="w-24 h-24 rounded-full bg-green/[0.3] flex justify-center items-center mb-6">
        <DoneIcon className="fill-green h-12 w-12 m-auto" />
      </div>
      <h3 className="text-blue text-lg text-center font-bold mb-4">{subtitle}</h3>
      <p className="text-blue text-sm text-center px-10 mb-6">{description}</p>

      {(buttonText && buttonLink) && (
        <Button
          extraClasses="h-10 bg-blue border-blue text-white text-center h-8 text-xs uppercase w-full max-w-xs"
          type="submit"
          text={buttonText}
          onClick={() => {
            navigate(buttonLink)
            setModal(undefined);
          }}
        />
      )}

    </div>
  );
};

export default SuccessModal;
