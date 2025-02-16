const Skeleton = () => {
  return (
    <div className="relative flex flex-col gap-y-3">
      <div className="grid md:grid-cols-2 gap-4 max-h-full animate-pulse">
        <div className="bg-gray-200/50 h-64 rounded shadow border"></div>
        <div className="bg-gray-200/50 h-64 rounded shadow border"></div>
        <div className="bg-gray-200/50 h-64 rounded shadow border"></div>
        <div className="bg-gray-200/50 h-64 rounded shadow border"></div>
      </div>
    </div>
  );
};

export default Skeleton;
