import { ITask } from "@/src/types/ITask";
import { apiMethods } from "../../@shared/api.interface";
import { axiosConfig } from "../../axiosConfig";
import { CreateTaskSchema } from "@/src/validators/task.schema";
import {
  ApiListResponse,
  ApiSingleResponse,
} from "@/src/types/Response/IResponse";

type TaskListResponse = ApiListResponse<"tasks", ITask>;
type TaskSingleResponse = ApiSingleResponse<"tasks", ITask>;

const TASK = apiMethods<TaskListResponse, TaskSingleResponse, CreateTaskSchema>(
  axiosConfig,
  `/task`
);

const CUSTOM_TASK = {
  ...TASK,
};

export { CUSTOM_TASK };
