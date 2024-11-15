const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("OlympeVoting Contract", function () {
    let deployer, nonAdmin, admin;
    let olympeVoting;
    const ADMIN_ROLE = ethers.keccak256("ADMIN_ROLE"); // Directement appeler keccak256 sur la chaîne de caractères

    beforeEach(async function () {
        // Déployer le contrat
        [deployer, nonAdmin, admin] = await ethers.getSigners();
        const OlympeVoting = await ethers.getContractFactory("OlympeVoting");
        olympeVoting = await OlympeVoting.deploy();
        await olympeVoting.deployed();

        // Donner le rôle ADMIN_ROLE à admin
        await olympeVoting.grantRole(ADMIN_ROLE, admin.address);
    });

    it("Should grant the deployer admin role", async function () {
        // Vérifie que le déployeur a le rôle ADMIN_ROLE
        const hasAdminRole = await olympeVoting.hasRole(ADMIN_ROLE, deployer.address);
        expect(hasAdminRole).to.be.true;

        // Assure-toi que la vérification ne dépend pas de données non initialisées
        const proposal = await olympeVoting.proposals(1); // Exemple de récupération
        expect(proposal.id).to.be.a("number"); // Ajuster selon le type attendu
    });

    it("Should only allow admin to create proposals", async function () {
        // Vérifie que seul l'admin peut créer une proposition
        await olympeVoting.connect(admin).createProposal("New Proposal", ["Option 1", "Option 2"]);

        // Le non-admin devrait échouer
        await expect(
            olympeVoting.connect(nonAdmin).createProposal("Unauthorized Proposal", ["Option 1"])
        ).to.be.revertedWith("AccessControl: account 0x70997970c51812dc3a010c7d01b50e0d17dc79c8 is missing role");
    });
});
