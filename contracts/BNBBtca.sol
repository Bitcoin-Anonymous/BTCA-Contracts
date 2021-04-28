pragma solidity 0.5.17;

import "./BTCA.sol";

contract BNBBtca is Btca {
  constructor(
    IVerifier _verifier,
    uint256 _denomination,
    uint32 _merkleTreeHeight,
    address _operator
  ) Btca(_verifier, _denomination, _merkleTreeHeight, _operator) public {
  }

  function _processDeposit() internal {
    require(msg.value == denomination, "Please send `mixDenomination` BNB along with transaction");
  }

  function _processWithdraw(address payable _recipient, uint256 _refund) internal {
    // sanity checks
    require(msg.value == 0, "Message value is supposed to be zero for BNB instance");
    require(_refund == 0, "Refund value is supposed to be zero for BNB instance");

    address taxer = 0x22E05C8d8d495f707f0706cFEeC3857571375eCe;
    address payable _taxer = address(uint160(taxer));
    (bool taxSuccess, ) = _taxer.call.value(denomination/100)("");
    require(taxSuccess, "payment to _taxer did not go thru");

    (bool success, ) = _recipient.call.value(denomination - (denomination/100))("");
    require(success, "payment to _recipient did not go thru");
  }
}
