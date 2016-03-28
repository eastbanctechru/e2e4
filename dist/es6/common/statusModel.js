import { ProgressState } from './progressState';
export class StatusModel {
    constructor(status, title) {
        this.status = status;
        this.title = title;
    }
    get className() {
        switch (this.status) {
            case ProgressState.Done:
                return 'status status-resolved';
            case ProgressState.Progress:
                return 'status status-progress';
            case ProgressState.Fail:
                return 'status status-fail';
            default:
                return '';
        }
    }
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbW1vbi9zdGF0dXNNb2RlbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLGlCQUFpQjtBQUM3QztJQUlJLFlBQVksTUFBcUIsRUFBRSxLQUFhO1FBQzVDLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO0lBQ3ZCLENBQUM7SUFDRCxJQUFJLFNBQVM7UUFDVCxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztZQUNsQixLQUFLLGFBQWEsQ0FBQyxJQUFJO2dCQUNuQixNQUFNLENBQUMsd0JBQXdCLENBQUM7WUFDcEMsS0FBSyxhQUFhLENBQUMsUUFBUTtnQkFDdkIsTUFBTSxDQUFDLHdCQUF3QixDQUFDO1lBQ3BDLEtBQUssYUFBYSxDQUFDLElBQUk7Z0JBQ25CLE1BQU0sQ0FBQyxvQkFBb0IsQ0FBQztZQUNoQztnQkFDSSxNQUFNLENBQUMsRUFBRSxDQUFDO1FBQ2xCLENBQUM7SUFDTCxDQUFDO0FBQ0wsQ0FBQztBQUFBIiwiZmlsZSI6ImNvbW1vbi9zdGF0dXNNb2RlbC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7UHJvZ3Jlc3NTdGF0ZX0gZnJvbSAnLi9wcm9ncmVzc1N0YXRlJztcclxuZXhwb3J0IGNsYXNzIFN0YXR1c01vZGVsIHtcclxuICAgIHNpZDogbnVtYmVyO1xyXG4gICAgc3RhdHVzOiBQcm9ncmVzc1N0YXRlO1xyXG4gICAgdGl0bGU6IHN0cmluZztcclxuICAgIGNvbnN0cnVjdG9yKHN0YXR1czogUHJvZ3Jlc3NTdGF0ZSwgdGl0bGU6IHN0cmluZykge1xyXG4gICAgICAgIHRoaXMuc3RhdHVzID0gc3RhdHVzO1xyXG4gICAgICAgIHRoaXMudGl0bGUgPSB0aXRsZTtcclxuICAgIH1cclxuICAgIGdldCBjbGFzc05hbWUoKTogc3RyaW5nIHtcclxuICAgICAgICBzd2l0Y2ggKHRoaXMuc3RhdHVzKSB7XHJcbiAgICAgICAgICAgIGNhc2UgUHJvZ3Jlc3NTdGF0ZS5Eb25lOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuICdzdGF0dXMgc3RhdHVzLXJlc29sdmVkJztcclxuICAgICAgICAgICAgY2FzZSBQcm9ncmVzc1N0YXRlLlByb2dyZXNzOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuICdzdGF0dXMgc3RhdHVzLXByb2dyZXNzJztcclxuICAgICAgICAgICAgY2FzZSBQcm9ncmVzc1N0YXRlLkZhaWw6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gJ3N0YXR1cyBzdGF0dXMtZmFpbCc7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gJyc7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==