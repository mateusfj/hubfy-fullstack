import { NextResponse } from "next/server";

import {
  ErrorMapperResponse,
  mapError,
} from "@/src/backend/shared/errors/error-mapper";
import { IResponse } from "@/src/types/Response/IResponse";
import { ITask } from "@/src/types/ITask";
import {
  UpdateTaskSchema,
  updateTaskSchema,
} from "@/src/validators/task.schema";
import { UpdateTaskUseCase } from "@/src/backend/application/use-cases/task/update-task-usecase/update-task.usecase";
import { DeleteTaskUseCase } from "@/src/backend/application/use-cases/task/delete-task-usecase/delete-task.usecase";
import { GetTaskUseCase } from "@/src/backend/application/use-cases/task/get-task-usecase/get-task.usecase";
import { authGuard } from "@/src/backend/infra/auth/guard/auth-guard";

type RouteParams = {
  id: string;
};

export async function GET(
  req: Request,
  { params }: { params: Promise<RouteParams> }
): Promise<NextResponse> {
  try {
    const { id } = await params;

    await authGuard(req);

    const getTaskUseCase = new GetTaskUseCase();

    const response: IResponse<ITask> = await getTaskUseCase.execute(id);

    return NextResponse.json({
      task: response.data,
    });
  } catch (error: unknown) {
    const mappedError: ErrorMapperResponse = mapError(error);

    return NextResponse.json(mappedError.body, {
      status: mappedError.statusCode,
    });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<RouteParams> }
): Promise<NextResponse> {
  try {
    const { id } = await params;

    await authGuard(req);

    const body = await req.json();

    const data: UpdateTaskSchema = updateTaskSchema.parse(body);

    const updateTaskUseCase = new UpdateTaskUseCase();

    const response: IResponse<ITask> = await updateTaskUseCase.execute(
      id,
      data
    );

    return NextResponse.json({
      message: "Tarefa atualizada com sucesso",
      task: response.data,
    });
  } catch (error: unknown) {
    const mappedError: ErrorMapperResponse = mapError(error);

    return NextResponse.json(mappedError.body, {
      status: mappedError.statusCode,
    });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<RouteParams> }
): Promise<NextResponse> {
  try {
    const { id } = await params;
    await authGuard(req);
    const deleteTaskUseCase = new DeleteTaskUseCase();

    await deleteTaskUseCase.execute(id);
    return NextResponse.json(
      { message: "Tarefa removida com sucesso" },
      { status: 200 }
    );
  } catch (error: unknown) {
    const mappedError: ErrorMapperResponse = mapError(error);

    return NextResponse.json(mappedError.body, {
      status: mappedError.statusCode,
    });
  }
}
