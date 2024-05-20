// eslint-disable-next-line react/prop-types
const ComingSoon = ({ children, message = 'Coming Soon' }) => {
  return (
    <div className="relative group">
      {children}
      <div className="absolute bottom-[-2rem] left-1/2 translate-x-[-50%] w-fit whitespace-nowrap bg-neutral-400 text-white px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-sm">
        {message} 
      </div>
    </div>
  );
};

export default ComingSoon;