import {TypeOf, object, string} from 'zod';

export const createUserSchema = object({
    body: object({
            name: string({
                required_error: 'Name is required',
            }),
            password: string({
                required_error: 'Password is required',
            }).min(8, 'Password too short - should be 8 characters minimum'),
            passwordConfirmation: string({
                required_error: 'Password confirmation is required',
            }),
            email: string({
                required_error: 'Email is required',
            }).email('Not a valid email'),

        }).refine((data) => data.password === data.passwordConfirmation, {
            message: 'Passwords do not match',
            path: ['passwordConfirmation'],
        }),

});


export type CreatUserInput = Omit<TypeOf<typeof createUserSchema>,"body.passwordConfirmation">;