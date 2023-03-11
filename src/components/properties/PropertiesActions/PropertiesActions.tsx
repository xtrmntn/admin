import { FC } from 'react';
import { MdDelete, MdModeEdit } from 'react-icons/md';
import { HStack, IconButton } from '@chakra-ui/react';
import Tooltip from '@/components/common/Tooltip';
import Confirm from '@/components/common/Confirm';

interface PropertiesActionsProps {
  isRemoving: boolean;
  onRemove: () => void;
  onUpdate: () => void;
}

const PropertiesActions: FC<PropertiesActionsProps> = ({ isRemoving, onRemove, onUpdate }) => (
  <HStack>
    <Tooltip label="Редактировать">
      <IconButton
        size="sm"
        icon={<MdModeEdit />}
        aria-label="Редактировать"
        colorScheme="twitter"
        onClick={onUpdate}
      />
    </Tooltip>

    <Confirm
      text="Вы действительно хотите удалить характеристику?"
      isLoading={isRemoving}
      onConfirm={onRemove}
    >
      <IconButton
        size="sm"
        icon={<MdDelete />}
        aria-label="Удалить"
        colorScheme="red"
      />
    </Confirm>
  </HStack>
);

export default PropertiesActions;
