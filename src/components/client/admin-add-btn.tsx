export const AdminAddBtn = ({
  modalOpen,
  param,
}: {
  modalOpen: () => void;
  param: string;
}) => {
  return (
    <div
      onClick={modalOpen}
      className={`mt-[40px] mb-[40px] h-fit w-fit cursor-pointer rounded-[10px] border-[1px] border-[color:var(--color-text-orange)] bg-[color:var(--color-card-dark)] px-4 py-2 text-center text-3xl capitalize text-[color:var(--color-text-orange)]`}
    >
      Add new {param}
    </div>
  );
};
