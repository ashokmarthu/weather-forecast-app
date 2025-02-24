import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import FavouriteCity from "./FavouriteCity";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

const FavouriteLocations = () => {
  const favorites = useSelector(
    (store: RootState) => store.userSelection.favourites
  );

  return favorites.length ? (
    <>
      <h1 className="text-xl font-bold tracking-tight py-1">Favorites</h1>
      <ScrollArea className="w-full pb-4">
        <div className="flex gap-4">
          {favorites.map((city) => (
            <FavouriteCity key={city.id} {...city} />
          ))}
        </div>
        <ScrollBar orientation="horizontal" className="mt-2" />
      </ScrollArea>
    </>
  ) : null;
};

export default FavouriteLocations;
