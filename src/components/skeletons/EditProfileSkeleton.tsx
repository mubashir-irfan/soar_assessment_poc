

function EditProfileSkeleton() {
  return (
    <div className="animate-pulse w-full">
      <div className="grid lg:grid-cols-[20%_80%] items-start">
        <div className="flex flex-col items-center mb-4 md:mb-0">
          <div className="rounded-full w-24 h-24 bg-gray-300 dark:bg-gray-600"></div>
        </div>
        <div className="grid gap-8 md:grid-cols-2 md:gap-20 w-full">
          {["name", "userName", "email", "password"].map((field) => (
            <div key={field} className="mb-4 md:mb-0">
              <div className="h-10 bg-gray-300 dark:bg-gray-600 rounded w-full"></div>
            </div>
          ))}
          {["dateOfBirth", "presentAddress", "permanentAddress", "city", "postalCode", "country"].map((field) => (
            <div key={field} className="mb-4 md:mb-0">
              <div className="h-10 bg-gray-300 dark:bg-gray-600 rounded w-full"></div>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-4 md:text-right">
        <div className="flex flex-col items-center md:flex-row md:justify-end gap-2">
          <div className="w-full h-10 md:w-20 bg-gray-300 dark:bg-gray-600 rounded"></div>
          <div className="h-5 md:h-10 w-20 bg-gray-300 dark:bg-gray-600 rounded"></div>
        </div>
      </div>
    </div>
  );
}

export default EditProfileSkeleton;