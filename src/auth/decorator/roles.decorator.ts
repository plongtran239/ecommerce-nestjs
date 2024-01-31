import { SetMetadata } from '@nestjs/common';

import { ROLES_KEY } from 'src/constants';
import { RoleEnum } from 'src/enums';

export const Roles = (...roles: RoleEnum[]) => SetMetadata(ROLES_KEY, roles);
