# QuickEncounter

## Overview

QuickEncounter is a web app designed for Dungeon Masters (DMs) to swiftly create challenging encounters by inputting party details and selecting or generating monsters. It uniquely allows DMs to level up lower-tier monsters for increased challenge diversity, addressing the time-consuming nature of encounter preparation in tabletop role-playing games.

### Problem

DMs need this app because prepping encounters can take hours. On top of that, leveling up monsters to match the party’s strength can add significantly to the preparation time. Existing apps often fall short by not providing leveled-up versions of lower-level monsters, making encounters feel repetitive. QuickEncounter addresses these issues by offering a quick and efficient way to create diverse and challenging encounters, including the ability to start with a specific or randomly suggested monster.

### User Profile

Both new and experienced DMs will use QuickEncounter. New DMs will get the help they need to create level-appropriate encounters, while experienced DMs can use it to quickly create encounters on the fly, making their campaigns feel more dynamic.

- **New DMs**: To create balanced and level-appropriate encounters with ease, reducing prep time and ensuring an enjoyable experience for their players.
- **Experienced DMs**: To quickly generate encounters during gameplay and customize monster levels, keeping the campaign engaging and varied.

### Features

- **Party Information Input**: DMs can input the number of party members and their levels.
- **Encounter Generation**: Automatically generate a list of appropriately challenging monsters based on party information.
- **Starting Monster Selection**: DMs can select a starting monster or have one randomly suggested.
- **Monster Leveling**: Add and level up lower-level monsters to create unique and challenging encounters.

## Implementation

### Tech Stack

- **Frontend**: React for web application development.
- **Backend**: Node.js with Express.js for server-side logic.
- **Database**: MySQL for storing monster data and encounter information.
- **GraphQL**: For flexible and efficient data querying and manipulation.
- **Traditional API Calls**: As a backup to GraphQL for data fetching and operations.
- **APIs**:
  - [D&D 5e API](https://www.dnd5eapi.co/)
  - [Open5e API](https://api.open5e.com/)

### APIs

- **Monster Data from APIs**: Initial monster data, including base stats and descriptions, will be pulled from external APIs such as the D&D 5e API and Open5e API.
- **Monster Stats in MySQL**: MySQL database stores updated monster stats based on user adjustments (leveling up/down).

### Sitemap

The app will be a single-page application (SPA) with the following flow:

1.  **Party Composition Input**: DMs can input the number of party members and their levels.
2.  **Starting Monster Selection**: DMs can select a starting monster based on party composition or have one randomly suggested.
3.  **Additional Monsters Suggestion**: Randomly suggest additional monsters to fill out the encounter.
4.  **Monster List and Stat Blocks**: Display a list of selected monsters and their stat blocks once the appropriate challenge rating is met for in-game use.

### Mockups

Provide visuals of your app's screens. You can use tools like Figma or pictures of hand-drawn sketches.

### Data

#### Monster Data from APIs

- **Description**: Initial monster data, including base stats and descriptions, will be pulled from external APIs such as the D&D 5e API and Open5e API.
- **Usage**: This data will populate the app's monster selection and initial stats display for users.

#### Monster Stats in MySQL

- **Description**: MySQL database stores updated monster stats based on user adjustments (leveling up/down).
- **Usage**: When a user selects a monster and adjusts its level, the app queries the MySQL database to fetch updated stats based on predefined level-up tables. This ensures accurate and dynamically adjusted stats for each selected monster.

### Endpoints

- **GET /api/monsters**

  - **Parameters**: none
  - **Response**: List of available monsters with initial stats from APIs.

- **PUT /api/monsters/{monsterId}/level**

  - **Parameters**: monster ID, new level
  - **Response**: Updated monster stats based on MySQL data.

### Auth

Authentication features, including user registration and login, are being deferred from core functionality in the initial sprints. This feature will be prioritized for implementation in later phases of development.

## Roadmap

#### Sprint 1: Setup and Core Features

- Set up development environment.
- Implement basic app structure and navigation.
- Develop party information input and encounter generation functionalities.

#### Sprint 2: Monster Management and Enhancement

- Integrate monster selection and leveling features.
- Implement API integration for initial monster data retrieval.
- Develop MySQL integration for dynamic monster stat updates based on user adjustments.

## Nice-to-haves

- **User Registration**: Implement user registration and authentication to personalize user experience and save preferences.
- **Optimize Filter for Party**: Introduce options to filter encounters for casual or optimized parties to adjust challenge rating difficulty.
- **Connect to AI for Encounter Prompt**: Use AI to generate prompts or narrative hooks to start encounters, enhancing storytelling possibilities.
- **Ranking Strength of Party**: Develop a system to rank the strength of parties based on levels, considering party composition, classes, and subclasses.
- **Save User Info for Enhanced Filtering**: Store user information, including party makeup and monster preferences, to simplify encounter filtering and customization.
- **Generate Monster Tokens with AI Image Generation**: Utilize AI-powered image generation to create visual monster tokens for encounters, enhancing immersion and visualization.
