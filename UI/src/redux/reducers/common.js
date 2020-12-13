export const getTaskToUpdateByPriority = (state, tasksPriority) => {
  let result = state.map((task) => {
    return {
      ...task,
      priority: tasksPriority.find((tp) => tp.id === task.id)
        ? tasksPriority.find((tp) => tp.id === task.id).priority
        : task.priority
    };
  });
  return result;
};
