import * as yup from 'yup';
import { Degree } from './enums';
import { ConvectorModel, Default, ReadOnly, Required, Validate, } from '@worldsibu/convector-core-model';

export class Student extends ConvectorModel<Student> {
  @ReadOnly()
  @Required()
  public readonly type = 'vote.student';
  @Required()
  @Validate(yup.string())
  public name: string;
  @Required()
  @Validate(yup.string())
  public cind: string;
  @Required()
  @Validate(yup.string())
  public cin: string;
  @Required()
  @Validate(yup.string())
  public bdate: string;
  @Required()
  @Validate(yup.string())
  public id: string;
  @Default({})
  @Validate(yup.object())
  public condidate: Object;
  @Default({})
  @Validate(yup.object())
  public voted: Object;
  @Required()
  @Validate(yup.string())
  public degree: Degree;
  @Required()
  @Validate(yup.string())
  public classe: string;
}
export class Condidate extends ConvectorModel<Condidate> {
  @ReadOnly()
  @Required()
  public readonly type = 'vote.condidate';
  @Required()
  @Validate(yup.string())
  public studentid: string;
  @Required()
  @Validate(yup.string())
  public id: string;
  @Required()
  @Validate(yup.string())
  public name: string;
  @Required()
  @Validate(yup.string())
  public party: string;
  @Required()
  @Validate(yup.string())
  public election: string;
  @Default(0)
  @Required()
  @Validate(yup.number())
  public votes: number;
  @Validate(yup.string())
  @Required()
  public classe: string
}
export class Election extends ConvectorModel<Election> {
  @ReadOnly()
  @Required()
  public readonly type = 'vote.election';
  @Required()
  @Validate(yup.string())
  public name : string;
  @Required()
  @Validate(yup.string())
  public id: string;
  @Required()
  @Validate(yup.string())
  public desc: string;
  @Required()
  @Validate(yup.string())
  public degree: Degree;
  @Required()
  @Validate(yup.date())
  public startdate: Date;
  @Required()
  @Validate(yup.date())
  public finishdate: Date;
  @Required()
  @Validate(yup.date())
  public dnstartdate: Date;
  @Required()
  @Validate(yup.date())
  public nstardate: Date;
  @Required()
  @Validate(yup.date())
  public nfinisdate: Date;
  @Required()
  @Validate(yup.date())
  public dnfinishdate: Date;
  @Required()
  @Default(0)
  @Validate(yup.number())
  public voters: number;
  @Required()
  @Default(0)
  @Validate(yup.number())
  public blankvotes: number;
  @Required()
  @Validate(yup.number().moreThan(0).lessThan(4))
  public mvps: number;
}
export class Surv extends ConvectorModel<Surv>{
  @ReadOnly()
  @Required()
  public readonly type = 'vote.surv';
  @Required()
  @Validate(yup.string())
  public desc: string;
  @Required()
  @Validate(yup.string())
  public name: string;
  @Required()
  @Validate(yup.string())
  public owner: string;
  @Required()
  @Validate(yup.date())
  public startdate: Date;
  @Required()
  @Validate(yup.date())
  public finishdate: Date;
  @Default({})
  @Validate(yup.object())
  public items: object;
  @Required()
  @Default(1)
  @Validate(yup.number().moreThan(0).lessThan(4))
  public mvps: number;
}