import { Gender, NewEntry, NewPatient, Diagnose, HealthCheckRating, SickLeave, Discharge } from "./types";

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
}

const isNumber = (number: unknown): number is number => {
  return typeof number === 'number';
}

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
}

const isGender = (param: string): param is Gender => {
  return Object.values(Gender).map(g => g.toString()).includes(param);
}

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isString(gender) || !isGender(gender)) {
    throw new Error('Incorrect or missing gender ' + gender);
  }
  return gender;
}

const parseName = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error('Incorrect or missing name ' + name);
  }
  return name;
}

const parseDateOfBirth = (dateOfBirth: unknown): string => {
  if (!dateOfBirth || !isString(dateOfBirth) || !isDate(dateOfBirth)) {
    throw new Error('Incorrect or missing date of birth ' + dateOfBirth);
  }
  return dateOfBirth;
}

const parseSsn = (ssn: unknown): string => {
  if (!ssn || !isString(ssn)) {
    throw new Error('Incorrect or missing ssn ' + ssn);
  }
  return ssn;
}

const parseOccupation = (occupation: unknown): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error('Incorrect or missing occupation ' + occupation);
  }
  return occupation;
}

export const toNewPatient = (object: unknown): NewPatient => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data');
  }

  if ('name' in object && 'dateOfBirth' in object && 'ssn' in object && 'gender' in object && 'occupation' in object) {
    const newEntry: NewPatient = {
      name: parseName(object.name),
      dateOfBirth: parseDateOfBirth(object.dateOfBirth),
      ssn: parseSsn(object.ssn),
      gender: parseGender(object.gender),
      occupation: parseOccupation(object.occupation),
      entries: []
    }
    return newEntry;
  }

  throw new Error('Incorrect data: some fields are missing');
}

const parseDescription = (description: unknown): string => {
  if (!description || !isString(description)) {
    throw new Error('Incorrect or missing description ' + description);
  }
  return description;
}

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error('Incorrect or missing date ' + date);
  }
  return date;
}

const parseSpecialist = (specialist: unknown): string => {
  if (!specialist || !isString(specialist)) {
    throw new Error('Incorrect or missing specialist ' + specialist);
  }
  return specialist;
}

const parseDiagnosisCodes = (object: unknown): Array<Diagnose['code']> => {
  if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
    // we will just trust the data to be in correct form
    return [] as Array<Diagnose['code']>;
  }

  return object.diagnosisCodes as Array<Diagnose['code']>;
};

const isHealthCheckRating = (param: number): param is HealthCheckRating => {
  return Object.values(HealthCheckRating).map(g => Number(g.toString())).includes(param);
}

const parseHealthCheckRating = (healthCheckRating: unknown): HealthCheckRating => {
  if (!isNumber(healthCheckRating) || !isHealthCheckRating(healthCheckRating)) {
    console.log(!healthCheckRating, !isNumber(healthCheckRating))
    throw new Error('Incorrect or missing healthCheckRating ' + healthCheckRating);
  }
  return healthCheckRating;
}

const parseEmployerName = (employerName: unknown): string => {
  if (!employerName || !isString(employerName)) {
    throw new Error('Incorrect or missing specialist ' + employerName);
  }
  return employerName;
}

const parseSickLeave = (object: unknown): SickLeave => {
  if (!object || typeof object !== 'object' || !('startDate' in object) || !('endDate' in object)) {
    throw new Error('Incorrect or missing sick leave');
  }

  return object as SickLeave;
};

const parseDischarge = (object: unknown): Discharge => {
  if (!object || typeof object !== 'object' || !('date' in object) || !('criteria' in object)) {
    throw new Error('Incorrect or missing sick leave');
  }

  return object as Discharge;
};

export const toNewEntry = (object: unknown): NewEntry => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data');
  }

  if ('type' in object && (object.type === 'HealthCheck' || object.type === 'Hospital' || object.type === 'OccupationalHealthcare') && 'description' in object && 'date' in object && 'specialist' in object && 'diagnosisCodes' in object) {
    if (object.type === 'HealthCheck' && 'healthCheckRating' in object) {
      const newEntry: NewEntry = {
        description: parseDescription(object.description),
        date: parseDate(object.date),
        specialist: parseSpecialist(object.specialist),
        diagnosisCodes: parseDiagnosisCodes(object),
        healthCheckRating: parseHealthCheckRating(object.healthCheckRating),
        type: 'HealthCheck'
      }
      return newEntry
    } else if (object.type === 'OccupationalHealthcare' && 'employerName' in object && 'sickLeave' in object) {
      const newEntry: NewEntry = {
        description: parseDescription(object.description),
        date: parseDate(object.date),
        specialist: parseSpecialist(object.specialist),
        diagnosisCodes: parseDiagnosisCodes(object),
        employerName: parseEmployerName(object.employerName),
        sickLeave: parseSickLeave(object.sickLeave),
        type: 'OccupationalHealthcare'
      }
      return newEntry
    } else if (object.type === 'Hospital' && 'discharge' in object) {
      const newEntry: NewEntry = {
        description: parseDescription(object.description),
        date: parseDate(object.date),
        specialist: parseSpecialist(object.specialist),
        diagnosisCodes: parseDiagnosisCodes(object),
        discharge: parseDischarge(object.discharge),
        type: 'Hospital'
      }
      return newEntry
    }
  }

  throw new Error('Incorrect data: some fields are missing');
}