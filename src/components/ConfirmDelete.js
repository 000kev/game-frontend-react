import { forwardRef } from "react";

const Dialog = forwardRef(function ConfirmDelete({ onNo, onYes }, ref) {
  return (
    <dialog
      className="fixed bg-[#1815C7]/[.9] py-10 text-center rounded-full"
      ref={ref}
    >
      <p className="text-white text-2xl px-20">
        Are you sure you want to delete this team?
      </p>
      <span className="flex flex-row justify-center gap-x-10 py-10">
        <button
          className="bg-sky-200/[.6] px-5 py-1 text-3xl font-bold text-blue-700 rounded-3xl"
          onClick={onYes}
        >
          Yes
        </button>
        <button
          className="bg-red-200/[.6] px-5 py-1 text-3xl font-bold text-red-800/[.8] rounded-3xl"
          onClick={onNo}
        >
          No
        </button>
      </span>
    </dialog>
  );
});

export default Dialog;
