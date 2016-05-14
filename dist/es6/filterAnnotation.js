import { FilterConfig } from './filterConfig';
export function filter(targetOrNameOrConfig, key, descriptor) {
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZpbHRlckFubm90YXRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ik9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxnQkFBZ0I7QUFFM0MsdUJBQXVCLG9CQUFtRCxFQUFFLEdBQVksRUFBRSxVQUFtQjtJQUN6RyxNQUFNLG9CQUFvQixHQUFHLENBQUMsTUFBTSxFQUFFLElBQUksRUFBRSxXQUFXO1FBQ25ELE1BQU0sWUFBWSxHQUFHLElBQUksR0FBRyxNQUFNLENBQUMsV0FBVyxHQUFHLE1BQU0sQ0FBQztRQUN4RCxNQUFNLE1BQU0sR0FBRztZQUNYLE1BQU0sRUFBRSxJQUFJO1lBQ1osWUFBWSxFQUFFLFNBQVM7WUFDdkIsVUFBVSxFQUFFLFNBQVM7WUFDckIsV0FBVyxFQUFFLEtBQUs7WUFDbEIsZUFBZSxFQUFFLEtBQUs7WUFDdEIsYUFBYSxFQUFFLElBQUk7WUFDbkIsU0FBUyxFQUFFLEtBQUs7WUFDaEIsWUFBWSxFQUFFLElBQUk7WUFDbEIsV0FBVyxFQUFFLFNBQVM7WUFDdEIsZUFBZSxFQUFFLFNBQVM7U0FDWixDQUFDO1FBRW5CLEVBQUUsQ0FBQyxDQUFDLE9BQU8sb0JBQW9CLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQztZQUMzQyxNQUFNLENBQUMsYUFBYSxHQUFHLG9CQUFvQixDQUFDO1FBQ2hELENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNKLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLG9CQUFvQixDQUFDLENBQUM7UUFDaEQsQ0FBQztRQUNELE1BQU0sQ0FBQyxJQUFJLFlBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQyxRQUFRLENBQUMsWUFBWSxFQUFFLFdBQVcsQ0FBQyxDQUFDO0lBQ3hFLENBQUMsQ0FBQztJQUVGLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDTixNQUFNLFVBQVUsR0FBRyxvQkFBb0IsQ0FBQztRQUN4QyxvQkFBb0IsR0FBRyxJQUFJLENBQUM7UUFDNUIsTUFBTSxDQUFDLG9CQUFvQixDQUFDLFVBQVUsRUFBRSxHQUFHLEVBQUUsVUFBVSxDQUFDLENBQUM7SUFDN0QsQ0FBQztJQUNELE1BQU0sQ0FBQyxvQkFBb0IsQ0FBQztBQUNoQyxDQUFDIiwiZmlsZSI6ImZpbHRlckFubm90YXRpb24uanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0ZpbHRlckNvbmZpZ30gZnJvbSAnLi9maWx0ZXJDb25maWcnO1xyXG5pbXBvcnQge0lGaWx0ZXJDb25maWd9IGZyb20gJy4vY29udHJhY3RzL0lGaWx0ZXJDb25maWcnO1xyXG5leHBvcnQgZnVuY3Rpb24gZmlsdGVyKHRhcmdldE9yTmFtZU9yQ29uZmlnPzogc3RyaW5nIHwgSUZpbHRlckNvbmZpZyB8IGFueSwga2V5Pzogc3RyaW5nLCBkZXNjcmlwdG9yPzogT2JqZWN0KTogYW55IHtcclxuICAgIGNvbnN0IGNvbmZpZ3VyYWJsZURlY29yYXRlID0gKHRhcmdldCwga2V5MiwgZGVzY3JpcHRvcjIpID0+IHtcclxuICAgICAgICBjb25zdCBhY3R1YWxUYXJnZXQgPSBrZXkyID8gdGFyZ2V0LmNvbnN0cnVjdG9yIDogdGFyZ2V0O1xyXG4gICAgICAgIGNvbnN0IGNvbmZpZyA9IHtcclxuICAgICAgICAgICAgY29lcmNlOiB0cnVlLFxyXG4gICAgICAgICAgICBkZWZhdWx0VmFsdWU6IHVuZGVmaW5lZCxcclxuICAgICAgICAgICAgZGVzY3JpcHRvcjogdW5kZWZpbmVkLFxyXG4gICAgICAgICAgICBlbXB0eUlzTnVsbDogZmFsc2UsXHJcbiAgICAgICAgICAgIGlnbm9yZU9uQXV0b01hcDogZmFsc2UsXHJcbiAgICAgICAgICAgIHBhcmFtZXRlck5hbWU6IGtleTIsXHJcbiAgICAgICAgICAgIHBlcnNpc3RlZDogZmFsc2UsXHJcbiAgICAgICAgICAgIHByb3BlcnR5TmFtZToga2V5MixcclxuICAgICAgICAgICAgdmFsdWVQYXJzZXI6IHVuZGVmaW5lZCxcclxuICAgICAgICAgICAgdmFsdWVTZXJpYWxpemVyOiB1bmRlZmluZWRcclxuICAgICAgICB9IGFzIElGaWx0ZXJDb25maWc7XHJcblxyXG4gICAgICAgIGlmICh0eXBlb2YgdGFyZ2V0T3JOYW1lT3JDb25maWcgPT09ICdzdHJpbmcnKSB7XHJcbiAgICAgICAgICAgIGNvbmZpZy5wYXJhbWV0ZXJOYW1lID0gdGFyZ2V0T3JOYW1lT3JDb25maWc7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgT2JqZWN0LmFzc2lnbihjb25maWcsIHRhcmdldE9yTmFtZU9yQ29uZmlnKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG5ldyBGaWx0ZXJDb25maWcoY29uZmlnKS5yZWdpc3RlcihhY3R1YWxUYXJnZXQsIGRlc2NyaXB0b3IyKTtcclxuICAgIH07XHJcblxyXG4gICAgaWYgKGtleSkge1xyXG4gICAgICAgIGNvbnN0IHRhcmdldFRlbXAgPSB0YXJnZXRPck5hbWVPckNvbmZpZztcclxuICAgICAgICB0YXJnZXRPck5hbWVPckNvbmZpZyA9IG51bGw7XHJcbiAgICAgICAgcmV0dXJuIGNvbmZpZ3VyYWJsZURlY29yYXRlKHRhcmdldFRlbXAsIGtleSwgZGVzY3JpcHRvcik7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gY29uZmlndXJhYmxlRGVjb3JhdGU7XHJcbn1cclxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
