import supertest from "supertest";
import { MongoMemoryServer } from "mongodb-memory-server";
import { app } from "../app/app";
import mongoose from "mongoose";
import { signJwt } from "../app/common/utils/jwt";
import { createColumn } from "../app/api/services/column.service";


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

export const getColumnPayload = {
    "formName": "New Column 2",
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

export const updateCreateColumnPayload = {
    "formName": "New Column 3",
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
export const updateUpdateColumnPayload = {
    "formName": "New Column update",
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

describe('column', () => {

    //before execute for all test
    beforeAll(async () => {
        const mongoServer = await MongoMemoryServer.create();
        await mongoose.connect(mongoServer.getUri());
    });
    //after execute for all test
    afterAll(async () => {
        await mongoose.disconnect();
        await mongoose.connection.close();
    });

    //create product
    describe('create column', () => {

        // //if uer not logged in
        // describe("given the user is not logged in", () => {
        //     it("should return a 403", async () => {
        //         const { body, statusCode } = await supertest(app).post("/api/columns");
        //         expect(statusCode).toBe(403);
        //     });
        // });//end

        //if user logged in
        describe("given the user is logged in", () => {
            test("should return a 200 and create the product", async () => {
                const { body, statusCode } = await supertest(app).post('/api/columns')
                    .set("Authorization", `Bearer ${jwt}`)
                    .send(columnPayload);

                expect(statusCode).toBe(200);
                expect(body.status).toBe(1);
                expect(body.columns._id).toEqual(expect.any(String));
                expect(body.columns.formName).toEqual(expect.any(String));
                expect(body).toEqual({
                    columns: {
                        columnOne: {
                            columnName: 'countryName',
                            assignment: 'auto',
                            dataType: 'string',
                            maxLength: '40',
                            minLength: '4',
                            bSearch: 'true',
                            bDisplay: 'true',
                            bDisabled: 'true',
                            evaluationFormula: 'true'
                        },
                        columnTwo: {
                            columnName: 'districtName',
                            assignment: 'manual',
                            dataType: 'string',
                            maxLength: '40',
                            minLength: '4',
                            bSearch: 'true',
                            bDisplay: 'true',
                            bDisabled: 'true',
                            evaluationFormula: 'true'
                        },
                        formName: expect.any(String),
                        _id: expect.any(String),
                        createdAt: expect.any(String),
                        updatedAt: expect.any(String),
                        __v: 0
                    },
                    status: 1
                });
            });
        });
    });//end create product

    /* get columns */
    describe('get columns', () => {
        test('return all columns', async () => {
            const { body, statusCode } = await supertest(app).get(`/api/columns`);
            expect(body.status).toBe(1);
            expect(statusCode).toBe(200);
            expect(body.data.length).toBeGreaterThan(0);
            expect(body.data[0]._id).toEqual(expect.any(String));
        });
    });//end

    /* get column */
    describe('get column', () => {
        test('return a single column', async () => {
            // @ts-ignore
            const responce = await supertest(app).post('/api/columns')
                // .set("Authorization", `Bearer ${jwt}`)
                .send(getColumnPayload);

            const { body, statusCode } = await supertest(app).get(`/api/columns/${responce.body.columns._id}`);
            expect(body.status).toBe(1);
            expect(statusCode).toBe(200);
            expect(body._id).toBe(responce.body.columns._id);
        });
    });//end

    describe('put column', () => {
        test('put should update an existing user', async () => {
            const responce = await supertest(app).post('/api/columns')
                .set("Authorization", `Bearer ${jwt}`)
                .send(updateCreateColumnPayload);
            let { body, statusCode } = await supertest(app).put(`/api/columns/${responce.body.columns._id}`).send(updateUpdateColumnPayload);

            expect(statusCode).toBe(200);
            expect(body._id).toEqual(expect.any(String));
            expect(body.formName).toEqual(expect.any(String));
        });
    });
    
    describe('Delete column', () => {
        test('Delete & return status', async () => {
            const responce = await supertest(app).post('/api/columns')
                .set("Authorization", `Bearer ${jwt}`)
                .send(updateCreateColumnPayload);
            let { body, statusCode } = await supertest(app).delete(`/api/columns/${responce.body.columns._id}`);
            expect(body.status).toBe(1);
            expect(statusCode).toBe(200);
            expect(body.message).toEqual(expect.any(String));
        });
    });


});