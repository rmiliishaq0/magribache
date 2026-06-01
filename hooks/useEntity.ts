import { entityConfig, EntityKey } from "@/ut";

import { useCreateTask } from "./mutations/useCreateTask";
import { useCreateProject } from "./mutations/useCreateProject";
import { useCreateClient } from "./mutations/useCreateClient";

export function useEntity(activeTab: EntityKey) {
  const createTask = useCreateTask();
  const createProject = useCreateProject();
  const createClient = useCreateClient();

  const mutations = {
    Tasks: createTask,
    Projects: createProject,
    Clients: createClient,
  };

  return {
    schema: entityConfig[activeTab].schema,
    defaultValues: entityConfig[activeTab].defaultValues,
    mutation: mutations[activeTab],
  };
}