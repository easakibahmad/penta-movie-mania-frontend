type TTitle = { title: string };
const Title = ({ title }: TTitle) => {
  return (
    <div className="flex gap-2 items-center mb-6">
      <div className="h-8 w-1 bg-yellow-400"></div>
      <h1 className="sm:text-xl text-md font-bold">{title}</h1>
    </div>
  );
};

export default Title;
