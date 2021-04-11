import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { NewsItemModel } from "./NewsItemModel"

/**
 * Root store model.
 */
export const RootStoreModel = types.model("RootStoreModel").props({
  news: types.maybe(types.array(NewsItemModel))
})

type RootStoreType = Instance<typeof RootStoreModel>
export interface IRootStore extends RootStoreType {}
type RootStoreSnapshotType  = SnapshotOut<typeof RootStoreModel>
export interface IRootStoreSnapshot extends RootStoreSnapshotType {}