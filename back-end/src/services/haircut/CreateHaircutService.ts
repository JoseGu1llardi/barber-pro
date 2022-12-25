import prismaClient from "../../prisma/index";

interface HaircutRequest {
  user_id: string;
  name: string;
  price: number;
}

export class CreateHaircutService {
  async execute({ user_id, name, price }: HaircutRequest) {
    if (!name || !price) {
      throw new Error(
        "It is necessary to enter name and price to create a new haircut!"
      );
    }

    // Check how many models of cuts this user has
    const myHaircuts = await prismaClient.haircut.count({
      where: {
        user_id,
      },
    });

    /* Check if this user has a premium subscription, if we do not limit 
       the number of models to registeronly three cuts. */
    const user = await prismaClient.user.findFirst({
      where: {
        id: user_id,
      },
      include: {
        subscriptions: true,
      },
    });

    // Validation
    if (myHaircuts >= 3 && user?.subscriptions?.status !== "active") {
      throw new Error("Not authorized!");
    }

    const haircut = await prismaClient.haircut.create({
      data: {
        user_id,
        name,
        price,
      },
    });

    return haircut;
  }
}
