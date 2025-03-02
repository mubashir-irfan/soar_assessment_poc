
function TransactionEntrySkeleton() {
  return (
    <div className="flex items-center gap-4 py-1 animate-pulse">
      <div className="w-[3.4375rem] h-[3.4375rem] sm:w-[3.125rem] sm:h-[3.125rem] rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center">
        <div className="w-5 h-5 sm:w-7 sm:h-7 bg-gray-400 dark:bg-gray-500 rounded-full"></div>
      </div>
      <div className="ms-auto h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/5"></div>
      <div className="ms-auto h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/5"></div>
    </div>
  );
}

export default TransactionEntrySkeleton;