import { Request, Response } from 'express';
import { StudentControllerBackEnd } from '../convector';


export async function StudentController_create_post(req: Request, res: Response): Promise<void>{
    try{
        let params = req.body;
            res.status(200).send(await StudentControllerBackEnd
                .create(params.id,params.name,params.bdate,params.classe,params.cind,params.cin,params.degree));
            
    } catch(ex) {
        console.log('Error post StudentController_create', ex.stack);
        res.status(500).send(ex);
    }
}
export async function StudentController_get_get(req: Request, res: Response): Promise<void>{
    try{
        let params = req.params;
        res.status(200).send(await StudentControllerBackEnd
            .get(params.id));
        
    } catch(ex) {
        console.log('Error get StudentController_get', ex.stack);
        res.status(500).send(ex);
    }
}
export async function StudentController_getallStudent_get(req: Request, res: Response): Promise<void>{
    try{
        let params = req.params;
        res.status(200).send(await StudentControllerBackEnd
            .getallStudent());
        
    } catch(ex) {
        console.log('Error get StudentController_getallStudent', ex.stack);
        res.status(500).send(ex);
    }
}
export async function StudentController_getallElection_get(req: Request, res: Response): Promise<void>{
    try{
        let params = req.params;
        res.status(200).send(await StudentControllerBackEnd
            .getallElection());
        
    } catch(ex) {
        console.log('Error get StudentController_getallElection', ex.stack);
        res.status(500).send(ex);
    }
}
export async function StudentController_addcondidate_post(req: Request, res: Response): Promise<void>{
    try{
        let params = req.body;
            res.status(200).send(await StudentControllerBackEnd
                .addcondidate(params.id1,params.id,params.party));
            
    } catch(ex) {
        console.log('Error post StudentController_addcondidate', ex.stack);
        res.status(500).send(ex);
    }
}
export async function StudentController_addelection_post(req: Request, res: Response): Promise<void>{
    try{
        let params = req.body;
            res.status(200).send(await StudentControllerBackEnd
                .addelection(params.desc,params.name,params.degree,params.sd,params.fd,params.dns,params.ns,params.nf,params.dnf,params.mvps));
            
    } catch(ex) {
        console.log('Error post StudentController_addelection', ex.stack);
        res.status(500).send(ex);
    }
}
export async function StudentController_getallcondidate_get(req: Request, res: Response): Promise<void>{
    try{
        let params = req.params;
        res.status(200).send(await StudentControllerBackEnd
            .getallcondidate());
        
    } catch(ex) {
        console.log('Error get StudentController_getallcondidate', ex.stack);
        res.status(500).send(ex);
    }
}
export async function StudentController_dnomination_delete(req: Request, res: Response): Promise<void>{
    try{
        let params = req.body;
            res.status(200).send(await StudentControllerBackEnd
                .dnomination(params.id,params.ids));
            
    } catch(ex) {
        console.log('Error delete StudentController_dnomination', ex.stack);
        res.status(500).send(ex);
    }
}
export async function StudentController_vote_post(req: Request, res: Response): Promise<void>{
    try{
        let params = req.body;
            res.status(200).send(await StudentControllerBackEnd
                .vote(params.id,params.ide,params.ids));
            
    } catch(ex) {
        console.log('Error post StudentController_vote', ex.stack);
        res.status(500).send(ex);
    }
}
export async function StudentController_addsurv_post(req: Request, res: Response): Promise<void>{
    try{
        let params = req.body;
            res.status(200).send(await StudentControllerBackEnd
                .addsurv(params.desc,params.choices,params.sd,params.fd,params.vnumb,params.idst));
            
    } catch(ex) {
        console.log('Error post StudentController_addsurv', ex.stack);
        res.status(500).send(ex);
    }
}
export async function StudentController_getallsurv_get(req: Request, res: Response): Promise<void>{
    try{
        let params = req.params;
        res.status(200).send(await StudentControllerBackEnd
            .getallsurv());
        
    } catch(ex) {
        console.log('Error get StudentController_getallsurv', ex.stack);
        res.status(500).send(ex);
    }
}
export async function StudentController_removeone_delete(req: Request, res: Response): Promise<void>{
    try{
        let params = req.body;
            res.status(200).send(await StudentControllerBackEnd
                .removeone(params.id,params.idst));
            
    } catch(ex) {
        console.log('Error delete StudentController_removeone', ex.stack);
        res.status(500).send(ex);
    }
}
export async function StudentController_votesur_post(req: Request, res: Response): Promise<void>{
    try{
        let params = req.body;
            res.status(200).send(await StudentControllerBackEnd
                .votesur(params.id,params.ide,params.ids));
            
    } catch(ex) {
        console.log('Error post StudentController_votesur', ex.stack);
        res.status(500).send(ex);
    }
}
export async function StudentController_getcandidate_get(req: Request, res: Response): Promise<void>{
    try{
        let params = req.params;
        res.status(200).send(await StudentControllerBackEnd
            .getcandidate(params.id));
        
    } catch(ex) {
        console.log('Error get StudentController_getcandidate', ex.stack);
        res.status(500).send(ex);
    }
}
export async function StudentController_getmyelections_get(req: Request, res: Response): Promise<void>{
    try{
        let params = req.params;
        res.status(200).send(await StudentControllerBackEnd
            .getmyelections(params.id));
        
    } catch(ex) {
        console.log('Error get StudentController_getmyelections', ex.stack);
        res.status(500).send(ex);
    }
}
export async function StudentController_getmysurvs_get(req: Request, res: Response): Promise<void>{
    try{
        let params = req.params;
        res.status(200).send(await StudentControllerBackEnd
            .getmysurvs(params.id));
        
    } catch(ex) {
        console.log('Error get StudentController_getmysurvs', ex.stack);
        res.status(500).send(ex);
    }
}
export async function StudentController_removelection_delete(req: Request, res: Response): Promise<void>{
    try{
        let params = req.body;
            res.status(200).send(await StudentControllerBackEnd
                .removelection(params.id));
            
    } catch(ex) {
        console.log('Error delete StudentController_removelection', ex.stack);
        res.status(500).send(ex);
    }
}