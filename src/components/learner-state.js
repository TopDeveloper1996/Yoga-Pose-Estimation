const LearnerState = ({ level, time, percent }) => {
  return (
    <div className="absolute x-80 y-10 top-0 right-0 inline-flex bg-transparent items-center mt-2 mr-3">
      <div
        className="ml-1 flex justify-between w-full rounded-md  px-1 bg-white text-[12px] font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 text-right items-center"
        aria-haspopup="true"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="size-6 text-[#004392]"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.242 5.992h12m-12 6.003H20.24m-12 5.999h12M4.117 7.495v-3.75H2.99m1.125 3.75H2.99m1.125 0H5.24m-1.92 2.577a1.125 1.125 0 1 1 1.591 1.59l-1.83 1.83h2.16M2.99 15.745h1.125a1.125 1.125 0 0 1 0 2.25H3.74m0-.002h.375a1.125 1.125 0 0 1 0 2.25H2.99"
          />
        </svg>
        <span className="flex float-right ml-1 w-2 text-[#004392]">
          {level}
        </span>
      </div>
      <div
        className="ml-1 flex justify-between w-full rounded-md  px-1 text-[12px] font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 text-right items-center"
        aria-haspopup="true"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="size-6 text-[#004392]"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
        </svg>

        <span className="inline-flex float-right ml-1 text-[#004392]">
          {time}
        </span>
      </div>
      <div className="mx-3 flex h-full font-semibold text-[#004392]">
        <span>Match:</span>
        {90 <= Number(percent) && Number(percent) <= 100 ? (
          <span className="text-green-600">{percent}</span>
        ) : Number(percent) < 50 ? (
          <span className="text-red-500">{percent}</span>
        ) : (
          <span className="text-gray-600">{percent}</span>
        )}
        <span>%</span>
      </div>
    </div>
  );
};

export default LearnerState;
