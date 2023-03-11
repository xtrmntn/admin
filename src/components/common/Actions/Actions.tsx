import { FC, PropsWithChildren } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdArrowBack, MdDelete, MdModeEdit } from 'react-icons/md';
import { Button, HStack } from '@chakra-ui/react';
import Confirm from '../Confirm';

interface ActionsProps {
  confirmText: string;
  isRemoving: boolean;
  onRemove: () => void;
  onUpdate: () => void;
}

const Actions: FC<PropsWithChildren<ActionsProps>> = ({
  confirmText, isRemoving, children, onRemove, onUpdate,
}) => {
  const navigate = useNavigate();

  const onBack = () => navigate(-1);

  return (
    <HStack>
      <Button colorScheme="gray" onClick={onBack}>
        <MdArrowBack />
      </Button>

      {children}

      <Button
        leftIcon={<MdModeEdit />}
        colorScheme="twitter"
        onClick={onUpdate}
      >
        Редактировать
      </Button>

      <Confirm
        text={confirmText}
        isLoading={isRemoving}
        onConfirm={onRemove}
      >
        <Button leftIcon={<MdDelete />} colorScheme="red">
          Удалить
        </Button>
      </Confirm>
    </HStack>
  );
};

export default Actions;
