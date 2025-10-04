import { Skills } from './mocks/enums.mocks';

(globalThis as any).Skills = Skills; // needs a concrete version of the Skills enum for unit testing