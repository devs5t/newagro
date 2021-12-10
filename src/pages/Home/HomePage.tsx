import { useEthers } from "@usedapp/core";

const HomePage = () => {
  const { account } = useEthers();

  return (
    <>
      <h3>Lading Page</h3>
      {account && <p>Account Connected: {account}</p>}
    </>
  );
};

export default HomePage;