import { useState, useEffect } from "react";
import useEth from "../../contexts/EthContext/useEth";

function ContractBtns({ setValue }) {
  const { state: { contract, accounts } } = useEth();
  const [nameValue, setNameValue] = useState("");
  const [priceValue, setPriceValue] = useState("");
  const [indexValue, setIndexValue] = useState("");

  // To Listen to SupplyChainStep Event
  useEffect(() => {
    const listenForSupplyChainStepEvent = () => {
      contract.events.SupplyChainStep({
        filter: { _step: 1 }, // Listening _step == 1 (Paid)
        fromBlock: 0,
      }, (err, event) => {
        if (err) {
          console.error('Error listening to SupplyChainStep Event:', err);
        } else {
          console.log('SupplyChainStep Event:', event);
        }
      });
    };
 
    listenForSupplyChainStepEvent();

  // To detect on change for createItem - price
  const handlePriceChange = e => {
    if (/^\d+$|^$/.test(e.target.value)) {
      setPriceValue(e.target.value);
    }
  };

  // To detect on change for createItem - name
  const handleNameChange = e => {
    setNameValue(e.target.value);
  };

  // To detect on change for triggerPayment - index
  const handleIndexChange = e => {
    if (/^\d+$|^$/.test(e.target.value)) {
      setIndexValue(e.target.value);
    }
  };

  // To find Item Address
  const indexAddress = async (index) => {
    const value = await contract.methods.items(index).call({ from: accounts[0] });
    setValue(value[0]);
    return value[0];
  };

  // Transaction for createItem
  const createItem = async e => {
    if (e.target.tagName === "INPUT") {
      return;
    }
    if (nameValue === "" || priceValue === "") {
      alert("Please enter a name and price to createItem.");
      return;
    }
    const newPrice = parseInt(priceValue);
    await contract.methods.createItem(nameValue, newPrice).send({ from: accounts[0] })
      .then((data) => console.log('Item created successfully', data))
      .catch((err) => console.log('Error occured creating item', err));
  };

  // Transaction for triggerPayment
  const triggerPayment = async e => {
    if (e.target.tagName === "INPUT") {
      return;
    }
    if (indexValue === "") {
      alert("Please enter index to trigger payment.");
      return;
    }
    const newIndex = parseInt(indexValue);
    const itemAddress = await indexAddress(newIndex);
    await contract.methods.triggerPayment(newIndex).send({ from: itemAddress })  // Since only item can call trigger payment
      .then((data) => console.log('Payment made successfully..', data))
      .catch((err) => console.log('Error when trigerring payment..', err));
  };

  return (
    <div className="btns">

      <div onClick={createItem} className="input-btn">
        write(
          <input type="text" placeholder="string" value={nameValue} onChange={handleNameChange} required />
          <input type="text" placeholder="uint" value={priceValue} onChange={handlePriceChange} required />)
      </div>

      <div onClick={triggerPayment} className="input-btn">
        write(<input type="text" placeholder="uint" value={indexValue} onChange={handleIndexChange} required />)
      </div>

    </div>
  );
}

export default ContractBtns;
