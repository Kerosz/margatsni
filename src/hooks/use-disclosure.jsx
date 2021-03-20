import { useState, useCallback } from 'react';

export default function useDisclosure() {
  const [isOpenState, setIsOpen] = useState(false);

  const onClose = useCallback(() => setIsOpen(false), []);
  const onOpen = useCallback(() => setIsOpen(true), []);
  const onToggle = useCallback(() => {
    const action = isOpenState ? onClose : onOpen;

    action();
  }, [isOpenState, onOpen, onClose]);

  return { isOpen: !!isOpenState, onOpen, onClose, onToggle };
}
