import { QueryKey, useQueryClient } from "react-query";

// 生成樂觀更新的 Config 物件的函數
export const useConfig = (
  queryKey: QueryKey,
  callback: (target: any, old?: any[]) => any[]
) => {
  const queryClient = useQueryClient();
  return {
    onSuccess: () => queryClient.invalidateQueries(queryKey),
    onMutate: async (target: any) => {
      await queryClient.cancelQueries(queryKey);
      const previousItems = queryClient.getQueryData(queryKey);
      queryClient.setQueryData(queryKey, (old?: any[]) => {
        return callback(target, old);
      });
      return { previousItems };
    },
    onError: (error: any, newItem: any, context: any) => {
      queryClient.setQueryData(queryKey, context.previousItems);
    },
  };
};

export const useDeleteConfig = (queryKey: QueryKey) => {
  return useConfig(
    queryKey,
    (target, old) => old?.filter((item) => item.id !== target.id) || []
  );
};
export const useEditConfig = (queryKey: QueryKey) => {
  return useConfig(
    queryKey,
    (target, old) =>
      old?.map((item) =>
        item.id === target.id ? { ...item, ...target } : item
      ) || []
  );
};
export const useAddConfig = (queryKey: QueryKey) => {
  return useConfig(queryKey, (target, old) => (old ? [...old, target] : []));
};
