function Loader() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-gray-300 border-t-black rounded-full animate-spin"></div>

        <p className="text-gray-500 text-sm font-medium">Loading...</p>
      </div>
    </div>
  );
}

export default Loader;
