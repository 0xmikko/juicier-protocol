// import {expectRevert, expectEvent} from "@openzeppelin/test-helpers";

declare module "@openzeppelin/test-helpers" {
  import Truffle from "@typechain/truffle-v5";

  function expectEvent(
    receipt: Truffle.TransactionResponse<any>,
    eventName: string,
    eventArgs?: unknown
  ): void;

  namespace expectEvent {
    function inTransaction(
      txHash: string,
      emitter: Truffle.ContractInstance,
      eventName: string,
      eventArgs?: unknown
    ): void;
  }

  function expectRevert(
    promise: Promise<any>,
    expectedError: string
  ): Promise<void>;
}
