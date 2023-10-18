import { TempService } from './TempService';
import { Injectable } from "@nestjs/common";

@Injectable()
export class TempMagentoService implements TempService {
  getRoot(): Promise<string> {
    return Promise.resolve('Hello from TempMagentoServiceService!');
  }
}
