import { DesignScreenComponent } from "./design-screen.component"
import { DataModelManagerComponent } from "../data-model-manager/data-model-manager.component"
import { CreateViewComponent } from "./create-view/create-view.component"
import { AuthGuard } from "../auth-service"
import { Utilities } from "../Utilities"

export class DesignScreenAppRoutes
{
  static routes = {
    path: 'project/:platform/design-screen',
    component: DesignScreenComponent,
    children: [
      {
        path: 'data-model-manager',
        component: DataModelManagerComponent,
        canActivate: [AuthGuard]
      }
      ,
      {
        path: 'view-manager',
        component: CreateViewComponent,
        canActivate: [AuthGuard]
      }
    ],
    canActivate: [AuthGuard]
  }
}
