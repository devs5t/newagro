import React, {useContext} from "react";
import {ModalContext} from "src/contexts/ModalContext";
import {ReactSVG} from "react-svg";
import {get} from "lodash";
import {Dialog, DialogTitle, DialogContent} from '@mui/material';

const Modal: React.FC = () => {
  const {modal, setModal} = useContext(ModalContext);

  return (
    <Dialog
      open={!!modal}
      onClose={() => setModal(undefined)}
      scroll="body"
      aria-labelledby="scroll-dialog-title"
      aria-describedby="scroll-dialog-description"
      className="p-0 rounded-lg shadow-lg border-2 border-blue"
    >

      <DialogTitle id="scroll-dialog-title">
        <div className="flex justify-between items-center py-6 mb-6 items-center border-b-2 border-blue">
          {get(modal, 'title', false) && (
            <h3 className="text-2xl font-bold text-blue ml-10">{get(modal, 'title')}</h3>
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
      </DialogTitle>

      <DialogContent>
        {modal !== undefined && (
          <modal.component />
        )}

      </DialogContent>
    </Dialog>
  );
}

export default Modal;