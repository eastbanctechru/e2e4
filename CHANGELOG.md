<a name="2.5.0"></a>
# [2.5.0](https://github.com/eastbanctechru/e2e4/compare/v2.4.0...v2.5.0) (2018-09-22)


### Features

* **sort:** Add ability to remove all sortings ([132d2af](https://github.com/eastbanctechru/e2e4/commit/132d2af))



<a name="2.4.0"></a>
# [2.4.0](https://github.com/eastbanctechru/e2e4/compare/v2.3.0...v2.4.0) (2018-05-22)


### Features

* **all:** typescript version updated to 2.8.3 ([0d93004](https://github.com/eastbanctechru/e2e4/commit/0d93004))



<a name="2.3.0"></a>
# [2.3.0](https://github.com/eastbanctechru/e2e4/compare/v2.2.3...v2.3.0) (2017-10-21)


### Features

* **sort:** add ability to remove sort ([4dd5090](https://github.com/eastbanctechru/e2e4/commit/4dd5090))



<a name="2.2.3"></a>
## [2.2.3](https://github.com/eastbanctechru/e2e4/compare/v2.2.2...v2.2.3) (2017-08-24)



<a name="2.2.2"></a>
## [2.2.2](https://github.com/eastbanctechru/e2e4/compare/v2.2.1...v2.2.2) (2017-07-12)


### Bug Fixes

* **list:** correct list status for flat responses ([3bd322b](https://github.com/eastbanctechru/e2e4/commit/3bd322b))



<a name="2.2.1"></a>
## [2.2.1](https://github.com/eastbanctechru/e2e4/compare/v2.2.0...v2.2.1) (2017-07-12)


### Bug Fixes

* **list:** prevent pager reset for flat responses ([34cb8cb](https://github.com/eastbanctechru/e2e4/commit/34cb8cb))



<a name="2.2.0"></a>
# [2.2.0](https://github.com/eastbanctechru/e2e4/compare/v2.1.3...v2.2.0) (2017-07-02)



<a name="2.1.3"></a>
## [2.1.3](https://github.com/eastbanctechru/e2e4/compare/v2.1.2...v2.1.3) (2017-06-26)


### Bug Fixes

* **BufferedPager:** Исправлен пересчет счетчика skip ([7cf9f4d](https://github.com/eastbanctechru/e2e4/commit/7cf9f4d))



<a name="2.1.2"></a>
## [2.1.2](https://github.com/eastbanctechru/e2e4/compare/v2.1.1...v2.1.2) (2017-06-22)


### Bug Fixes

* **list:** reset pager before data request execution ([4e8ecad](https://github.com/eastbanctechru/e2e4/commit/4e8ecad))



<a name="2.1.1"></a>
## [2.1.1](https://github.com/eastbanctechru/e2e4/compare/v2.1.0...v2.1.1) (2017-05-16)


### Bug Fixes

* **pager:** `pager.pageSize` property resetted correctly ([976cda7](https://github.com/eastbanctechru/e2e4/commit/976cda7))



<a name="2.1.0"></a>
# [2.1.0](https://github.com/eastbanctechru/e2e4/compare/v2.0.1...v2.1.0) (2017-04-28)


### Features

* **all:** Typescript version updated to 2.3.1 ([0f74374](https://github.com/eastbanctechru/e2e4/commit/0f74374))
* **list:** Add ability to pass request execution status via primary `loadData` stream ([f5e27e2](https://github.com/eastbanctechru/e2e4/commit/f5e27e2))



<a name="2.0.1"></a>
## [2.0.1](https://github.com/eastbanctechru/e2e4/compare/v2.0.0...v2.0.1) (2017-04-11)


### Bug Fixes

* **list:** `keepRecordsOnLoad` works for `reloadData` also ([fac240a](https://github.com/eastbanctechru/e2e4/commit/fac240a))
* **list:** consistent return values for `loadData` and `reloadData` ([8e27916](https://github.com/eastbanctechru/e2e4/commit/8e27916))



<a name="2.0.0"></a>
# [2.0.0](https://github.com/eastbanctechru/e2e4/compare/v2.0.0-rc.5...v2.0.0) (2017-04-11)


### Bug Fixes

* **list:** remove `pager.reset` call from `clearData` method ([774cf9e](https://github.com/eastbanctechru/e2e4/commit/774cf9e))


### Features

* **list:** `keepRecordsOnLoad` option implemented ([20f72c3](https://github.com/eastbanctechru/e2e4/commit/20f72c3))



<a name="2.0.0-rc.5"></a>
# [2.0.0-rc.5](https://github.com/eastbanctechru/e2e4/compare/v2.0.0-rc.4...v2.0.0-rc.5) (2017-03-26)


### Bug Fixes

* **buffered pager:** `BufferedPager` sets `canLoadMore` now behaves correctly ([3306391](https://github.com/eastbanctechru/e2e4/commit/3306391))


### Features

* **filters:** `omitIfNullOrUndefined` config property added ([c5bd22c](https://github.com/eastbanctechru/e2e4/commit/c5bd22c))
* **filters:** introduce `DefaultFilterConfig` object to globally change filter configs defaults ([6d1e28a](https://github.com/eastbanctechru/e2e4/commit/6d1e28a))



<a name="2.0.0-rc.4"></a>
# [2.0.0-rc.4](https://github.com/eastbanctechru/e2e4/compare/v2.0.0-rc.3...v2.0.0-rc.4) (2017-03-11)


### Bug Fixes

* **list:** `reloadData` now returns result of `loadData` methid if it was called. `null` otherwise ([a82a2bf](https://github.com/eastbanctechru/e2e4/commit/a82a2bf))



<a name="2.0.0-rc.3"></a>
# [2.0.0-rc.3](https://github.com/eastbanctechru/e2e4/compare/v2.0.0-rc.2...v2.0.0-rc.3) (2017-03-11)


### Features

* **list:** `loadData` method now returns result of `fetchMethod` delegate ([90f1b4b](https://github.com/eastbanctechru/e2e4/commit/90f1b4b))



<a name="2.0.0-rc.2"></a>
# [2.0.0-rc.2](https://github.com/eastbanctechru/e2e4/compare/v2.0.0-rc.1...v2.0.0-rc.2) (2017-03-11)


### Features

* **list:** `stateServices` property, `loadSuccessCallback`, `loadFailCallback` and `clearData` meth ([838f67c](https://github.com/eastbanctechru/e2e4/commit/838f67c))



<a name="2.0.0-rc.1"></a>
# [2.0.0-rc.1](https://github.com/eastbanctechru/e2e4/compare/v2.0.0-rc.0...v2.0.0-rc.1) (2017-02-28)



<a name="2.0.0-rc.0"></a>
# [2.0.0-rc.0](https://github.com/eastbanctechru/e2e4/compare/v2.0.0-beta.9...v2.0.0-rc.0) (2016-12-20)


### Bug Fixes

* **destroyAll:** correct handling of `null` and `undefined` as array elements ([c0ecfdb](https://github.com/eastbanctechru/e2e4/commit/c0ecfdb))
* **lists:** make `List` private properties protected ([f0ad990](https://github.com/eastbanctechru/e2e4/commit/f0ad990))


### Features

* **package:** changelog generation added ([699404f](https://github.com/eastbanctechru/e2e4/commit/699404f))



<a name="2.0.0-beta.9"></a>
# [2.0.0-beta.9](https://github.com/eastbanctechru/e2e4/compare/2.0.0-beta.8...v2.0.0-beta.9) (2016-12-03)


### Code Refactoring

* **progress state:** `ProgressState` renamed to `OperationStatus`, `StateTrackingService` renam ([9b1bd73](https://github.com/eastbanctechru/e2e4/commit/9b1bd73))


### Features

* **async subscriptions:** `AsyncSubscriber` class added to manage subscriptions in abstract manner ([738e6cb](https://github.com/eastbanctechru/e2e4/commit/738e6cb))
* **lists:** 'List' service added ([811d236](https://github.com/eastbanctechru/e2e4/commit/811d236))
* **state management:** abstract `StateService` base class added ([7b65b8d](https://github.com/eastbanctechru/e2e4/commit/7b65b8d))


### BREAKING CHANGES

* progress state: `ProgressState` renamed to `OperationStatus`, `StateTrackingService` renamed to

`StatusTrackingService`



<a name="2.0.0-beta.8"></a>
# [2.0.0-beta.8](https://github.com/eastbanctechru/e2e4/compare/2.0.0-beta.7...2.0.0-beta.8) (2016-11-08)


### Bug Fixes

* **pagers:** fix logic of `canLoadMore`, `canMoveBackward` and `canMoveForward` methods for empty pagers ([cb27b72](https://github.com/eastbanctechru/e2e4/commit/cb27b72))



<a name="2.0.0-beta.7"></a>
# [2.0.0-beta.7](https://github.com/eastbanctechru/e2e4/compare/2.0.0-beta.6...2.0.0-beta.7) (2016-10-26)


### Bug Fixes

* **package:** sourcemap generation returned ([fc7df15](https://github.com/eastbanctechru/e2e4/commit/fc7df15))


### Features

* **BufferedPager:** `canLoadMore` property added ([a448b97](https://github.com/eastbanctechru/e2e4/commit/a448b97))
* **PagedPager:** `canMoveBackward` and `canMoveForward` properties added ([9d9d481](https://github.com/eastbanctechru/e2e4/commit/9d9d481))



<a name="2.0.0-beta.6"></a>
# [2.0.0-beta.6](https://github.com/eastbanctechru/e2e4/compare/2.0.0-beta.5...2.0.0-beta.6) (2016-10-11)


### Code Refactoring

* **filters:** `persisted` option removed from `FilterConfig` contract ([e929a50](https://github.com/eastbanctechru/e2e4/commit/e929a50))
* **selection:** `SelectionAreaConfig` contract merged into `SelectionEventsHelper` class ([cf28138](https://github.com/eastbanctechru/e2e4/commit/cf28138))


### BREAKING CHANGES

* filters: all settings related to `persisted` flag of `FilterConfig` removed from library
* selection: `SelectionAreaConfig` contract merged into `SelectionEventsHelper` class



<a name="2.0.0-beta.5"></a>
# [2.0.0-beta.5](https://github.com/eastbanctechru/e2e4/compare/2.0.0-beta.4...2.0.0-beta.5) (2016-10-08)


### Code Refactoring

* **DefaultSelectionService:** `itemsSource` property removed ([b038959](https://github.com/eastbanctechru/e2e4/commit/b038959))


### BREAKING CHANGES

* DefaultSelectionService: `itemsSource` property removed. You must use `items` arra instead and call

`checkSelection` manually if needed



<a name="2.0.0-beta.4"></a>
# [2.0.0-beta.4](https://github.com/eastbanctechru/e2e4/compare/2.0.0-beta.3...2.0.0-beta.4) (2016-10-06)


### Bug Fixes

* **all:** remove `this` specification cause it breaks docs and coverage ([0cfa1f4](https://github.com/eastbanctechru/e2e4/commit/0cfa1f4))


### Code Refactoring

* **FiltersService:** optional delegate to filter applied values in `getRequestState` added ([b37308d](https://github.com/eastbanctechru/e2e4/commit/b37308d))


### BREAKING CHANGES

* FiltersService: `getPersistedState` method removed. You can pass delegate to `getRequestState`

method anf filter values by `persisted` flag or any other condition



<a name="2.0.0-beta.3"></a>
# [2.0.0-beta.3](https://github.com/eastbanctechru/e2e4/compare/2.0.0-beta.2...2.0.0-beta.3) (2016-10-03)


### Bug Fixes

* **build:** fix of `chai` import in src code ([d0d189c](https://github.com/eastbanctechru/e2e4/commit/d0d189c))
* **paging:** make `PagedListRequest` parameters required ([ba7a0b5](https://github.com/eastbanctechru/e2e4/commit/ba7a0b5))



<a name="2.0.0-beta.2"></a>
# [2.0.0-beta.2](https://github.com/eastbanctechru/e2e4/compare/2.0.0-beta.1...2.0.0-beta.2) (2016-10-03)


### Bug Fixes

* **paging:** `PagedListRequest` added to exports ([d5c7e47](https://github.com/eastbanctechru/e2e4/commit/d5c7e47))



<a name="2.0.0-beta.1"></a>
# [2.0.0-beta.1](https://github.com/eastbanctechru/e2e4/compare/2.0.0-beta.0...2.0.0-beta.1) (2016-10-03)


### Features

* **paging:** separate `PagedListRequest` contract added ([e13be1c](https://github.com/eastbanctechru/e2e4/commit/e13be1c))


### BREAKING CHANGES

* paging: `take` and `skip` properties of `ListRequest` moved to `PagedListRequest`



<a name="2.0.0-beta.0"></a>
# [2.0.0-beta.0](https://github.com/eastbanctechru/e2e4/compare/5d227ad...2.0.0-beta.0) (2016-09-29)


### Bug Fixes

* **FiltersService:** `registerFilterTarget` builds filter config for specified target if `appliedFiltersMap` already builted ([238979a](https://github.com/eastbanctechru/e2e4/commit/238979a))
* **package:** fixed esm package paths ([929bee9](https://github.com/eastbanctechru/e2e4/commit/929bee9))
* **package:** remove redundant jspm `directories` settings ([4b6f519](https://github.com/eastbanctechru/e2e4/commit/4b6f519))
* **pagers:** reset `loadedCount` property in `reset` methods ([73dce08](https://github.com/eastbanctechru/e2e4/commit/73dce08))
* **selection:** doesn't handle `Ctrl+A` command when `multiple` is false ([ea70177](https://github.com/eastbanctechru/e2e4/commit/ea70177))
* **static settings:** fix broken declarations of `settings` objects ([da2a028](https://github.com/eastbanctechru/e2e4/commit/da2a028))


### Code Refactoring

* **filterAnnotation:** replace `getDefaultFilterConfig` function ([5d227ad](https://github.com/eastbanctechru/e2e4/commit/5d227ad))
* **paging:** `RegularPager` renamed to `NullObjectPager` ([d406b59](https://github.com/eastbanctechru/e2e4/commit/d406b59))
* **paging:** unified request contract implemented for `PagedPager` and `BufferedPager` ([c8aae36](https://github.com/eastbanctechru/e2e4/commit/c8aae36))
* **selection:** `SelectableItem` renamed to `SelectionItem` ([83164cc](https://github.com/eastbanctechru/e2e4/commit/83164cc))
* **selection:** rename methods and more convenient `getMaxSelectedIndex` and `getMinSelectedIndex` implementation ([b0be575](https://github.com/eastbanctechru/e2e4/commit/b0be575))
* **SortingsService:** `sort` parameter name renamed to `sortings` ([071c032](https://github.com/eastbanctechru/e2e4/commit/071c032))
* **StatusTracker:** refactor to instantiatable class instead of static usage ([3382f24](https://github.com/eastbanctechru/e2e4/commit/3382f24))
* **utilities:** `Utility` class separated to individual functions ([c169634](https://github.com/eastbanctechru/e2e4/commit/c169634))
* **Utility:** `cloneLiteral` renamed to `cloneAsLiteral` ([59ebaa8](https://github.com/eastbanctechru/e2e4/commit/59ebaa8))


### Features

* **AbstractLifetime:** `AbstractLifetime` removed as unusable ([dc33df0](https://github.com/eastbanctechru/e2e4/commit/dc33df0))
* **all:** all `*parameterName` properties deleted ([2536307](https://github.com/eastbanctechru/e2e4/commit/2536307))
* **all:** all `dispose` methods renamed to `destroy` ([caab734](https://github.com/eastbanctechru/e2e4/commit/caab734))
* **FilterConfig:** `persisted` property can be function now ([347599e](https://github.com/eastbanctechru/e2e4/commit/347599e))
* **FilterConfig, pagers:** `parameterName` property can be function now ([8d271df](https://github.com/eastbanctechru/e2e4/commit/8d271df))
* **FiltersService:** `removeFilterTarget` method added ([262a720](https://github.com/eastbanctechru/e2e4/commit/262a720))
* **PagedPager:** Implement several useful navigation methods ([21c2998](https://github.com/eastbanctechru/e2e4/commit/21c2998))
* **paging:** `PagedPager` now calculates `displayFrom` and `displayTo` properties by himself ([d1001b9](https://github.com/eastbanctechru/e2e4/commit/d1001b9))
* **paging:** `processResponse` method now accepts objects of `ListResponse` type instead of any ([b6a73c0](https://github.com/eastbanctechru/e2e4/commit/b6a73c0))
* **ProgressState:** `NoData` enum member added ([c37d591](https://github.com/eastbanctechru/e2e4/commit/c37d591))
* **selection:** `selected` property becomes optional ([99b1eb6](https://github.com/eastbanctechru/e2e4/commit/99b1eb6))
* **selection:** Tab key handling implemented ([7f885ff](https://github.com/eastbanctechru/e2e4/commit/7f885ff))
* **SelectionService:** selection hooks removed ([2e8f373](https://github.com/eastbanctechru/e2e4/commit/2e8f373))
* **StateTracking:** `StatusTrackingService` renamed to `StateTrackingService` ([ca3b9c4](https://github.com/eastbanctechru/e2e4/commit/ca3b9c4))
* **StateTrackingService:** `classNames` now configurable ([b9a823d](https://github.com/eastbanctechru/e2e4/commit/b9a823d))


### BREAKING CHANGES

* SortingsService: `sort` parameter renamed to `sortings`
* filterAnnotation: `getDefaultFilterConfig` is replaced from `contracts/filter-config.ts`.
If you use it via direct import, you can find it now in `filter-annotation.ts` module.
* paging: `RegularPager` renamed to `NullObjectPager`
* paging: `PagedListResponse` contract removed because `PagedPager` now calculates

`displayFrom` and `displayTo` properties by himself and this contract becomes useless
* paging: `Pager.processResponse` method now accepts objects of `ListResponse` type
* all: All `*parameterName` config properties were deleted since it's a lot easier to map request/response parameters manually  in end-user code
* selection: `SelectableItem` renamed to `SelectionItem`
* all: all `dispose` methods were renamed to `destroy`
* AbstractLifetime: `AbstractLifetime` class was removed from library since it unused
* paging: `BufferedListRequest` and `PagedListRequest` contracts deleted
* StatusTracker: `StatusTracker` now must be used via creation of specific instances instead of static methods and global `statusList` collection.
* Utility: `cloneLiteral` function renamed to `cloneAsLiteral`
* StateTrackingService: modalDisplayed property of StatusTracker is now removed as well as statusDisplayed property.
* selection: `SelectionService.getSelections` method renamed to `getSelectedElements`
* selection: `selectAll` and `deselectAll` methods of `SelectionService` doesn't takes `recursive` parameter since it unused now
* selection: `SelectionTuple` contract replaced from `contracts` folder to `default-selection-service.ts` since it's used internally
* selection: `getMaxSelectedIndex` and `getMinSelectedIndex` now returns -1 instead of null if nothing's selected
* utilities: `Utility` class doesn't exist anymore. If you need any functions from Utility,

you can import them now as separate functions from `e2e4.ts` or from `utilities.ts` if you

need direct import



