import { Request, Response} from 'express';

import { UpdateUserService } from '../../services/user/UpdateUserService';

export class UpdateUserController {
    async handle(req: Request, res: Response) {

        const user_id = req.user_id;
        const { name, address } = req.body;

        const updateUser = new UpdateUserService();

        const userUpdated = await updateUser.execute({ user_id, name, address });

        return res.json(userUpdated);
        
    }
}