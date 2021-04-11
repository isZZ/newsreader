import { Instance, SnapshotOut, types } from "mobx-state-tree"


export const NewsItemSourceModel = types.model("NewsItemSourceModel").props({
  id: types.maybeNull(types.string),
  name: types.maybeNull(types.string)
});

type NewsItemSourceType = Instance<typeof NewsItemSourceModel>
export interface INewsItemSource extends NewsItemSourceType {}
type NewsItemSourceSnapshotType  = SnapshotOut<typeof NewsItemSourceModel>
export interface INewsItemSourceSnapshot extends NewsItemSourceSnapshotType {}

/**
 * News item model.
 */
export const NewsItemModel = types.model("NewsItemModel").props({
  author: types.maybeNull(types.string),
  title: types.maybeNull(types.string),
  url: types.maybeNull(types.string),
  urlToImage: types.maybeNull(types.string),
  publishedAt: types.maybeNull(types.string),
  content: types.maybeNull(types.string),
  description: types.maybeNull(types.string),
  source:types.optional(NewsItemSourceModel, {}),
});

type NewsItemType = Instance<typeof NewsItemModel>
export interface INewsItem extends NewsItemType {}
type NewsItemSnapshotType  = SnapshotOut<typeof NewsItemModel>
export interface INewsItemSnapshot extends NewsItemSnapshotType {}


export const NewsItemsModel = types.model("NewsItemsModel").props({
  newsItems: types.array(NewsItemModel)
})


