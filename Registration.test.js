const request = require('supertest');
const app = require("./Registration");
const axios = require('axios');
const xlsx = require('xlsx');

jest.mock('axios');
jest.mock('xlsx');



describe("POST /Register", () => {

    describe("should fetch data from the given URL and save it to an xlsx file", () => {
       
        test("should respond with a 200 status code if data are correct", async () => {

            const mockData = [{Name:'Jhon', Surname:'Doe', Email:'Jhon.doe@email.com', Phone:'+48791026360'}];
            axios.getAdapter.mockResolvedValue({data:mockData});

            const response = await request(app).post("/Register").send({url:'https://Google.com'})
            expect(response.statusCode).toBe(200)
            expect(response.text).toBe('Data fetched')
        })
        
    })

    describe("when the user does not provide a incomplete form", () => {

            // should respond with a 5xx status code for bad request. 
    })

});