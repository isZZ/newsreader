import { toJS } from "mobx";
import { cast, Instance, SnapshotOut, types } from "mobx-state-tree"
import { INewsItem, INewsItemSnapshot, NewsItemModel } from "./NewsItemModel"

/**
 * Root store model.
 */
export const RootStoreModel = types.model("RootStoreModel").props({
  news: types.array(NewsItemModel)
})
.actions(self => ({
    addNewsItem(newsItem:INewsItemSnapshot) {
        self.news.push(newsItem);
    },
    refreshNewsItems(items:Array<INewsItemSnapshot>){
      self.news.splice(0, self.news.length);
      items.forEach((item:INewsItemSnapshot) => {
        self.news.push(item);
      });
      console.log(toJS(self.news));
      //items.forEach((item:INewsItemSnapshot) => self.news.push(item));
    }
}));

type RootStoreType = Instance<typeof RootStoreModel>
export interface IRootStore extends RootStoreType {}
type RootStoreSnapshotType  = SnapshotOut<typeof RootStoreModel>
export interface IRootStoreSnapshot extends RootStoreSnapshotType {}


