import { IoCloudOffline } from "react-icons/io5";
import { OFFLINE_MESSAGE } from "./utils/constants";

const Offline = () => {
  return (
    <div className="flex flex-col items-center gap-2 justify-center py-8">
      <IoCloudOffline className="h-20 w-20 animate-pulse" />
      <h2 className="text-2xl">{OFFLINE_MESSAGE} </h2>
      <small className="text-xl">
        Try, Checking the network cables, modem, and router Reconnecting to
        Wi-Fi / Internet Connection
      </small>
    </div>
  );
};

export default Offline;
