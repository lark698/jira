import { useAsync } from "utils/use-async";
import { Project } from "screens/project-list/list";
import {useCallback, useEffect} from "react";
import { cleanObject } from "./index";
import { useHttp } from "utils/http";
import {useMutation, useQuery, useQueryClient} from "react-query";

export const useProjects = (param?: Partial<Project>) => {
    const client = useHttp();
    return useQuery<Project[]>(['projects', param], () => client('projects', {data: param}))
};

export const useEditProject = () => {
    const {run, ...asyncResult} = useAsync()
    const client = useHttp()
    const queryClient = useQueryClient()
    return useMutation((params: Partial<Project>) => client(`projects/'${params.id}`, {
        method: 'PATCH',
        data:params,
    }),{
            onSuccess: () => queryClient.invalidateQueries('projects')
        }
    )
}

export const useAddProject = () => {
    const client = useHttp()
    const queryClient = useQueryClient()
    return useMutation((params: Partial<Project>) => client(`projects`, {
            method: 'POST',
            data:params,
        }),{
            onSuccess: () => queryClient.invalidateQueries('projects')
        }
    )
}

export const useProject = (id?: number) => {
    const client = useHttp();
    return useQuery<Project>(
        ["project", { id }],
        () => client(`projects/${id}`),
        {
            enabled: Boolean(id),
        }
    );
};