import NavBar from "./components/Navbar/NavBar";
import ShippingDetails from "./components/ShippingDetails/ShippingDetails";
import ShippingStatus from "./components/ShippingStatus/ShippingStatus";

function App() {
  return (
    <>
      <NavBar />
      <ShippingStatus />
      <ShippingDetails />
    </>
  );
}

export default App;
