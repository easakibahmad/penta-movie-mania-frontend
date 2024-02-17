/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "antd";
import CastCard from "../pages/movie_detail/movie_detail_component/CastCard";
import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";

const GroupCard = ({ type, handlePrev, startIndex, handleNext }: any) => {
  return (
    <>
      {type?.length != 0 ? (
        <div className="grid grid-cols-10 items-center gap-3">
          <Button
            className={`px-3 py-1 text-white rounded-md disabled:text-white flex items-center justify-center gap-1 `}
            onClick={handlePrev}
            disabled={startIndex === 0}
          >
            <ArrowLeftOutlined /> Prev
          </Button>
          <div className="grid grid-cols-6 col-span-8 gap-6">
            {type
              .slice(startIndex, startIndex + 6)
              .map((item: any, index: any) => {
                return (
                  <CastCard
                    key={index}
                    actorName={item.original_name}
                    characterName={item.character}
                    imageUrl={item.profile_path}
                  />
                );
              })}
          </div>
          <Button
            className={`px-3 py-1 text-white rounded-md disabled:text-white flex items-center justify-center gap-1 `}
            onClick={handleNext}
            disabled={startIndex + 6 >= type.length}
          >
            <ArrowRightOutlined />
            Next
          </Button>
        </div>
      ) : (
        <p className="text-red-500">Not found {type}</p>
      )}
    </>
  );
};

export default GroupCard;
