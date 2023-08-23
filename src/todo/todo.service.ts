import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class TodoService {
  constructor(private prisma: PrismaService) {}

  create(createTodoDto: CreateTodoDto) {
    return this.prisma.todo.create({ data: createTodoDto });
  }

  findAll() {
    return this.prisma.todo.findMany();
  }

  findOne(id: number) {
    return this.prisma.todo
      .findFirstOrThrow({ where: { id: id } })
      .catch(() => {
        throw new NotFoundException('Todo not found with id ' + id);
      });
  }

  update(id: number, updateTodoDto: UpdateTodoDto) {
    return this.prisma.todo.update({ where: { id }, data: updateTodoDto });
  }

  async remove(id: number) {
    await this.findOne(id);

    return this.prisma.todo.delete({ where: { id } });
  }
}
