import { useRef, useEffect } from "react";

function Contract({ value }) {
  const spanEle = useRef(null);

  useEffect(() => {
    spanEle.current.classList.add("flash");
    const flash = setTimeout(() => {
      spanEle.current.classList.remove("flash");
    }, 300);
    return () => {
      clearTimeout(flash);
    };
  }, [value]);

  return (
    <code>
      {`contract ItemManager {
  address itemAddress = `}

      <span className="secondary-color" ref={spanEle}>
        <strong>{value}</strong>
      </span>

      {`;

  function createItem(string memory _identifier, uint _priceInWei) public onlyOwner {
    event SupplyChainStep(uint _itemIndex, uint _step, address _itemAddress);
  }

  function triggerPayment(uint _index) public payable {
    event SupplyChainStep(uint _itemIndex, uint _step, address _itemAddress); // Triggered for _step == 1
  }
}`}
    </code>
  );
}

export default Contract;
