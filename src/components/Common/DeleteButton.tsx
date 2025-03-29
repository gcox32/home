import { useState } from 'react';
import { Trash2 } from 'lucide-react';
import Modal from '@/components/Common/Modal';

interface DeleteButtonProps {
  onDelete: () => Promise<void>;
  confirmationText?: string;
  buttonClassName?: string;
  modalTitle?: string;
  iconSize?: number;
}

export default function DeleteButton({
  onDelete,
  confirmationText = 'Are you sure you want to delete this? This action cannot be undone.',
  buttonClassName,
  modalTitle = 'Confirm Delete',
  iconSize = 18
}: DeleteButtonProps) {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const handleDelete = async () => {
    await onDelete();
    setIsConfirmOpen(false);
  };

  return (
    <>
      <button
        className={`hover:bg-black/[.05] dark:hover:bg-white/[.05] p-2 rounded-full transition-colors text-black/70 dark:text-white/70 hover:text-red-500 dark:hover:text-red-400 ${buttonClassName || ''}`}
        onClick={(e) => {
          e.stopPropagation();
          setIsConfirmOpen(true);
        }}
        title="Delete"
      >
        <Trash2 size={iconSize} />
      </button>

      <Modal
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        title={modalTitle}
      >
        <div className="flex flex-col gap-6">
          <p className="text-foreground">{confirmationText}</p>
          <div className="flex justify-end gap-3">
            <button
              onClick={() => setIsConfirmOpen(false)}
              className="hover:bg-black/[.05] dark:hover:bg-white/[.05] px-4 py-2 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleDelete}
              className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg text-white transition-colors"
            >
              Delete
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
} 