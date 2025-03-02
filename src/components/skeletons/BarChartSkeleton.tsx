
function BarChartSkeleton() {
  return (
    <div className="animate-pulse w-full h-64 relative">
      <div className="absolute top-4 right-4 flex space-x-4">
        <div className="w-12 h-3 bg-gray-300 dark:bg-gray-600 rounded"></div>
        <div className="w-12 h-3 bg-gray-300 dark:bg-gray-600 rounded"></div>
      </div>
      <div className="absolute inset-0 flex flex-col justify-end">
        <div className="flex justify-around mb-2">
          {Array.from({ length: 7 }).map((_, index) => (
            <div key={index} className="w-6 h-24 bg-gray-300 dark:bg-gray-600 rounded-t-lg"></div>
          ))}
        </div>
        <div className="flex justify-around">
          {Array.from({ length: 7 }).map((_, index) => (
            <div key={index} className="w-6 h-4 bg-gray-300 dark:bg-gray-600 rounded"></div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default BarChartSkeleton;