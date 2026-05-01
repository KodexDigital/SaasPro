import type { ModalProps } from "@/types/modalProps";

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  footer,
}: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white w-full max-w-md rounded-xl shadow-lg">

        {/* HEADER */}
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-semibold">{title}</h2>

          <button
            onClick={onClose}
            className="text-gray-500 hover:text-black"
            aria-label="Close modal"
          >
            ✕
          </button>
        </div>

        {/* BODY */}
        <div className="p-4">{children}</div>

        {/* FOOTER */}
        {footer && (
          <div className="p-4 border-t flex justify-end gap-2">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}