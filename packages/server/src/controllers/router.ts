import * as express from 'express';
import { 
    StudentController_create_post,
    StudentController_get_get,
    StudentController_getallStudent_get,
    StudentController_getallElection_get,
    StudentController_addcondidate_post,
    StudentController_addelection_post,
    StudentController_getallcondidate_get,
    StudentController_dnomination_delete,
    StudentController_vote_post,
    StudentController_addsurv_post,
    StudentController_getallsurv_get,
    StudentController_removeone_delete,
    StudentController_votesur_post,
    StudentController_getcandidate_get,
    StudentController_getmyelections_get,
    StudentController_getmysurvs_get,
    StudentController_removelection_delete } from './controllers'
export default express.Router()
.post('/student/create', StudentController_create_post)
.get('/student/get/:id', StudentController_get_get)
.get('/student/getallStudent', StudentController_getallStudent_get)
.get('/student/getallElection', StudentController_getallElection_get)
.post('/student/addcondidate', StudentController_addcondidate_post)
.post('/student/addelection', StudentController_addelection_post)
.get('/student/getallcondidate', StudentController_getallcondidate_get)
.delete('/student/dnomination', StudentController_dnomination_delete)
.post('/student/vote', StudentController_vote_post)
.post('/student/addsurv', StudentController_addsurv_post)
.get('/student/getallsurv', StudentController_getallsurv_get)
.delete('/student/removeone', StudentController_removeone_delete)
.post('/student/votesur', StudentController_votesur_post)
.get('/student/getcandidate/:id', StudentController_getcandidate_get)
.get('/student/getmyelections/:id', StudentController_getmyelections_get)
.get('/student/getmysurvs/:id', StudentController_getmysurvs_get)
.delete('/student/removelection', StudentController_removelection_delete)
