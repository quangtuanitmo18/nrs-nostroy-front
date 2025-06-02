export const testApiQuery = () => {
  const { isPending, isError, data, error } = useQuery({
    queryKey: ['todos'],
    queryFn: getTodos,
  });
};
