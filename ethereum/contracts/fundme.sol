pragma solidity ^0.4.25;



/// @title FundMe factory contract
/// @author Gbenro Adesoye
/// @notice A factory contract for the main FundMe contract
contract FundMeFactory {
    
    address[] public deployedFundraisers;// we keep track of all the fundraisers here.

  
    ///@notice This function creates FundMe by calling constructor of FundMe
    ///@param _firstName the firstname of the recipient
    ///@param _lastName the last Name of recipient
    ///@param _description the need for the fundraising
    function createFundMe (string memory _firstName, string memory _lastName, string memory _description, uint _amountNeeded ) public{
        address newFundMe = address(new FundMe(_firstName, _lastName, _description, _amountNeeded, msg.sender));
        deployedFundraisers.push(newFundMe); 
    }


    /// @notice gets the addresses  of fundraiser contract already deployed
    /// @return the array of fundraisers that are deployed by this contract
    function getDeployedFundraisers() public view returns (address[] memory ){

        return deployedFundraisers;
    }


}

///@title Fund Me
///@author Gbenro Adesoye
///@notice A fundraising contract on the blockchain/ similar to GoFundMe
contract FundMe{
    
    //we keep the details of individual donation here, mainly donor's address and amount donated
    struct Donation{
        address donor;
        uint amountDonated;
    }
    
    //address of contract owner,that will be recieving the donations
    address public recipient;
    //the reason for creating fundraising campaign
    string public description;
    //first name of reciepient
    string public firstName;
    //last name of reciepient
    string public lastName;
    //amount of fund needed
    uint public amountNeeded;
    //mapping of donors to amount contributed for the fundraiser
    mapping(address=>uint) public donorsAmount;
    //number of donors in the fundraiser
    uint public donors;
    //Amount of money donated to fundraiser.initialized to zero. Because fund can be withdrew anytime,
    //we use this to track all fund made to the contract so far
    uint public amountSoFar = 0;
    //we keep track of all the donations to this fundraiser here
    Donation[] public donations;
    //to know whetehr fundraiser is still on going or not
    bool public ongoing = true;
    
    //EVENTS
    //event for when a contract is created. Shows owner address, contract address and description of fundraiser
    event Contract_Created(address indexed _from, address indexed _contract, string _desription );
    // event for when money is donated. Shows address of donor, fundraiser contract donated to and value donated
    event Funds_Donated(address indexed _from, address indexed _contract, uint _value);
    //event for when the fundraising goal is reached. Shows recipient address, contract address and amount raised
    event Goal_Reached(address indexed _from, address indexed _contract, uint _value);
    //event for when recipient/contract owner ends fundraiser. Shows the owner address, contract address and amount rasied
    event Fundraiser_Ended(address indexed _from, address indexed _contract, uint _value );
    //event for when recipient withdraws money from the fundraiser contract. shows the owner address, contract address and amount withdrawn
    event Fund_Withdrawn(address indexed _from, address indexed _contract, uint _value);
    
    ///@notice only fundraiser/recipient can perform action
    modifier restricted(){
        require(
            msg.sender == recipient,
            "Action can aonly be performed by Contract owner"
            );
        _;

    }
    ///@notice to check if the fundraiser is still ongoing or ended
    modifier isLive(){
        require(
            ongoing,
            "This fundraiser has ended"
            );
        _;

    }
    
    
    
    ///@notice contructor to FundMe contract
    ///@param _firstName the firstname of the recipient
    ///@param _lastName the last Name of recipient
    ///@param _desription the need for the fundraising
    ///@param _recipient the address of the fundraiser
    constructor(string memory _firstName, string memory _lastName, string memory _desription, uint _amountNeeded, address _recipient) public {
        
        firstName = _firstName;
        lastName = _lastName;
        description = _desription;
        amountNeeded = _amountNeeded;
        recipient = _recipient;
        
        emit Contract_Created(_recipient, address(this), _desription);
    }
    
    ///@notice payable function, takes contribution for the fundraiser
    ///@dev this function also called _createDonation() and kills the contract when fundraising goal has been reached
    function donate() public isLive payable{
        
        donorsAmount[msg.sender] = msg.value; //keeps track of the amount that each donor contributes;
        amountSoFar += msg.value;// add amount donated to total contributions 
        donors++;// increment the number of donors
        
        _createDonation(msg.sender, msg.value);//create a new donation
        
        emit Funds_Donated(msg.sender,address(this), msg.value);//sends out event that funds has been donated to this fundraiser contract
        
        // if goal of fundraiser has been reached, end the fundraiser. 
        //This contract does not allow raising more than what was specified from start
        if (amountSoFar >= amountNeeded){
            _end();
        }
    }
    ///@notice creates a new donation and adds it the the donoation array
    ///@dev should be called by donate() a need donation is made
    ///@param donor The address of the donor
    ///@param amount the aount of money donated
    function _createDonation(address donor, uint amount) private{
        Donation memory newDonation = Donation({
            donor: donor,
            amountDonated: amount

        });
        donations.push(newDonation);
    }
    
    
    ///@notice allows for withdrawing funds from contract
    ///@dev Only reciepient can withdraw funds from this contract
    ///@dev all funds can be remooved anytime
    function withdraw() public restricted isLive{
        //balance stores the amount of money in the contract at this moment
        uint balance = getBalance();
        // checks if there is money in the account
        require(
            balance != 0,
            "Contract balance is 0"
        );
        emit Fund_Withdrawn(recipient,address(this),balance);//sends out event that contract owner/recipient have withdrew some funds
        recipient.transfer(address(this).balance);// sends the account balance to recipient
    }
    ///@notice gets the balance of the contract
    ///@return returns the balance of the contract
    function getBalance() public view isLive returns(uint){
        return address(this).balance;
    }
    
    ///@notice allows for ending the fundraiser
    ///@dev can only be called by recipient
    function end() public restricted isLive{
        ongoing = false;
        emit Fundraiser_Ended(recipient, address(this),amountSoFar); //sends out event that fundraiser has been ended
        recipient.transfer(address(this).balance);// kills the contract from the blockchain and sends contract balance to recipient
        
    }
    
    ///@notice private function, ends the fundraiser when amountNeed is reached
    ///@dev should be called by donate() when amountNeeded is reached
    function _end() private {
        ongoing = false;
        emit Goal_Reached(recipient, address(this),amountSoFar); //sends out event that fundraisering goal has been reached
        recipient.transfer(address(this).balance);//ends the fundraiser and sends contract balance to recipient
        
    }
    
}

