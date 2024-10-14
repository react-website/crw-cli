import { createBrowserRouter } from '@/helper'
import routes, { appRoute } from '@/routers/routes'

export const getAppRoute = () => appRoute
export default () => createBrowserRouter(routes)
