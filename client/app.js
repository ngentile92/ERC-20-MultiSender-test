App = {
  contracts: {},
  init: async () => {
    await App.loadWeb3();
    await App.loadAccount();
    await App.loadContract();

  },
  loadWeb3: async () => {
    if (window.ethereum) {
      App.web3Provider = window.ethereum;
      await window.ethereum.request({ method: "eth_requestAccounts" });
    } else if (web3) {
      web3 = new Web3(window.web3.currentProvider);
    } else {
      console.log(
        "No ethereum browser is installed. Try it installing MetaMask "
      );
    }
  },
  loadAccount: async () => {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    App.account = accounts[0];
  },
  loadContract: async () => {
    try {
      const res = await fetch("BulkSender.json");
      const BulkSenderJSON = await res.json();
      App.contracts.BulkSender = TruffleContract(BulkSenderJSON);
      App.contracts.BulkSender.setP|rovider(App.web3Provider);

      App.BulkSender = await App.contracts.BulkSender.deployed();
    } catch (error) {
      console.error(error);
    }
    try {
      const res = await fetch("IERC20.json");
      const MIERC20JSON = await res.json();
      App.contracts.IERC20 = TruffleContract(IERC20);
      App.contracts.IERC20.setProvider(App.web3Provider);

      App.IERC20 = await App.contracts.IERC20.deployed();
    } catch (error) {
      console.error(error);
    }
  },

  multisender_function: async (_to, _value) => {
    try {
      const result = await App.BulkSender.multisend(_to, _value, {
        from: App.account,
      });
      console.log(result.logs[0].args);
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  },
};

