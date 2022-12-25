import prismaClient from "../../prisma";

export class CountHaircutsService {
  async execute(user_id: string) {
    const count = await prismaClient.haircut.count({
      where: {
        user_id: user_id,
      },
    });

    return count;
  }
}
