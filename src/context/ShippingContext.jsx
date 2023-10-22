import { createContext, useContext, useEffect, useState } from "react";

const BASE_URL = "https://tracking.bosta.co/shipments/track/";

const ShippingContext = createContext();

function ShippingProvider({ children }) {
  const [shipping, setShipping] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setIsError] = useState(false);

  async function fetchShipping(trackingNumber) {
    try {
      setIsLoading(true);
      const res = await fetch(`${BASE_URL}${trackingNumber}`);

      if (!res.ok) throw new Error("Invalid tracking number!");

      const data = await res.json();
      setShipping(data);
      setIsError(false);
    } catch (err) {
      setIsError(err.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <ShippingContext.Provider
      value={{ shipping, isLoading, error, fetchShipping }}
    >
      {children}
    </ShippingContext.Provider>
  );
}

function useShipping() {
  const context = useContext(ShippingContext);
  if (context === undefined)
    throw new Error("ShippingContext was used outside the ShippingProvider");
  return context;
}

export { ShippingProvider, useShipping };
