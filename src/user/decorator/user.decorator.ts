import { createParamDecorator, ExecutionContext} from '@nestjs/common';

export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    if (request && request.user) {
      return request.user;
    }
  },
);
