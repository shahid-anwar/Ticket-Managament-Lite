function EmptyState({ hasFilters, onClearFilters }) {
  return (
    <div className="bg-white border border-dashed border-gray-300 rounded-3xl py-20 flex flex-col items-center justify-center text-center">
      <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-5 text-3xl">
        🎫
      </div>

      <h3 className="text-2xl font-semibold text-gray-800">
        {hasFilters ? "No Matching Tickets" : "No Tickets Found"}
      </h3>

      <p className="text-gray-500 mt-2 max-w-md">
        {hasFilters
          ? "No tickets match your current filters or search query."
          : "No tickets have been added yet."}
      </p>

      {hasFilters && (
        <button
          onClick={onClearFilters}
          className="mt-6 bg-black text-white px-5 py-3 rounded-xl font-medium hover:opacity-90 transition"
        >
          Clear Filters
        </button>
      )}
    </div>
  );
}

export default EmptyState;
