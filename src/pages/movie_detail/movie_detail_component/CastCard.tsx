type TProps = {
  actorName: string;
  characterName: string;
  imageUrl: string;
};
const CastCard = ({ actorName, characterName, imageUrl }: TProps) => {
  return (
    <div
      className="grid grid-cols-1 shadow-xl p-2 gap-3 rounded-md"
      style={{ backgroundColor: "#1a1a1a", height: "180px"}}
    >
      <div className="flex justify-center">
        <img
          src={
            imageUrl
              ? `https://image.tmdb.org/t/p/w500${imageUrl}`
              : `https://media.istockphoto.com/id/1214428300/vector/default-profile-picture-avatar-photo-placeholder-vector-illustration.jpg?s=612x612&w=0&k=20&c=vftMdLhldDx9houN4V-g3C9k0xl6YeBcoB_Rk6Trce0=`
          }
          alt="image not found"
          className=" object-cover rounded-full"
          style={{ width: "110px", height: "110px" }}
        />
      </div>
      <div className="flex justify-center">
        <div>
          <h3 className="text-sm font-semibold">
            {actorName ? actorName.split(" ").slice(0, 2).join(" ") : "Unknown"}
          </h3>
          <p className="text-gray-600 text-sm">
            {characterName
              ? characterName.split(" ").slice(0, 2).join(" ")
              : "Unknown"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CastCard;
