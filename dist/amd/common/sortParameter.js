define(["require", "exports", './sortDirection'], function (require, exports, sortDirection_1) {
    "use strict";
    var SortParameter = (function () {
        function SortParameter(fieldName, direction) {
            if (direction === void 0) { direction = sortDirection_1.SortDirection.Asc; }
            this.fieldName = null;
            this.fieldName = fieldName;
            this.direction = direction;
        }
        SortParameter.prototype.toggleDirection = function () {
            this.direction = this.direction === sortDirection_1.SortDirection.Asc ? sortDirection_1.SortDirection.Desc : sortDirection_1.SortDirection.Asc;
        };
        SortParameter.prototype.toRequest = function () {
            return { direction: this.direction, fieldName: this.fieldName };
        };
        return SortParameter;
    }());
    exports.SortParameter = SortParameter;
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbW1vbi9zb3J0UGFyYW1ldGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0lBQ0E7UUFDSSx1QkFBWSxTQUFpQixFQUFFLFNBQTRDO1lBQTVDLHlCQUE0QyxHQUE1QyxZQUEyQiw2QkFBYSxDQUFDLEdBQUc7WUFLM0UsY0FBUyxHQUFXLElBQUksQ0FBQztZQUpyQixJQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztZQUMzQixJQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztRQUMvQixDQUFDO1FBR0QsdUNBQWUsR0FBZjtZQUNJLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLFNBQVMsS0FBSyw2QkFBYSxDQUFDLEdBQUcsR0FBRyw2QkFBYSxDQUFDLElBQUksR0FBRyw2QkFBYSxDQUFDLEdBQUcsQ0FBQztRQUNuRyxDQUFDO1FBRUQsaUNBQVMsR0FBVDtZQUNJLE1BQU0sQ0FBQyxFQUFFLFNBQVMsRUFBRSxJQUFJLENBQUMsU0FBUyxFQUFFLFNBQVMsRUFBRSxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDcEUsQ0FBQztRQUNMLG9CQUFDO0lBQUQsQ0FkQSxBQWNDLElBQUE7SUFkWSxxQkFBYSxnQkFjekIsQ0FBQSIsImZpbGUiOiJjb21tb24vc29ydFBhcmFtZXRlci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7U29ydERpcmVjdGlvbn0gZnJvbSAnLi9zb3J0RGlyZWN0aW9uJztcclxuZXhwb3J0IGNsYXNzIFNvcnRQYXJhbWV0ZXIge1xyXG4gICAgY29uc3RydWN0b3IoZmllbGROYW1lOiBzdHJpbmcsIGRpcmVjdGlvbjogU29ydERpcmVjdGlvbiA9IFNvcnREaXJlY3Rpb24uQXNjKSB7XHJcbiAgICAgICAgdGhpcy5maWVsZE5hbWUgPSBmaWVsZE5hbWU7XHJcbiAgICAgICAgdGhpcy5kaXJlY3Rpb24gPSBkaXJlY3Rpb247XHJcbiAgICB9XHJcbiAgICBkaXJlY3Rpb246IFNvcnREaXJlY3Rpb247XHJcbiAgICBmaWVsZE5hbWU6IHN0cmluZyA9IG51bGw7XHJcbiAgICB0b2dnbGVEaXJlY3Rpb24oKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5kaXJlY3Rpb24gPSB0aGlzLmRpcmVjdGlvbiA9PT0gU29ydERpcmVjdGlvbi5Bc2MgPyBTb3J0RGlyZWN0aW9uLkRlc2MgOiBTb3J0RGlyZWN0aW9uLkFzYztcclxuICAgIH1cclxuXHJcbiAgICB0b1JlcXVlc3QoKTogT2JqZWN0IHtcclxuICAgICAgICByZXR1cm4geyBkaXJlY3Rpb246IHRoaXMuZGlyZWN0aW9uLCBmaWVsZE5hbWU6IHRoaXMuZmllbGROYW1lIH07XHJcbiAgICB9XHJcbn1cclxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
