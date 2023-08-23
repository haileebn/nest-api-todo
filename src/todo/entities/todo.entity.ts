import { Prisma } from '@prisma/client';

export class TodoEntity implements Prisma.todoUncheckedCreateInput {
  id?: number;
  title: string;
  completed?: boolean;
}
