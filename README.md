# Kanban Full Stack Experiment

### Objective

Build a simple web application that provides a functional kanban-like implementation and leverages modern stack tools to provide quality assurance and continuous delivery and deployments.

---

### TL;DR

-   deployed app: https://kanban-full-stack-iliggirkha-uw.a.run.app/
-   repository url: https://github.com/hafemeister/kanban-full-stack
-   Front-end: NextJs pages + MUIv5 + ReactDnd
-   Back-end: NextJs Api layer + FireStore + Cloud Run for hosting Docker container
-   Quality Assurance: jest unit tests
-   CICD: testing and deployment via GitActions

---

## Extended Notes

### Goals

-   have fun
-   learn something new
-   complete the technical challenge requirements

### Preliminary Plan

-   Friday - scope out tools box, existing designs for mobile kanban, any interesting new tech i would like to learn about
-   Saturday
    -   [2 hours] - setup CICD pipeline
    -   [3 hours] - establish backend and persistant storage layer
-   Sunday
    -   [3 hours] - build out simple ui prototype
    -   [3 hours] - expand baseline unit tests, integrate them into pipeline
    -   [2 hours] - explore edge cases, fix bugs
    -   [2 hours] - document results, lessons learned, future improvement suggestions

#### Timeline

-   Friday - review assignment notes, review existing tools
-   Saturday
    -   [1000-1200] - setup the basic framework, tooling and establish deployment chain to cloud run
    -   [1200-1300] - establish basic list connectivity to firestore via package and swimlane endpoint prototype
    -   [1700-2000] - build out model based class structures to interact with crud requests and firestore
-   Sunday
    -   [1100-1600] - building out the ui elements from mui base, getting stuck on react-18 issues with dnd package, finishing the rest of basic kanban functionality with data loaded from remote
    -   [1600-1800] - wiring up the data layer to ui, troubleshoot deployment snags, going through overall app and checking for obvious bugs
    -   [2000-2300] - solve the responsive kanban lanes problem, build out delete, edit ui and data-layer glue. add auto polling.

#### Follow up to-dos

-   make model load generic
-   figure out if writeAttribute guards are actually needed

-   document
-   add tests
-   feat: hook up context values for switching between operator and
-   feat: finish environment prefix for collection names
-   feat: add minimum of 6 valuable tests for test coverage
-   feat: enable auto refresh
