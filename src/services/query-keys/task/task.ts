const TASK_QUERY_KEY = {
  detail: (taskId: number) => ["tasks", "detail", taskId] as const,
  list: (filters?: object) => ["tasks", "list", { filters }] as const,
};

export { TASK_QUERY_KEY };
