import { useState, useCallback } from 'react';

export default function useModal() {
  const [isOpenState, setIsOpen] = useState(false);

  const onClose = useCallback(() => setIsOpen(false), []);
  const onOpen = useCallback(() => setIsOpen(true), []);

  return { isOpen: !!isOpenState, onOpen, onClose };
}
