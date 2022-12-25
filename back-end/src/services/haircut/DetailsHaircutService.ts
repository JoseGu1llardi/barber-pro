import prismaClient from "../../prisma";

interface DetailHaircut {
  haircut_id: string;
}

export class DetailsHaircutService {
  async execute({ haircut_id }: DetailHaircut) {
    const haircut = await prismaClient.haircut.findFirst({
      where: {
        id: haircut_id,
      },  
    });

    return haircut;
  }
}
