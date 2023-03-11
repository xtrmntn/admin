import { FC, PropsWithChildren } from 'react';
import {
  Button,
  HStack,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
  useDisclosure,
} from '@chakra-ui/react';

interface ConfirmProps {
  text: string;
  isLoading: boolean;
  onConfirm: () => void;
}

const Confirm: FC<PropsWithChildren<ConfirmProps>> = ({
  text, isLoading, children, onConfirm,
}) => {
  const { onOpen, onClose, isOpen } = useDisclosure();

  return (
    <Popover
      placement="top"
      isOpen={isOpen}
      onOpen={onOpen}
      onClose={onClose}
    >
      <PopoverTrigger>
        {children}
      </PopoverTrigger>

      <PopoverContent>
        <PopoverArrow />

        <PopoverCloseButton />

        <PopoverHeader>Вы уверены?</PopoverHeader>

        <PopoverBody whiteSpace="initial">
          {text}
        </PopoverBody>

        <PopoverFooter>
          <HStack justifyContent="flex-end">
            <Button
              colorScheme="gray"
              variant="outline"
              onClick={onClose}
            >
              Нет
            </Button>

            <Button
              colorScheme="red"
              isLoading={isLoading}
              onClick={onConfirm}
            >
              Да
            </Button>
          </HStack>
        </PopoverFooter>
      </PopoverContent>
    </Popover>
  );
};

export default Confirm;
