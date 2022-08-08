import supertest from "supertest";
import StatusCodes from "http-status-codes";
import { SuperTest, Test, Response } from "supertest";

import app from "@server";
import { pErr } from "@shared/functions";
import { p as cryptoPaths } from "@routes/crypto-router";

describe("crypto-router", () => {
  const cryptoPath = "/api/crypto";
  const generateHashPath = `${cryptoPath}${cryptoPaths.generate_hash}`;

  const { BAD_REQUEST, OK } = StatusCodes;
  let agent: SuperTest<Test>;

  beforeAll((done) => {
    agent = supertest.agent(app);
    done();
  });

  /***********************************************************************************
   *                                    Test Post
   **********************************************************************************/

  describe(`"POST:${generateHashPath}"`, () => {
    it(`should return a status code of "${OK}" if the request was successful.`, (done) => {
      const userInput = {
        data: "00a192c48de814639ade40737a928ddd500fd1c24c5ade5036268f1915f05565",
      };
      // Call API
      agent
        .post(generateHashPath)
        .type("form")
        .send(userInput)
        .end((err: Error, res: Response) => {
          pErr(err);
          expect(res.status).toBe(OK);
          expect(res.body.error).toBeUndefined();
          done();
        });
    });

    it(`should return a status code of "${BAD_REQUEST}" if user input is not a 256 bit hexadecimal.`, (done) => {
        // NUMBER INPUTS
      const userInput = {
        data: "238333833",
      };
      // Call API
      agent
        .post(generateHashPath)
        .type("form")
        .send(userInput)
        .end((err: Error, res: Response) => {
          pErr(err);
          expect(res.status).toBe(BAD_REQUEST);
          done();
        });
    });

    it(`should return a status code of "${BAD_REQUEST}" if user input is not a 256 bit hexadecimal.`, (done) => {
        // WRONG HEX LENGTH
        const userInput = {
          data: "bd8cea670a1a3c0dd248d97f5aec20ea79509ce18e21f85a3e2971bf",
        };
        // Call API
        agent
          .post(generateHashPath)
          .type("form")
          .send(userInput)
          .end((err: Error, res: Response) => {
            pErr(err);
            expect(res.status).toBe(BAD_REQUEST);
            done();
          });
      });
  });
});
