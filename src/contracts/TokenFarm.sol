pragma solidity ^0.5.0;


//already deployed
import "./DappToken.sol";
import "./DaiToken.sol";

contract TokenFarm {
    string public name = "Dapp Token Farm";

    DappToken public dappToken;
    DaiToken public daiToken;
    
    //assign address to state variable
    //DappToken is a type
    constructor(DappToken _dappToken, DaiToken _daiToken) public
    {
        dappToken = _dappToken;
        daiToken = _daiToken;
    }
}
