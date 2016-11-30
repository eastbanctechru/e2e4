import { FiltersService } from './filters-service';
/**
 * Base contract for state management services.
 */
export abstract class StateService {
    /**
     * This method must get required state from passed filterService instance and persist it in any way.
     * @param filtersService service to request state.
     */
    public abstract persistState(filtersService: FiltersService): void;
    /**
     * This method will be called during {@link List} initialization and must return settings saved previously.
     */
    public abstract getState(): any;
}
