import express from 'express'
import diagnoseService from '../services/diagnoseService';

const routes = express.Router();

routes.get('/', (_request, response) => {
    response.send(diagnoseService.getDiagnoses());
})

export default routes;