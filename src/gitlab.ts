// MR请求的属性说明见：https://docs.gitlab.com/ee/api/merge_requests.html

import type { CommitSchema } from "@gitbeaker/core/dist/types/resources/Commits";
import type { AllMergeRequestsOptions } from "@gitbeaker/core/dist/types/resources/MergeRequests";
import type { MergeRequestSchema } from "@gitbeaker/core/dist/types/resources/MergeRequests";
import type { ProjectSchema } from "@gitbeaker/core/dist/types/resources/Projects";
import type { UserSchema } from "@gitbeaker/core/dist/types/resources/Users";

export type { BranchSchema } from "@gitbeaker/core/dist/types/resources/Branches";
export type { UserSchema } from "@gitbeaker/core/dist/types/resources/Users";
export type { CommitSchema } from "@gitbeaker/core/dist/types/resources/Commits";
export type { MergeRequestSchema } from "@gitbeaker/core/dist/types/resources/MergeRequests";

export type GL_AllMergeRequestsOptions = AllMergeRequestsOptions;

export interface GL_project extends ProjectSchema {
  namespace: string | null;
  homepage: string;
  url: string;
}

export enum GL_objectKind {
  note = "note", // comment on mr
  mergeRequest = "merge_request",
}

// mr hook 推送过来的 object_attributes.action
export enum MrHookActionType {
  close = "close", // 关闭
  update = "update", // 更新描述、label等各种 mr 相关的属性
  open = "open", // 创建mr
  merge = "merge", // 合并
}

export enum GL_mergeState {
  opened = "opened",
  closed = "closed",
  locked = "locked",
  merged = "merged",
}

export enum GL_mergeStatus {
  unchecked = "unchecked",
  canBeMerge = "can_be_merged",
}

export interface GL_MergeRequestSchema extends MergeRequestSchema {
  // 替换 @gitbeaker/core 的 state, merge_status
  state: GL_mergeState;
  merge_status: GL_mergeStatus;

  // @gitbeaker MergeRequestSchema 没有的属性
  url: string;
  assignee_id: number;
  author_id: number;
  source: GL_project;
  target: GL_project;
  action: MrHookActionType;
  merge_error: string;
}

export interface GL_mergeRequest {
  user: UserSchema;
  project: GL_project;

  object_kind: GL_objectKind;
  object_attributes: GL_MergeRequestSchema;

  repository: Pick<GL_project, "name" | "homepage" | "description" | "url">;
}

// TODO: use gitbeaker Repository type
export interface Repository {
  name: string;
  url: string;
  description: string;
  homepage: string;
}

export interface PushEvent {
  object_kind: string;
  before: string;
  after: string;
  ref: string;
  checkout_sha: string;
  user_id: number;
  user_name: string;
  user_username: string;
  user_email: string;
  user_avatar: string;
  project_id: number;
  project: GL_project;
  repository: Repository;
  commits: CommitSchema[];
  total_commits_count: number;
}
