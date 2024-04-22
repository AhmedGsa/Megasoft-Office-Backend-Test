import { createParamDecorator } from "@nestjs/common";

export const GetCurrentUser = createParamDecorator((data, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
})