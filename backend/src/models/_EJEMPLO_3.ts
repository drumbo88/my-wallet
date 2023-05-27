import mongoose, { Model, Schema, model } from 'mongoose';
import { DB_CONNECTION_STRING } from '../config';

mongoose.set('strictQuery', false)
mongoose.connect(DB_CONNECTION_STRING)

/* Person (abstract): Employee | Client */
interface IPerson {
  name: string;
  getNombreCompleto(): string
}

interface PersonModel extends Model<IPerson> {
  myStaticMethod(): number;
}

const personSchema = new Schema<IPerson, PersonModel>({ name: String });
personSchema.method('getNombreCompleto', function (this: IPerson) {
  return `rbx_${this.name}`;
});
personSchema.static('myStaticMethod', function () {
  return 42;
});

const Person = model<IPerson, PersonModel>('Person', personSchema);

const person = new Person({ name: 'drumbo' })

//const answer: number = Person.myStaticMethod(); // 42

/* Employee */
interface IEmployee extends IPerson {
  salary?: number;
  // Instance methods
}

interface EmployeeModel extends Model<IEmployee> {
  // Static methods
  myStaticMethod(): number;
}

const employeeSchema = new Schema<IEmployee, EmployeeModel>({ name: String, salary: Number });
    employeeSchema.method('getNombreCompleto', function (this: IEmployee) {
        return `rbx_${this.name}`;
    });
    employeeSchema.static('myStaticMethod', function () {
        return 42;
    });

const Employee = model<IEmployee, EmployeeModel>('Employee', employeeSchema);

const employee = new Employee({ name: 'drumbo', salary:180000, hola: 'asdas'});

//const answer: number = Employee.myStaticMethod(); // 42


(async () => {
    await employee.save()
})()