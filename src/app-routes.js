import { HomePage,PurchaseInward, InwardInspection } from './pages';
import { withNavigationWatcher } from './contexts/navigation';

const routes = [
    {
        path: '/PurchaseInward',
        element: PurchaseInward
    },
    {
        path: '/InwardInspection',
        element: InwardInspection
    },
    {
        path: '/home',
        element: HomePage
    },
];

export default routes.map(route => {
    return {
        ...route,
        element: withNavigationWatcher(route.element, route.path)
    };
});
