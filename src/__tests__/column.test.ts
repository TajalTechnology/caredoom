
import supertest from "supertest";
import { getAllColumns } from "../app/api/services/column.service";
import { app } from "../app/app";

jest.mock("../app/api/services/column.service");

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
  });

  /* get column */
  describe('get column', () => {

    test('return a single column', async () => {
      const { body, statusCode } = await supertest(app).get(`/api/columns/621494e22821d8df6c56c809`);
      expect(body.status).toBe(1);
      expect(statusCode).toBe(200);
      expect(body._id).toBe('621494e22821d8df6c56c809');
    });

    test('return a message if no data found', async () => {
      const { body, statusCode } = await supertest(app).get(`/api/columns/621494e22821d8df6c56c808`);
    });

  });
});



