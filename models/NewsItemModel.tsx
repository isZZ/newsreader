import { Instance, SnapshotOut, types } from "mobx-state-tree"

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
  description: types.maybeNull(types.string)
})

type NewsItemType = Instance<typeof NewsItemModel>
export interface INewsItem extends NewsItemType {}
type NewsItemSnapshotType  = SnapshotOut<typeof NewsItemModel>
export interface INewsItemSnapshot extends NewsItemSnapshotType {}


export const NewsItemsModel = types.model("NewsItemsModel").props({
  newsItems: types.array(NewsItemModel)
})

type NewsItemsType = Instance<typeof NewsItemsModel>
export interface INewsItems extends NewsItemsType {}
type NewsItemsSnapshotType  = SnapshotOut<typeof NewsItemsModel>
export interface INewsItemsSnapshot extends NewsItemsSnapshotType {}
