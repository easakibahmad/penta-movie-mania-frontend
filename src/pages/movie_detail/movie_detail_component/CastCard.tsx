type TProps = {
  actorName: string;
  characterName: string;
  imageUrl: string;
};
const CastCard = ({ actorName, characterName, imageUrl }: TProps) => {
  return (
    <div
      className="grid grid-cols-1 shadow-xl p-2 rounded-md"
      style={{ backgroundColor: "#1a1a1a", width: "200px", height: "200px" }}
    >
      <div className="flex justify-center">
        <img
          src={
            imageUrl
              ? `https://image.tmdb.org/t/p/w500${imageUrl}`
              : `https://media.istockphoto.com/id/1214428300/vector/default-profile-picture-avatar-photo-placeholder-vector-illustration.jpg?s=612x612&w=0&k=20&c=vftMdLhldDx9houN4V-g3C9k0xl6YeBcoB_Rk6Trce0=`
          }
          alt="image not found"
          className=" object-cover rounded-full" style={{width: "120px", height: "120px"}}
        />
      </div>
      <div className="flex justify-center">
        <div>
          <h3 className="text-md font-semibold">
            {actorName ? actorName : "Unknown"}
          </h3>
          <p className="text-gray-600">
            {characterName ? characterName : "Unknown"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CastCard;
