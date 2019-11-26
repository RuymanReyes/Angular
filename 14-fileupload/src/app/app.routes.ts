import { RouterModule, Routes } from "@angular/router";
import { FotosComponent } from "./components/fotos/fotos.component";
import { CargaComponent } from "./components/carga/carga.component";
import { RouterTestingModule } from "@angular/router/testing";

const RUTAS: Routes = [
  { path: "fotos", component: FotosComponent },
  { path: "carga", component: CargaComponent },
  { path: "**", pathMatch: "full", redirectTo: "fotos" }
];

export const APP_ROUTES = RouterModule.forRoot(RUTAS);
