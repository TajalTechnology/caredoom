
import supertest, { SuperTest } from "supertest";
import { getAllColumns } from "../app/api/services/column.service";
import { app } from "../app/app";
import { signJwt } from "../app/common/utils/jwt";
import ColumnModel from "../app/models/column.model";
import mongoose from "mongoose";

jest.mock("../app/api/services/column.service");

const userId = new mongoose.Types.ObjectId().toString();
// export const columnPayload ={  "formName": "Digital mn3"};
export const columnPayload = {
  "formName": "New Column",
  "columnOne": {
    "columnName": "countryName",
    "assignment": "auto",
    "dataType": "string",
    "maxLength": "40",
    "minLength": "4",
    "bSearch": "true",
    "bDisplay": "true",
    "bDisabled": "true",
    "evaluationFormula": "true"
  },
  "columnTwo": {
    "columnName": "districtName",
    "assignment": "manual",
    "dataType": "string",
    "maxLength": "40",
    "minLength": "4",
    "bSearch": "true",
    "bDisplay": "true",
    "bDisabled": "true",
    "evaluationFormula": "true"
  }
};


export const userPayload = {
  _id: userId,
  "password": "123456",
  "email": "md4@gmail.com",
};

const jwt = signJwt(userPayload);

describe("Column", () => {

  beforeEach((): void => {
    jest.setTimeout(50000);
  });

  /* get columns */
  describe('get columns', () => {
    test('return all columns', async () => {
      const { body, statusCode } = await supertest(app).get(`/api/columns`);
      expect(body.status).toBe(1);
      expect(statusCode).toBe(200);
      expect(body.data.length).toBeGreaterThan(0);
      expect(body.data[0]._id).toBe('621494e22821d8df6c56c809');
    });
  });//end

  /* get column */
  describe('get column', () => {
    test('return a single column', async () => {
      const { body, statusCode } = await supertest(app).get(`/api/columns/621494e22821d8df6c56c809`);
      expect(body.status).toBe(1);
      expect(statusCode).toBe(200);
      expect(body._id).toBe('621494e22821d8df6c56c809');
    });
  });//end

  //create product
  describe('create column', () => {

    //if uer not logged in
    describe("given the user is not logged in", () => {
      it("should return a 403", async () => {
        const { body, statusCode } = await supertest(app).post("/api/columns");
        expect(statusCode).toBe(403);
      });
    });//end

    //if user logged in
    describe("given the user is logged in", () => {
      it("should return a 200 and create the product", async () => {
        // const jwt = signJwt(userPayload);
        const { body, statusCode } = await supertest(app).post('/api/columns')
          .set("Authorization", `Bearer ${jwt}`)
          .send(columnPayload);

        console.log(body);

        // let response = await request(app).post('/users').send(user);

      });
    });
  });//end create product

});



