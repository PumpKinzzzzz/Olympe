pragma solidity ^0.8.17;

import "@openzeppelin/contracts/access/AccessControl.sol";

contract OlympeVoting is AccessControl {
    bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE");

    struct Choice {
        string name;
        uint voteCount;
    }

    struct Proposal {
        uint id;
        string description;
        Choice[] choices;
        bool open;
    }

    mapping(uint => Proposal) public proposals;

    mapping(address => mapping(uint => bool)) public hasVoted;

    uint public proposalCounter;

    event ProposalCreated(uint id, string description);
    event Voted(address indexed voter, uint proposalId);

    constructor() {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(ADMIN_ROLE, msg.sender);
    }

    function createProposal(string memory _description, string[] memory _choices) public onlyRole(ADMIN_ROLE) {
        proposalCounter++;

        Proposal storage newProposal = proposals[proposalCounter];
        newProposal.id = proposalCounter;
        newProposal.description = _description;
        newProposal.open = true;

        for (uint i = 0; i < _choices.length; i++) {
            newProposal.choices.push(Choice(_choices[i], 0));
        }

        emit ProposalCreated(proposalCounter, _description);
    }

    function vote(uint _proposalId, uint choice) public {
        require(!hasVoted[msg.sender][_proposalId], "You have already voted on this proposal.");
        require(proposals[_proposalId].id != 0, "Proposal does not exist.");

        hasVoted[msg.sender][_proposalId] = true;
        proposals[_proposalId].choices[choice].voteCount++;
        emit Voted(msg.sender, _proposalId);
    }

    function getProposal(uint _proposalId) public view returns (Proposal memory) {
        return proposals[_proposalId];
    }
}
