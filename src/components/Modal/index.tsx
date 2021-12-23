import React, {useContext} from "react";
import {ModalContext} from "src/contexts/ModalContext";
import {ReactSVG} from "react-svg";
import {get} from "lodash";
import Button from "src/components/Buttons/Button";
import {useTranslation} from "react-i18next";
import {Modal as MaterialModal} from '@mui/material';

const Modal: React.FC = () => {
  const {modal, setModal} = useContext(ModalContext);
  const {t} = useTranslation();

  return (
    <MaterialModal
      open={!!modal}
      onClose={() => setModal(undefined)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white w-11/12 md:max-w-md mx-auto rounded-lg shadow-lg z-50 overflow-y-auto border-2 border-blue">

        <div className="flex justify-between items-center py-6 mb-6 items-center border-b-2 border-blue">
          {get(modal, 'props.title', false) && (
            <h3 className="text-2xl font-bold text-blue ml-6">{get(modal, 'props.title')}</h3>
          )}

          <div className="modal-close cursor-pointer z-50 mr-6">
            <ReactSVG
              onClick={() => setModal(undefined)}
              src="icons/cross.svg"
              beforeInjection={(svg) => {
                svg.classList.add('fill-blue');
              }}
            />
          </div>
        </div>

        {modal?.component || <></>}

        <div className="flex justify-around  px-6 py-6 mb-8">
          <Button
            text={get(modal, 'props.cancelButtonText', t('modal.cancel'))}
            extraClasses="bg-white border-blue text-blue text-center h-8 text-xs uppercase"
          />
          <Button
            text={get(modal, 'props.submitButtonText', t('modal.submit'))}
            extraClasses="bg-blue border-blue text-white text-center h-8 text-xs uppercase"
          />
        </div>
      </div>
    </MaterialModal>
  );
}

export default Modal;