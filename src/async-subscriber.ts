// tslint:disable:max-classes-per-file

/**
 * Internal contract to implement abstracted subscription proxy which hides any details of underlying subscription  
 */
interface SubscriptionProxy {
    /**
     * Subscribes to passed object
     * @param target object to subscribe
     * @param completeAction action to call on underlying subscription successful completion
     * @param errorAction action to call on underlying subscription error
     */
    attach(target: any, completeAction: any, errorAction: any): any;

    /**
     * Detaches from underlying subscription
     */
    detach(subscription: any): void;
}

/**
 * Implementation of {@link SubscriptionProxy} to work with any objects with `subscribe/unsubscribe` contracts. This contract is suitable for Observable, for example.  
 */
class PushBasedSubscriptionProxy implements SubscriptionProxy {
    /**
     * Returns `true` if this proxy type can subscribe to passed object. `false` otherwise.
     */
    public static isAcceptable(target: any): boolean {
        return !!target.subscribe;
    }
    /**
     * @see {@link SubscriptionProxy.attach}  
     */
    public attach(target: any, completeAction: any, errorAction?: (error: any) => any): any {
        return target.subscribe({ error: errorAction, next: completeAction });
    }
    /**
     * @see {@link SubscriptionProxy.detach}  
     */
    public detach(subscription: any): void { subscription.unsubscribe(); }
}

/**
 * Implementation of {@link SubscriptionProxy} which works with Promise and adds ability to unsubscribe from it.  
 */
class PromiseSubscriptionProxy implements SubscriptionProxy {
    private isAlive: boolean = true;
    /**
     * Returns `true` if this proxy type can subscribe to passed object. `false` otherwise.
     */
    public static isAcceptable(target: any): boolean {
        return target instanceof Promise;
    }
    /**
     * @see {@link SubscriptionProxy.attach}  
     */
    public attach(target: Promise<any>, completeAction: (value: any) => any, errorAction?: (error: any) => any): any {
        return target.then((value: any) => {
            if (this.isAlive) {
                completeAction(value);
            }
        }, (error: any) => {
            if (this.isAlive) {
                errorAction(error);
            }
        });
    }
    /**
     * @see {@link SubscriptionProxy.destroy}  
     */
    public detach(subscription: any): void { this.isAlive = false; }
}

/**
 * Implementation of {@link SubscriptionProxy} which acts as proxy to concrete implementations.  
 */
export class AsyncSubscriber {
    private proxy: SubscriptionProxy = null;
    private lastTarget: any = null;
    private subscription: any = null;

    private getProxy(target: any): SubscriptionProxy {
        if (PromiseSubscriptionProxy.isAcceptable(target)) {
            return new PromiseSubscriptionProxy();
        }
        if (PushBasedSubscriptionProxy.isAcceptable(target)) {
            return new PushBasedSubscriptionProxy();
        }
        throw new Error('Can\'t subscribe to passed object');
    }
    /**
     * @see {@link SubscriptionProxy.attach}  
     */
    public attach(target: any, completeAction: (v: any) => any, errorAction?: (error: any) => any): void {
        if (this.lastTarget !== null) {
            this.destroy();
        }
        this.lastTarget = target;
        this.proxy = this.getProxy(target);
        this.subscription = this.proxy.attach(target, completeAction, errorAction);
    }
    /**
     * @see {@link SubscriptionProxy.destroy}  
     */
    public destroy(): void {
        if (this.proxy) {
            this.proxy.detach(this.subscription);
        }
        this.proxy = null;
        this.lastTarget = null;
        this.subscription = null;
    }
    /**
     * @see {@link SubscriptionProxy.detach}  
     */
    public detach(): void { this.proxy.detach(this.subscription); }
}
