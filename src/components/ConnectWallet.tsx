/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ForwardedRef, forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CONNECT_WALLET_BTN } from '../utils/Enum';
import { removeFromLocalStorage, setToLocalStorage } from '../utils/helper';
import { apiRoutes } from '../services/apiRoutes';
import { axiosGet, axiosPost } from '../services/axios';
import toast from 'react-hot-toast';

type ConnectWalletType = {
  btnType: CONNECT_WALLET_BTN;
  navigateTo?: string;
};

// eslint-disable-next-line react/display-name
const ConnectWallet = forwardRef(({ btnType, navigateTo }: ConnectWalletType, ref: ForwardedRef<unknown>) => {
  useImperativeHandle(ref, () => {
    return {
      disconnectWallet: disconnectWallet,
      getProviderSignature: getProviderSignature,
    };
  });

  const [providerDetails, setProviderDetails] = useState<any[]>([]);
  const [walletXProvider, setWalletXProvider] = useState<any>(null);
  const navigate = useNavigate();

  const [userAddress, setUserAddress] = useState('');

  const detectEip6963 = () => {
    window.addEventListener('eip6963:announceProvider:walletx', (event: Event) => {
      const customEvent = event as CustomEvent;
      if (customEvent.detail.info.uuid) {
        handleNewProviderDetail(customEvent.detail);
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

  const handleLogIn = async (_address: string) => {
    setToLocalStorage('authenticated', true);
    setToLocalStorage('userAddress', _address);
    sessionStorage.setItem('userAddress', _address);

    navigate(navigateTo || '');
  };

  const handleLogOut = () => {
    setToLocalStorage('authenticated', false);
    removeFromLocalStorage('authenticated');
    sessionStorage.removeItem('userAddress');
    navigate(navigateTo || '');
  };

  const authenticateUser = async (_signature: string, _address: string) => {
    const data = {
      address: _address,
      signature: _signature,
    };
    try {
      await axiosPost(apiRoutes.authenticate, data);
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong.');
    }

    handleLogIn(_address);
  };

  const getProviderSignature = async (_msg: string, _address: string) => {
    console.log('this is getProviderSignature');
    try {
      const from = _address;
      // const msg = `0x${Buffer.from(_msg, 'utf8').toString('hex')}`;
      const msg = String(_msg);
      await walletXProvider.enable();
      const sign = await walletXProvider.request({
        method: 'personal_sign',
        params: [msg, from, 'Example password'],
      });

      if (btnType === CONNECT_WALLET_BTN.GET_SIGNATURE) {
        return String(sign);
      }

      authenticateUser(String(sign), _address);
    } catch (err) {
      console.error(err);
      toast.error('Something went wrong');
    }
  };

  const getAuthMsg = async (_address: string) => {
    try {
      const result = await axiosGet(apiRoutes.getSignMessage + _address);
      const msg = result.data.message;
      await getProviderSignature(msg, _address);
    } catch (error) {
      toast.error('Something went wrong');
    }
  };

  const initializeProvider = async () => {
    // walletXProvider.autoRefreshOnNetworkChange = false;

    try {
      await walletXProvider.enable();
      const newAccounts = await walletXProvider.request({
        method: 'eth_accounts',
      });
      setUserAddress(newAccounts[0]);
      await getAuthMsg(String(newAccounts[0]).toLowerCase());
    } catch (err) {
      console.error('Error on init when getting accounts', err);
      toast.error('Something went wrong');
    }
  };

  useEffect(() => {
    detectEip6963();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      toast.error('Something went wrong');
    }
  };

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
