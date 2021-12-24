import React, {useContext} from "react";
import {ModalContext} from "src/contexts/ModalContext";
import {ReactSVG} from "react-svg";
import {get} from "lodash";
import {Modal as MaterialModal} from '@mui/material';

const Modal: React.FC = () => {
  const {modal, setModal} = useContext(ModalContext);

  return (
    <MaterialModal
      open={!!modal}
      onClose={() => setModal(undefined)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white w-11/12 md:max-w-md mx-auto rounded-lg shadow-lg z-50 overflow-y-auto border-2 border-blue">

        <div className="flex justify-between items-center py-6 mb-6 items-center border-b-2 border-blue">
          {get(modal, 'title', false) && (
            <h3 className="text-2xl font-bold text-blue ml-6">{get(modal, 'title')}</h3>
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

        {modal !== undefined && (
          <modal.component />
        )}
      </div>
    </MaterialModal>
  );
}

export default Modal;