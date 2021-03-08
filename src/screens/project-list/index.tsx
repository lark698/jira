import React, { useState } from "react";
import { SearchPanel } from "screens/project-list/search-panel";
import { List } from "screens/project-list/list";
import {useDebounce, useDocumentTitle} from "../../utils";
import styled from "@emotion/styled";
import {Button, Typography} from "antd";
import { useProjects } from "utils/project";
import { useUsers } from "utils/user";
import {Helmet} from "react-helmet";
import {useUrlQueryParam} from "../../utils/url";
import {useSearchParams} from "react-router-dom";
import {useProjectsSearchParams} from "./util";
import {ButtonNoPadding, Row} from "../../components/lib";
import {useDispatch} from "react-redux";
import {projectListActions} from "./protect-list.slice";

// 使用 JS ，大部分的错误都是在 runtime(运行时) 的时候发现的
// 我们希望，在静态代码中，就能找到其中的一些错误 -> 强类型
export const ProjectListScreen = () => {
    const [param, setParam] = useProjectsSearchParams()
    const { isLoading, error, data: list , retry} = useProjects(useDebounce(param, 200));
    const { data: users } = useUsers();
    const dispatch = useDispatch();

    useUrlQueryParam([''])
    return (
        <Container>
            <Row between={true}>
                <h1>项目列表</h1>
                <Button onClick={() => dispatch(projectListActions.openProjectModal())}>创建项目</Button>
            </Row>
            <SearchPanel users={users || []} param={param} setParam={setParam} />
            {error ? (
                <Typography.Text type={"danger"}>{error.message}</Typography.Text>
            ) : null}
            <List refresh={retry} loading={isLoading} users={users || []} dataSource={list || []} />
        </Container>
    );
};

const Container = styled.div`
  padding: 3.2rem;
`;