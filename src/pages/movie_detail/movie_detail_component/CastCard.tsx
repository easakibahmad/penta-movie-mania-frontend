type TProps = {
  actorName: string;
  characterName: string;
  imageUrl: string;
};
const CastCard = ({ actorName, characterName, imageUrl }: TProps) => {
  return (
    <div
      className="flex items-center shadow-xl "
      style={{ backgroundColor: "#1a1a1a" }}
    >
      <div>
        <img
          src={
            imageUrl
              ? `https://image.tmdb.org/t/p/w500${imageUrl}`
              : `https://media.istockphoto.com/id/1214428300/vector/default-profile-picture-avatar-photo-placeholder-vector-illustration.jpg?s=612x612&w=0&k=20&c=vftMdLhldDx9houN4V-g3C9k0xl6YeBcoB_Rk6Trce0=`
          }
          alt="image not found"
          className="h-24 w-24 object-cover rounded-full mr-4 p-2"
        />
      </div>
      <div>
        <h3 className="text-lg font-semibold">
          {" "}
          {actorName ? actorName : "Unknown"}
        </h3>
        <p className="text-gray-600">
          {characterName ? characterName : "Unknown"}
        </p>
      </div>
    </div>
  );
};

export default CastCard;
