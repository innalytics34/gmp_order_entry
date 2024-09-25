import { HomePage,OrderEntryList } from './pages';
import { withNavigationWatcher } from './contexts/navigation';

const routes = [
    {
        path: '/OrderEntryList',
        element: OrderEntryList
    },
];

export default routes.map(route => {
    return {
        ...route,
        element: withNavigationWatcher(route.element, route.path)
    };
});
