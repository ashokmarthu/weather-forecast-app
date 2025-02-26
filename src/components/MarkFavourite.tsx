import { Coordinates } from "@/api/types";
import { RootState } from "@/store/store";
import {
  removeFromFavourites,
  setUserFavourites,
} from "@/store/userSelectionSlice";
import { CiStar } from "react-icons/ci";
import { FaStar } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";

interface MarkFavouriteProps {
  coordinates: Coordinates;
}

const MarkFavourite = ({ coordinates }: MarkFavouriteProps) => {
  const dispatch = useDispatch();
  const favorites = useSelector(
    (store: RootState) => store.userSelection.favourites
  );

  const isSelected = favorites.some(
    (fav) => fav.lat === coordinates.lat && fav.lon === coordinates.lon
  );

  const handleClick = () => {
    if (isSelected) {
      dispatch(removeFromFavourites(coordinates));
    } else {
      dispatch(
        setUserFavourites({
          lat: coordinates.lat,
          lon: coordinates.lon,
        })
      );
    }
  };

  return (
    <div className="flex gap-2 md:justify-end py-1">
      <h1 className="text-xl font-bold tracking-tight">Mark as Favorite</h1>
      <button
        className={`hover:text-yellow-600 ${
          isSelected ? "text-yellow-500" : ""
        }`}
        onClick={handleClick}
      >
        {isSelected ? (
          <FaStar className="h-6 w-6 fill-yellow-400" />
        ) : (
          <CiStar className="h-6 w-6" />
        )}
      </button>
    </div>
  );
};
export default MarkFavourite;
