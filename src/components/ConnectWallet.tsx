import { useEffect, useRef, useState } from 'react';

type ConnectWalletType = {
  isLoggedIn: () => void;
};

const ConnectWallet = ({ isLoggedIn }: ConnectWalletType) => {
  const [providerDetails, setProviderDetails] = useState<any[]>([]);
  const providersContainerRef = useRef<HTMLDivElement>(null);
  const activeProviderUUIDRef = useRef<HTMLSpanElement>(null);
  const activeProviderNameRef = useRef<HTMLSpanElement>(null);
  const activeProviderIconRef = useRef<HTMLDivElement>(null);

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

    setProviderDetails((prevProviderDetails) => [...prevProviderDetails, newProviderDetail]);
  };

  const setActiveProviderDetail = (providerDetail: any) => {
    const { uuid, name, icon } = providerDetail.info;
    if (activeProviderUUIDRef.current) {
      activeProviderUUIDRef.current.innerText = uuid;
    }
    if (activeProviderNameRef.current) {
      activeProviderNameRef.current.innerText = name;
    }
    if (activeProviderIconRef.current) {
      activeProviderIconRef.current.innerHTML = icon ? `<img src="${icon}" height="90" width="90" />` : '';
    }
  };

  return (
    <>
      <button
        onClick={() => detectEip6963()}
        className="border-2 bg-[#cff500] border-black px-4 py-2 rounded-xl font-semibold font-sans tracking-wide text-white shadow-lg"
      >
        Connect Wallet
      </button>
      <div ref={providersContainerRef}>
        {providerDetails.map((providerDetail, index) => (
          <div key={index} className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
            <pre className="alert alert-secondary">
              {JSON.stringify(
                { info: providerDetail.info, provider: providerDetail.provider ? '...' : providerDetail.provider },
                null,
                2,
              )}
            </pre>
            <button
              className="btn btn-primary btn-lg btn-block mb-3"
              onClick={() => setActiveProviderDetail(providerDetail)}
            >
              Use {providerDetail.info.name}
            </button>
          </div>
        ))}
      </div>
      <div>
        <span ref={activeProviderUUIDRef}></span>
        <span ref={activeProviderNameRef}></span>
        <div ref={activeProviderIconRef}></div>
      </div>
    </>
  );
};

export default ConnectWallet;
