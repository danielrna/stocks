import {Component} from '@angular/core';
import {ProjectType} from "../../../../domain/model/Project";

@Component({
  selector: 'app-colocation-project',
  templateUrl: './colocation-project-form.component.html',
  styleUrls: ['./colocation-project-form.component.scss']
})
export class ColocationProjectFormComponent {
  coloc: ProjectType = ProjectType.COLOC;

}
