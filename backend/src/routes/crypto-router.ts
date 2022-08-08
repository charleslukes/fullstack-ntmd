import StatusCodes from "http-status-codes";
import { Request, Response, Router } from "express";
import { fork } from "child_process";
import path from "path";
import { ParamMissingError } from "@shared/errors";

// Constants
const router = Router();
const { OK, BAD_REQUEST } = StatusCodes;

// Paths
export const p = {
  generate_hash: "/generate_hash",
} as const;

/**
 * Generates hash.
 */
router.post(p.generate_hash, async (req: Request, res: Response) => {
  const { data } = req.body;

  // check if data is a number
  const isNumber = Number(data);
  if (isNumber) {
    throw new ParamMissingError("Input should not be a number");
  }

  // check if data is a valid 256 hexdecimal
  const isValidHex = /^[a-fA-F0-9]{64}$/.test(data.trim());
  if (!isValidHex) {
    throw new ParamMissingError("Hexadecimal is invalid, pls input check and try again");
  }

  const hashGenerator = fork(
    path.join(__dirname, "/../services/crypto-service")
  );
  hashGenerator.send({ data });
  hashGenerator.on("message", (msg: Record<string, string>) => {
    hashGenerator.kill();
    res.status(OK).json(msg);
  });
});

// Export default
export default router;
