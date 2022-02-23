import supertest from 'supertest';
import { app } from '../app/app';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from "mongoose";
import { getForm } from '../app/api/services/form.service';

export const formPayload = {
    username: "Tajal Islam",
    email: "string@gmail.com",
    password: "string",
}


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

        // describe('if form data does not exit', () => {
        //     it('Should return a 200', async () => {
        //         const formId = "form-123";
        //         await supertest(app).get(`/api/forms/${formId}`).expect(500);
        //     })
        // })


        describe('if form data does exit', () => {
            it('Should return a 200 && form data', async () => {
                const formData = await getForm(formPayload);
                console.log(formData)
                //@ts-ignore
                let id: any = formData._id;
                const formId = "62152e9f2ebf79aaaa0d0ef6";
                const { body, statusCode } = await supertest(app).get(`/api/forms/${id}`).expect(200);
                expect(statusCode).toBe(200);
                expect(body._id).toBe(formId);
            })
        });


    })

})