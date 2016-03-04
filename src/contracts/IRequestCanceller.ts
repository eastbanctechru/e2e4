export interface IRequestCanceller {
    addToCancellationSequence(promise: Promise<Object>): void;
    cancelRequests(): void;
}
