# INFO 490/491 Capstone Project
## Support UW
### Meet the team:
- Madeline Wake - Front-End Software Developer
- Vera Guber - UI/UX Designer / Front-End Software Developer
- Emily Olshan- Data Scientist / Database Developer
- Grace Remendowski - Data Scientist / Front-End Software Developer
- Ella Uchtmann - UI/UX Designer

### Problem Statement:
How might students with disabilities find a community and resources comfortably
so that they can succeed within higher education and beyond school?

### Problem Background:
#### Context:
The current DRS website doesn't have a way for students with DRS accommodations to build their community and to discover beneficial resources. Beyond getting established accommodations, DRS does not have the means to support students further, as the quantity of students who have disabilities exceeds the resources accessible through DRS directly. Students often question how to approach speaking about their accommodations with professors, what certain accommodations do or don’t do, where they might seek out additional resources, and where to find other people who are seeking connections and a community. Students who need, but do not receive this additional assistance can struggle within not only their professional and educational lives, but their personal lives as well.
#### Information Problem:
The problem regarding not having a current community building resource can be solved through a web application that is potentially an extension of the DRS website, and offers a means of finding communities of like minded people. The issue of readily available resources can be solved by providing more resources to students in our solution, and making this section easily accessible. To assist students with disabilities with navigating high education - beyond having accommodations - we can provide resources like “frequently asked questions,” or “how-to” aids to people students navigating the impacts of having accommodations.
##### References (Evidence of the Problem):
- Ontario Human Rights Commission. (n.d.). Main barriers to education for students with disabilities (fact sheet). Main barriers to education for students with disabilities (fact sheet) | Ontario Human Rights Commission. https://www.ohrc.on.ca/en/main-barriers-education-students-disabilities-fact-sheet
    - Lists some of the most prevalent issues that that students with disabilities face within the education system. Most prominently, it mentioned the accommodation process and negative attitudes and stereotypes as issues faced.

- Fernández-Batanero, J. M., Montenegro-Rueda, M., & Fernández-Cerero, J. (2022). Access and Participation of Students with Disabilities: The Challenge for Higher Education. International journal of environmental research and public health, 19(19), 11918. https://doi.org/10.3390/ijerph191911918
    - Discusses the challenges that students with disabilities face in accessing higher education

- Minotti BJ, Ingram KM, Forber-Pratt AJ, Espelage DL. Disability community and mental health among college students with physical disabilities. Rehabil Psychol. 2021 May;66(2):192-201. doi: 10.1037/rep0000377. Epub 2021 Feb 4. PMID: 33539137. https://pubmed.ncbi.nlm.nih.gov/33539137/ 
    - (can access with uw affiliation) A study done on how much social support college students with physical disabilities feel they have when living in communities with similar people.

### Handoff Documents
#### Relevant Links
- Presentation Deck: [https://docs.google.com/presentation/d/1u1dfp3nuZWGeDISLPahzQc7ICJdFZodPY9j8Uz1hF9g/edit?usp=sharing](https://docs.google.com/presentation/d/1u1dfp3nuZWGeDISLPahzQc7ICJdFZodPY9j8Uz1hF9g/edit?usp=sharing)
- Final Product: [https://informatics-capstone-reach.web.app](https://informatics-capstone-reach.web.app)

#### Current Architecture and Tech Stack
- Design
    - In order to design the application, Figma was used to create numerous prototypes, wireframes, and components that were then translated to code.
- Development
    - Front-end:
        - The front-end of the application makes use of React. The codebase follows a “standard” React structure, in that is breaks up the code into components. In this case, each page is made its only js and css files. Components that are repeated among multiple pages (in this case, the Navigation bar and the Footer are also isolated in their own files) to reduce redundancy and allow for uniform changes across all pages that the component is present. Within each page, components are further broken down into parts of the page and provided their own function - improving readability. React-bootstrap is used to aid in the development of more complicated components (i.e. the carousel feature on the home page). Nested classnames are used in order to improve readability of the css files.
    - Back-end:
        - The back-end of the application utilizes Firebase for database and authentication purposes. The application uses
         Firestore to implement a database that stores user info, forum posts, and replies and then allows for the retrieval
         of this information, so it can be displayed on the front-end. Firebase authentication is also utilized to allow for 
         Google email sign-in. Since Firebase is a Backend-as-a-Service that is a part of Google, it is reliable and was chosen due to its ability to be scaled up and securely deliver data.

#### Running/Setting-up Codebase
In order to run the codebase, npm install command is necessary to install relevant dependencies in order to run the application. All the current dependencies can be viewed in the package.json file in the repository. In order to run the application locally on your system, use npm run start.
- Firebase specifics:
    - only use cloud firestore and hosting, no google analytics used
        - in firebase init
            - Proceed? Y
            - set up cloud firestore
            - firestore.rules
            - firestore.indexes.json
            - Public
            - rewrite urls to /index.html? Y
            - automatic builds and deploys to Github? N
            - overwrite public/index.html? N
        - make sure react-firebase-hooks are installed: npm install react-firebase-hooks
        - before deploying run: npm run build
        - when deploying run: firebase deploy --only hosting
            - firebase deploy will reset the read/write rules unless you specify only hosting
    - Babel dependency issue fix: npm install --save-dev @babel/plugin-proposal-private-property-in-object
    - in firebase.json: make sure "public": "build" is correct in hosting (not "public": "public")

#### "What to work on" and Future Ideas and Intentions for REACH
The following ideas are intended to be used an inspiration for future development of REACH. If our team had more time, these would be things we would do to continue working on the project!
Future Functionality Ideas
1. Accessibility Settings
    - Accessible through the profile (if a user has an account) a user would be able to alter the styling of the website to their preference and could improve accessibility. Things that we would allow the user to change include (but are not limited to), Light mode versus dark mode, font size, font type, etc). We would do this by allow the user to “save” settings that would then be saved within a secure user database. Once the user logs in, those settings would be checked on initial render, and the necessary changes would be made to the users application.
2. "AI Robot"/Interactive Chat
    - This feature would be accessible anywhere within the website (a fixed position somewhere on the screen). The intention for this would be to guide the users to the necessary information or resourced based on their inputs provided. An example of this would be the chat that pops up upon loading https://jobs.thermofisher.com/global/en. This feature would allow users to interact with the application and get more streamlined assistance.
3. Searchable How-To Page
    - Including a search bar that users can utilize to find questions they are looking for would streamline the process and allow users to easily check if their question is present. We would do this by including an input feature in the page, tracking the value the user enters and then filtering the question cards based on the input.
4. Resource/Question Submission Form
    - This feature would be a form or submission of some kind, that allow users to either propose a resource that may be good to include on the Resources page or allows users to propose a question they believe should be answered and posted on the administration-controlled how-to page. By submitting a request/form, the request would be sent to administration (us, as the developers) for review. Further ideas about this topic involve automating the process of reviewing the resource or question for credibility and automatically adding it to the internal datasets that are used to generate the resource lists and the how-to page questions and answers. However, this raises concerns regarding the validity of the answers and information that the AI generates regarding the submission.
