import { MongoMemoryServer } from "mongodb-memory-server";
import supertest from "supertest";
import { app } from "../app/app";
import mongoose from "mongoose";
import { createColumn, getAllColumns } from "../app/api/services/column.service";
import { string } from "zod";

// jest.mock("../app/api/services/__mocks__/column.service");


const payload: any = {
  "formName": "Tajal Islam",
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

describe("Column", () => {
  beforeAll(async () => {
    const mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri());
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoose.connection.close();
  });

  describe('get column route', () => {

    it('If data found ,it should return a 200 && column data', async () => {
      const formData = await createColumn(payload);
      let columnsId = formData.columns._id as string;
      const { body, statusCode } = await supertest(app).get(`/api/columns/${columnsId}`).expect(200);
      expect(statusCode).toBe(200);
      expect(body.columns._id).toBe(columnsId.toString());
    });
  });//TestCase-01:end



  /* create column TestCase-02:start*/
  describe('create column route', () => {

    it('Create column with 200 status && return data', async () => {
      const column = await createColumn(payload);
      const responce = await supertest(app).post(`/api/columns`);
    });
  });


  /* create column TestCase-02:start*/
  describe('get columns', () => {
    test('return all columns', async () => {
      const { body, statusCode } = await supertest(app).get(`/api/columns`);
      console.log()
      expect(body.status).toBe(1);
      expect(statusCode).toBe(200);
      expect(body.data.length).toBeGreaterThan(0);
      console.log(body.data[0]._id)
      expect(body.data[0]._id).toBe('621494e22821d8df6c56c809');
    })

  });


});



