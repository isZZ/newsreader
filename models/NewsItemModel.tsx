import { Instance, SnapshotOut, types } from "mobx-state-tree"

/**
 * News item model.
 */
export const NewsItemModel = types.model("NewsItemModel").props({
  id: types.identifierNumber,
  author: types.maybe(types.string),
  title: types.maybe(types.string),
  url: types.maybe(types.string),
  urlToImage: types.maybe(types.string),
  publishedAt: types.maybe(types.Date),
  content: types.maybe(types.string)
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
