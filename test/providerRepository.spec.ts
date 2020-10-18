import {expectRevert, expectEvent} from '@openzeppelin/test-helpers';
import {ProviderRepositoryInstance} from '../types/truffle-contracts';
import {JucifiDeployer} from './core/jucifiDeployer';

contract('ProviderRepository', async ([deployer, ...users]) => {
  let _providerRespository: ProviderRepositoryInstance;
  const PROVIDER_TEST_ADDR = '0x506B0B2CF20FAA8f38a4E2B524EE43e1f4458Cc5';
  const PROVIDER_TEST_ADDR_2 = '0x580D4Fdc4BF8f9b5ae2fb9225D584fED4AD5375c';

  beforeEach('Initial setup...', async () => {
    const smartDeployer = new JucifiDeployer(deployer);
    _providerRespository = await smartDeployer.getProviderRepository();
  });

  it('setProvider reverts if call from no owner', async () => {
    await expectRevert(
      _providerRespository.addProvider(PROVIDER_TEST_ADDR, {from: users[0]}),
      'Ownable: caller is not the owner'
    );
  });

  it('setProvider generates an event', async () => {
    expectEvent(
      await _providerRespository.addProvider(PROVIDER_TEST_ADDR, {from: deployer}),
      'NewProvider',
      {}
    );
  });

  it('setProvider put an address to provider list', async () => {
    await _providerRespository.addProvider(PROVIDER_TEST_ADDR, {from: deployer});

    const providersList = await _providerRespository.getProvidesList();
    expect(providersList.length).eq(1, 'Wrong provider list array size');
    expect(providersList[0]).eq(
      PROVIDER_TEST_ADDR,
      'Provider list element is not correctly set up'
    );
  });

  it('setProvider reverts for adding contract which is already in the list', async () => {
    await _providerRespository.addProvider(PROVIDER_TEST_ADDR, {from: deployer});
    await expectRevert(
      _providerRespository.addProvider(PROVIDER_TEST_ADDR, {from: deployer}),
      'ProvidersManager: Provider is already in the list'
    );
  });

  it('getProviderOrFail reverts if call contract which is not in the list', async () => {
    await _providerRespository.addProvider(PROVIDER_TEST_ADDR, {from: deployer});
    await expectRevert(
      _providerRespository.getProviderByAddressOrFail(PROVIDER_TEST_ADDR_2, {
        from: users[0],
      }),
      'ProvidersManager: Provider is not in the list'
    );
  });

  it('getProviderOrFail returns correct', async () => {
    await _providerRespository.addProvider(PROVIDER_TEST_ADDR, {from: deployer});
    const provider = await _providerRespository.getProviderByAddressOrFail(PROVIDER_TEST_ADDR, {
      from: users[0],
    });
    expect(provider.toUpperCase()).eq(PROVIDER_TEST_ADDR.toUpperCase());
  });
});
