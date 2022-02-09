import {Component, OnInit} from '@angular/core';
import {ProjectType} from "../../domain/model/Project";

interface ProjectCard {
  "route": string
  "type": string,
  "img": string,
  "text": string
}

@Component({
  selector: 'app-new-project-page',
  templateUrl: './new-project-page.component.html',
  styleUrls: ['./new-project-page.component.scss']
})
export class NewProjectPageComponent implements OnInit {
  projectCards: ProjectCard[] = []

  constructor() {
  }

  ngOnInit(): void {
    this.projectCards.push(
      {
        route: "/colocation/new",
        type: ProjectType[ProjectType.Colocation],
        img: "https://www.orientation.com/articles/wp-content/uploads/2020/11/garant-en-colocation.jpeg",
        text: "La colocation est un projet avec un bon rendement, mais qui nécessite des biens de grande surface. " +
          "Les personnes ciblées sont les étudiants ou jeunes actifs."
      }, {
        route: "/lcd/new",
        type: ProjectType[ProjectType.LCD],
        img: "https://demarchesadministratives.fr/images/actualites/3473/paris-airbnb.jpg",
        text: "Les logements type 'Airbnb' sont flexibles et permettent de récupérer facilement le bien en cas de litige." +
          " La rentabilité est correcte et les personnes ciblées sont en général les touristes et travailleurs en déplacement d'affaire"
      },
    )
  }

}
