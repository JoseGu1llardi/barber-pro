import { Request, Response } from "express";

import { CheckSubscriptionService } from "../../services/haircut/CheckSubscriptionService";

export class CheckSubscriptionController {
  async handle(req: Request, res: Response) {
    const user_id = req.user_id;

    const checkSubscription = new CheckSubscriptionService();

    const verifiedStatus = await checkSubscription.execute({ user_id });

    return res.json(verifiedStatus);
  }
}
