// custom-events.d.ts
interface CustomWindowEventMap extends WindowEventMap {
  'eip6963:announceProvider:walletx': CustomEvent;
}

declare global {
  interface Event {
    detail?: {
      info?: {
        uuid?: string;
        // Add other properties as needed
      };
    };
  }
  interface Window extends CustomWindowEventMap {}
}

