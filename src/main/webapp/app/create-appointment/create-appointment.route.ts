import { Route } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { CreateAppointmentComponent } from './create-appointment.component';

export const CREATE_APPOINTMENT_ROUTE: Route = {
  path: 'create-appointment',
  component: CreateAppointmentComponent,
  data: {
    authorities: [],
    pageTitle: 'create-appointment.title'
  },
  canActivate: [UserRouteAccessService]
};
