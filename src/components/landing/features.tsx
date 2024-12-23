export default function Features() {
  return (
    <div className="mx-auto h-full max-w-[85rem] flex-col place-items-center px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <div className="lg:grid lg:grid-cols-12 lg:items-center lg:gap-16">
        <div className="lg:col-span-7">
          <div className="grid grid-cols-12 items-center gap-2 sm:gap-6 lg:-translate-x-10">
            <div className="col-span-4">
              <img
                className="rounded-xl"
                src="https://images.unsplash.com/photo-1606868306217-dbf5046868d2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=920&q=80"
                alt="Features Image"
              />
            </div>

            <div className="col-span-3">
              <img
                className="rounded-xl"
                src="https://images.unsplash.com/photo-1605629921711-2f6b00c6bbf4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=920&q=80"
                alt="Features Image"
              />
            </div>

            <div className="col-span-5">
              <img
                className="rounded-xl"
                src="https://images.unsplash.com/photo-1600194992440-50b26e0a0309?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=920&q=80"
                alt="Features Image"
              />
            </div>
          </div>
        </div>

        <div className="mt-5 sm:mt-10 lg:col-span-5 lg:mt-0">
          <div className="space-y-6 sm:space-y-8">
            <div className="space-y-2 md:space-y-4">
              <h2 className="text-3xl font-bold text-gray-800 dark:text-neutral-200 lg:text-4xl">
                Collaborative tools to design user experience
              </h2>
              <p className="text-gray-500 dark:text-neutral-500">
                Use our tools to explore your ideas and make your vision come
                true. Then share your work easily.
              </p>
            </div>

            <ul className="space-y-2 sm:space-y-4">
              <li className="flex gap-x-3">
                <span className="mt-0.5 flex size-5 items-center justify-center rounded-full bg-blue-50 text-blue-600 dark:bg-blue-800/30 dark:text-blue-500">
                  <svg
                    className="size-3.5 shrink-0"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </span>
                <div className="grow">
                  <span className="text-sm text-gray-500 dark:text-neutral-500 sm:text-base">
                    <span className="font-bold">Less routine</span> – more
                    creativity
                  </span>
                </div>
              </li>

              <li className="flex gap-x-3">
                <span className="mt-0.5 flex size-5 items-center justify-center rounded-full bg-blue-50 text-blue-600 dark:bg-blue-800/30 dark:text-blue-500">
                  <svg
                    className="size-3.5 shrink-0"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </span>
                <div className="grow">
                  <span className="text-sm text-gray-500 dark:text-neutral-500 sm:text-base">
                    Hundreds of thousands saved
                  </span>
                </div>
              </li>

              <li className="flex gap-x-3">
                <span className="mt-0.5 flex size-5 items-center justify-center rounded-full bg-blue-50 text-blue-600 dark:bg-blue-800/30 dark:text-blue-500">
                  <svg
                    className="size-3.5 shrink-0"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </span>
                <div className="grow">
                  <span className="text-sm text-gray-500 dark:text-neutral-500 sm:text-base">
                    Scale budgets <span className="font-bold">efficiently</span>
                  </span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
