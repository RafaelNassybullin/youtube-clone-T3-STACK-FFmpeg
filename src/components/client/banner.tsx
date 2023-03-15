export const Banner = ({ image }: { image: string }) => {
  return (
    <div className="mx-auto w-full cursor-pointer p-4 pb-0 2xl:container">
      <div className="w-full overflow-hidden rounded-[15px]">
        <img className="h-full w-full object-cover" src={image} alt="" />
      </div>
    </div>
  );
};
1;
