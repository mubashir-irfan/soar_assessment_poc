function QuickTransferWidgetSkeleton() {
  return (
    <div className="px-3 py-6 sm:px-6 sm:py-9 flex flex-col justify-between gap-6 w-full max-w-full animate-pulse">
      {/* Contacts Section Skeleton */}
      <section aria-label="Contacts Skeleton">
        <div className="flex items-center whitespace-nowrap mb-4">
          <div className="flex space-x-2 max-w-[60vw]">
            {/* Contact Skeletons */}
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="flex flex-col items-center p-1">
                <div className="rounded-full w-[40px] h-[40px] bg-gray-300 dark:bg-gray-600"></div>
                <div className="mt-1 w-16 h-3 bg-gray-300 dark:bg-gray-600 rounded"></div>
                <div className="mt-1 w-12 h-3 bg-gray-300 dark:bg-gray-600 rounded"></div>
              </div>
            ))}
          </div>
          <div className="ms-auto shrink-0">
            <div className="rounded-full w-[50px] h-[50px] bg-gray-300 dark:bg-gray-600"></div>
          </div>
        </div>
      </section>

      {/* Amount Section Skeleton */}
      <section aria-label="Amount Transfer Skeleton">
        <div className="flex items-center gap-4 max-w-[24rem] mx-auto">
          <div className="w-20 h-4 bg-gray-300 dark:bg-gray-600 rounded"></div>
          <div className="relative flex-grow">
            <div className="w-full h-10 bg-gray-300 dark:bg-gray-600 rounded-[50px]"></div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default QuickTransferWidgetSkeleton;
