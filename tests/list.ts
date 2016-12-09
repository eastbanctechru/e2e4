// tslint:disable:max-classes-per-file
import { AsyncSubscriber } from './../src/async-subscriber';
import { FiltersService } from './../src/filters-service';
import { List } from './../src/list';
import { NullObjectPager } from './../src/null-object-pager';
import { OperationStatus } from './../src/operation-status';
import { PagedPager } from './../src/paged-pager';
import { SortingsService } from './../src/sortings-service';
import { StateService } from './../src/state-service';

import { expect } from 'chai';
import { Observable } from 'rxjs/Observable';
import * as sinon from 'sinon';

class FirstStubStateService implements StateService {
    public persistState(filtersService: FiltersService): void {
        return;
    }
    public getState(): any {
        return;
    }
}
class SecondStubStateService implements StateService {
    public persistState(filtersService: FiltersService): void {
        return;
    }
    public getState(): any {
        return;
    }
}

describe('List', () => {
    let clock;
    let delay = 100;
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
        list.fetchMethod = () => Observable.create((observer: any) => {
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
            expect((<any>list).stateServices).empty;
            list = new List(asyncSubscriber, firstStubStateService, sortingsService, filtersService);
            expect((<any>list).stateServices).eql([firstStubStateService]);
            list = new List(asyncSubscriber, [firstStubStateService, secondStubStateService], sortingsService, filtersService);
            expect((<any>list).stateServices).eql([firstStubStateService, secondStubStateService]);
        });
        it('inits pager as NullObjectPager', () => {
            expect(list.pager).instanceof(NullObjectPager);
        });
    });
    describe('pager', () => {
        it('pager setter unregister old service and registers new as filter', () => {
            let oldPager = list.pager;
            let newPager = new PagedPager();
            let removeSpy = sinon.spy(filtersService, 'removeFilterTarget');
            let registerSpy = sinon.spy(filtersService, 'registerFilterTarget');
            list.pager = newPager;
            expect(removeSpy.calledOnce).true;
            expect(removeSpy.calledWith(oldPager)).true;
            expect(registerSpy.calledOnce).true;
            expect(registerSpy.calledWith(newPager)).true;
        });
    });
    describe('filters', () => {
        it('resetSettings is a proxy to FiltersService.resetValues method', () => {
            let spy = sinon.spy(filtersService, 'resetValues');
            list.resetSettings();
            expect(spy.calledOnce).true;
        });
        it('registerFilterTarget is a proxy to FiltersService.registerFilterTarget method', () => {
            let spy = sinon.spy(filtersService, 'registerFilterTarget');
            list.registerFilterTarget({}, {}, {});
            expect(spy.calledOnce).true;
        });
        it('removeFilterTarget is a proxy to FiltersService.removeFilterTarget method', () => {
            let spy = sinon.spy(filtersService, 'removeFilterTarget');
            list.removeFilterTarget({}, {}, {});
            expect(spy.calledOnce).true;
        });
        it('getRequestState is a proxy to FiltersService.getRequestState method', () => {
            let spy = sinon.spy(filtersService, 'getRequestState');
            list.getRequestState();
            expect(spy.calledOnce).true;
        });
    });
    describe('status', () => {
        it('List.busy is true only when status is equal to OperationStatus.Progress', () => {
            (<any>list).statusInternal = OperationStatus.Initial;
            expect(list.busy).false;
            (<any>list).statusInternal = OperationStatus.Cancelled;
            expect(list.busy).false;
            (<any>list).statusInternal = OperationStatus.Done;
            expect(list.busy).false;
            (<any>list).statusInternal = OperationStatus.Fail;
            expect(list.busy).false;
            (<any>list).statusInternal = OperationStatus.NoData;
            expect(list.busy).false;
            (<any>list).statusInternal = OperationStatus.Progress;
            expect(list.busy).true;
        });
        it('List.busy is true when status is not equal to OperationStatus.Progress', () => {
            (<any>list).statusInternal = OperationStatus.Initial;
            expect(list.ready).true;
            (<any>list).statusInternal = OperationStatus.Cancelled;
            expect(list.ready).true;
            (<any>list).statusInternal = OperationStatus.Done;
            expect(list.ready).true;
            (<any>list).statusInternal = OperationStatus.Fail;
            expect(list.ready).true;
            (<any>list).statusInternal = OperationStatus.NoData;
            expect(list.ready).true;
            (<any>list).statusInternal = OperationStatus.Progress;
            expect(list.ready).false;
        });
    });
    describe('state services', () => {
        it('adds state services to stateServices collection on registerStateService call', () => {
            expect((<any>list).stateServices).to.eql([]);
            list.registerStateService(firstStubStateService, secondStubStateService);
            expect((<any>list).stateServices).to.eql([firstStubStateService, secondStubStateService]);
        });
        it('removes state service from stateServices collection on removeStateService call', () => {
            list.registerStateService(firstStubStateService, secondStubStateService);
            expect((<any>list).stateServices).to.eql([firstStubStateService, secondStubStateService]);
            list.removeStateService(firstStubStateService);
            expect((<any>list).stateServices).to.eql([secondStubStateService]);
        });
        it('doesn\'t throw if not registered service unregistered', () => {
            list.registerStateService(firstStubStateService);
            expect(() => list.removeStateService(secondStubStateService)).not.throws();
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
            let spy = sinon.spy(asyncSubscriber, 'detach');
            list.init();
            list.loadData();
            expect(spy.notCalled).true;
            list.cancelRequests();
            expect(spy.calledOnce).true;
        });
        it('calls AsyncSubscriber.detach only if list is busy', () => {
            let spy = sinon.spy(asyncSubscriber, 'detach');
            list.init();
            expect(spy.notCalled).true;
            list.cancelRequests();
            expect(spy.notCalled).true;
        });
    });
    describe('reloadData', () => {
        it('calls clearData and loadData methods', () => {
            let clearSpy = sinon.spy(list, 'clearData');
            let loadSpy = sinon.spy(list, 'loadData');
            list.init();
            list.reloadData();
            expect(clearSpy.calledOnce).true;
            expect(loadSpy.calledOnce).true;
        });
        it('calls clearData method only if list is ready', () => {
            let clearSpy = sinon.spy(list, 'clearData');
            let loadSpy = sinon.spy(list, 'loadData');
            list.init();
            (<any>list).statusInternal = OperationStatus.Progress;
            list.reloadData();
            expect(clearSpy.notCalled).true;
            expect(loadSpy.notCalled).true;
        });
    });
    describe('init', () => {
        it('sets inited flag to true', () => {
            expect(list.inited).false;
            list.init();
            expect(list.inited).true;
        });
        it('returns if already inited', () => {
            let spy = sinon.spy(filtersService, 'registerFilterTarget');
            (<any>list).initedInternal = true;
            list.init();
            expect(spy.notCalled).true;
        });
        it('registers sortings and paging services as filter targets', () => {
            let spy = sinon.spy(filtersService, 'registerFilterTarget');
            list.init();
            expect(spy.calledOnce).true;
            expect(spy.calledWith(list.pager, sortingsService)).true;
        });
        it('calls registered state service getState method on init', () => {
            let spy = sinon.spy(firstStubStateService, 'getState');
            list.registerStateService(firstStubStateService);
            expect(spy.notCalled).true;
            list.init();
            expect(spy.calledOnce).true;
        });
    });
    describe('destroy', () => {
        it('calls underlying services destroy methods and own clearData method', () => {
            list.init();
            let subscriberSpy = sinon.spy(asyncSubscriber, 'destroy');
            let filtersSpy = sinon.spy(filtersService, 'destroy');
            let sortingsSpy = sinon.spy(sortingsService, 'destroy');
            let clearSpy = sinon.spy(list, 'clearData');
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
            let fetchSpy = sinon.spy(list, 'fetchMethod');
            list.init();
            list.loadData();
            expect(fetchSpy.calledOnce).true;
            expect(fetchSpy.args[0][0]).eql(filtersService.getRequestState());
        });
        it('doesn\'t destroy items array if Pager.appendedOnLoad is true', () => {
            list.init();
            list.items = [1, 2, 3, 4, 5];
            list.pager.appendedOnLoad = true;
            list.loadData();
            expect(list.items).eql([1, 2, 3, 4, 5]);
        });
        it('empties items array if Pager.appendedOnLoad is false', () => {
            list.init();
            list.items = [1, 2, 3, 4, 5];
            list.pager.appendedOnLoad = false;
            list.loadData();
            expect(list.items).eql([]);
        });
        it('calls destroy methods of items elements if it exists', () => {
            list.init();
            let item1 = { destroy: sinon.spy() };
            let item2 = { destroy: sinon.spy() };
            list.items = [item1, item2];

            list.loadData();
            clock.tick(delay);
            expect(item1.destroy.calledOnce).true;
            expect(item2.destroy.calledOnce).true;
        });
        it('calls attach method of asyncSubscriber to listen observable', () => {
            let observable = Observable.create((observer: any) => {
                setTimeout(() => {
                    observer.next([]);
                }, delay);
            });
            list.fetchMethod = () => observable;
            let attachSpy = sinon.spy(asyncSubscriber, 'attach');
            list.init();
            list.loadData();
            expect(attachSpy.calledOnce).true;
            expect(attachSpy.calledWith(observable, (<any>list).loadSuccessCallback, (<any>list).loadFailCallback)).true;
        });
        it('returns without request if list status is equal to OperationStatus.Progress', () => {
            let observable = Observable.create((observer: any) => {
                setTimeout(() => {
                    observer.next([]);
                }, delay);
            });
            list.fetchMethod = () => observable;
            let attachSpy = sinon.spy(asyncSubscriber, 'attach');
            list.init();
            (<any>list).statusInternal = OperationStatus.Progress;
            list.loadData();
            expect(attachSpy.notCalled).true;
        });
        it('calls registered state service persistState method', () => {
            let spy = sinon.spy(firstStubStateService, 'persistState');
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
    });
    describe('loadData callbacks', () => {
        it('loadFailCallback sets status to failed', () => {
            list.fetchMethod = () => Observable.create((observer: any) => {
                setTimeout(() => {
                    observer.error();
                }, delay);
            });
            list.loadData();
            clock.tick(delay);
            expect(list.status).eq(OperationStatus.Fail);
        });
        describe('loadSuccessCallback', () => {
            it('sets status to NoData if async returns empty array', () => {
                list.fetchMethod = () => Observable.create((observer: any) => {
                    setTimeout(() => {
                        observer.next([]);
                    }, delay);
                });
                list.loadData();
                clock.tick(delay);
                expect(list.status).eq(OperationStatus.NoData);
            });
            it('sets status to Done data returned', () => {
                list.fetchMethod = () => Observable.create((observer: any) => {
                    setTimeout(() => {
                        observer.next([1]);
                    }, delay);
                });
                list.loadData();
                clock.tick(delay);
                expect(list.status).eq(OperationStatus.Done);
            });
            it('calls Pager.reset and List.clearData if empty array returned', () => {
                let resetSpy = sinon.spy(list.pager, 'reset');
                let clearSpy = sinon.spy(list, 'clearData');
                let data = [1];
                list.fetchMethod = () => Observable.create((observer: any) => {
                    setTimeout(() => {
                        observer.next(data);
                    }, delay);
                });

                list.loadData();
                clock.tick(delay);
                expect(resetSpy.notCalled).true;
                expect(clearSpy.notCalled).true;

                data.length = 0;
                list.loadData();
                clock.tick(delay);
                expect(resetSpy.called).true;
                expect(clearSpy.called).true;
            });
            it('calls pager.processResponse with returned response object', () => {
                let processSpy = sinon.spy(list.pager, 'processResponse');
                let response = { totalCount: 10, loadedCount: 5, items: [1, 2, 3, 4, 5] };
                list.fetchMethod = () => Observable.create((observer: any) => {
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
            it('calls pager.processResponse with constructed response if simple array was returned as response', () => {
                let processSpy = sinon.spy(list.pager, 'processResponse');
                let response = [1, 2, 3, 4, 5];
                list.fetchMethod = () => Observable.create((observer: any) => {
                    setTimeout(() => {
                        observer.next(response);
                    }, delay);
                });
                list.loadData();

                expect(processSpy.notCalled).true;
                clock.tick(delay);
                expect(processSpy.calledOnce).true;
                expect(processSpy.args[0][0]).eql({ totalCount: response.length, loadedCount: response.length, items: response });
            });
            it('concats items array with loaded data', () => {
                list.pager.appendedOnLoad = true;
                list.items = [1, 2, 3];
                list.fetchMethod = () => Observable.create((observer: any) => {
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
