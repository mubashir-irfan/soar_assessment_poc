import { CardChip } from "..";

function CardSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="flex flex-col rounded-[1.5rem] overflow-hidden sm:rounded-[1.5625rem] w-[16.5rem] min-w-[16.5rem] sm:w-[21.875rem] sm:min-w-[21.875rem] h-[10.625rem] sm:h-[14.6875rem] bg-gray-200 dark:bg-gray-700">
        <div className="px-[1.25rem] py-2 sm:py-4 flex-grow flex flex-col justify-around">
          <div className="flex justify-between items-start mt-4">
            <div className="h-4 bg-gray-400 dark:bg-gray-500 rounded w-1/4"></div>
            <div
              className={`w-[1.8125rem] h-[1.8125rem] sm:w-[2.1875rem] sm:h-[2.1875rem] me-3 ${'text-active'
                }`}
            >
              <CardChip />
            </div>
          </div>

          <div className='w-3/4 flex justify-between'>
            <div className="h-4 bg-gray-400 dark:bg-gray-500 rounded w-1/4"></div>
            <div className="h-4 bg-gray-400 dark:bg-gray-500 rounded w-1/4"></div>
          </div>
        </div>

        <div className="flex justify-between px-[1.25rem] py-[0.75rem] sm:py-[0.9375rem] items-center w-full bg-gray-300 dark:bg-gray-600">
          <div className="h-4 bg-gray-400 dark:bg-gray-500 rounded w-1/2"></div>
          <div className="w-[2.1875rem] h-[2.1875rem] bg-gray-400 dark:bg-gray-500 rounded-full"></div>
        </div>
      </div>
    </div>
  );
}

export default CardSkeleton