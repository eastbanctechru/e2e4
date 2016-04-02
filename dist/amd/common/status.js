define(["require", "exports", './progressState'], function (require, exports, progressState_1) {
    "use strict";
    var Status = (function () {
        function Status(status, title) {
            this.status = status;
            this.title = title;
        }
        Object.defineProperty(Status.prototype, "className", {
            get: function () {
                switch (this.status) {
                    case progressState_1.ProgressState.Done:
                        return 'status status-resolved';
                    case progressState_1.ProgressState.Progress:
                        return 'status status-progress';
                    case progressState_1.ProgressState.Fail:
                        return 'status status-fail';
                    default:
                        return '';
                }
            },
            enumerable: true,
            configurable: true
        });
        return Status;
    }());
    exports.Status = Status;
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbW1vbi9zdGF0dXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7SUFDQTtRQUlJLGdCQUFZLE1BQXFCLEVBQUUsS0FBYTtZQUM1QyxJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztZQUNyQixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztRQUN2QixDQUFDO1FBQ0Qsc0JBQUksNkJBQVM7aUJBQWI7Z0JBQ0ksTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7b0JBQ2xCLEtBQUssNkJBQWEsQ0FBQyxJQUFJO3dCQUNuQixNQUFNLENBQUMsd0JBQXdCLENBQUM7b0JBQ3BDLEtBQUssNkJBQWEsQ0FBQyxRQUFRO3dCQUN2QixNQUFNLENBQUMsd0JBQXdCLENBQUM7b0JBQ3BDLEtBQUssNkJBQWEsQ0FBQyxJQUFJO3dCQUNuQixNQUFNLENBQUMsb0JBQW9CLENBQUM7b0JBQ2hDO3dCQUNJLE1BQU0sQ0FBQyxFQUFFLENBQUM7Z0JBQ2xCLENBQUM7WUFDTCxDQUFDOzs7V0FBQTtRQUNMLGFBQUM7SUFBRCxDQXBCQSxBQW9CQyxJQUFBO0lBcEJZLGNBQU0sU0FvQmxCLENBQUEiLCJmaWxlIjoiY29tbW9uL3N0YXR1cy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7UHJvZ3Jlc3NTdGF0ZX0gZnJvbSAnLi9wcm9ncmVzc1N0YXRlJztcclxuZXhwb3J0IGNsYXNzIFN0YXR1cyB7XHJcbiAgICBzaWQ6IG51bWJlcjtcclxuICAgIHN0YXR1czogUHJvZ3Jlc3NTdGF0ZTtcclxuICAgIHRpdGxlOiBzdHJpbmc7XHJcbiAgICBjb25zdHJ1Y3RvcihzdGF0dXM6IFByb2dyZXNzU3RhdGUsIHRpdGxlOiBzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLnN0YXR1cyA9IHN0YXR1cztcclxuICAgICAgICB0aGlzLnRpdGxlID0gdGl0bGU7XHJcbiAgICB9XHJcbiAgICBnZXQgY2xhc3NOYW1lKCk6IHN0cmluZyB7XHJcbiAgICAgICAgc3dpdGNoICh0aGlzLnN0YXR1cykge1xyXG4gICAgICAgICAgICBjYXNlIFByb2dyZXNzU3RhdGUuRG9uZTpcclxuICAgICAgICAgICAgICAgIHJldHVybiAnc3RhdHVzIHN0YXR1cy1yZXNvbHZlZCc7XHJcbiAgICAgICAgICAgIGNhc2UgUHJvZ3Jlc3NTdGF0ZS5Qcm9ncmVzczpcclxuICAgICAgICAgICAgICAgIHJldHVybiAnc3RhdHVzIHN0YXR1cy1wcm9ncmVzcyc7XHJcbiAgICAgICAgICAgIGNhc2UgUHJvZ3Jlc3NTdGF0ZS5GYWlsOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuICdzdGF0dXMgc3RhdHVzLWZhaWwnO1xyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuICcnO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
