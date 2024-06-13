// eslint-disable-next-line react/prop-types
const ComingSoon = ({ children, message = 'Coming Soon' }) => {
  return (
    <div className="relative group">
      {children}
      <div className=" top-[1.6rem] left-1/2 translate-x-[-50%] whitespace-nowrap absolute  w-fit  bg-white bg-opacity-10 text-gray-200 px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-sm">
        {message}
      </div>
    </div>
  );
};

export default ComingSoon;
