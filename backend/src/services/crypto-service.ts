import { toHex, utf8ToBytes } from "ethereum-cryptography/utils";
import { keccak256 } from "ethereum-cryptography/keccak";

process.on("message", (msg: Record<string, string>) => {
  const data = msg.data;
  let nonce = -1;
  let hash = "";
  let checker = true;

  while (checker) {
    nonce++;
    hash = toHex(keccak256(utf8ToBytes(data + nonce)));
    if (hash.localeCompare(data) < 0) {
      checker = false;
    }
  }
  (<any>process).send({ hash, nonce });
});
