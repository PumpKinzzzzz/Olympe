// scripts/interact.js
async function main() {
    const [user] = await ethers.getSigners();
    const contractAddress = "0x1a593d9A3a359e2Eef260a6b6172C1e8AD80fb51"; // Remplace avec l'adresse du contrat déployé
  
    const OlympeVoting = await ethers.getContractAt("OlympeVoting", contractAddress);
  
    console.log("Creating proposal...");
    await OlympeVoting.createProposal("Kill caca merde");
  
    const proposal = await OlympeVoting.getProposal(2);
    console.log("Proposal created:", proposal);
  
    console.log("Voting for proposal...");
    await OlympeVoting.vote(2);
  
    const updatedProposal = await OlympeVoting.getProposal(2);
    console.log("Updated proposal after voting:", updatedProposal);
  }
  
  main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
  