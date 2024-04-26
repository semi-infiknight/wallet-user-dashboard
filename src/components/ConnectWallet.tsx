import { useEffect, useRef, useState } from 'react';

type ConnectWalletType = {
  isLoggedIn: () => void;
};

const ConnectWallet = ({ isLoggedIn }: ConnectWalletType) => {
  const [providerDetails, setProviderDetails] = useState<any[]>([]);
  const [walletXProvider, setWalletXProvider] = useState<any>(null);
  const [connectedAccount, setConnectedAccount] = useState<string>();

  const [userDetails, setUserDetails] = useState({
    uuid: '',
    name: '',
    icon: '',
  });

  const detectEip6963 = () => {
    window.addEventListener('eip6963:announceProvider', (event) => {
      if (event.detail.info.uuid) {
        handleNewProviderDetail(event.detail);
      }
    });
    window.dispatchEvent(new Event('eip6963:requestProvider'));
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

  const initializeProvider = async () => {
    walletXProvider.autoRefreshOnNetworkChange = false;

    // walletXProvider.on('accountsChanged', handleNewAccounts); //
    // walletXProvider.on('accountsChanged', handleEIP1559Support);

    try {
      const newAccounts = await walletXProvider.request({
        method: 'eth_accounts',
      });
      // handleNewAccounts(newAccounts);
      console.log(newAccounts);
      setConnectedAccount(newAccounts[0]);
      console.log(walletXProvider.isConnected());
    } catch (err) {
      console.error('Error on init when getting accounts', err);
    }
  };

  const setActiveProviderDetail = (_walletXProvider: any) => {
    initializeProvider();

    const { uuid, name, icon } = _walletXProvider.info;
    setUserDetails({
      uuid: uuid,
      name: name,
      icon: icon,
    });
  };

  useEffect(() => {
    detectEip6963();
  }, []);

  const disconnectWallet = async () => {
    try {
      await walletXProvider.request({
        method: 'disconnect',
        params: [{ connectedAccount }],
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    
  }, []);

  console.log(providerDetails);
  console.log(walletXProvider);

  return (
    <div className=" flex ">
      <button
        onClick={() => {
          setActiveProviderDetail(walletXProvider);
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

      <div className="px-2 py-2 border bg-white">
        <span>Uid: {userDetails.uuid}</span>
        <span>Name: {userDetails.name}</span>
        <img className="s" src={userDetails.icon} alt="use icon" />
      </div>
    </div>
  );
};

export default ConnectWallet;
