import { SetMetadata } from "@nestjs/common";
import { IRole } from "../interfaces";

export const Roles = (...roles: IRole[]) => SetMetadata("roles", roles);