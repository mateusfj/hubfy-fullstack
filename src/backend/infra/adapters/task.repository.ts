import { prisma } from "@/src/lib/prisma";
import {
  ListTasksRepositoryResult,
  TaskRepositoryInterface,
} from "@/src/backend/ports/repositories/task.repository.interface";
import { ITask, TaskStatus } from "@/src/types/ITask";
import type { Task as PrismaTask } from "@prisma/client";
import { ListTasksQuerySchema } from "@/src/validators/task.schema";

export type TaskData = {
  userId: number;
  title?: string;
  description?: string | null;
  status?: TaskStatus;
};

export class PrismaTaskRepository implements TaskRepositoryInterface<TaskData> {
  private mapperTask(task: PrismaTask): ITask {
    return {
      id: task.id,
      userId: task.userId,
      title: task.title,
      description: task.description ?? null,
      status: task.status as TaskStatus,
      createdAt: task.createdAt,
      updatedAt: task.updatedAt,
    };
  }

  async findOne(id: string): Promise<ITask | null> {
    const task: PrismaTask | null = await prisma.task.findUnique({
      where: { id: Number(id) },
    });

    if (!task) {
      return null;
    }

    return this.mapperTask(task);
  }

  async findAll(): Promise<ITask[]> {
    const tasks: PrismaTask[] = await prisma.task.findMany();
    return tasks.map((task: PrismaTask): ITask => this.mapperTask(task));
  }

  async findAllByUser(
    userId: number,
    filters: ListTasksQuerySchema
  ): Promise<ListTasksRepositoryResult> {
    const { page, limit, search, status, orderBy, orderDirection } = filters;

    const pageNormalized: number = page && page > 0 ? page : 1;
    const limitNormalized: number | undefined = limit && limit > 0 ? limit : 10;

    const skip: number = (pageNormalized - 1) * limitNormalized;
    const take: number = limitNormalized;

    const where: {
      userId: number;
      status?: TaskStatus;
      title?: string;
    } = {
      userId,
    };

    if (status) {
      where.status = status;
    }

    if (search) {
      where.title = search;
    }

    const [tasks, total] = await Promise.all([
      prisma.task.findMany({
        where,
        skip,
        take,
        orderBy: {
          [orderBy ?? "createdAt"]: orderDirection ?? "desc",
        },
      }),
      prisma.task.count({ where }),
    ]);

    return {
      tasks: tasks.map((task: PrismaTask): ITask => this.mapperTask(task)),
      total,
    };
  }

  async create(data: TaskData): Promise<ITask> {
    const task: PrismaTask = await prisma.task.create({
      data: {
        userId: data.userId,
        title: data.title!,
        description: data.description,
        status: data.status,
      },
    });

    return this.mapperTask(task);
  }

  async update(id: string, data: TaskData): Promise<ITask> {
    const task: PrismaTask = await prisma.task.update({
      where: { id: Number(id) },
      data: {
        title: data.title,
        description: data.description,
        status: data.status,
      },
    });

    return this.mapperTask(task);
  }

  async delete(id: string): Promise<void> {
    await prisma.task.delete({
      where: { id: Number(id) },
    });
  }
}
