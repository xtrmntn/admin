import { FC, PropsWithChildren } from 'react';
import {
  Modal as ChakraModal,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
} from '@chakra-ui/react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const Modal: FC<PropsWithChildren<ModalProps>> = ({ children, isOpen, onClose }) => (
  <ChakraModal isOpen={isOpen} onClose={onClose}>
    <ModalOverlay />
    <ModalContent>
      <ModalCloseButton />
      {children}
    </ModalContent>
  </ChakraModal>
);

export default Modal;
