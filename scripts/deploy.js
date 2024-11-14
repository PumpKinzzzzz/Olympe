async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  const OlympeVoting = await ethers.getContractFactory("OlympeVoting");
  
  const olympeVoting = await OlympeVoting.deploy();
  console.log("OlympeVoting contract deployed to:", olympeVoting.address);

  const isAdmin = await olympeVoting.hasRole(await olympeVoting.ADMIN_ROLE(), deployer.address);
  console.log("Is deployer admin?", isAdmin);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
