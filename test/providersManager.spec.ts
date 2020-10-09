
import { ProvidersManagerInstance } from '../types/truffle-contracts'

contract("ProvidersManager", async ([deployer, ...users]) => {
  let _providerManager : ProvidersManagerInstance
  it("should be ", async () => {
    const rope: string = "";
    assert.equal(1, 1);

    const poolInstance = await artifacts.require("Pool").new({
      from: deployer,
    });

    const tx = await poolInstance.deposit(users[0].toString(), 100, 10);
    console.log(tx);
  });
});
