const { expect } = require("chai");

describe("SimpleStorage", function () {
    let SimpleStorage;
    let simpleStorage;

    beforeEach(async function () {
        // Obtenir le contract factory pour SimpleStorage
        SimpleStorage = await ethers.getContractFactory("SimpleStorage");
        // Déployer le contrat
        simpleStorage = await SimpleStorage.deploy(); // Pas besoin d'appeler .deployed()
    });

    it("should store the value", async function () {
        // Appeler la fonction set pour stocker la valeur
        await simpleStorage.set(42);
        // Vérifier que la valeur stockée est bien celle attendue
        expect(await simpleStorage.get()).to.equal(42);
    });
});
