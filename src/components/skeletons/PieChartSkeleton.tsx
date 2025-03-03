function PieChartSkeleton() {
  return (
    <div className="animate-pulse w-full h-64 relative">
      <div className="absolute top-4 right-4 flex flex-col space-y-2">
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-gray-300 dark:bg-gray-600"></div>
            <div className="w-16 h-3 bg-gray-300 dark:bg-gray-600 rounded"></div>
          </div>
        ))}
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-60 h-60 rounded-full bg-gray-300 dark:bg-gray-600"></div>
      </div>
    </div>
  );
}

export default PieChartSkeleton;
