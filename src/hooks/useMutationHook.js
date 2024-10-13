import { useMutation } from "@tanstack/react-query";

export const useMutationHook = (callback) => {
    const mutation = useMutation({
        mutationFn: callback,
    });
    return mutation;
};
