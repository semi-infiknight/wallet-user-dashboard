/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ForwardedRef, forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CONNECT_WALLET_BTN } from '../utils/Enum';
import { removeFromLocalStorage, setToLocalStorage } from '../utils/helper';
import { apiRoutes } from '../services/apiRoutes';
import { axiosGet, axiosPost } from '../services/axios';

type ConnectWalletType = {
  btnType: CONNECT_WALLET_BTN;
  navigateTo: string;
};

// eslint-disable-next-line react/display-name
const ConnectWallet = forwardRef(({ btnType, navigateTo }: ConnectWalletType, ref: ForwardedRef<unknown>) => {
  useImperativeHandle(ref, () => {
    return {
      disconnectWallet: disconnectWallet,
    };
  });

  const [providerDetails, setProviderDetails] = useState<any[]>([]);
  const [walletXProvider, setWalletXProvider] = useState<any>(null);
  const navigate = useNavigate();

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

  const handleLogIn = () => {
    setToLocalStorage('authenticated', true);
    setToLocalStorage('userAddress', userAddress);
    navigate(navigateTo);
  };

  const handleLogOut = () => {
    setToLocalStorage('authenticated', false);
    removeFromLocalStorage('authenticated');
    navigate(navigateTo);
  };

  const authenticateUser = async (_signature: string) => {
    const data = {
      address: userAddress,
      signature: _signature,
    };
    const result = await axiosPost(apiRoutes.authenticate, data);

    console.log('this is authenticate user', result);
    // isLoggedIn(result.data.data);
    handleLogIn();
  };

  const getProviderSignature = async (_msg: string) => {
    console.log('this is getProviderSignature');
    try {
      const from = userAddress;
      // const msg = `0x${Buffer.from(_msg, 'utf8').toString('hex')}`;
      const msg = String(_msg);
      await walletXProvider.enable();
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
    console.log('THis is the address for the auth message', _address);
    const result = await axiosGet(apiRoutes.getSignMessage + _address);
    console.log('this is the auth api result ', result);

    const msg = result.data.message;
    console.log(msg);
    await getProviderSignature(msg);
  };

  const initializeProvider = async () => {
    // walletXProvider.autoRefreshOnNetworkChange = false;

    try {
      await walletXProvider.enable();
      const newAccounts = await walletXProvider.request({
        method: 'eth_accounts',
      });
      console.log(newAccounts);
      setUserAddress(newAccounts[0]);
      await getAuthMsg(String(newAccounts[0]).toLowerCase());

      console.log(walletXProvider);
    } catch (err) {
      console.error('Error on init when getting accounts', err);
    }
  };

  useEffect(() => {
    detectEip6963();
  }, []);

  // eslint-disable-next-line no-unused-vars
  const disconnectWallet = async () => {
    try {
      await walletXProvider.enable();
      await walletXProvider.request({
        method: 'disconnect',
        params: [{ userAddress }],
      });

      handleLogOut();
    } catch (err) {
      console.log(err);
    }
  };

  console.log(providerDetails);
  console.log(walletXProvider);

  return btnType !== CONNECT_WALLET_BTN.CONNECT ? (
    <></>
  ) : (
    <div className=" flex ">
      <button
        onClick={() => {
          initializeProvider();
        }}
        className="border-2 hover:border-[#cff500] text-black px-4 py-2 rounded-xl font-semibold font-sans tracking-wide bg-white shadow-lg"
      >
        Connect Wallet
      </button>
    </div>
  );
});

export default ConnectWallet;
