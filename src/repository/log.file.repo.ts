import fs from 'fs/promises';

import { Log } from '../entities/log';
import createDebug from 'debug';
const debug = createDebug('W6');

const file = './data/data.json';

export class LogFileRepo {
  constructor() {
    debug('Instantiated at LogFileRepo');
  }

  async query(): Promise<Log[]> {
    const initialData: string = await fs.readFile(file, { encoding: 'utf-8' });
    return JSON.parse(initialData);
  }

  async create(info: Log): Promise<Log> {
    const initialData: string = await fs.readFile(file, { encoding: 'utf-8' });
    const data: Log[] = JSON.parse(initialData);
    const finalData = [...data];
    await fs.writeFile(file, JSON.stringify(finalData), 'utf-8');
    return info as Log;
  }
}
