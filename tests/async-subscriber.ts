// tslint:disable:no-unused-expression no-inferred-empty-object-type
import { AsyncSubscriber } from '../index';

import { expect } from 'chai';
import { Observable } from 'rxjs';
import * as sinon from 'sinon';

describe('AsyncSubscriber', () => {
    let clock: sinon.SinonFakeTimers;
    const delay = 100;
    const resolveValue = 5;
    const rejectValue = 5;
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
    it("destroys successfully even if there's no subscriptions created", () => {
        expect(() => {
            subscriber.destroy();
        }).not.throw();
    });
    describe('Promise', () => {
        it('handles resolve', (done: any) => {
            const promise = new Promise((resolve: any) => {
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
            const promise = new Promise((resolve: any, reject: any) => {
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
            const promise = new Promise((resolve: any) => {
                setTimeout(() => resolve(resolveValue), delay);
            });
            subscriber.attach(promise, successSpy, failureSpy);
            subscriber.detach();
            clock.tick(delay);
            const testFn = () => {
                expect(successSpy.notCalled).true;
                done();
            };
            promise.then(testFn, testFn);
        });

        it('handles detach and does not call reject callback', (done: any) => {
            const promise = new Promise((resolve: any, reject: any) => {
                setTimeout(() => reject(rejectValue), delay);
            });
            subscriber.attach(promise, successSpy, failureSpy);
            subscriber.detach();
            clock.tick(delay);
            const testFn = () => {
                expect(failureSpy.notCalled).true;
                done();
            };
            promise.then(testFn, testFn);
        });

        it('handles destroy and does not call resolve or reject callbacks', (done: any) => {
            const promise = new Promise((resolve: any) => {
                setTimeout(() => resolve(resolveValue), delay);
            });
            subscriber.attach(promise, successSpy, failureSpy);
            subscriber.destroy();
            clock.tick(delay);
            const testFn = () => {
                expect(successSpy.notCalled).true;
                expect(failureSpy.notCalled).true;
                done();
            };
            promise.then(testFn, testFn);
        });
        it('resets previous subscription on new subscribe', () => {
            const promise = new Promise((resolve: any) => {
                setTimeout(() => resolve(resolveValue), delay);
            });
            const anotherPromise = new Promise((resolve: any) => {
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
            const observable = Observable.create((observer: any) => {
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
            const observable = Observable.create((observer: any) => {
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
            const observable = Observable.create((observer: any) => {
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
            const observable = Observable.create((observer: any) => {
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
            const observable = Observable.create((observer: any) => {
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
            const observable = Observable.create((observer: any) => {
                setTimeout(() => {
                    observer.next(resolveValue);
                    observer.complete();
                }, delay);
            });
            const anotherObservable = Observable.create((observer: any) => {
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
            const target = {};
            expect(() => {
                subscriber.attach(target, successSpy, failureSpy);
            }).throws("Can't subscribe to passed object");
        });
    });
});
