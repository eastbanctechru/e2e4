import { AsyncSubscriber } from './../src/async-subscriber';

import { expect } from 'chai';
import { Observable } from 'rxjs/Observable';
import * as sinon from 'sinon';

describe('AsyncSubscriber', () => {
    let clock;
    let delay = 100;
    let resolveValue = 5;
    let rejectValue = 5;
    let subscriber: AsyncSubscriber;
    let successSpy: sinon.SinonSpy = sinon.spy();
    let failureSpy: sinon.SinonSpy = sinon.spy();
    beforeEach(() => {
        successSpy = sinon.spy();
        failureSpy = sinon.spy();
        subscriber = new AsyncSubscriber();
        clock = sinon.useFakeTimers();
    });
    afterEach(() => {
        clock.restore();
    });
    it('destroys successfully even if there\'s no subscriptions created', () => {
        expect(() => subscriber.destroy()).not.throw();
    });
    describe('Promise', () => {
        it('handles resolve', (done: any) => {
            let promise = new Promise((resolve: any) => {
                setTimeout(() => resolve(resolveValue), delay);
            });

            subscriber.attach(promise, successSpy, failureSpy);
            clock.tick(delay);
            promise.then(() => {
                expect(successSpy.calledOnce).true;
                expect(successSpy.calledWith(resolveValue)).true;
                done();
            });
        });

        it('handles reject', (done: any) => {
            let promise = new Promise((resolve: any, reject: any) => {
                setTimeout(() => reject(rejectValue), delay);
            });

            subscriber.attach(promise, successSpy, failureSpy);
            clock.tick(delay);
            promise.catch(() => {
                expect(failureSpy.calledOnce).true;
                expect(failureSpy.calledWith(rejectValue)).true;
                done();
            });
        });

        it('handles detach and does not call resolve callback', (done: any) => {
            let promise = new Promise((resolve: any, reject: any) => {
                setTimeout(() => resolve(resolveValue), delay);
            });
            subscriber.attach(promise, successSpy, failureSpy);
            subscriber.detach();
            clock.tick(delay);
            let testFn = () => {
                expect(successSpy.notCalled).true;
                done();
            };
            promise.then(testFn, testFn);
        });

        it('handles detach and does not call reject callback', (done: any) => {
            let promise = new Promise((resolve: any, reject: any) => {
                setTimeout(() => reject(rejectValue), delay);
            });
            subscriber.attach(promise, successSpy, failureSpy);
            subscriber.detach();
            clock.tick(delay);
            let testFn = () => {
                expect(failureSpy.notCalled).true;
                done();
            };
            promise.then(testFn, testFn);
        });

        it('handles destroy and does not call resolve or reject callbacks', (done: any) => {
            let promise = new Promise((resolve: any, reject: any) => {
                setTimeout(() => resolve(resolveValue), delay);
            });
            subscriber.attach(promise, successSpy, failureSpy);
            subscriber.destroy();
            clock.tick(delay);
            let testFn = () => {
                expect(successSpy.notCalled).true;
                expect(failureSpy.notCalled).true;
                done();
            };
            promise.then(testFn, testFn);
        });
        it('resets previous subscription on new subscribe', () => {
            let promise = new Promise((resolve: any, reject: any) => {
                setTimeout(() => resolve(resolveValue), delay);
            });
            let anotherPromise = new Promise((resolve: any, reject: any) => {
                setTimeout(() => resolve(resolveValue), delay);
            });
            subscriber.attach(promise, successSpy, failureSpy);
            subscriber.attach(anotherPromise, sinon.spy(), sinon.spy());
            clock.tick(delay);
            expect(successSpy.notCalled).true;
        });

    });
    describe('Observable', () => {
        it('handles resolve', () => {
            let observable = Observable.create((observer: any) => {
                setTimeout(() => {
                    observer.next(resolveValue);
                    observer.complete();
                }, delay);
            });
            subscriber.attach(observable, successSpy, failureSpy);
            clock.tick(delay);
            expect(successSpy.calledOnce).true;
            expect(successSpy.calledWith(resolveValue)).true;
        });
        it('handles reject', (done: any) => {
            let observable = Observable.create((observer: any) => {
                setTimeout(() => {
                    observer.error(rejectValue);
                    observer.complete();
                }, delay);
            });

            subscriber.attach(observable, successSpy, failureSpy);
            clock.tick(delay);
            expect(failureSpy.calledOnce).true;
            expect(failureSpy.calledWith(rejectValue)).true;
            done();
        });

        it('handles detach and does not call resolve callbacks', (done: any) => {
            let observable = Observable.create((observer: any) => {
                setTimeout(() => {
                    observer.next(resolveValue);
                    observer.complete();
                }, delay);
            });

            subscriber.attach(observable, successSpy, failureSpy);
            subscriber.detach();
            clock.tick(delay);
            expect(successSpy.notCalled).true;
            done();
        });

        it('handles detach and does not call reject callbacks', (done: any) => {
            let observable = Observable.create((observer: any) => {
                setTimeout(() => {
                    observer.error(rejectValue);
                    observer.complete();
                }, delay);
            });

            subscriber.attach(observable, successSpy, failureSpy);
            subscriber.detach();
            clock.tick(delay);
            expect(failureSpy.notCalled).true;
            done();
        });

        it('handles destroy and does not call resolve or reject callbacks', (done: any) => {
            let observable = Observable.create((observer: any) => {
                setTimeout(() => {
                    observer.error(rejectValue);
                    observer.complete();
                }, delay);
            });

            subscriber.attach(observable, successSpy, failureSpy);
            subscriber.destroy();
            clock.tick(delay);
            expect(successSpy.notCalled).true;
            expect(failureSpy.notCalled).true;
            done();
        });
        it('resets previous subscription on new subscribe', () => {
            let observable = Observable.create((observer: any) => {
                setTimeout(() => {
                    observer.next(resolveValue);
                    observer.complete();
                }, delay);
            });
            let anotherObservable = Observable.create((observer: any) => {
                setTimeout(() => {
                    observer.next(resolveValue);
                    observer.complete();
                }, delay);
            });
            subscriber.attach(observable, successSpy, failureSpy);
            subscriber.attach(anotherObservable, sinon.spy(), sinon.spy());
            clock.tick(delay);
            expect(successSpy.notCalled).true;
        });

    });
    describe('Other', () => {
        it('throws error', () => {
            let target = {};
            expect(() => subscriber.attach(target, successSpy, failureSpy)).throws('Can\'t subscribe to passed object');
        });
    });
});
