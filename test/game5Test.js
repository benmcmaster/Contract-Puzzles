const { loadFixture } = require('@nomicfoundation/hardhat-network-helpers');
const { assert } = require('chai');

describe('Game5', function () {
  async function deployContractAndSetVariables() {
    const Game = await ethers.getContractFactory('Game5');
    const game = await Game.deploy();
    const owner = await ethers.getSigner(0);

    return { game, owner };
  }
  it('should be a winner', async function () {
    const { game, owner } = await loadFixture(deployContractAndSetVariables);

    const finalWallet = generateRandomWallet();

    const tx = await owner.sendTransaction({
      to: finalWallet.address,
      value: ethers.utils.parseEther("22.0")
    });

    await game.connect(finalWallet).win();

    // leave this assertion as-is
    assert(await game.isWon(), 'You did not win the game');
  });
});

function generateRandomWallet() {
  const wallet = ethers.Wallet.createRandom();
  const address = BigInt(wallet.address);
  const threshold = BigInt("0x00FfFFfFFFfFFFFFfFfFfffFFFfffFfFffFfFFFf");

  if (address < threshold) {
    return wallet.connect(ethers.provider);
  } else {
    return generateRandomWallet();
  }
}
