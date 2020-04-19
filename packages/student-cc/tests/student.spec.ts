// tslint:disable:no-unused-expression
import { join } from 'path';
import { expect } from 'chai';
import * as uuid from 'uuid/v4';
import { MockControllerAdapter } from '@worldsibu/convector-adapter-mock';
import { ClientFactory, ConvectorControllerClient } from '@worldsibu/convector-core';
import 'mocha';

import { Student, StudentController } from '../src';

describe('Student', () => {
  let adapter: MockControllerAdapter;
  let studentCtrl: ConvectorControllerClient<StudentController>;
  
  before(async () => {
    // Mocks the blockchain execution environment
    adapter = new MockControllerAdapter();
    studentCtrl = ClientFactory(StudentController, adapter);

    await adapter.init([
      {
        version: '*',
        controller: 'StudentController',
        name: join(__dirname, '..')
      }
    ]);

    adapter.addUser('Test');
  });
  
  it('should create a default model', async () => {
    const modelSample = new Student({
      id: uuid(),
      name: 'Test',
      created: Date.now(),
      modified: Date.now()
    });

    await studentCtrl.$withUser('Test').create(modelSample);
  
    const justSavedModel = await adapter.getById<Student>(modelSample.id);
  
    expect(justSavedModel.id).to.exist;
  });
});