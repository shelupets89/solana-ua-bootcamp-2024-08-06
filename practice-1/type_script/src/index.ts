import {
  checkBalance,
  generateKeypairBySearchKey,
  generateKeypairs,
  loadKeypairs,
} from "./exercises";

generateKeypairs({ withLogs: true });
generateKeypairBySearchKey("ui");
loadKeypairs();
checkBalance();
