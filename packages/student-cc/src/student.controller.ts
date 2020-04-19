import { ChaincodeTx } from '@worldsibu/convector-platform-fabric';
import {
  Controller,
  ConvectorController,
  Invokable,
  Param
} from '@worldsibu/convector-core';
import * as yup from 'yup';
import { Student, } from './student.model';
import { Condidate } from './student.model';
import { Election } from './student.model';
import { Surv } from './student.model';
import { Degree } from './enums';
@Controller('student')
export class StudentController extends ConvectorController<ChaincodeTx> {
  @Invokable()
  public async create(
    @Param(yup.string())
    id: string,
    @Param(yup.string())
    name: string,
    @Param(yup.string())
    bdate: string,
    @Param(yup.string())
    classe: string,
    @Param(yup.string())
    cind: string,
    @Param(yup.string())
    cin: string,
    @Param(yup.string())
    degree
  ): Promise<Student> {
    const existing = await Student.getOne(id);
    if (!existing || !existing.id) {
      let newparticipant = new Student();
      newparticipant.id = id;
      newparticipant.name = name;
      newparticipant.bdate = bdate;
      newparticipant.classe = classe;
      newparticipant.cind = cind;
      newparticipant.cin = cin;
      if (degree === 'licence') {
        newparticipant.degree = Degree.LICENCE;
      } else {
        if (degree !== 'master') {
          throw new Error('undifiened degree type');
        }
        newparticipant.degree = Degree.MASTER;
      }
      await newparticipant.save();
      return newparticipant;
    } else {
      throw new Error('Identity exists already');
    }
  }
  @Invokable()
  public async get(
    @Param(yup.string())
    id: string
  ): Promise<Student> {
    const student = Student.getOne(id);
    return student;
  }
  @Invokable()
  public async getallStudent(
  ) {
    const allstudent = await Student.getAll<Student>();
    return allstudent;
  }
  @Invokable()
  public async getallElection(
  ) {
    const allElection = await Election.getAll<Election>();
    return allElection;
  }
  @Invokable()
  public async addcondidate(
    @Param(yup.string()) id1: string,
    @Param(yup.string()) id: string,
    @Param(yup.string()) party: string
  ) {
    const existing = await Student.getOne(id);
    const celection = await Election.getOne(id1);
    if (!existing || !existing.id) {
      throw new Error('user does not exist ');
    }
    if (existing.condidate.getItem(id1)) {
      throw new Error('the user is already a condidate');
    } else {
      let now = new Date;
      let isfinish = celection.nfinisdate.getTime() - now.getTime();
      let isstart = celection.nstardate.getTime() - now.getTime();
      if (isfinish <= 0) {
        throw new Error("the nomination for this election is already over ");
      }
      if (isstart >= 0) {
        throw new Error("the nomination for this election does not started yet ");
      }
      const condidate = new Condidate();
      condidate.name = existing.name;
      condidate.party = party;
      condidate.election = celection.id;
      condidate.studentid = id;
      condidate.classe = existing.classe;
      existing.condidate.setItem(id1, true);
      await existing.save();
      await condidate.save();
    }
  }
  @Invokable()
  public async addelection(
    @Param(yup.string())
    desc: string,
    @Param(yup.string())
    name: string,
    @Param(yup.string())
    degree: Degree,
    @Param(yup.date())
    sd: Date,
    @Param(yup.date())
    fd: Date,
    @Param(yup.date())
    dns: Date,
    @Param(yup.date())
    ns: Date,
    @Param(yup.date())
    nf: Date,
    @Param(yup.date())
    dnf: Date,
    @Param(yup.number().lessThan(4).moreThan(0))
    mvps: number
  ) {
    let isAdmin = this.tx.identity.getAttributeValue('admin');
    if (!isAdmin) {
      throw new Error('Unathorized. Requester identity is not an admin');
    }
    let election = new Election();
    election.degree = degree;
    election.finishdate = fd;
    election.startdate = sd;
    election.desc = desc;
    election.name = name;
    election.dnfinishdate = dnf;
    election.dnstartdate = dns;
    election.nstardate = ns;
    election.nfinisdate = nf;
    election.mvps = mvps;
    await election.save();
  }
  @Invokable()
  public async getallcondidate(
  ) {
    let condidates = await Condidate.getAll<Condidate>();
    return condidates;
  }
  @Invokable()
  public async dnomination(
    @Param(yup.string())
    id: string,
    @Param(yup.string())
    ids: string
  ) {
    const student = await Student.getOne(ids);
    if (!student || !student.id) {
      throw new Error(`there is no student with this ID ${ids}`);
    }
    const condidate = await Condidate.getOne(id);
    if (!condidate || !condidate.id) {
      throw new Error(`there is no candidate with this ID ${id}`);
    }
    if (ids != condidate.studentid) {
      throw new Error(`you are not allowed to delete this candidate`)
    }
    const election = await Election.getOne(condidate.election);
    let now = new Date;
    let isfinish = election.dnfinishdate.getTime() - now.getTime();
    let isstart = election.dnstartdate.getTime() - now.getTime();
    if (isfinish <= 0) {
      throw new Error("the election is already over ");
    }
    if (isstart >= 0) {
      throw new Error("the election does not started yet ");
    }
    student.condidate.setItem(election.id, false);
    await condidate.delete();
    await student.save();
  }
  @Invokable()
  public async vote(
    @Param(yup.string())
    id: string,
    @Param(yup.string())
    ide: string,
    @Param(yup.array().of(yup.string()))
    ids: Array<string>
  ) {
    const student = await Student.getOne(id);
    if (!student || !student.id) {
      throw new Error(`there is no student with this id ${id}`);
    }
    const election = await Election.getOne(ide);
    if (!election || !election.id) {
      throw new Error(`there is no election with this id ${ide}`);
    }
    let now = new Date;
    let isfinish = election.finishdate.getTime() - now.getTime();
    let isstart = election.startdate.getTime() - now.getTime();
    if (isfinish <= 0) {
      throw new Error("the election is already over ");
    }
    if (isstart >= 0) {
      throw new Error("the election does not started yet ");
    }
    if (election.degree != student.degree) {
      throw new Error(`you are not allowed to vote in this election `);
    }
    if (student.voted.getItem(ide)) {
      throw new Error(`you have already voted `);
    }
    if (ids.length > election.mvps) {
      throw new Error(`max number of candidate(s) you can vote to is  ${election.mvps}`);
    }
    if (ids.length == 0) {
      election.voters += 1;
      election.blankvotes += 1;
      student.voted.setItem(ide, true);
      await election.save();
      await student.save();
      return;
    }
    let check = true;
    ids.forEach(async element => {
      let condidate = await Condidate.getOne(element);
      if ((election.id != condidate.election) || (!condidate || !condidate.id)) {
        check = false;
      }
    });
    if (!check) {
      throw new Error("please verify the candidate(s) id(s) ");
    }
    ids.forEach(async element => {
      let condidate = await Condidate.getOne(element);
      condidate.votes += 1;
    });
    student.voted.setItem(ide, true);
    election.voters += 1;
    await student.save();
    await election.save();
  }
  @Invokable()
  public async init() {
    let mochdata_student = [
      new Student({ name: 'Aymen', cin: '13473678', cind: '09-06-2015', bdate: '30-09-1997', id: '1600710', degree: Degree.LICENCE, classe: 'ars3' }),
      new Student({ name: 'shayma', cin: '13473678', cind: '09-06-2015', bdate: '30-09-1997', id: '1600711', degree: Degree.LICENCE, classe: 'ars2' }),
      new Student({ name: 'hamma', cin: '13473678', cind: '09-06-2015', bdate: '30-09-1997', id: '1600712', degree: Degree.LICENCE, classe: 'lai2' }),
      new Student({ name: 'rounda', cin: '13473678', cind: '09-06-2015', bdate: '30-09-1997', id: '1600713', degree: Degree.LICENCE, classe: 'lai3' }),
      new Student({ name: 'horchani', cin: '13473678', cind: '09-06-2015', bdate: '30-09-1997', id: '1600714', degree: Degree.LICENCE, classe: 'lfi3' }),
      new Student({ name: 'mymoushka', cin: '13473678', cind: '09-06-2015', bdate: '30-09-1997', id: '1600715', degree: Degree.MASTER, classe: 'master5' }),
      new Student({ name: 'safe', cin: '13473678', cind: '09-06-2015', bdate: '30-09-1997', id: '1600716', degree: Degree.MASTER, classe: 'master1' }),
      new Student({ name: 'fatma', cin: '13473678', cind: '09-06-2015', bdate: '30-09-1997', id: '1600717', degree: Degree.MASTER, classe: 'master2' }),
      new Student({ name: 'zaaim', cin: '13473678', cind: '09-06-2015', bdate: '30-09-1997', id: '1600718', degree: Degree.MASTER, classe: 'master3' }),
      new Student({ name: 'miha', cin: '13473678', cind: '09-06-2015', bdate: '30-09-1997', id: '1600719', degree: Degree.MASTER, classe: 'master4' }),
    ]
    await Promise.all(mochdata_student.map(student => student.save()));
    let mochdata_election = [
      new Election({ id: 'election1', name: 'election 1 2020 name', desc: 'this is a test election for master ', finishdate: new Date('04/14/2020 17:00'), startdate: new Date('04/14/2020 08:00'), nstardate: new Date('03/12/2020 08:00'), nfinisdate: new Date('03/12/2020 17:00'), dnstartdate: new Date('03/13/2020 08:00'), dnfinishdate: new Date('03/13/2020 17:00'), degree: Degree.MASTER, mvps: 1 }),
      new Election({ id: 'election2', name: 'election 2 2020 name', desc: 'this is a test election for licence ', finishdate: new Date('04/15/2020 17:00'), startdate: new Date('04/18/2020 08:00'), nstardate: new Date('03/12/2020 08:00'), nfinisdate: new Date('03/12/2020 17:00'), dnstartdate: new Date('03/13/2020 08:00'), dnfinishdate: new Date('04/13/2020 17:00'), degree: Degree.LICENCE, mvps: 2 }),
      new Election({ id: 'election3', name: 'election 3 2020 name', desc: 'this is a test election for licence ', finishdate: new Date('04/14/2020 17:00'), startdate: new Date('04/15/2020 08:00'), nstardate: new Date('03/12/2020 08:00'), nfinisdate: new Date('03/12/2020 17:00'), dnstartdate: new Date('03/13/2020 08:00'), dnfinishdate: new Date('03/13/2020 17:00'), degree: Degree.LICENCE, mvps: 2 }),
      new Election({ id: 'election4', name: 'election 4 2020 name', desc: 'this is a test election for licence ', finishdate: new Date('04/22/2020 17:00'), startdate: new Date('04/23/2020 08:00'), nstardate: new Date('04/14/2020 08:00'), nfinisdate: new Date('04/17/2020 17:00'), dnstartdate: new Date('04/18/2020 08:00'), dnfinishdate: new Date('04/17/2020 17:00'), degree: Degree.LICENCE, mvps: 2 }),
      new Election({ id: 'election5', name: 'election 5 2020 name', desc: 'this is a test election for licence ', finishdate: new Date('04/22/2020 17:00'), startdate: new Date('04/22/2020 08:00'), nstardate: new Date('04/13/2020 08:00'), nfinisdate: new Date('04/13/2020 17:00'), dnstartdate: new Date('04/15/2020 08:00'), dnfinishdate: new Date('04/16/2020 17:00'), degree: Degree.LICENCE, mvps: 2 }),
    ]
    await Promise.all(mochdata_election.map(election => election.save()));
    let mochdata_candidate = [
      new Condidate({ id: 'c1600719', studentid: '1600719', name: 'miha', party: 'uget', election: 'election1', classe: 'ARS1' }),
      new Condidate({ id: 'c1600716', studentid: '1600716', name: 'safe', party: 'ugte', election: 'election2', classe: 'ARS2' }),
      new Condidate({ id: 'c1600713', studentid: '1600713', name: 'rounda', party: 'uget', election: 'election3', classe: 'ARS3' }),
      new Condidate({ id: 'c1600712', studentid: '1600712', name: 'hamma', party: 'ugte', election: 'election4', classe: 'LFI3' }),
    ]
    await Promise.all(mochdata_candidate.map(candidate => candidate.save()));
  }
  @Invokable()
  public async addsurv(
    @Param(yup.string())
    desc: string,
    @Param(yup.string())
    name: string,
    @Param(yup.array().of(yup.string()))
    choices: Array<string>,
    @Param(yup.date())
    sd: Date,
    @Param(yup.date())
    fd: Date,
    @Param(yup.string())
    idst: string,
    @Param(yup.number())
    vnumb?: number,

  ) {
    const surv = new Surv();
    surv.desc = desc;
    surv.finishdate = fd;
    surv.name = name;
    surv.mvps = vnumb;
    surv.startdate = sd;
    choices.forEach(element => {
      surv.items.setItem(element, 0);
    });
    if (idst !== 'admin') {
      const student = await Student.getOne(idst);
      if (!student.id || !student) {
        throw new Error('Unathorized. Student identity does not exist');
      }
      surv.owner = student.id
    }else{
      surv.owner = "Admin";
    }
      await surv.save();
    }
    @Invokable()
    public async getallsurv() {
      return await Surv.getAll();
    }
    @Invokable()
    public async removeone(
    @Param(yup.string())
    id: string,
    @Param(yup.string())
    idst ?: string,
  ) {
      if (idst === null) {
        let isAdmin = this.tx.identity.getAttributeValue('admin');
        if (!isAdmin) {
          throw new Error('Unathorized. Requester identity is not an admin');
        }
      }
      const student = await Student.getOne(idst);
      if (!student.id || !student) {
        throw new Error('Unathorized. Student identity does not exist');
      }
      let surv = await Surv.getOne(id);
      if (!surv || !surv.id) {
        throw new Error('the survery with this ID does not exist ');
      }
      if (surv.owner !== student.id) {
        throw new Error('Unathorized. Requester identity is not the owner');
      }
      surv.delete();
    }
    @Invokable()
    public async votesur(
    @Param(yup.string())
    id: string,
    @Param(yup.string())
    ide: string,
    @Param(yup.array().of(yup.string()))
    ids: Array<string>
  ) {
      const student = await Student.getOne(id);
      if (!student || !student.id) {
        throw new Error(`there is no student with this id ${id}`);
      }
      const surv = await Surv.getOne(ide);
      if (!surv || !surv.id) {
        throw new Error(`there is no surv with this id ${ide}`);
      }
      let now = new Date;
      let isfinish = surv.finishdate.getTime() - now.getTime();
      let isstart = surv.startdate.getTime() - now.getTime();
      if (isfinish <= 0) {
        throw new Error("the surv is already over ");
      }
      if (isstart >= 0) {
        throw new Error("the surv does not started yet ");
      }
      if (student.voted.getItem(ide)) {
        throw new Error(`you have already voted `);
      }
      if (ids.length > surv.mvps || ids.length < 0) {
        throw new Error(`max number of candidate(s) you can vote to is  ${surv.mvps} and the min is 1`);
      }
      let check = true
      ids.forEach(element => {
        if (surv.items.getItem(element) === null) check = false
      });
      if (!check) throw new Error('please check the given choices ');
      ids.forEach(element => {
        surv.items.setItem(element, (surv.items.getItem(element) + 1));
      })
      student.voted.setItem(ide, true);
      await surv.save();
      await student.save();
    }
    @Invokable()
    public async getcandidate(
    @Param(yup.string())
    id: string,
  ) {
      const election = await Election.getOne(id);
      if (!election || !election.id) {
        throw new Error("election does not exist");
      }
      const candidate = await Condidate.getAll()
      const can = new Array<Condidate>();
      candidate.forEach(element => {
        if (element.election === id) can.push(element);
      })
      return can;
    }
    @Invokable()
    public async getmyelections(
    @Param(yup.string())
    id: string
  ) {
      const student = await Student.getOne(id);
      if (!student || !student.id) throw new Error('student does not exist ')
      const candidate = await Condidate.getAll()
      const elections = new Array<Election>();
      candidate.forEach(async element => {
        elections.push(await Election.getOne(element.election))
      });
      return elections;
    }
    @Invokable()
    public async getmysurvs(@Param(yup.string()) id: string) {
      const student = await Student.getOne(id);
      if (!student || !student.id) throw new Error('student does not exist ')
      const surv = await Surv.getAll();
      const survs = new Array<Surv>();
      surv.forEach(element => {
        if (element.owner === id) survs.push(element);
      });
      return survs;
    }
    @Invokable()
    public async removelection(
    @Param(yup.string())
    id: string,
  ) {
      let isAdmin = this.tx.identity.getAttributeValue('admin');
      if (!isAdmin) {
        throw new Error('Unathorized. Requester identity is not an admin');
      }
      let election = await Election.getOne(id);
      if (!election || !election.id) {
        throw new Error('the survery with this ID does not exist ');
      }
      await election.delete();
    }


  }