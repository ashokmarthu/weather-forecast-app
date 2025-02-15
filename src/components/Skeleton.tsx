const Skeleton = () => {
  return (
    <div className="flex flex-col gap-y-3 relative">
      <div className="border sticky top-0 h-24"></div>
      <div className="grid md:grid-cols-2 gap-4 max-h-full animate-pulse">
        <div className="bg-gray-200 h-64 rounded shadow border"></div>
        <div className="bg-gray-200 h-64 rounded shadow border"></div>
        <div className="bg-gray-200 h-64 rounded shadow border"> </div>
        <div className="bg-gray-200 h-64 rounded shadow border"></div>
      </div>
      <p className="text-center text-3xl leading-tight animate-bounce">
        Please while we Load your Data
      </p>
    </div>
  );
};

export default Skeleton;
