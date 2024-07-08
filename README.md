# QuickEncounter

## Overview

QuickEncounter is a web app designed for Dungeon Masters (DMs) to swiftly create challenging encounters by inputting party details and selecting monsters. This addresses the time-consuming nature of encounter preparation in tabletop role-playing games. The app focuses on calculating the correct difficulty for the party and allows for customization with the monster encounter selection.

### Problem

DMs need this app because prepping encounters can take hours. Existing apps often fall short by not providing an efficient way to match encounters to the party’s strength, making encounters either too easy or too difficult. QuickEncounter addresses these issues by offering a quick and efficient way to create diverse and challenging encounters, including the ability to select level appropriate suggested monster.

### User Profile

Both new and experienced DMs will use QuickEncounter. New DMs will get the help they need to create level-appropriate encounters, while experienced DMs can use it to quickly create encounters on the fly, making their campaigns feel more dynamic.

- **New DMs**: To create balanced and level-appropriate encounters with ease, reducing prep time and ensuring an enjoyable experience for their players.
- **Experienced DMs**: To quickly generate encounters during gameplay, keeping the campaign engaging and varied.

### Features

- **Party Information Input**: DMs can input the number of party members and their levels.
- **Encounter Generation**: Automatically generate a list of appropriately challenging monsters based on party information.
- **Monster Selection**: DMs can select level appropriate monsters from generated lists.

## Implementation

### Tech Stack

- **Frontend**: React for web application development.
- **Backend**: Node.js with Express.js for server-side logic.
- **Traditional API Calls**: For data fetching and operations.
- **APIs**:
  - [D&D 5e API](https://www.dnd5eapi.co/)
  - [Open5e API](https://api.open5e.com/)
  - [Magic The Gathering API](https://api.magicthegathering.io)

### APIs

- **Monster Data from APIs**: Initial monster data, including base stats, descriptions, and images, will be pulled from external APIs such as the D&D 5e API and Open5e API.

### Sitemap

The app will be a single-page application (SPA) with the following flow:

1.  **Party Composition Input**: DMs can input the party member names and their levels.
2.  **Encounter Type Selection**: DMs can select a starting encounter type based on party composition (Boss & Minions, Swarm, One Monster).
3.  **Monsters Suggestion**: Randomly suggest monsters to create the encounter.
4.  **Monster List and Stat Blocks**: Display a list of selected monsters and their stat blocks once the appropriate challenge rating is met for in-game use.

### Data

#### Monster Data from APIs

- **Description**: Initial monster data, including base stats and descriptions, will be pulled from external APIs such as the D&D 5e API and Open5e API.
- **Usage**: This data will populate the app's monster selection and initial stats display for users.

### Endpoints

- **GET /api/monsters**

  - **Parameters**: none
  - **Response**: List of available monsters with initial stats from APIs.

- **PUT /api/monsters/{monsterId}/level**

  - **Parameters**: monster ID, new level
  - **Response**: Updated monster stats based on MySQL data.

### Endpoints

- **GET /api/monsters**

**Parameters**: none
**Response**: JSON array of monster objects.

- **POST /api/monsters/individual**

**Parameters**: JSON body with monsterId.
**Response**: JSON object of the individual monster's details.

- **POST /api/monsters/image**

**Parameters**: JSON body with monsterId.
**Response**: JSON object with the image URL.

**POST /api/monsters/filtered**

**Parameters**: JSON body with cr value.
**Response**: JSON array of monster objects that match the given CR.

### Auth

Authentication features, including user registration and login, are being deferred from core functionality in the initial sprints. This feature will be prioritized for implementation in later phases of development.

## Roadmap

#### Sprint 1: Setup and Core Features

- Set up development environment.
- Implement basic app structure and navigation.
- Develop party information input and encounter generation functionalities.

#### Sprint 2: Monster Management and Enhancement

- Integrate monster selectionfeatures.
- Implement API integration for initial monster data retrieval.

## Nice-to-haves

- **User Registration**: Implement user registration and authentication to personalize user experience and save preferences.
- **Monster Level-Up**: Add options to increase cr of monster and pull increased stats from table.
- **Optimize Filter for Party**: Introduce options to filter encounters for casual or optimized parties to adjust challenge rating difficulty.
- **Connect to AI for Encounter Prompt**: Use AI to generate prompts or narrative hooks to start encounters, enhancing storytelling possibilities.
- **Ranking Strength of Party**: Develop a system to rank the strength of parties based on levels, considering party composition, classes, and subclasses.
- **Save User Info for Enhanced Filtering**: Store user information, including party makeup and monster preferences, to simplify encounter filtering and customization.
- **Generate Monster Tokens with AI Image Generation**: Utilize AI-powered image generation to create visual monster tokens for encounters, enhancing immersion and visualization.
