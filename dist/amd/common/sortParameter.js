define(["require", "exports", './sortDirection'], function (require, exports, sortDirection_1) {
    "use strict";
    var SortParameter = (function () {
        function SortParameter(fieldName, direction) {
            if (direction === void 0) { direction = sortDirection_1.SortDirection.Asc; }
            this.fieldName = null;
            this.fieldName = fieldName;
            this.direction = direction === undefined ? sortDirection_1.SortDirection.Asc : direction;
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbW1vbi9zb3J0UGFyYW1ldGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0lBQ0E7UUFDSSx1QkFBWSxTQUFpQixFQUFFLFNBQTRDO1lBQTVDLHlCQUE0QyxHQUE1QyxZQUEyQiw2QkFBYSxDQUFDLEdBQUc7WUFLM0UsY0FBUyxHQUFXLElBQUksQ0FBQztZQUpyQixJQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztZQUMzQixJQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsS0FBSyxTQUFTLEdBQUcsNkJBQWEsQ0FBQyxHQUFHLEdBQUcsU0FBUyxDQUFDO1FBQzdFLENBQUM7UUFHRCx1Q0FBZSxHQUFmO1lBQ0ksSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsU0FBUyxLQUFLLDZCQUFhLENBQUMsR0FBRyxHQUFHLDZCQUFhLENBQUMsSUFBSSxHQUFHLDZCQUFhLENBQUMsR0FBRyxDQUFDO1FBQ25HLENBQUM7UUFFRCxpQ0FBUyxHQUFUO1lBQ0ksTUFBTSxDQUFDLEVBQUUsU0FBUyxFQUFFLElBQUksQ0FBQyxTQUFTLEVBQUUsU0FBUyxFQUFFLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUNwRSxDQUFDO1FBQ0wsb0JBQUM7SUFBRCxDQWRBLEFBY0MsSUFBQTtJQWRZLHFCQUFhLGdCQWN6QixDQUFBIiwiZmlsZSI6ImNvbW1vbi9zb3J0UGFyYW1ldGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtTb3J0RGlyZWN0aW9ufSBmcm9tICcuL3NvcnREaXJlY3Rpb24nO1xyXG5leHBvcnQgY2xhc3MgU29ydFBhcmFtZXRlciB7XHJcbiAgICBjb25zdHJ1Y3RvcihmaWVsZE5hbWU6IHN0cmluZywgZGlyZWN0aW9uOiBTb3J0RGlyZWN0aW9uID0gU29ydERpcmVjdGlvbi5Bc2MpIHtcclxuICAgICAgICB0aGlzLmZpZWxkTmFtZSA9IGZpZWxkTmFtZTtcclxuICAgICAgICB0aGlzLmRpcmVjdGlvbiA9IGRpcmVjdGlvbiA9PT0gdW5kZWZpbmVkID8gU29ydERpcmVjdGlvbi5Bc2MgOiBkaXJlY3Rpb247XHJcbiAgICB9XHJcbiAgICBkaXJlY3Rpb246IFNvcnREaXJlY3Rpb247XHJcbiAgICBmaWVsZE5hbWU6IHN0cmluZyA9IG51bGw7XHJcbiAgICB0b2dnbGVEaXJlY3Rpb24oKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5kaXJlY3Rpb24gPSB0aGlzLmRpcmVjdGlvbiA9PT0gU29ydERpcmVjdGlvbi5Bc2MgPyBTb3J0RGlyZWN0aW9uLkRlc2MgOiBTb3J0RGlyZWN0aW9uLkFzYztcclxuICAgIH1cclxuXHJcbiAgICB0b1JlcXVlc3QoKTogT2JqZWN0IHtcclxuICAgICAgICByZXR1cm4geyBkaXJlY3Rpb246IHRoaXMuZGlyZWN0aW9uLCBmaWVsZE5hbWU6IHRoaXMuZmllbGROYW1lIH07XHJcbiAgICB9XHJcbn1cclxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
