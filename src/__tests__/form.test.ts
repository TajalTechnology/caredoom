import supertest from 'supertest';
import { app } from '../app/app';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from "mongoose";
import { getForm } from '../app/api/services/form.service';
import { signJwt } from '../app/common/utils/jwt';

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

export const columnPayload = {
    "formName": "Column payload",
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

export const columnPayload2 = {
    "formName": "Column payload 2",
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

export const columnPayload3 = {
    "formName": "Column payload 3",
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

export const formPayload = {
    "username": "Tajal Islam",
    "email": "string@gmail.com",
    "password": "string",
    "columnOne": "Hi how are you",
    "columnTwo": "This is string"
};

export const formPayload2 = {
    "username": "Tajal Islam",
    "email": "stringm@gmail.com",
    "password": "string",
    "again": "New coulum",
    "columnOne": "Hi how are you",
    "columnTwo": "This is string"
};

export const formPayload3 = {
    "username": "Tajal Islam",
    "email": "strinkm@gmail.com",
    "password": "string",
    "columnOne": "Hi how are you",
    "columnTwo": "This is string"
};

export const updateFormPayload3 = {
    "username": "Tajal Islam",
    "email": "strinmm@gmail.com",
    "password": "string",
    "again": "New coulum",
    "columnOne": "Hi how are you",
    "columnTwo": "This is string"
};

export const deleteForm = {
    "username": "Tajal Islam",
    "email": "strinmm@gmail.com",
    "password": "string",
    "again": "New coulum",
    "columnOne": "Hi how are you",
    "columnTwo": "This is string"
};

const userId = new mongoose.Types.ObjectId().toString();
export const userPayload = {
    _id: userId,
    "password": "123456",
    "email": "md4@gmail.com",
};

const jwt = signJwt(userPayload);

describe('form', () => {

    /* get form test case */
    describe('get form route', () => {

        beforeAll(async () => {
            const mongoServer = await MongoMemoryServer.create();
            await mongoose.connect(mongoServer.getUri());
        });

        afterAll(async () => {
            await mongoose.disconnect();
            await mongoose.connection.close();
        });

        describe('Form create', () => {
            // //if uer not logged in
            // describe("given the user is not logged in", () => {
            //     it("should return a 403", async () => {
            //         const { body, statusCode } = await supertest(app).post("/api/forms");
            //         expect(statusCode).toBe(403);
            //     });
            // });

            //if user logged in
            describe("given the user is logged in", () => {

                test("should return a 200 and create the product", async () => {
                    // @ts-ignore
                    const responce = await supertest(app).post('/api/columns')
                        .set("Authorization", `Bearer ${jwt}`)
                        .send(getColumnPayload);

                    const { body, statusCode } = await supertest(app).post(`/api/forms/${responce.body.columns._id}`)
                        .set("Authorization", `Bearer ${jwt}`)
                        .send(formPayload);

                    expect(statusCode).toBe(200);
                    expect(body._id).toEqual(expect.any(String));
                    expect(body.username).toEqual(expect.any(String));
                    expect(body.email).toEqual(expect.any(String));
                    expect(body.password).toEqual(expect.any(String));
                    expect(body.createdAt).toEqual(expect.any(String));
                    expect(body.updatedAt).toEqual(expect.any(String));
                });
            });

        });

        /* get columns */
        describe('get all form data', () => {
            test('return all form data', async () => {
                const { body, statusCode } = await supertest(app).get(`/api/forms`);
                expect(body.status).toBe(1);
                expect(statusCode).toBe(200);
                expect(body.data.length).toBeGreaterThan(0);
                expect(body.data[0]._id).toEqual(expect.any(String));
            });
        });

        /* get column */
        describe('get form data', () => {
            test('return a single form data', async () => {
                // @ts-ignore
                const responce = await supertest(app).post('/api/columns')
                    .set("Authorization", `Bearer ${jwt}`)
                    .send(columnPayload);

                const createFormData = await supertest(app).post(`/api/forms/${responce.body.columns._id}`)
                    .set("Authorization", `Bearer ${jwt}`)
                    .send(formPayload2);

                const { body, statusCode } = await supertest(app).get(`/api/forms/${createFormData.body._id}`)

                expect(body.status).toBe(1);
                expect(statusCode).toBe(200);
                expect(body._id).toBe(createFormData.body._id);
            });
        });

        //update
        describe('form data updated', () => {
            test('put should update an existing user', async () => {
                const responce = await supertest(app).post('/api/columns')
                    .set("Authorization", `Bearer ${jwt}`)
                    .send(columnPayload2);
                const createFormData = await supertest(app).post(`/api/forms/${responce.body.columns._id}`)
                    .send(formPayload3);

                let { body, statusCode } = await supertest(app).put(`/api/forms/${createFormData.body._id}`).send(updateFormPayload3);
                expect(statusCode).toBe(200);
                expect(body._id).toEqual(expect.any(String));
                expect(body.updatedAt).not.toEqual(createFormData.body.updatedAt);
            });
        });

        //delete
        describe('Delete form', () => {
            test('Delete & return status', async () => {
                const responce = await supertest(app).post('/api/columns')
                    .set("Authorization", `Bearer ${jwt}`)
                    .send(columnPayload3);

                const createFormData = await supertest(app).post(`/api/forms/${responce.body.columns._id}`)
                    .send(deleteForm);

                let { body, statusCode } = await supertest(app).delete(`/api/forms/${responce.body.columns._id}`);
                expect(body.status).toBe(1);
                expect(statusCode).toBe(200);
                expect(body.message).toEqual(expect.any(String));
            });
        });

    });
});