// tslint:disable:max-classes-per-file no-unused-expression max-file-line-count
import {
    AsyncSubscriber,
    FiltersService,
    List,
    NullObjectPager,
    OperationStatus,
    PagedPager,
    SortingsService,
    StateService
} from '../index';

import { expect } from 'chai';
import { from, Observable } from 'rxjs';
import * as sinon from 'sinon';

class FirstStubStateService implements StateService {
    public persistState(): void {
        return;
    }
    public getState(): any {
        return;
    }
}
class SecondStubStateService implements StateService {
    public persistState(): void {
        return;
    }
    public getState(): any {
        return;
    }
}

describe('List', () => {
    let clock: sinon.SinonFakeTimers;
    const delay = 100;
    let list: List;
    let firstStubStateService: FirstStubStateService;
    let secondStubStateService: SecondStubStateService;
    let filtersService: FiltersService;
    let sortingsService: SortingsService;
    let asyncSubscriber: AsyncSubscriber;
    beforeEach(() => {
        clock = sinon.useFakeTimers();
        firstStubStateService = new FirstStubStateService();
        secondStubStateService = new SecondStubStateService();
        filtersService = new FiltersService();
        sortingsService = new SortingsService();
        asyncSubscriber = new AsyncSubscriber();
        list = new List(asyncSubscriber, null, sortingsService, filtersService);
        list.fetchMethod = () =>
            Observable.create((observer: any) => {
                setTimeout(() => {
                    observer.next([]);
                }, delay);
            });
    });
    afterEach(() => {
        clock.restore();
        list.destroy();
    });

    describe('ctor', () => {
        it('sets stateServices array with passed service', () => {
            list = new List(asyncSubscriber, null, sortingsService, filtersService);
            expect(list.stateServices).empty;
            list = new List(asyncSubscriber, firstStubStateService, sortingsService, filtersService);
            expect(list.stateServices).eql([firstStubStateService]);
            list = new List(
                asyncSubscriber,
                [firstStubStateService, secondStubStateService],
                sortingsService,
                filtersService
            );
            expect(list.stateServices).eql([firstStubStateService, secondStubStateService]);
        });
        it('inits pager as NullObjectPager', () => {
            expect(list.pager).instanceof(NullObjectPager);
        });
    });
    describe('pager', () => {
        it('pager setter unregister old service and registers new as filter', () => {
            const oldPager = list.pager;
            const newPager = new PagedPager();
            const removeSpy = sinon.spy(filtersService, 'removeFilterTarget');
            const registerSpy = sinon.spy(filtersService, 'registerFilterTarget');
            list.pager = newPager;
            expect(removeSpy.calledOnce).true;
            expect(removeSpy.calledWith(oldPager)).true;
            expect(registerSpy.calledOnce).true;
            expect(registerSpy.calledWith(newPager)).true;
        });
    });
    describe('filters', () => {
        it('resetSettings is a proxy to FiltersService.resetValues method', () => {
            const spy = sinon.spy(filtersService, 'resetValues');
            list.resetSettings();
            expect(spy.calledOnce).true;
        });
        it('registerFilterTarget is a proxy to FiltersService.registerFilterTarget method', () => {
            const spy = sinon.spy(filtersService, 'registerFilterTarget');
            list.registerFilterTarget({}, {}, {});
            expect(spy.calledOnce).true;
        });
        it('removeFilterTarget is a proxy to FiltersService.removeFilterTarget method', () => {
            const spy = sinon.spy(filtersService, 'removeFilterTarget');
            list.removeFilterTarget({}, {}, {});
            expect(spy.calledOnce).true;
        });
        it('getRequestState is a proxy to FiltersService.getRequestState method', () => {
            const spy = sinon.spy(filtersService, 'getRequestState');
            list.getRequestState();
            expect(spy.calledOnce).true;
        });
    });
    describe('status', () => {
        it('List.busy is true only when status is equal to OperationStatus.Progress', () => {
            (list as any).statusInternal = OperationStatus.Initial;
            expect(list.busy).false;
            (list as any).statusInternal = OperationStatus.Cancelled;
            expect(list.busy).false;
            (list as any).statusInternal = OperationStatus.Done;
            expect(list.busy).false;
            (list as any).statusInternal = OperationStatus.Fail;
            expect(list.busy).false;
            (list as any).statusInternal = OperationStatus.NoData;
            expect(list.busy).false;
            (list as any).statusInternal = OperationStatus.Progress;
            expect(list.busy).true;
        });
        it('List.busy is true when status is not equal to OperationStatus.Progress', () => {
            (list as any).statusInternal = OperationStatus.Initial;
            expect(list.ready).true;
            (list as any).statusInternal = OperationStatus.Cancelled;
            expect(list.ready).true;
            (list as any).statusInternal = OperationStatus.Done;
            expect(list.ready).true;
            (list as any).statusInternal = OperationStatus.Fail;
            expect(list.ready).true;
            (list as any).statusInternal = OperationStatus.NoData;
            expect(list.ready).true;
            (list as any).statusInternal = OperationStatus.Progress;
            expect(list.ready).false;
        });
    });
    describe('state services', () => {
        it('adds state services to stateServices collection on registerStateService call', () => {
            expect(list.stateServices).to.eql([]);
            list.registerStateService(firstStubStateService, secondStubStateService);
            expect(list.stateServices).to.eql([firstStubStateService, secondStubStateService]);
        });
        it('removes state service from stateServices collection on removeStateService call', () => {
            list.registerStateService(firstStubStateService, secondStubStateService);
            expect(list.stateServices).to.eql([firstStubStateService, secondStubStateService]);
            list.removeStateService(firstStubStateService);
            expect(list.stateServices).to.eql([secondStubStateService]);
        });
        it("doesn't throw if not registered service unregistered", () => {
            list.registerStateService(firstStubStateService);
            expect(() => {
                list.removeStateService(secondStubStateService);
            }).not.throws();
        });
    });
    describe('cancelRequests', () => {
        it('sets list status to Cancelled', () => {
            list.init();
            list.loadData();
            list.cancelRequests();
            expect(list.status).eql(OperationStatus.Cancelled);
        });
        it('sets list status to Cancelled only if list is busy', () => {
            list.init();
            list.cancelRequests();
            expect(list.status).not.eql(OperationStatus.Cancelled);
        });
        it('calls AsyncSubscriber.detach', () => {
            const spy = sinon.spy(asyncSubscriber, 'detach');
            list.init();
            list.loadData();
            expect(spy.notCalled).true;
            list.cancelRequests();
            expect(spy.calledOnce).true;
        });
        it('calls AsyncSubscriber.detach only if list is busy', () => {
            const spy = sinon.spy(asyncSubscriber, 'detach');
            list.init();
            expect(spy.notCalled).true;
            list.cancelRequests();
            expect(spy.notCalled).true;
        });
        it('destroys items even if they was keeped on load', () => {
            list.init();
            list.keepRecordsOnLoad = true;
            list.items = [1, 2, 3, 4, 5];
            list.loadData();
            expect(list.items).eql([1, 2, 3, 4, 5]);
            list.cancelRequests();
            expect(list.items).eql([]);
        });
    });
    describe('reloadData', () => {
        it('sets list status to Progress', () => {
            list.init();
            expect(list.status).not.eql(OperationStatus.Progress);
            list.reloadData();
            expect(list.status).eql(OperationStatus.Progress);
        });
        it('calls specified fetchMethod with FiltersService.getRequestState value as parameter', () => {
            const fetchSpy = sinon.spy(list, 'fetchMethod');
            list.init();
            list.reloadData();
            expect(fetchSpy.calledOnce).true;
            expect(fetchSpy.args[0][0]).eql(filtersService.getRequestState());
        });
        it("doesn't destroy items array if 'keepRecordsOnLoad' setted to 'true'", () => {
            list.init();
            list.items = [1, 2, 3, 4, 5];
            list.keepRecordsOnLoad = true;
            list.reloadData();
            expect(list.items).eql([1, 2, 3, 4, 5]);
        });
        it("destroys items array if 'keepRecordsOnLoad' setted to 'false'", () => {
            list.init();
            list.items = [1, 2, 3, 4, 5];
            list.keepRecordsOnLoad = false;
            list.reloadData();
            expect(list.items).eql([]);
        });
        it('calls attach method of asyncSubscriber to listen observable', () => {
            const observable = Observable.create((observer: any) => {
                setTimeout(() => {
                    observer.next([]);
                }, delay);
            });
            list.fetchMethod = () => observable;
            const attachSpy = sinon.spy(asyncSubscriber, 'attach');
            list.init();
            list.reloadData();
            expect(attachSpy.calledOnce).true;
            expect(
                attachSpy.calledWith(
                    observable,
                    (list as any).reloadDataSuccessCallback,
                    (list as any).reloadDataFailCallback
                )
            ).true;
        });
        it('returns without request if list status is equal to OperationStatus.Progress', () => {
            const observable = Observable.create((observer: any) => {
                setTimeout(() => {
                    observer.next([]);
                }, delay);
            });
            list.fetchMethod = () => observable;
            const attachSpy = sinon.spy(asyncSubscriber, 'attach');
            list.init();
            (list as any).statusInternal = OperationStatus.Progress;
            list.reloadData();
            expect(attachSpy.notCalled).true;
        });
        it('calls registered state service persistState method', () => {
            const spy = sinon.spy(firstStubStateService, 'persistState');
            list.registerStateService(firstStubStateService);
            expect(spy.notCalled).true;
            list.init();
            expect(spy.notCalled).true;
            list.loadData();
            expect(spy.calledOnce).true;
            expect(spy.calledWith(filtersService)).true;
            clock.tick(delay);
            list.reloadData();
            expect(spy.calledTwice).true;
        });
        it("clears data on error if 'keepRecordsOnLoad' is 'true' and 'pager.appendedOnLoad' is 'false'", () => {
            list.fetchMethod = () =>
                Observable.create((observer: any) => {
                    setTimeout(() => {
                        observer.error();
                    }, delay);
                });
            list.pager.appendedOnLoad = false;
            list.keepRecordsOnLoad = true;
            list.items = [1, 2, 3, 4, 5];
            list.reloadData();
            expect(list.items).eql([1, 2, 3, 4, 5]);
            clock.tick(delay);
            expect(list.items).eql([]);
        });
        it("clears data on success if 'keepRecordsOnLoad' is 'true' and 'pager.appendedOnLoad' is 'false'", () => {
            list.fetchMethod = () =>
                Observable.create((observer: any) => {
                    setTimeout(() => {
                        observer.next([6, 7, 8]);
                    }, delay);
                });
            list.pager.appendedOnLoad = false;
            list.keepRecordsOnLoad = true;
            list.items = [1, 2, 3, 4, 5];
            list.reloadData();
            expect(list.items).eql([1, 2, 3, 4, 5]);
            clock.tick(delay);
            expect(list.items).eql([6, 7, 8]);
        });

        it('resets pager state before performing request', () => {
            const spy = sinon.spy(() => from([]));
            list.fetchMethod = spy;
            const pager = new PagedPager();
            list.pager = pager;
            pager.appendedOnLoad = false;
            pager.pageSize = pager.defaultPageSize / 2;
            list.items = [1, 2, 3, 4, 5];
            expect(pager.pageSize).eql(pager.defaultPageSize / 2);
            list.reloadData();
            expect(pager.pageSize).eql(pager.defaultPageSize);
            expect(spy.calledWith({ skip: 0, take: pager.defaultPageSize })).true;
        });
    });
    describe('init', () => {
        it('sets inited flag to true', () => {
            expect(list.inited).false;
            list.init();
            expect(list.inited).true;
        });
        it('returns if already inited', () => {
            const spy = sinon.spy(filtersService, 'registerFilterTarget');
            (list as any).initedInternal = true;
            list.init();
            expect(spy.notCalled).true;
        });
        it('registers sortings and paging services as filter targets', () => {
            const spy = sinon.spy(filtersService, 'registerFilterTarget');
            list.init();
            expect(spy.calledOnce).true;
            expect(spy.calledWith(list.pager, sortingsService)).true;
        });
        it('calls registered state service getState method on init', () => {
            const spy = sinon.spy(firstStubStateService, 'getState');
            list.registerStateService(firstStubStateService);
            expect(spy.notCalled).true;
            list.init();
            expect(spy.calledOnce).true;
        });
    });
    describe('destroy', () => {
        it('calls underlying services destroy methods and own clearData method', () => {
            list.init();
            const subscriberSpy = sinon.spy(asyncSubscriber, 'destroy');
            const filtersSpy = sinon.spy(filtersService, 'destroy');
            const sortingsSpy = sinon.spy(sortingsService, 'destroy');
            const clearSpy = sinon.spy(list, 'clearData');
            list.destroy();
            expect(subscriberSpy.calledOnce).true;
            expect(filtersSpy.calledOnce).true;
            expect(sortingsSpy.calledOnce).true;
            expect(clearSpy.calledOnce).true;
        });
        it('sets destroyed flag to true', () => {
            list.init();
            expect(list.destroyed).false;
            list.destroy();
            expect(list.destroyed).true;
        });
    });
    describe('loadData', () => {
        it('sets list status to Progress', () => {
            list.init();
            expect(list.status).not.eql(OperationStatus.Progress);
            list.loadData();
            expect(list.status).eql(OperationStatus.Progress);
        });
        it('calls specified fetchMethod with FiltersService.getRequestState value as parameter', () => {
            const fetchSpy = sinon.spy(list, 'fetchMethod');
            list.init();
            list.loadData();
            expect(fetchSpy.calledOnce).true;
            expect(fetchSpy.args[0][0]).eql(filtersService.getRequestState());
        });
        it("doesn't destroy items array if Pager.appendedOnLoad is true", () => {
            list.init();
            list.items = [1, 2, 3, 4, 5];
            list.pager.appendedOnLoad = true;
            list.loadData();
            expect(list.items).eql([1, 2, 3, 4, 5]);
        });
        it('destroys items array if Pager.appendedOnLoad is false', () => {
            list.init();
            list.items = [1, 2, 3, 4, 5];
            list.pager.appendedOnLoad = false;
            list.loadData();
            expect(list.items).eql([]);
        });
        it("doesn't destroy items array if 'keepRecordsOnLoad' setted to 'true'", () => {
            list.init();
            list.items = [1, 2, 3, 4, 5];
            list.pager.appendedOnLoad = false;
            list.keepRecordsOnLoad = true;
            list.loadData();
            expect(list.items).eql([1, 2, 3, 4, 5]);
        });
        it("destroys items array if 'keepRecordsOnLoad' setted to 'false'", () => {
            list.init();
            list.items = [1, 2, 3, 4, 5];
            list.pager.appendedOnLoad = false;
            list.keepRecordsOnLoad = false;
            list.loadData();
            expect(list.items).eql([]);
        });
        it('calls destroy methods of items elements if it exists', () => {
            list.init();
            const item1 = { destroy: sinon.spy() };
            const item2 = { destroy: sinon.spy() };
            list.items = [item1, item2];

            list.loadData();
            clock.tick(delay);
            expect(item1.destroy.calledOnce).true;
            expect(item2.destroy.calledOnce).true;
        });
        it('calls attach method of asyncSubscriber to listen observable', () => {
            const observable = Observable.create((observer: any) => {
                setTimeout(() => {
                    observer.next([]);
                }, delay);
            });
            list.fetchMethod = () => observable;
            const attachSpy = sinon.spy(asyncSubscriber, 'attach');
            list.init();
            list.loadData();
            expect(attachSpy.calledOnce).true;
            expect(
                attachSpy.calledWith(
                    observable,
                    (list as any).loadDataSuccessCallback,
                    (list as any).loadDataFailCallback
                )
            ).true;
        });
        it('returns without request if list status is equal to OperationStatus.Progress', () => {
            const observable = Observable.create((observer: any) => {
                setTimeout(() => {
                    observer.next([]);
                }, delay);
            });
            list.fetchMethod = () => observable;
            const attachSpy = sinon.spy(asyncSubscriber, 'attach');
            list.init();
            (list as any).statusInternal = OperationStatus.Progress;
            list.loadData();
            expect(attachSpy.notCalled).true;
        });
        it('calls registered state service persistState method', () => {
            const spy = sinon.spy(firstStubStateService, 'persistState');
            list.registerStateService(firstStubStateService);
            expect(spy.notCalled).true;
            list.init();
            expect(spy.notCalled).true;
            list.loadData();
            expect(spy.calledOnce).true;
            expect(spy.calledWith(filtersService)).true;
            clock.tick(delay);
            list.loadData();
            expect(spy.calledTwice).true;
        });
        it("clears data on error if 'keepRecordsOnLoad' is 'true' and 'pager.appendedOnLoad' is 'false'", () => {
            list.fetchMethod = () =>
                Observable.create((observer: any) => {
                    setTimeout(() => {
                        observer.error();
                    }, delay);
                });
            list.pager.appendedOnLoad = false;
            list.keepRecordsOnLoad = true;
            list.items = [1, 2, 3, 4, 5];
            list.loadData();
            expect(list.items).eql([1, 2, 3, 4, 5]);
            clock.tick(delay);
            expect(list.items).eql([]);
        });
        it("clears data on success if 'keepRecordsOnLoad' is 'true' and 'pager.appendedOnLoad' is 'false'", () => {
            list.fetchMethod = () =>
                Observable.create((observer: any) => {
                    setTimeout(() => {
                        observer.next([6, 7, 8]);
                    }, delay);
                });
            list.pager.appendedOnLoad = false;
            list.keepRecordsOnLoad = true;
            list.items = [1, 2, 3, 4, 5];
            list.loadData();
            expect(list.items).eql([1, 2, 3, 4, 5]);
            clock.tick(delay);
            expect(list.items).eql([6, 7, 8]);
        });

        it('Can handle stream of values', () => {
            list.fetchMethod = () =>
                Observable.create((observer: any) => {
                    setTimeout(() => {
                        observer.next([6, 7, 8]);
                        setTimeout(() => {
                            observer.next([9, 10, 11]);
                        }, delay);
                    }, delay);
                });
            list.pager.appendedOnLoad = false;
            list.keepRecordsOnLoad = true;
            list.items = [1, 2, 3, 4, 5];
            list.loadData();
            expect(list.items).eql([1, 2, 3, 4, 5]);
            clock.tick(delay);
            expect(list.items).eql([6, 7, 8]);
            clock.tick(delay);
            expect(list.items).eql([9, 10, 11]);
        });
    });
    describe('Response interception', () => {
        it("Intercepts Cancellation response with call of 'cancelRequests'", () => {
            const cancelRequestsSpy = sinon.spy(list, 'cancelRequests');
            list.fetchMethod = () =>
                Observable.create((observer: any) => {
                    setTimeout(() => {
                        observer.next({
                            items: [],
                            status: OperationStatus.Cancelled,
                            totalCount: 0
                        });
                    }, delay);
                });
            list.loadData();
            clock.tick(delay);
            expect(cancelRequestsSpy.calledOnce).eql(true);
            list.reloadData();
            clock.tick(delay);
            expect(cancelRequestsSpy.calledTwice).eql(true);
        });
        it("Intercepts Fail response with call of 'reloadDataFailCallback'", () => {
            const failCallbackSpy = sinon.spy(list as any, 'reloadDataFailCallback');
            list.fetchMethod = () =>
                Observable.create((observer: any) => {
                    setTimeout(() => {
                        observer.next({
                            items: [],
                            status: OperationStatus.Fail,
                            totalCount: 0
                        });
                    }, delay);
                });
            list.loadData();
            clock.tick(delay);
            expect(failCallbackSpy.calledOnce).eql(true);
            list.reloadData();
            clock.tick(delay);
            expect(failCallbackSpy.calledTwice).eql(true);
        });
        it('Intercepts Progress response but do nothing until loading completed', () => {
            const interceptSpy = sinon.spy(list as any, 'tryInterceptStatusResponse');
            list.fetchMethod = () =>
                Observable.create((observer: any) => {
                    setTimeout(() => {
                        observer.next({
                            items: [],
                            status: OperationStatus.Progress,
                            totalCount: 0
                        });
                        setTimeout(() => {
                            observer.next([1, 2, 3]);
                        }, delay);
                    }, delay);
                });
            list.loadData();
            expect(list.items).eql([]);
            clock.tick(delay);
            expect(interceptSpy.calledOnce).eql(true);
            expect(interceptSpy.returnValues[0]).eql(true);
            expect(list.status).eql(OperationStatus.Progress);
            expect(list.items).eql([]);
            interceptSpy.resetHistory();

            clock.tick(delay);
            expect(interceptSpy.calledOnce).eql(true);
            expect(interceptSpy.returnValues[0]).eql(false);
            expect(list.status).eql(OperationStatus.Done);
            expect(list.items).eql([1, 2, 3]);

            interceptSpy.resetHistory();

            list.reloadData();
            expect(list.items).eql([]);
            clock.tick(delay);
            expect(interceptSpy.calledOnce).eql(true);
            expect(interceptSpy.returnValues[0]).eql(true);
            expect(list.status).eql(OperationStatus.Progress);
            expect(list.items).eql([]);
            interceptSpy.resetHistory();

            clock.tick(delay);
            expect(interceptSpy.calledOnce).eql(true);
            expect(interceptSpy.returnValues[0]).eql(false);
            expect(list.status).eql(OperationStatus.Done);
            expect(list.items).eql([1, 2, 3]);
        });
    });

    describe('loadData callbacks', () => {
        describe('loadFailCallback', () => {
            it('sets status to failed', () => {
                list.fetchMethod = () =>
                    Observable.create((observer: any) => {
                        setTimeout(() => {
                            observer.error();
                        }, delay);
                    });
                list.loadData();
                clock.tick(delay);
                expect(list.status).eq(OperationStatus.Fail);
            });
        });
        describe('loadSuccessCallback', () => {
            it('sets status to NoData if async returns empty array', () => {
                list.fetchMethod = () =>
                    Observable.create((observer: any) => {
                        setTimeout(() => {
                            observer.next([]);
                        }, delay);
                    });
                list.loadData();
                clock.tick(delay);
                expect(list.status).eq(OperationStatus.NoData);
            });
            it('sets status to Done data returned', () => {
                list.fetchMethod = () =>
                    Observable.create((observer: any) => {
                        setTimeout(() => {
                            observer.next([1]);
                        }, delay);
                    });
                list.loadData();
                clock.tick(delay);
                expect(list.status).eq(OperationStatus.Done);
            });
            it('calls Pager.reset and List.clearData if empty complex response returned', () => {
                const response = {
                    items: [1],
                    totalCount: 1
                };
                list.pager.appendedOnLoad = true;
                list.fetchMethod = () =>
                    Observable.create((observer: any) => {
                        setTimeout(() => {
                            observer.next(response);
                        }, delay);
                    });

                const resetSpy = sinon.spy(list.pager, 'reset');
                const clearSpy = sinon.spy(list, 'clearData');
                list.loadData();
                clock.tick(delay);
                expect(resetSpy.notCalled).true;
                expect(clearSpy.notCalled).true;

                response.items.length = 0;
                response.totalCount = 0;
                list.loadData();
                clock.tick(delay);
                expect(resetSpy.called).true;
                expect(clearSpy.called).true;
            });
            it("doesn't call Pager.reset and List.clearData if empty flat array returned", () => {
                const data = [1];
                list.pager.appendedOnLoad = true;
                list.fetchMethod = () =>
                    Observable.create((observer: any) => {
                        setTimeout(() => {
                            observer.next(data);
                        }, delay);
                    });

                list.loadData();
                const resetSpy = sinon.spy(list.pager, 'reset');
                const clearSpy = sinon.spy(list, 'clearData');
                clock.tick(delay);
                expect(resetSpy.notCalled).true;
                expect(clearSpy.notCalled).true;
                data.length = 0;
                list.loadData();
                clock.tick(delay);
                expect(resetSpy.notCalled).true;
                expect(clearSpy.notCalled).true;
            });
            it('calls pager.processResponse with returned response object', () => {
                const processSpy = sinon.spy(list.pager, 'processResponse');
                const response = {
                    items: [1, 2, 3, 4, 5],
                    loadedCount: 5,
                    totalCount: 10
                };
                list.fetchMethod = () =>
                    Observable.create((observer: any) => {
                        setTimeout(() => {
                            observer.next(response);
                        }, delay);
                    });
                list.loadData();

                expect(processSpy.notCalled).true;
                clock.tick(delay);
                expect(processSpy.calledOnce).true;
                expect(processSpy.calledWith(response)).true;
            });
            it('calls pager.processResponse with array of records if simple array was returned as response', () => {
                const processSpy = sinon.spy(list.pager, 'processResponse');
                const response = [1, 2, 3, 4, 5];
                list.fetchMethod = () =>
                    Observable.create((observer: any) => {
                        setTimeout(() => {
                            observer.next(response);
                        }, delay);
                    });
                list.loadData();

                expect(processSpy.notCalled).true;
                clock.tick(delay);
                expect(processSpy.calledOnce).true;
                expect(processSpy.args[0][0]).eql(response);
            });
            it('concats items array with loaded data', () => {
                list.pager.appendedOnLoad = true;
                list.items = [1, 2, 3];
                list.fetchMethod = () =>
                    Observable.create((observer: any) => {
                        setTimeout(() => {
                            observer.next([4, 5]);
                        }, delay);
                    });
                list.loadData();
                clock.tick(delay);
                expect(list.items).eql([1, 2, 3, 4, 5]);
            });
        });
    });
});
