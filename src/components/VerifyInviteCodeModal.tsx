import { X } from 'react-feather';

type VerifyInviteCodeModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const VerifyInviteCodeModal = ({ isOpen, onClose }: VerifyInviteCodeModalProps) => {
  return (
    isOpen && (
      <>
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40"></div>
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="relative bg-black bg-opacity-80 rounded-lg shadow-lg p-8 max-w-md w-full flex flex-col justify-center items-center neomorphic">
            <X className="absolute right-4 top-4" onClick={onClose} size={30} />
            <h2 className="text-2xl text-center font-bold mb-4">Verify to Unlock</h2>
            <p className="text-gray-400 mb-6 text-center">Enter your Unlock Code to get this reward. </p>
            <input
              type="text"
              placeholder="Enter Unlock Code"
              className="w-[50%] mx-auto border border-gray-300 rounded-md py-2 px-4 mb-4 focus:outline-none  bg-transparent text-center"
            />
            <button className="w-[50%] fancy-button text-white py-2 px-6 rounded-lg">
              <span className="text-2xl">Unlock</span>
            </button>
            <p className=" text-gray-400 text-xs mt-3" >
              {' '}
              Don&apos;t have this Code? Request{' '}
              <a href="https://t.me/getwalletx" target="_blank" rel="noopener noreferrer" className="text-blue-500">
                here
              </a>{' '}
            </p>
          </div>
        </div>
      </>
    )
  );
};

export default VerifyInviteCodeModal;
