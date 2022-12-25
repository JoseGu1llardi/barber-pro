import { Request, Response } from 'express';

import { CreateHaircutService } from '../../services/haircut/CreateHaircutService';

export class CreateHaircutController {
    async handle(req: Request, res: Response) {

        const user_id = req.user_id;
        const { name, price } = req.body;

        const haircutService = new CreateHaircutService();

        const haircut = await haircutService.execute({ user_id, name, price });

        return res.json(haircut);

    }
}