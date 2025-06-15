
const CentralSun = () => {
  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full shadow-2xl flex items-center justify-center z-20">
      <span className="text-white font-bold text-sm">ME</span>
      <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full animate-pulse"></div>
    </div>
  );
};

export default CentralSun;
