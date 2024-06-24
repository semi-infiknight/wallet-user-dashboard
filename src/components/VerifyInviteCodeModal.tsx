import { X } from 'react-feather';
import { useState } from 'react';
import axiosClient from '../services/config/axiosClient';
import { apiRoutes } from '../services/apiRoutes';

type VerifyInviteCodeModalProps = {
  isOpen: boolean;
  rewardsStatusRefetch: () => void;
  onClose: () => void;
};

const VerifyInviteCodeModal = ({ isOpen, onClose, rewardsStatusRefetch }: VerifyInviteCodeModalProps) => {
  const [inviteCode, setInviteCode] = useState('');
  const [message, setMessage] = useState('');

  const handleUnlock = async (e: any) => {
    e.preventDefault();
    try {
      const response = await axiosClient.get(`${apiRoutes.verifyInviteCode}${inviteCode}`, {});

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { status, message, isFound, isInvited } = response as any;

      if (status === 200 && isFound && !isInvited) {
        // Invite code is valid and not yet invited
        setMessage(message);

        rewardsStatusRefetch();
        onClose();
        // Perform any additional actions or update the UI accordingly
      } else {
        // Invite code is invalid or already invited
        setMessage(message);
        // Display an error message or update the UI accordingly
      }
    } catch (error) {
      setMessage('Something went wrong. Please try again later or Contact us on telegram for help');
      // Display an error message or update the UI accordingly
    }
  };

  return (
    isOpen && (
      <>
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40"></div>
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <form onSubmit={(e)=>handleUnlock(e)} className="relative bg-black bg-opacity-80 rounded-lg shadow-lg p-8 max-w-md w-full flex flex-col justify-center items-center neomorphic">
            <X
              className="absolute right-4 top-4"
              onClick={() => {
                onClose();
                setInviteCode('');
                setMessage('');
              }}
              size={30}
            />
            <h2 className="text-2xl text-center font-bold mb-4">Verify to Unlock</h2>
            <p className="text-gray-400 mb-6 text-center">Enter your Unlock Code to get this reward. </p>
            <input
              type="text"
              placeholder="Enter Unlock Code"
              className="w-fit mx-auto border border-gray-300 rounded-md py-2 px-4 mb-4 focus:outline-none bg-transparent text-center uppercase"
              value={inviteCode}
              onChange={(e) => {
                setInviteCode(e.target.value.toUpperCase());
                setMessage('');
              }}
            />
            {message && <p className="text-red-500 text-sm mb-4 text-center">{message}</p>}
            <button className="w-[50%] fancy-button text-white py-2 px-6 rounded-lg text-2xl" type='submit'>
              Unlock
            </button>
            <p className="text-gray-400 text-xs mt-3">
              {' '}
              Don&apos;t have this Code? Request{' '}
              <a href="https://t.me/getwalletx" target="_blank" rel="noopener noreferrer" className="text-blue-500">
                here
              </a>{' '}
            </p>
          </form>
        </div>
      </>
    )
  );
};

export default VerifyInviteCodeModal;
