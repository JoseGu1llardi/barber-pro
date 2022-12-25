import { Request, Response } from "express";

import { DetailsHaircutService } from "../../services/haircut/DetailsHaircutService";

export class DetailsHaircutController {
  async handle(req: Request, res: Response) {
    const haircut_id = req.query.haircut_id as string;

    const detailsHaircut = new DetailsHaircutService();

    const haircut = await detailsHaircut.execute({ haircut_id });

    return res.json(haircut);
  }
}
