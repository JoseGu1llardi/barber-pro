import prismaClient from '../../prisma';

interface UserRequest {
    user_id: string;
    name: string;
    address: string;
}

export class UpdateUserService {
    async execute({ user_id, name, address }: UserRequest) {

        try {

            const userAlreadyExists = await prismaClient.user.findFirst({
                where: {
                    id: user_id
                }
            });

            if (!userAlreadyExists) {
                throw new Error('User does not exist.');
            }

            const userUpdated = await prismaClient.user.update({
                where: {
                    id: user_id
                },
                data: {
                    name,
                    address
                },
                select: {
                    name: true,
                    email: true,
                    address: true,
                }
            });

            return userUpdated;

        } catch (err) {
            console.error(err);
            throw new Error('Error an update the user!');
        }

    }
}