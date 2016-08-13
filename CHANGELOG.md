<a name="1.0.1"></a>
## [1.0.1](https://github.com/fshchudlo/e2e4/compare/1.0.0...v1.0.1) (2016-08-13)


### Bug Fixes

* **static settings:** fix broken declarations of `settings` objects ([da2a028](https://github.com/fshchudlo/e2e4/commit/da2a028))



<a name="1.0.0"></a>
# 1.0.0 (2016-08-13)


### Code Refactoring

* **filterAnnotation:** replace `getDefaultFilterConfig` function ([5d227ad](https://github.com/fshchudlo/e2e4/commit/5d227ad))
* **selection:** `SelectableItem` renamed to `SelectionItem` ([83164cc](https://github.com/fshchudlo/e2e4/commit/83164cc))
* **selection:** rename methods and more convenient `getMaxSelectedIndex` and `getMinSelectedIndex` implementation ([b0be575](https://github.com/fshchudlo/e2e4/commit/b0be575))
* **StatusTracker:** refactor to instantiatable class instead of static usage ([3382f24](https://github.com/fshchudlo/e2e4/commit/3382f24))
* **utilities:** `Utility` class separated to individual functions ([c169634](https://github.com/fshchudlo/e2e4/commit/c169634))
* **Utility:** `cloneLiteral` renamed to `cloneAsLiteral` ([59ebaa8](https://github.com/fshchudlo/e2e4/commit/59ebaa8))


### Features

* **AbstractLifetime:** `AbstractLifetime` removed as unusable ([dc33df0](https://github.com/fshchudlo/e2e4/commit/dc33df0))
* **all:** all `dispose` methods renamed to `destroy` ([caab734](https://github.com/fshchudlo/e2e4/commit/caab734))
* **FilterConfig:** `persisted` property can be function now ([347599e](https://github.com/fshchudlo/e2e4/commit/347599e))
* **FilterConfig, pagers:** `parameterName` property can be function now ([8d271df](https://github.com/fshchudlo/e2e4/commit/8d271df))
* **PagedPager:** Implement several useful navigation methods ([21c2998](https://github.com/fshchudlo/e2e4/commit/21c2998))
* **SelectionService:** selection hooks removed ([2e8f373](https://github.com/fshchudlo/e2e4/commit/2e8f373))
* **StateTracking:** `StatusTrackingService` renamed to `StateTrackingService` ([ca3b9c4](https://github.com/fshchudlo/e2e4/commit/ca3b9c4))
* **StateTrackingService:** `classNames` now configurable ([b9a823d](https://github.com/fshchudlo/e2e4/commit/b9a823d))


### BREAKING CHANGES

* selection: `SelectableItem` renamed to `SelectionItem`
* filterAnnotation: `getDefaultFilterConfig` is replaced from `contracts/filter-config.ts`.
If you use it via direct import, you can find it now in `filter-annotation.ts` module.
* AbstractLifetime: `AbstractLifetime` class was removed from library since it unused
* utilities: `Utility` class doesn't exist anymore. If you need any functions from Utility,

you can import them now as separate functions from `e2e4.ts` or from `utilities.ts` if you

need direct import
* StatusTracker: `StatusTracker` now must be used via creation of specific instances instead of static methods and global `statusList` collection.
* Utility: `cloneLiteral` function renamed to `cloneAsLiteral`
* all: all `dispose` methods were renamed to `destroy`
* selection: `SelectionService.getSelections` method renamed to `getSelectedElements`
* selection: `selectAll` and `deselectAll` methods of `SelectionService` doesn't takes `recursive` parameter since it unused now
* selection: `SelectionTuple` contract replaced from `contracts` folder to `default-selection-service.ts` since it's used internally
* selection: `getMaxSelectedIndex` and `getMinSelectedIndex` now returns -1 instead of null if nothing's selected
* StateTrackingService: modalDisplayed property of StatusTracker is now removed as well as statusDisplayed property.



