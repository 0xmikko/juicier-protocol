import {expectRevert, expectEvent} from "@openzeppelin/test-helpers";
import {ProvidersManagerInstance} from "../types/truffle-contracts";

contract("ProvidersManager", async ([deployer, ...users]) => {
  let _providersManager: ProvidersManagerInstance;
  const PROVIDER_TEST_ADDR = "0x506B0B2CF20FAA8f38a4E2B524EE43e1f4458Cc5";
  const PROVIDER_TEST_ADDR_2 = "0x580D4Fdc4BF8f9b5ae2fb9225D584fED4AD5375c";

  beforeEach("Initializing Providers Manager", async () => {
    _providersManager = await artifacts.require("ProvidersManager").new({
      from: deployer,
    });
  });

  it("setProvider reverts if call from no owner", async () => {
    await expectRevert(
      _providersManager.setProvider(PROVIDER_TEST_ADDR, {from: users[0]}),
      "Ownable: caller is not the owner"
    );
  });

  it("setProvider generates an event", async () => {
    await expectEvent(
      await _providersManager.setProvider(PROVIDER_TEST_ADDR, {from: deployer}),
      "NewProvider"
    );
  });

  it("setProvider put an address to provider list", async () => {
    await _providersManager.setProvider(PROVIDER_TEST_ADDR, {from: deployer});

    const providersList = await _providersManager.getProvidesList();
    expect(providersList.length).eq(1, "Wrong provider list array size");
    expect(providersList[0]).eq(
      PROVIDER_TEST_ADDR,
      "Provider list element is not correctly set up"
    );
  });

  it("setProvider reverts for adding contract which is already in the list", async () => {
    await _providersManager.setProvider(PROVIDER_TEST_ADDR, {from: deployer});
    await expectRevert(
      _providersManager.setProvider(PROVIDER_TEST_ADDR, {from: deployer}),
      "ProvidersManager: Provider is already in the list"
    );
  });

  it("getProviderOrFail reverts if call contract which is not in the list", async () => {
    await _providersManager.setProvider(PROVIDER_TEST_ADDR, {from: deployer});
    await expectRevert(
      _providersManager.getProviderOrFail(PROVIDER_TEST_ADDR_2, {
        from: users[0],
      }),
      "ProvidersManager: Provider is not in the list"
    );
  });

  it("getProviderOrFail returns correct", async () => {
    await _providersManager.setProvider(PROVIDER_TEST_ADDR, {from: deployer});
    const provider = await _providersManager.getProviderOrFail(
      PROVIDER_TEST_ADDR,
      {
        from: users[0],
      }
    );
    expect(provider.toUpperCase()).eq(PROVIDER_TEST_ADDR.toUpperCase());
  });
});
