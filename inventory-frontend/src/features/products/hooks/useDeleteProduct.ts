// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { createProduct } from "../api/product.mutations";
// import type { AxiosError } from "axios";

// export const useCreateProduct = () => {
//   const queryClient = useQueryClient();

//   return useMutation<void, AxiosError, number>({
//     mutationFn: createProduct,
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["products"], exact: false });
//       //TODO: show snackbar
//     },
//     onError: () => {
//       //TODO: show snackbar
//     },
//   });
// };
