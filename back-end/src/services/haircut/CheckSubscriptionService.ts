import prismaClient from "../../prisma";

interface CheckSubscriptionRequest {
  user_id: string;
}

export class CheckSubscriptionService {
  async execute({ user_id }: CheckSubscriptionRequest) {
    const subscriptionStatus = await prismaClient.user.findFirst({
      where: {
        id: user_id,
      },
      select: {
        subscriptions: {
          select: {
            id: true,
            status: true,
          },
        },
      },
    });

    return subscriptionStatus;
  }
}
