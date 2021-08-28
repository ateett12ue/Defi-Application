pragma solidity ^0.5.0;


//already deployed
import "./DappToken.sol";
import "./DaiToken.sol";

contract TokenFarm {
    string public name = "Dapp Token Farm";

    address public owner;
    DappToken public dappToken;
    DaiToken public daiToken;
    

    // array of invester addresses
    address[] public stakers;

    // key -> address, value -> token to be staked
    mapping(address => uint) public stakingBalance;
    // boolean for is the staking is done
    mapping(address => bool) public hasStaked;
    // boolean for current staking status
    mapping(address => bool) public isStaking;

    // assign address to state variable
    // DappToken is a type
    constructor(DappToken _dappToken, DaiToken _daiToken) public
    {
        dappToken = _dappToken;
        daiToken = _daiToken;
        owner = msg.sender;
    }

    // 1. Staking token (deposit token)
    // arg - amount of token to stake
    function stakeToken(uint _amount) public {
        // transfer mock dai to this contract for staking

        require(_amount > 0, "amount cannot be 0");

        daiToken.transferFrom(msg.sender, address(this), _amount);

        // update staking balance
        stakingBalance[msg.sender] = stakingBalance[msg.sender] + _amount;

        // add user to staker array if they haven't staked already
        if(!hasStaked[msg.sender]){
            stakers.push(msg.sender);
        }

        // updating staking status
        isStaking[msg.sender] = true;
        hasStaked[msg.sender] = true;
         
    }

    // 2. unStaking token (withdraw token)
    function unstakeToken(uint _amount) public {
        // transfer mock dai from this contract to invester
        daiToken.transferFrom(address(this), msg.sender, _amount);
    }
    // 3. issuing token (deposit interest token)
    function issueToken() public {
        
        // if condition to check if caller is owner
        require(msg.sender == owner, "caller can only be owner");
        for (uint i=0; i< stakers.length; i++)
        {
            address recipient = stakers[i];
            uint balance = stakingBalance[recipient];
            if (balance>0)
            {
                dappToken.transfer(recipient, balance);
            }
        }
    }


}
