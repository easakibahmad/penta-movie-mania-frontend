/* eslint-disable @typescript-eslint/no-explicit-any */
const TitleDetails = ({ title }: any) => {
  return (
    <div className="flex gap-2 items-center mb-6">
      <div className="h-8 w-1 bg-yellow-400"></div>
      <h1 className="text-xl font-bold">{title}</h1>
    </div>
  );
};

export default TitleDetails;
