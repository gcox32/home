import { useState } from 'react';
import { Trash2 } from 'lucide-react';
import Modal from '@/components/Common/Modal';
import styles from './styles.module.css';

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
        className={`${styles.deleteButton} ${buttonClassName || ''}`}
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
        <div className={styles.confirmDialog}>
          <p>{confirmationText}</p>
          <div className={styles.confirmActions}>
            <button
              onClick={() => setIsConfirmOpen(false)}
              className={styles.cancelButton}
            >
              Cancel
            </button>
            <button
              onClick={handleDelete}
              className={styles.confirmDeleteButton}
            >
              Delete
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
} 