# Kanban Full Stack Experiment

### Objective

Build a simple web application that provides a functional kanban-like implementation and leverages modern stack tools to provide quality assurance and continuous delivery and deployments.

---

### TL;DR

-   deployed app: https://kanban-full-stack-iliggirkha-uw.a.run.app/
-   repository url: https://github.com/hafemeister/kanban-full-stack
-   Front-end: NextJs pages + MUIv5 + BeautifulReactDnd
-   Back-end: NextJs Api layer + FireStore + Cloud Run for hosting Docker containermain
-   Quality Assurance: jest unit tests
-   CICD: testing and deployment via GitActions
-   to stay in line with the cultural sensitivity approach in our community, I kept "main" the default branch. But the assignment asked for a master branch, so I kept a copy just in case: https://github.com/hafemeister/kanban-full-stack/tree/master

---

## Extended Notes

### Goals

-   have fun
-   learn something new (especially excited about using GCP, MUI and diving deeper in my understanding of git actions)
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

#### Oberservations

-   small application, with a small user base
-   may run into offline/online scenarios, hence needs local fallback handling
-   multi-user environment, with general split between user and admin group, needs way to simplify ui for users
-   multi-user approach will require some sort of polling/web-socket approach to ensure users have reasonably up to date data
-   "4-5 boats out in the water at time", max cards for swimlanes should be less than 10, given there are only 8 boats
-   app needs to be simple, and work in large as well as small screens, mobile phone, tablet and desktop design needed
-   status list should be split into swimlane, with boats grouped by each status
-   given the potential for stale data, need to make the refresh process simple and frequent
-   no authentication requirements, hence reducing focus on security, and instead proritize usability
-   Kanban on Portrait screens will be hard to use. Need an alternative approach there

#### Decisions

-   using nextJs to simplify the deployments, as it includes routers for both backend and frontend
-   using cloud-run to host our containers as it is a new product that I want to learn about, and fills all the Docker container requirements of task
-   using github and gitactions as they are free, simple and have best support for open community projects
-   using firestore to persist status and boat data as it is fast, and the relational data complexity is minimal
-   using MUI as our theme library since that will drammatically speed up designs, and is a very well established pattern in the Android world
-   using jest, eslint and typescript as those are pretty solid industry standards that make the code quality checks a lot more sustainable
-   will try to limit times via preliminary plan as my weekend hours are limited and there are plenty of rabbit holes to disappear into
-   going with pre-existing drag-and-drop packages to ensure full mobile touch compatibility and reduce potential for complications in development. react-dnd did not work in trials, hence picking react-beautiful-dnd
-   using insomnia for building of REST request API as it has the best support for environments and substitutions
-   REST API instead of graphql since the complexity is minimal and entity relationships do not warrant complex patterns at this point

#### Assumptions

-   the instructions were not very clear on the extra content of landing page. Hence, I kept it simple, with a single link to the boat statuses, and one more to allow switching between office and field staff group
-   the internet connection will be reliable, hence do not need to implement local-storage syncing, which will reduce the prototype complexity by alot
-   the boat entity contains only a name to be edited, keeping any other ui elements to a minimum
-   as requested, no authentication, which means the main page is the entry point, but as per user story, we only show a link that takes user to statuses page
-   since swimlane editing was not mentioned in the user stories, I kept the ui-aspect of swimlanes to the predefined "Docked, Outbound to Sea, Inbdound to Harbor, Maintenance" IN THE UI. However, the api endpoints are perfectly capable of adding and deleting more swimlanes.
-   to reduce complexity, I went with long-polling via http requests for status updates (instead of full web socket approach), as well as provided a manual refresh button and indicator text to give the user a sense of control over the polled data patterns

#### Timeline

-   Friday - review assignment notes, review existing tools, go over assumptions, observations and nail down development decisions
-   Saturday

    -   [1000-1200] - setup the basic framework, tooling and establish deployment chain to cloud run
    -   [1200-1300] - establish basic list connectivity to firestore via package and swimlane endpoint prototype
    -   [1700-2000] - build out model based class structures to interact with crud requests and firestore

-   Sunday

    -   [1100-1600] - building out the ui elements from mui base, getting stuck on react-18 issues with dnd package, finishing the rest of basic kanban functionality with data loaded from remote
    -   [1600-1800] - wiring up the data layer to ui, troubleshoot deployment snags, going through overall app and checking for obvious bugs
    -   [2000-2300] - solve the responsive kanban lanes problem, build out delete, edit ui and data-layer glue. add auto polling.

-   Monday

    -   [1000-1200] - general code cleanup, add automations for automating quality inspections, write a handful of unit tests
    -   [1200-1400] - troubleshoot the CICD split and upgrade the cloud-run approach to a more modern, concise version
    -   [1700-1800] - general documentation
    -   [1900-2300] - polishing, adding a few last minute improvements, building out some of the more complicated test cases

#### Favorite Results

-   definitely enjoyed taking advantage of the design power and easy that MUI provides! Not being a gifted designer, their tools and options are by far the best I have worked with in a while.
-   although I had not much time to expand them, writing the unit tests for the more complicated aspects (mocking context, abstract classes etc) was actually a lot of fun!
-   having spent a ton of time in AWS recently, I was blown away by the easy and extremely well documented SDK tools for the google cloud platform. It just worked extremely seemless, and if it didn't the docs were very easy to track down and comprehend.
-   Building out the backend resources in REST was a refreshingly nice and simple, especially after having spent the last 6+ months in piles of GraphQL resolvers

#### Learnables

-   ui designs took a lot longer than planned for, as not knowing a libary convention did not help in speeding up the code adjustments
-   testing drag and drop is rather challenging
-   spent too much time on making code capable of being reused, instead of accepting a few more repeats to gain speed
-   spending too much time in feature development forced me to be very skinny on test outputs
-   I enjoyed the actual technical aspect of coding models and api endpoints a lot more than dealing with ui interactions
-   the abstract class approach for models makes sense from a DRY re-use perspective, but makes writing simple unit tests a lot more challenging

#### Nice-to-add wishlist

Things I would have liked to add with more time

-   explore the usage of environment prefixing to split collections from production/localhost overlap
-   I had looked forward to toying with the cypress integration test approach and integrating that with git-actions. But unfortunately time ran out
-   a UI for adding more swimlanes, deleting, reordering would be useful, but would've taken too much time at this point

#### Final reflections:

What a fun build!! In my current position I do not have the luxury of touching all aspects of the full stack anymore on a regular basis.
Hence, taking this opportunity to explore new technologies in a fun weekend project was absolutely worth the extra time spent! =)
