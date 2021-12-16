import { BranchObjectDto } from './branch-object.dto';

export class BranchDto {
    ref: string;
    url: string;
    object: BranchObjectDto;
}
