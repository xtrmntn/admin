import { FC, lazy } from 'react';
import { MdAdd } from 'react-icons/md';
import { Button, ModalHeader, useDisclosure } from '@chakra-ui/react';
import { withSuspense } from '@/hoc/withSuspense';
import Modal from '@/components/common/Modal';

interface CreateCategoryProps {
  parentId?: number;
}

const CreateCategoryForm = withSuspense(lazy(() => import('./CreateCategoryForm')), { margin: '30px' });

const CreateCategory: FC<CreateCategoryProps> = ({ parentId }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button
        leftIcon={<MdAdd />}
        width="fit-content"
        onClick={onOpen}
      >
        Добавить
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalHeader>Новая категория</ModalHeader>
        <CreateCategoryForm parentId={parentId} onClose={onClose} />
      </Modal>
    </>
  );
};

export default CreateCategory;
