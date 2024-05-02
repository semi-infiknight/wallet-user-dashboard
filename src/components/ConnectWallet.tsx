/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import { useEffect, useState } from 'react';
import { UserDetailsType } from '../utils/Types';
import { UserType } from '../utils/Enum';

// import { Buffer } from 'buffer';

type ConnectWalletType = {
  isLoggedIn: (_userDetails: UserDetailsType) => void;
};

const ConnectWallet = ({ isLoggedIn }: ConnectWalletType) => {
  const [providerDetails, setProviderDetails] = useState<any[]>([]);
  const [walletXProvider, setWalletXProvider] = useState<any>(null);

  const [userAddress, setUserAddress] = useState('');

  const detectEip6963 = () => {
    window.addEventListener('eip6963:announceProvider:walletx', (event) => {
      if (event.detail.info.uuid) {
        handleNewProviderDetail(event.detail);
      }
    });
    window.dispatchEvent(new Event('eip6963:requestProvider:walletx'));
  };

  const existsProviderDetail = (newProviderDetail: any) => {
    const existingProvider = providerDetails.find(
      (providerDetail) =>
        providerDetail.info && newProviderDetail.info && providerDetail.info.uuid === newProviderDetail.info.uuid,
    );
    if (existingProvider) {
      if (
        existingProvider.info.name !== newProviderDetail.info.name ||
        existingProvider.info.rdns !== newProviderDetail.info.rdns ||
        existingProvider.info.image !== newProviderDetail.info.image
      ) {
        console.error(
          `Received new ProviderDetail with name "${newProviderDetail.info.name}", rdns "${newProviderDetail.info.rdns}, image "${newProviderDetail.info.image}, and uuid "${existingProvider.info.uuid}" matching uuid of previously received ProviderDetail with name "${existingProvider.info.name}", rdns "${existingProvider.info.rdns}", and image "${existingProvider.info.image}"`,
        );
      }
      console.log(
        `Ignoring ProviderDetail with name "${newProviderDetail.info.name}", rdns "${newProviderDetail.info.rdns}", and uuid "${existingProvider.info.uuid}" that was already received before`,
      );
      return true;
    }
    return false;
  };

  const handleNewProviderDetail = (newProviderDetail: any) => {
    if (existsProviderDetail(newProviderDetail)) {
      return;
    }

    // Check if the provider is "WalletX" and store it in walletXProvider state
    if (newProviderDetail.info.name === 'WalletX') {
      setWalletXProvider(newProviderDetail.provider);
    }

    // Store only unique providers based on their name
    const uniqueProviders = Array.from(
      new Set([...providerDetails, newProviderDetail].map((provider) => provider.info.name)),
    ).map((name) => {
      return [...providerDetails, newProviderDetail].find((provider) => provider.info.name === name);
    });

    setProviderDetails(uniqueProviders);
  };

  const authenticateUser = async (_signature: string) => {
    const data = {
      address: userAddress,
      signature: _signature,
    };
    const result = await axios.post(`https://api.getwalletx.com/auth/authenticate`, data);

    console.log('this is authenticate user', result);
    isLoggedIn(result.data.data);
  };

  const getProviderSignature = async (_msg: string) => {
    console.log('this is getProviderSignature');
    try {
      const from = userAddress;
      // const msg = `0x${Buffer.from(_msg, 'utf8').toString('hex')}`;
      const msg = String(_msg);

      const sign = await walletXProvider.request({
        method: 'personal_sign',
        params: [msg, from, 'Example password'],
      });

      console.log(sign);
      authenticateUser(String(sign));
    } catch (err) {
      console.error(err);
    }
  };

  const getAuthMsg = async (_address: string) => {
    const result = await axios.get(`https://api.getwalletx.com/auth/message/?address=${_address}`);

    const msg = result.data.data.message;
    console.log(msg);
    await getProviderSignature(msg);
  };

  const initializeProvider = async () => {
    // walletXProvider.autoRefreshOnNetworkChange = false;

    try {
      // await walletXProvider.enable();
      const newAccounts = await walletXProvider.request({
        method: 'eth_accounts',
      });
      // handleNewAccounts(newAccounts);
      console.log(newAccounts);
      setUserAddress(newAccounts[0]);
      // await getAuthMsg(newAccounts[0]);
      // isLoggedIn({
      //   name: '',
      //   address: newAccounts[0],
      // });
      console.log(walletXProvider.isConnected());
    } catch (err) {
      console.error('Error on init when getting accounts', err);
    }
  };

  useEffect(() => {
    detectEip6963();
  }, []);

  const disconnectWallet = async () => {
    try {
      await walletXProvider.request({
        method: 'disconnect',
        params: [{ userAddress }],
      });
    } catch (err) {
      console.log(err);
    }
  };

  console.log(providerDetails);
  console.log(walletXProvider);

  return (
    <div className=" flex ">
      <button
        onClick={() => {
          // initializeProvider();
          isLoggedIn({
            address: '0x123asdfa123',
            completedTasks: [],
            earnedEXP: 10,
            role: UserType.USER,
            userName: 'Shakti',
          });
        }}
        className="border-2 hover:border-[#cff500] text-black px-4 py-2 rounded-xl font-semibold font-sans tracking-wide bg-white shadow-lg"
      >
        Connect Wallet
      </button>

      <button
        onClick={() => {
          disconnectWallet();
        }}
        className="border-2 hover:border-[#cff500] text-black px-4 py-2 rounded-xl font-semibold font-sans tracking-wide bg-white shadow-lg"
      >
        Disconnect Wallet
      </button>
    </div>
  );
};

export default ConnectWallet;
