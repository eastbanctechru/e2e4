import { FilterConfig } from './filterConfig';
/* tslint:disable:no-any */
export function filter(targetOrNameOrConfig, key, descriptor) {
    /* tslint:enable:no-any */
    const configurableDecorate = (target, key2, descriptor2) => {
        const actualTarget = key2 ? target.constructor : target;
        const config = {
            coerce: true,
            defaultValue: undefined,
            descriptor: undefined,
            emptyIsNull: false,
            ignoreOnAutoMap: false,
            parameterName: key2,
            persisted: false,
            propertyName: key2,
            valueParser: undefined,
            valueSerializer: undefined
        };
        if (typeof targetOrNameOrConfig === 'string') {
            config.parameterName = targetOrNameOrConfig;
        }
        else {
            Object.assign(config, targetOrNameOrConfig);
        }
        return new FilterConfig(config).register(actualTarget, descriptor2);
    };
    if (key) {
        const targetTemp = targetOrNameOrConfig;
        targetOrNameOrConfig = null;
        return configurableDecorate(targetTemp, key, descriptor);
    }
    return configurableDecorate;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZpbHRlckFubm90YXRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ik9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxnQkFBZ0I7QUFFM0MsMkJBQTJCO0FBQzNCLHVCQUF1QixvQkFBbUQsRUFBRSxHQUFZLEVBQUUsVUFBbUI7SUFDN0csMEJBQTBCO0lBQ3RCLE1BQU0sb0JBQW9CLEdBQUcsQ0FBQyxNQUFNLEVBQUUsSUFBSSxFQUFFLFdBQVc7UUFDbkQsTUFBTSxZQUFZLEdBQUcsSUFBSSxHQUFHLE1BQU0sQ0FBQyxXQUFXLEdBQUcsTUFBTSxDQUFDO1FBQ3hELE1BQU0sTUFBTSxHQUFHO1lBQ1gsTUFBTSxFQUFFLElBQUk7WUFDWixZQUFZLEVBQUUsU0FBUztZQUN2QixVQUFVLEVBQUUsU0FBUztZQUNyQixXQUFXLEVBQUUsS0FBSztZQUNsQixlQUFlLEVBQUUsS0FBSztZQUN0QixhQUFhLEVBQUUsSUFBSTtZQUNuQixTQUFTLEVBQUUsS0FBSztZQUNoQixZQUFZLEVBQUUsSUFBSTtZQUNsQixXQUFXLEVBQUUsU0FBUztZQUN0QixlQUFlLEVBQUUsU0FBUztTQUNaLENBQUM7UUFFbkIsRUFBRSxDQUFDLENBQUMsT0FBTyxvQkFBb0IsS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDO1lBQzNDLE1BQU0sQ0FBQyxhQUFhLEdBQUcsb0JBQW9CLENBQUM7UUFDaEQsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ0osTUFBTSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsb0JBQW9CLENBQUMsQ0FBQztRQUNoRCxDQUFDO1FBQ0QsTUFBTSxDQUFDLElBQUksWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDLFFBQVEsQ0FBQyxZQUFZLEVBQUUsV0FBVyxDQUFDLENBQUM7SUFDeEUsQ0FBQyxDQUFDO0lBRUYsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUNOLE1BQU0sVUFBVSxHQUFHLG9CQUFvQixDQUFDO1FBQ3hDLG9CQUFvQixHQUFHLElBQUksQ0FBQztRQUM1QixNQUFNLENBQUMsb0JBQW9CLENBQUMsVUFBVSxFQUFFLEdBQUcsRUFBRSxVQUFVLENBQUMsQ0FBQztJQUM3RCxDQUFDO0lBQ0QsTUFBTSxDQUFDLG9CQUFvQixDQUFDO0FBQ2hDLENBQUMiLCJmaWxlIjoiZmlsdGVyQW5ub3RhdGlvbi5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7RmlsdGVyQ29uZmlnfSBmcm9tICcuL2ZpbHRlckNvbmZpZyc7XHJcbmltcG9ydCB7SUZpbHRlckNvbmZpZ30gZnJvbSAnLi9jb250cmFjdHMvSUZpbHRlckNvbmZpZyc7XHJcbi8qIHRzbGludDpkaXNhYmxlOm5vLWFueSAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZmlsdGVyKHRhcmdldE9yTmFtZU9yQ29uZmlnPzogc3RyaW5nIHwgSUZpbHRlckNvbmZpZyB8IGFueSwga2V5Pzogc3RyaW5nLCBkZXNjcmlwdG9yPzogT2JqZWN0KTogYW55IHtcclxuLyogdHNsaW50OmVuYWJsZTpuby1hbnkgKi9cclxuICAgIGNvbnN0IGNvbmZpZ3VyYWJsZURlY29yYXRlID0gKHRhcmdldCwga2V5MiwgZGVzY3JpcHRvcjIpID0+IHtcclxuICAgICAgICBjb25zdCBhY3R1YWxUYXJnZXQgPSBrZXkyID8gdGFyZ2V0LmNvbnN0cnVjdG9yIDogdGFyZ2V0O1xyXG4gICAgICAgIGNvbnN0IGNvbmZpZyA9IHtcclxuICAgICAgICAgICAgY29lcmNlOiB0cnVlLFxyXG4gICAgICAgICAgICBkZWZhdWx0VmFsdWU6IHVuZGVmaW5lZCxcclxuICAgICAgICAgICAgZGVzY3JpcHRvcjogdW5kZWZpbmVkLFxyXG4gICAgICAgICAgICBlbXB0eUlzTnVsbDogZmFsc2UsXHJcbiAgICAgICAgICAgIGlnbm9yZU9uQXV0b01hcDogZmFsc2UsXHJcbiAgICAgICAgICAgIHBhcmFtZXRlck5hbWU6IGtleTIsXHJcbiAgICAgICAgICAgIHBlcnNpc3RlZDogZmFsc2UsXHJcbiAgICAgICAgICAgIHByb3BlcnR5TmFtZToga2V5MixcclxuICAgICAgICAgICAgdmFsdWVQYXJzZXI6IHVuZGVmaW5lZCxcclxuICAgICAgICAgICAgdmFsdWVTZXJpYWxpemVyOiB1bmRlZmluZWRcclxuICAgICAgICB9IGFzIElGaWx0ZXJDb25maWc7XHJcblxyXG4gICAgICAgIGlmICh0eXBlb2YgdGFyZ2V0T3JOYW1lT3JDb25maWcgPT09ICdzdHJpbmcnKSB7XHJcbiAgICAgICAgICAgIGNvbmZpZy5wYXJhbWV0ZXJOYW1lID0gdGFyZ2V0T3JOYW1lT3JDb25maWc7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgT2JqZWN0LmFzc2lnbihjb25maWcsIHRhcmdldE9yTmFtZU9yQ29uZmlnKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG5ldyBGaWx0ZXJDb25maWcoY29uZmlnKS5yZWdpc3RlcihhY3R1YWxUYXJnZXQsIGRlc2NyaXB0b3IyKTtcclxuICAgIH07XHJcblxyXG4gICAgaWYgKGtleSkge1xyXG4gICAgICAgIGNvbnN0IHRhcmdldFRlbXAgPSB0YXJnZXRPck5hbWVPckNvbmZpZztcclxuICAgICAgICB0YXJnZXRPck5hbWVPckNvbmZpZyA9IG51bGw7XHJcbiAgICAgICAgcmV0dXJuIGNvbmZpZ3VyYWJsZURlY29yYXRlKHRhcmdldFRlbXAsIGtleSwgZGVzY3JpcHRvcik7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gY29uZmlndXJhYmxlRGVjb3JhdGU7XHJcbn1cclxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
