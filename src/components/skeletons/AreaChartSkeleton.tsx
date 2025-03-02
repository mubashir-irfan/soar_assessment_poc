
function LineAreaChartSkeleton() {
  return (
    <div className="animate-pulse w-full h-64 relative">
      {/* Line Placeholder (Curved) */}
      <div className="absolute inset-0 flex items-center justify-around">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path
            d="M 10 90 C 25 30, 45 70, 60 20 C 75 80, 90 40, 95 60"
            stroke="url(#lineGradient)"
            strokeWidth="1" // Thin line
            fill="none"
          />
          <defs>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgb(209 213 219)" />
              <stop offset="100%" stopColor="rgb(209 213 219)" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Label Placeholders */}
      <div className="absolute bottom-0 left-0 right-0 flex justify-around">
        {Array.from({ length: 7 }).map((_, index) => (
          <div key={index} className="w-8 h-3 bg-gray-300 dark:bg-gray-600 rounded"></div>
        ))}
      </div>
    </div>
  );
}

export default LineAreaChartSkeleton;