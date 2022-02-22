import { MongoMemoryServer } from "mongodb-memory-server";
import supertest from "supertest";
import { app } from "../app/app";
import mongoose from "mongoose";
import { createColumn } from "../app/api/services/column.service";


export const payload = {
  "formName": "Digital Bangladesh owner",
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
    await mongoose.connect('mongodb://localhost:27017/forms');
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoose.connection.close();
  });

  describe('if column data does exit', () => {
    it('Should return a 200', async () => {
      const columnsId = "62137c928a799828c0f0c8e4";
      // @ts-ignore
      const column = await createColumn(payload);
      const data = await supertest(app).get(`/api/columns/${columnsId}`);
      console.log(data);
    });
  });
});
