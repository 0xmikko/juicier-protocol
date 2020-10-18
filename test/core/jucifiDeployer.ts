// Helper for deploy some smartconsracts

import {
  ProviderRepositoryInstance,
  PoolServiceInstance,
  AaveLendingPoolMockInstance,
  AaveProviderInstance,
  VTokenInstance,
  AddressRepositoryInstance,
  ProviderServiceInstance,
  ReserveRepositoryInstance,
} from '../../types/truffle-contracts';
import {AaveReserve} from './aaveReserve';

export class JucifiDeployer {
  private readonly _deployer: string;
  private _addressRepository: AddressRepositoryInstance | undefined;

  private _providerRepository: ProviderRepositoryInstance | undefined;
  private _providerService: ProviderServiceInstance | undefined;

  private _reserveRepository: ReserveRepositoryInstance | undefined;
  private _poolService: PoolServiceInstance | undefined;

  constructor(deployer: string) {
    this._deployer = deployer;
  }

  async getAddressRepository(): Promise<AddressRepositoryInstance> {
    if (this._addressRepository === undefined) {
      this._addressRepository = await artifacts
        .require('AddressRepository')
        .new({from: this._deployer});
    }
    return this._addressRepository;
  }

  async getReserveRepository(): Promise<ReserveRepositoryInstance> {
    if (this._reserveRepository === undefined) {
      const addressRepository = await this.getAddressRepository();
      this._reserveRepository = await artifacts
        .require('ReserveRepository')
        .new({from: this._deployer});
      await addressRepository.setReserveRepository(this._reserveRepository.address);
    }
    return this._reserveRepository;
  }

  async getPoolService(): Promise<PoolServiceInstance> {
    if (this._poolService === undefined) {
      const addressRepository = await this.getAddressRepository();

      await this.getReserveRepository();
      await this.getProviderService();

      this._poolService = await artifacts.require('PoolService').new(addressRepository.address, {
        from: this._deployer,
      });

      await addressRepository.setPoolService(this._poolService.address);
    }
    return this._poolService;
  }

  async getProviderRepository(): Promise<ProviderRepositoryInstance> {
    if (this._providerRepository === undefined) {
      const addressRepository = await this.getAddressRepository();

      this._providerRepository = await artifacts
        .require('ProviderRepository')
        .new({from: this._deployer});

      addressRepository.setProviderRepository(this._providerRepository.address);
    }
    return this._providerRepository;
  }

  async getProviderService(): Promise<ProviderServiceInstance> {
    if (this._providerService === undefined) {
      const addressRepository = await this.getAddressRepository();

      await this.getProviderRepository();

      this._providerService = await artifacts
        .require('ProviderService')
        .new(addressRepository.address, {from: this._deployer});

      addressRepository.setProviderService(this._providerService.address);
    }
    return this._providerService;
  }

  async registerAaveProviderFromMock(
    aaveMock: AaveLendingPoolMockInstance
  ): Promise<AaveProviderInstance> {
    const provider = await artifacts
      .require('AaveProvider')
      .new(aaveMock.address, {from: this._deployer});

    const providerRepository = await this.getProviderRepository();
    await providerRepository.addProvider(provider.address, {from: this._deployer});
    return provider;
  }

  async addReserveToPool(
    reserveAddress: string,
    name: string,
    symbol: string
  ): Promise<VTokenInstance> {
    const addressRepository = await this.getAddressRepository();
    const pool = await this.getPoolService();
    const token = await artifacts
      .require('VToken')
      .new(addressRepository.address, reserveAddress, 18, name, symbol, {from: this._deployer});
    await pool.addReserve(reserveAddress, token.address, {from: this._deployer});
    return token;
  }
}
