const { loadFixture } = require('@nomicfoundation/hardhat-network-helpers');
const { assert } = require('chai');

describe('Game4', function () {
  async function deployContractAndSetVariables() {
    const Game = await ethers.getContractFactory('Game4');
    const game = await Game.deploy();
    const [owner, signer2] = await ethers.getSigners();

    return { game, owner, signer2 };
  }
  it('should be a winner', async function () {
    const { game, owner, signer2 } = await loadFixture(deployContractAndSetVariables);

    // nested mappings are rough :}
    const ownerAddress = await owner.getAddress();
    const signer2Address = await signer2.getAddress();
    await game.connect(signer2).write(ownerAddress);

    await game.win(signer2Address);

    // leave this assertion as-is
    assert(await game.isWon(), 'You did not win the game');
  });
});
