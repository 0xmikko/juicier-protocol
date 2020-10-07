
contract("Pool", async (accounts) => {
  it("should be ", async () => {
    const rope: string = "";
    assert.equal(1, 1);

    const poolInstance = await artifacts.require("Pool").new({
      from: accounts[0],
    });

    const tx = await poolInstance.deposit(accounts[1].toString(), 100, 10);
    console.log(tx);
  });
});
